import { parseCurrency } from './currency'
import type { SimulationFormData } from '@/data/simulation'

export function calcMonthlySavings(data: SimulationFormData): number {
  const goalAmount = parseCurrency(data.goalAmount)
  const deadline = Number(data.goalDeadline) || 1

  if (deadline <= 0) return 0

  return goalAmount / deadline
}