type AIInsightCardProps = {
  insight: string;
};

function AIInsightCardProps({ insight }: AIInsightCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
      <h3 className="font-semibold text-slate-900">Insight da IA</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{insight}</p>
    </div>
  );
}

export default AIInsightCardProps;
