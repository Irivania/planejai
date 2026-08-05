import { Trash2, ArrowRight, Target, Calendar, DollarSign } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { SimulationRecord } from '@/data/simulation'
import { Button } from '@/components/shared/Button'
import { formatCurrency, parseCurrency } from '@/utils/currency'

interface HistoryCardProps {
  simulation: SimulationRecord
  onDelete: (id: string) => void
}

export function HistoryCard({ simulation, onDelete }: HistoryCardProps) {
  const navigate = useNavigate()

  const handleViewDetails = () => {
    navigate(`/resultado/${simulation.id}`)
  }

  // Converte a string numérica e formata para o padrão BRL (ex: R$ 35.000,00)
  const numericAmount = parseCurrency(simulation.goalAmount)
  const formattedAmount = formatCurrency(numericAmount)

  return (
    <div className="bg-card flex flex-col justify-between gap-4 rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] transition-transform duration-200 hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-muted-primary/20 flex h-10 w-10 items-center justify-center rounded-xl text-primary">
            <Target className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-foreground font-semibold capitalize text-base">
              {simulation.goalName || 'Meta Sem Nome'}
            </h3>
            <span className="text-muted-foreground text-xs">Simulação Salva</span>
          </div>
        </div>

        <button
          onClick={() => onDelete(simulation.id)}
          className="text-muted-foreground transition-colors hover:text-red-500 p-1"
          title="Excluir simulação"
          type="button"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 border-y border-border py-3">
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-muted-foreground text-[10px] uppercase font-bold">Valor</p>
            <p className="text-foreground text-sm font-semibold">{formattedAmount}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <div>
            <p className="text-muted-foreground text-[10px] uppercase font-bold">Prazo</p>
            <p className="text-foreground text-sm font-semibold">{simulation.goalDeadline} meses</p>
          </div>
        </div>
      </div>

      <Button
        variant="secondary"
        className="w-full justify-between"
        onClick={handleViewDetails}
      >
        <span>Ver detalhes</span>
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  )
}