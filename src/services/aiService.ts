export async function getAiInsight(prompt: string) {
  const response = await fetch('/api/ai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error('Não foi possível obter o insight da IA.');
  }

  return response.json();
}
