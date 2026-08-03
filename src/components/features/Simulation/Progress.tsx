type ProgressProps = {
  currentStep: number;
  totalSteps: number;
};

function Progress({ currentStep, totalSteps }: ProgressProps) {
  return (
    <div className="mt-6 flex items-center gap-3 text-sm text-slate-600">
      <span className="font-medium text-slate-900">Etapa {currentStep}</span>
      <div className="h-2 flex-1 rounded-full bg-slate-200">
        <div
          className="h-2 rounded-full bg-slate-900"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
      <span>{totalSteps} passos</span>
    </div>
  );
}

export default Progress;
