import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PlusCircle, History as HistoryIcon } from 'lucide-react'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'
import type { SimulationRecord } from '@/data/simulation'
import { HistoryCard } from '@/components/features/History/HistoryCard'
import { Button } from '@/components/shared/Button'

export function HistoryPage() {
  const { getSimulations, deleteSimulation } = useSimulationStorage()
  const [simulations, setSimulations] = useState<SimulationRecord[]>([])

  useEffect(() => {
    setSimulations(getSimulations())
  }, [getSimulations])

  const handleDelete = (id: string) => {
    deleteSimulation(id)
    setSimulations((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-foreground text-2xl font-bold flex items-center gap-2">
            <HistoryIcon className="h-6 w-6 text-primary" />
            Histórico de Simulações
          </h1>
          <p className="text-muted-foreground text-sm">
            Consulte e gerencie suas metas salvas anteriormente.
          </p>
        </div>

        <Link to="/">
          <Button variant="primary" icon={PlusCircle}>
            Nova Simulação
          </Button>
        </Link>
      </div>

      {simulations.length === 0 ? (
        <div className="bg-card flex flex-col items-center justify-center rounded-2xl p-12 text-center shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
          <HistoryIcon className="text-muted-foreground mb-4 h-12 w-12" />
          <h3 className="text-foreground text-lg font-semibold">
            Nenhuma simulação encontrada
          </h3>
          <p className="text-muted-foreground mt-1 max-w-sm text-sm">
            Você ainda não salvou nenhuma simulação financeira. Comece criando a sua primeira meta!
          </p>
          <Link to="/" className="mt-6">
            <Button variant="primary">Criar Simulação</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {simulations.map((item) => (
            <HistoryCard key={item.id} simulation={item} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  )
}