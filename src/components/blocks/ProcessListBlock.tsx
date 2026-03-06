interface Step {
  text_pt: string;
  text_en: string;
}

interface Props {
  title: string;
  subtitle: string;
  content: { steps?: Step[] };
  lang: "pt" | "en";
}

export function ProcessListBlock({ title, subtitle, content, lang }: Props) {
  const steps = content.steps ?? [];

  return (
    <section className="py-20">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
          {subtitle && <p className="text-muted-foreground text-lg mb-12">{subtitle}</p>}
          <div className="space-y-4">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-4 text-left p-4 rounded-lg bg-secondary">
                <div className="h-8 w-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {idx + 1}
                </div>
                <span className="text-foreground font-medium">
                  {lang === "pt" ? step.text_pt : step.text_en}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
