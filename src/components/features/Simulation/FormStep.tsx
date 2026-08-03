type FormStepProps = {
  title: string;
  description: string;
};

function FormStep({ title, description }: FormStepProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <h2 className="font-semibold text-slate-900">{title}</h2>
      <p className="mt-1 text-sm text-slate-600">{description}</p>
    </div>
  );
}

export default FormStep;
