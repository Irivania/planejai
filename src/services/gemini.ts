import { GoogleGenerativeAI } from '@google/generative-ai'
import type { SimulationRecord } from '@/data/simulation'

const apiKey = import.meta.env.VITE_GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey)

export async function askFinancialEducator(
  question: string,
  simulation: SimulationRecord,
  previousHistory: { role: 'user' | 'assistant'; content: string }[] = []
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

  const prompt = `
Você é um educador financeiro amigável, didático e especialista em finanças pessoais.
O usuário fez uma simulação com os seguintes dados:
- Meta: ${simulation.goalName}
- Valor total: R$ ${simulation.goalAmount}
- Prazo: ${simulation.goalDeadline} meses

Histórico recente da conversa:
${previousHistory.map((msg) => `${msg.role}: ${msg.content}`).join('\n')}

Pergunta do usuário: "${question}"

Responda de forma direta, clara, acolhedora e prática em formato Markdown. Responda em até 3 parágrafos curtos ou tópicos.
`

  const result = await model.generateContent(prompt)
  const response = await result.response
  return response.text()
}