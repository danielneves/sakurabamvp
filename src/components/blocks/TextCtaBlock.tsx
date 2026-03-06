import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  subtitle: string;
  content: {
    cta_text_pt?: string;
    cta_text_en?: string;
    cta_link?: string;
  };
  lang: "pt" | "en";
}

export function TextCtaBlock({ title, subtitle, content, lang }: Props) {
  const ctaText = lang === "pt" ? content.cta_text_pt : content.cta_text_en;
  const ctaLink = content.cta_link || "/contato";

  return (
    <section className="py-20 bg-warm-muted">
      <div className="container text-center">
        {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
        {subtitle && (
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">{subtitle}</p>
        )}
        {ctaText && (
          <Link to={ctaLink}>
            <Button size="lg">{ctaText}</Button>
          </Link>
        )}
      </div>
    </section>
  );
}
