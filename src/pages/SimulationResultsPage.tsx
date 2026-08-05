import {
  CalendarClock,
  CreditCard as CreditCardIcon,
  Goal,
  Landmark,
  PiggyBank,
  Wallet,
} from 'lucide-react'
import { useParams } from 'react-router-dom'
import { Insights } from '@/components/features/Insights'
import { AIInsightCard } from '@/components/features/Simulation/AIInsightCard'
import { Card } from '@/components/features/SimulationResults/Card'
import { PageHero } from '@/components/shared/PageHero'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'
import { formatCurrency, parseCurrency } from '@/utils/currency'
import { calcMonthlySavings } from '@/utils/simulation'

export function SimulationResultsPage() {
  const { id } = useParams<{ id: string }>()
  const { getFormData } = useSimulationStorage()

  const data = id ? getFormData(id) : null

  if (!data) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10 text-center sm:py-14">
        <PageHero
          title="Simulação não encontrada"
          subtitle="Verifique o link ou crie uma nova simulação."
        />
      </main>
    )
  }

  const monthlySavings = calcMonthlySavings(data) ?? 0

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <PageHero
        title="Resultado da sua simulação"
        subtitle="Com base no seu perfil financeiro e objetivos."
      />

      {/* Cards Superiores */}
      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card
          icon={Goal}
          label="Custo da Meta"
          value={formatCurrency(parseCurrency(data.goalAmount))}
          subtitle={data.goalName}
        />
        <Card
          icon={CalendarClock}
          label="Prazo"
          value={`${data.goalDeadline} meses`}
          subtitle="Prazo para atingir a meta"
        />
        <Card
          variant="primary"
          icon={PiggyBank}
          label="Economia mensal"
          value={formatCurrency(monthlySavings)}
          subtitle="Economia mensal necessária"
        />
      </div>

      {/* Grid com Insights e Resumo do Perfil */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Painel de Insights do Gemini */}
        <div className="order-2 lg:order-1 lg:col-span-2">
          <Insights data={data} />
        </div>

        {/* Resumo de Renda, Custos e Dívidas */}
        <div className="order-1 flex flex-col gap-6 lg:order-2">
          <Card
            icon={Wallet}
            label="Renda mensal"
            value={formatCurrency(parseCurrency(data.income))}
            subtitle="Renda total bruta por mês"
          />
          <Card
            icon={CreditCardIcon}
            label="Custos Fixos de Vida"
            value={formatCurrency(parseCurrency(data.expenses))}
            subtitle="Gastos essenciais por mês"
          />
          <Card
            icon={Landmark}
            label="Dívidas / Parcelas"
            value={formatCurrency(parseCurrency(data.debts))}
            subtitle="Valor comprometido em parcelas/depósito"
          />
        </div>
      </div>

      {/* 💡 Desafio 2: Educador Financeiro AI (Chat Interativo) */}
      <section className="mt-8">
        <AIInsightCard simulation={data} />
      </section>
    </main>
  )
}

export default SimulationResultsPage