interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
}

export function PageHero({ title, subtitle, description }: PageHeroProps) {
  return (
    <section className="mb-8 max-w-2xl">
      <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
        {title}
      </h1>
      {(subtitle || description) && (
        <p className="mt-3 text-base leading-7 text-muted-foreground">
          {subtitle ?? description}
        </p>
      )}
    </section>
  );
}

export default PageHero;
