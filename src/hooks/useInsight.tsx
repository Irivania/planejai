import { useCallback, useEffect, useRef, useState } from 'react'
import { buildAIPrompt } from '@/data/aiPrompt'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'
import { getSimulationInsight, type InsightData } from '@/services/aiService'

export const useInsight = (id: string) => {
  const isRequestPending = useRef(false)
  const { getFormData, updateSimulation } = useSimulationStorage()

  // Inicializa o estado lendo do localStorage se já existir
  const [insight, setInsight] = useState<InsightData | null>(() => {
    const simulation = getFormData(id)
    if (simulation?.insight) {
      return simulation.insight
    }
    return null
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchInsight = useCallback(
    async (simulationId: string) => {
      const simulation = getFormData(simulationId)

      if (!simulation) {
        setError('Simulação não encontrada.')
        return
      }

      isRequestPending.current = true
      setIsLoading(true)
      setError(null)

      try {
        const prompt = buildAIPrompt(simulation)
        const data = await getSimulationInsight(simulation)

        // Salva o resultado no localStorage junto com a simulação
        updateSimulation(simulationId, {
          ...simulation,
          insight: data,
        })

        setInsight(data)
        return data
      } catch {
        setError('Erro ao gerar o diagnóstico. Tente novamente.')
      } finally {
        isRequestPending.current = false
        setIsLoading(false)
      }
    },
    [getFormData, updateSimulation],
  )

  useEffect(() => {
    // Trava de segurança: impede requisições duplicadas ou loops infinitos
    if (insight || isLoading || isRequestPending.current || error) {
      return
    }

    fetchInsight(id).then((data) => {
      isRequestPending.current = false
      if (!data) return
      setInsight(data)
    })
  }, [id, insight, isLoading, error, fetchInsight])

  return { insight, isLoading, error, fetchInsight }
}