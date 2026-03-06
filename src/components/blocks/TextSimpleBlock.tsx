import { CheckCircle2 } from "lucide-react";

interface Props {
  title: string;
  subtitle: string;
  content: {
    items_pt?: string[];
    items_en?: string[];
  };
  lang: "pt" | "en";
}

export function TextSimpleBlock({ title, subtitle, content, lang }: Props) {
  const items = lang === "pt" ? content.items_pt : content.items_en;

  return (
    <section className="py-20">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
          {subtitle && (
            <p className="text-muted-foreground text-lg mb-8">{subtitle}</p>
          )}
          {items && items.length > 0 && (
            <ul className="space-y-4">
              {items.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
