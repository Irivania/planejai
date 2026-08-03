import AIInsightCardProps from '@/components/features/SimulationResults/AIInsightCardProps';
import Card from '@/components/features/SimulationResults/Card';

function SimulationResultsPage() {
  return (
    <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">
          Resultados da simulação
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Os insights e os resumos da sua simulação ficam organizados aqui.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card
          title="Meta financeira"
          description="Sua reserva de emergência pode ser alcançada em 12 meses com ajustes pequenos e consistentes."
        />
        <Card
          title="Economia mensal"
          description="O saldo restante após as despesas chega a R$ 1.800,00 por mês."
        />
      </div>

      <AIInsightCardProps insight="A IA sugere priorizar a redução de despesas variáveis e automatizar transferências para a reserva de emergência para acelerar o planejamento." />
    </section>
  );
}

export default SimulationResultsPage;
