import { ArrowRight, Shield, Users, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-office.jpg";

interface HeroSectionProps {
  lang?: "pt" | "en";
}

const translations = {
  pt: {
    badge: "Escritório Brasileiro-Canadense",
    title: "A Ponte Jurídica Entre",
    titleHighlight: "Brasil e Canadá",
    subtitle: "Advocacia especializada com quem entende sua jornada. Falamos sua língua.",
    cta1: "Quero Imigrar para o Canadá",
    cta2: "Já Moro no Canadá",
    stats: [
      { value: "15+", label: "Anos de Experiência" },
      { value: "2.000+", label: "Famílias Atendidas" },
      { value: "98%", label: "Taxa de Sucesso" },
    ],
  },
  en: {
    badge: "Brazilian-Canadian Law Firm",
    title: "The Legal Bridge Between",
    titleHighlight: "Brazil and Canada",
    subtitle: "Specialized legal services from someone who understands your journey. We speak your language.",
    cta1: "I Want to Immigrate to Canada",
    cta2: "I Already Live in Canada",
    stats: [
      { value: "15+", label: "Years of Experience" },
      { value: "2,000+", label: "Families Served" },
      { value: "98%", label: "Success Rate" },
    ],
  },
};

export function HeroSection({ lang = "pt" }: HeroSectionProps) {
  const t = translations[lang];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Escritório Sakuraba Law"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />
      </div>

      {/* Content */}
      <div className="container relative z-10 py-20 md:py-32">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent border border-accent/30 mb-6 animate-fade-in">
            <Shield className="h-4 w-4" />
            <span className="text-sm font-medium">{t.badge}</span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-slide-up">
            {t.title}
            <br />
            <span className="text-accent">{t.titleHighlight}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed mb-8 max-w-2xl animate-slide-up" style={{ animationDelay: "0.1s" }}>
            {t.subtitle}
          </p>

          {/* CTAs - Two Entry Points */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Link to="/imigracao">
              <Button size="lg" variant="accent" className="w-full sm:w-auto group">
                <Users className="h-5 w-5 mr-2" />
                {t.cta1}
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/familia">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-primary-foreground/10 border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 group">
                <Briefcase className="h-5 w-5 mr-2" />
                {t.cta2}
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-primary-foreground/20 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            {t.stats.map((stat, index) => (
              <div key={index} className="text-center sm:text-left">
                <div className="text-2xl md:text-3xl font-bold text-accent">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-primary-foreground/70 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
