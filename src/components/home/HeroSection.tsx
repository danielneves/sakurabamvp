import { ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-office.jpg";
import { useSiteContent } from "@/hooks/useSiteContent";

interface HeroSectionProps {
  lang?: "pt" | "en";
}

const fallback = {
  pt: {
    badge: "Escritório Brasileiro-Canadense",
    title: "Soluções Jurídicas",
    titleHighlight: "no Canadá",
    subtitle: "Família, divórcio, imóveis, empresas e mais. Advocacia especializada com quem entende sua jornada e fala sua língua.",
    ctaPrimary: "Agende sua Consulta",
    ctaSecondary: "Conheça Nossos Serviços",
    stats: [
      { value: "15+", label: "Anos de Experiência" },
      { value: "2.000+", label: "Famílias Atendidas" },
      { value: "98%", label: "Taxa de Sucesso" },
    ],
  },
  en: {
    badge: "Multicultural Law Firm",
    title: "Legal Solutions That",
    titleHighlight: "Understand You",
    subtitle: "We serve clients from diverse cultural backgrounds with expertise in Canadian law. Family, real estate, business, and more — with cultural sensitivity you can trust.",
    ctaPrimary: "Schedule a Consultation",
    ctaSecondary: "Explore Our Services",
    stats: [
      { value: "15+", label: "Years of Experience" },
      { value: "2,000+", label: "Families Served" },
      { value: "98%", label: "Success Rate" },
    ],
  },
};

export function HeroSection({ lang = "pt" }: HeroSectionProps) {
  const { data: content } = useSiteContent();
  const fb = fallback[lang];

  const c = (key: string, fb: string) => content?.[key]?.[lang] ?? fb;

  const t = {
    badge: c("hero_badge", fb.badge),
    title: c("hero_title", fb.title),
    titleHighlight: c("hero_title_highlight", fb.titleHighlight),
    subtitle: c("hero_subtitle", fb.subtitle),
    ctaPrimary: c("hero_cta_primary", fb.ctaPrimary),
    ctaSecondary: c("hero_cta_secondary", fb.ctaSecondary),
    stats: [
      { value: c("hero_stat_1_value", fb.stats[0].value), label: c("hero_stat_1_label", fb.stats[0].label) },
      { value: c("hero_stat_2_value", fb.stats[1].value), label: c("hero_stat_2_label", fb.stats[1].label) },
      { value: c("hero_stat_3_value", fb.stats[2].value), label: c("hero_stat_3_label", fb.stats[2].label) },
    ],
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImage} alt="Escritório Sakuraba Law" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />
      </div>

      <div className="container relative z-10 py-20 md:py-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent border border-accent/30 mb-6 animate-fade-in">
            <Shield className="h-4 w-4" />
            <span className="text-sm font-medium">{t.badge}</span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-slide-up">
            {t.title}
            <br />
            <span className="text-accent">{t.titleHighlight}</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed mb-8 max-w-2xl animate-slide-up" style={{ animationDelay: "0.1s" }}>
            {t.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Link to="/contato">
              <Button size="lg" variant="accent" className="w-full sm:w-auto group">
                {t.ctaPrimary}
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/#servicos">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                {t.ctaSecondary}
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-primary-foreground/20 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            {t.stats.map((stat, index) => (
              <div key={index} className="text-center sm:text-left">
                <div className="text-2xl md:text-3xl font-bold text-accent">{stat.value}</div>
                <div className="text-xs md:text-sm text-primary-foreground/70 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
