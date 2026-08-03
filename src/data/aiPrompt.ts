export function buildAiPrompt(simulation: Record<string, unknown>) {
  return `Você é um especialista em finanças pessoais. Analise esta simulação: ${JSON.stringify(simulation, null, 2)}`;
}
