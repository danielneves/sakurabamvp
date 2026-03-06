import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface CardItem {
  icon?: string;
  title_pt: string;
  title_en: string;
  description_pt: string;
  description_en: string;
}

interface Props {
  title: string;
  subtitle: string;
  content: {
    cards?: CardItem[];
    columns?: 1 | 2;
  };
  lang: "pt" | "en";
}

export function CardsBlock({ title, subtitle, content, lang }: Props) {
  const cards = content.cards ?? [];
  const cols = content.columns ?? 2;

  return (
    <section className="py-20 bg-secondary">
      <div className="container">
        {title && <h2 className="text-3xl font-bold text-center mb-4">{title}</h2>}
        {subtitle && <p className="text-muted-foreground text-center text-lg mb-12 max-w-2xl mx-auto">{subtitle}</p>}
        <div className={`grid gap-6 max-w-5xl mx-auto ${cols === 1 ? "grid-cols-1 max-w-2xl" : "md:grid-cols-2 lg:grid-cols-" + Math.min(cards.length, 4)}`}>
          {cards.map((card, idx) => {
            const IconComp = card.icon ? (LucideIcons as unknown as Record<string, LucideIcon>)[card.icon] : null;
            return (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  {IconComp && (
                    <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <IconComp className="h-6 w-6" />
                    </div>
                  )}
                  <CardTitle>{lang === "pt" ? card.title_pt : card.title_en}</CardTitle>
                  <CardDescription className="text-base">
                    {lang === "pt" ? card.description_pt : card.description_en}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
