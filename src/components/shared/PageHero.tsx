type PageHeroProps = {
  title: string;
  description: string;
};

function PageHero({ title, description }: PageHeroProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-semibold text-slate-900">{title}</h1>
      <p className="mt-2 max-w-2xl text-slate-600">{description}</p>
    </div>
  );
}

export default PageHero;
