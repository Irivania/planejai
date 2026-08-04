import { useEffect, useState } from 'react'
import { Content } from './Content'
import { Error } from './Error'
import type { SimulationFormData } from '@/data/simulation'
import { getSimulationInsight, type InsightData } from '@/services/aiService'

interface InsightsProps {
  data?: SimulationFormData | null
}

export function Insights({ data }: InsightsProps) {
  const [insight, setInsight] = useState<InsightData | null>(null)
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!data) {
      setLoading(false)
      setErrorMessage('Dados da simulação não encontrados.')
      return
    }

    async function fetchInsight() {
      try {
        setLoading(true)
        setErrorMessage(null)
        const response = await getSimulationInsight(data)
        setInsight(response)
      } catch (err) {
        console.error('Erro detalhado ao buscar insights:', err)
        setErrorMessage(
          err instanceof Error ? err.message : 'Erro ao processar resposta da IA.',
        )
      } finally {
        setLoading(false)
      }
    }

    fetchInsight()
  }, [data])

  if (loading) {
    return (
      <div className="bg-card flex flex-col items-center justify-center rounded-2xl p-8 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
        <p className="text-muted-foreground mt-4 text-sm font-medium">
          Gerando insights inteligentes com IA...
        </p>
      </div>
    )
  }

  if (errorMessage || !insight) {
    return <Error message={errorMessage || undefined} />
  }

  return (
    <div className="bg-card rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
      <Content insight={insight} />
    </div>
  )
}

export default Insights