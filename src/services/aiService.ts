import type { SimulationFormData, SimulationRecord } from '@/data/simulation'
import { parseCurrency } from '@/utils/currency'

interface GeminiResponse {
  candidates: {
    content: {
      parts: { text: string }[]
    }
  }[]
}

const API_KEY = String(import.meta.env.VITE_GEMINI_API_KEY)

const MODEL_NAME = 'gemini-flash-latest'
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`

const callGeminiAPI = async (prompt: string): Promise<GeminiResponse> => {
  const response = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  })

  if (!response.ok) {
    const errorBody = await response.text()
    console.error('Detalhe do erro da API Gemini:', errorBody)
    throw new Error(`Erro na requisição: ${response.status}`)
  }

  return (await response.json()) as GeminiResponse
}

export interface InsightData {
  feasibility: {
    status: 'viable' | 'needs_adjustment' | 'unfeasible'
    content: string
  }
  diagnosis: { content: string }
  suggestions: { items: string[] }
  extraIncome: { items: string[] }
  investment: { items: string[] }
  motivation: { content: string }
}

export const getInsight = async (prompt: string): Promise<InsightData> => {
  const response = await callGeminiAPI(prompt)

  if (!response.candidates || response.candidates.length === 0) {
    throw new Error('Nenhum resultado retornado da IA.')
  }

  let jsonText = response.candidates[0].content.parts[0].text

  // Limpa possíveis blocos ```json ... ``` retornados pela IA antes do parse
  jsonText = jsonText.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim()

  return JSON.parse(jsonText) as InsightData
}

// Fallback de Diagnóstico Financeiro Local
function generateLocalFallbackInsight(data: SimulationFormData): InsightData {
  const income = parseCurrency(data.income)
  const expenses = parseCurrency(data.expenses)
  const debts = parseCurrency(data.debts)
  const goalAmount = parseCurrency(data.goalAmount)
  const deadline = Number(data.goalDeadline) || 1

  const monthlyNeeded = goalAmount / deadline
  const totalCommitted = expenses + debts
  const remainingBudget = income - totalCommitted

  let status: 'viable' | 'needs_adjustment' | 'unfeasible' = 'viable'
  let feasibilityText = ''

  if (remainingBudget >= monthlyNeeded) {
    status = 'viable'
    feasibilityText = `Sua meta "${data.goalName}" é totalmente viável! Sua sobra mensal estimada é de R$ ${remainingBudget.toFixed(2)}, cobrindo a economia de R$ ${monthlyNeeded.toFixed(2)} necessária pelos próximos ${deadline} meses.`
  } else if (remainingBudget > 0) {
    status = 'needs_adjustment'
    feasibilityText = `Para atingir a meta "${data.goalName}", será necessário reajustar gastos. A economia necessária de R$ ${monthlyNeeded.toFixed(2)}/mês excede sua sobra livre atual de R$ ${remainingBudget.toFixed(2)}.`
  } else {
    status = 'unfeasible'
    feasibilityText = `Sua renda atual está 100% comprometida pelos custos fixos e dívidas. Será preciso renegociar despesas antes de iniciar o plano da meta "${data.goalName}".`
  }

  return {
    feasibility: {
      status,
      content: feasibilityText,
    },
    diagnosis: {
      content: `Seus custos fixos consomem R$ ${expenses.toFixed(2)} e suas parcelas/dívidas consomem R$ ${debts.toFixed(2)} da sua renda de R$ ${income.toFixed(2)}.`,
    },
    suggestions: {
      items: [
        'Revise assinaturas e gastos variáveis não essenciais.',
        'Mantenha uma reserva de emergência paralela ao valor da meta.',
        'Programe transferências automáticas assim que receber sua renda.',
      ],
    },
    extraIncome: {
      items: [
        'Ofereça consultorias ou serviços autônomos na sua área de atuação.',
        'Desapegue de itens seminovos em plataformas de venda online.',
      ],
    },
    investment: {
      items: [
        'Aplicações em Tesouro Selic ou CDB com liquidez diária e rendimento de 100% do CDI.',
      ],
    },
    motivation: {
      content: 'Consistência e pequenos ajustes diários constroem grandes conquistas financeiras!',
    },
  }
}

export const getSimulationInsight = async (
  data: SimulationFormData,
): Promise<InsightData> => {
  const income = parseCurrency(data.income)
  const expenses = parseCurrency(data.expenses)
  const debts = parseCurrency(data.debts)
  const goalAmount = parseCurrency(data.goalAmount)
  const goalDeadline = data.goalDeadline

  const prompt = `
Você é um consultor financeiro especialista. Analise estes dados:
- Renda Mensal Bruta: R$ ${income}
- Custos Fixos Mensais: R$ ${expenses}
- Dívidas e Parcelas: R$ ${debts}
- Meta Financeira: "${data.goalName}"
- Custo total da Meta: R$ ${goalAmount}
- Prazo para atingir a meta: ${goalDeadline} meses

Retorne um objeto JSON sem formatação Markdown com a seguinte estrutura:
{
  "feasibility": { "status": "viable", "content": "..." },
  "diagnosis": { "content": "..." },
  "suggestions": { "items": ["..."] },
  "extraIncome": { "items": ["..."] },
  "investment": { "items": ["..."] },
  "motivation": { "content": "..." }
}
  `.trim()

  try {
    return await getInsight(prompt)
  } catch (error) {
    console.warn('Utilizando diagnóstico local de fallback:', error)
    return generateLocalFallbackInsight(data)
  }
}

// 💡 DESAFIO 2: Respostas em texto corrido para o Educador Financeiro AI
export const askFinancialEducator = async (
  question: string,
  simulation: SimulationRecord,
  previousHistory: { role: 'user' | 'assistant'; content: string }[] = [],
): Promise<string> => {
  const income = parseCurrency(simulation.income)
  const expenses = parseCurrency(simulation.expenses)
  const debts = parseCurrency(simulation.debts)
  const goalAmount = parseCurrency(simulation.goalAmount)

  const conversation = previousHistory
    .map((msg) => `${msg.role === 'user' ? 'Usuário' : 'Educador'}: ${msg.content}`)
    .join('\n')

  const prompt = `
Você é um educador financeiro amigável, didático e especialista do aplicativo Planej.ai.
O usuário fez uma simulação com os seguintes dados:
- Meta: ${simulation.goalName}
- Valor total da meta: R$ ${goalAmount}
- Prazo: ${simulation.goalDeadline} meses
- Renda Mensal: R$ ${income}
- Custos Fixos: R$ ${expenses}
- Dívidas/Parcelas: R$ ${debts}

Histórico da conversa:
${conversation}

Pergunta do usuário: "${question}"

Responda diretamente em texto claro e acolhedor (pode usar tópicos ou até 3 parágrafos curtos). Seja prático e forneça dicas alinhadas ao contexto financeiro dele.
  `.trim()

  try {
    const response = await callGeminiAPI(prompt)

    if (!response.candidates || response.candidates.length === 0) {
      throw new Error('Nenhum resultado retornado da IA.')
    }

    return response.candidates[0].content.parts[0].text
  } catch (error) {
    console.error('Erro na resposta do educador financeiro:', error)

    // Trata estouro de cota (429) e fornece uma resposta amigável em vez de quebrar a tela
    if (String(error).includes('429')) {
      return 'Atingimos o limite temporário de consultas gratuitas da IA por minuto. Por favor, aguarde cerca de 30 segundos e tente perguntar novamente!'
    }

    throw error
  }
}