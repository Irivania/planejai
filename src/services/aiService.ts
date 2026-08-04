import type { SimulationFormData } from '@/data/simulation'
import { parseCurrency } from '@/utils/currency'

interface GeminiResponse {
  candidates: {
    content: {
      parts: { text: string }[]
    }
  }[]
}

const API_KEY = String(import.meta.env.VITE_GEMINI_API_KEY)
// Nome exato aceito pelo endpoint v1beta
const MODEL_NAME = 'gemini-1.5-flash-latest'
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`

const callGeminiAPI = async (prompt: string): Promise<GeminiResponse> => {
  const response = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
      },
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

  const rawText = response.candidates[0].content.parts[0].text
  return JSON.parse(rawText) as InsightData
}

// Fallback de Diagnóstico Financeiro Local caso a API atinja limites
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

Retorne um objeto JSON contendo exatamente esta estrutura de chaves:
{
  "feasibility": {
    "status": "viable",
    "content": "Análise sobre se a meta é viável ou não no prazo informado."
  },
  "diagnosis": {
    "content": "Diagnóstico sobre o nível de comprometimento da renda atual."
  },
  "suggestions": {
    "items": ["Sugestão 1", "Sugestão 2"]
  },
  "extraIncome": {
    "items": ["Ideia 1 de renda extra", "Ideia 2 de renda extra"]
  },
  "investment": {
    "items": ["Opção de investimento alinhada ao prazo"]
  },
  "motivation": {
    "content": "Mensagem motivacional curta."
  }
}

Importante: No campo "status" de "feasibility", escolha apenas um destes 3 valores exatos: "viable", "needs_adjustment" ou "unfeasible".
  `.trim()

  try {
    return await getInsight(prompt)
  } catch (error) {
    console.warn('Utilizando diagnóstico local de fallback:', error)
    return generateLocalFallbackInsight(data)
  }
}