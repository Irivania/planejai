import { useEffect, useState } from 'react';

import { buildAiPrompt } from '@/data/aiPrompt';
import { getAiInsight } from '@/services/aiService';

export function useInsight(simulation: Record<string, unknown>) {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!simulation) {
      return;
    }

    const run = async () => {
      setLoading(true);
      setError(null);

      try {
        const prompt = buildAiPrompt(simulation);
        const result = await getAiInsight(prompt);
        setData(result?.insight ?? null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro inesperado.');
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [simulation]);

  return { data, loading, error };
}
