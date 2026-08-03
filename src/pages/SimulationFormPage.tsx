import Form from '@/components/features/Simulation/Form';
import Hero from '@/components/features/Simulation/Hero';
import Progress from '@/components/features/Simulation/Progress';
import { simulationSteps } from '@/data/simulation';

function SimulationFormPage() {
  return (
    <section className="space-y-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <Hero />
      <Progress currentStep={1} totalSteps={simulationSteps.length} />
      <Form />
    </section>
  );
}

export default SimulationFormPage;
