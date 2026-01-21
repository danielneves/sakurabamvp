import { Award, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useCallback } from "react";
import lawyerCelso from "@/assets/lawyer-celso.jpg";
import lawyerMariana from "@/assets/lawyer-mariana.jpg";
import lawyerRobert from "@/assets/lawyer-robert.jpg";

interface AboutPreviewProps {
  lang?: "pt" | "en";
}

const translations = {
  pt: {
    badge: "Quem Somos",
    title: "Conheça Nossa Equipe",
    subtitle: "Advogados especializados que entendem sua jornada",
    cta: "Conheça a Equipe Completa",
    team: [
      {
        name: "Dr. Celso Sakuraba",
        role: "Sócio Fundador",
        specialty: "Direito Transnacional",
        quote: "Sei exatamente como é navegar dois sistemas jurídicos enquanto constrói uma vida nova.",
        experience: "15+ Anos",
      },
      {
        name: "Dra. Mariana Santos",
        role: "Advogada Sênior",
        specialty: "Direito de Família",
        quote: "Cada família tem sua história única. Meu papel é proteger o que mais importa para você.",
        experience: "10+ Anos",
      },
      {
        name: "Dr. Robert Chen",
        role: "Advogado Associado",
        specialty: "Direito Empresarial",
        quote: "Ajudo empresários a expandir seus negócios entre Brasil e Canadá com segurança jurídica.",
        experience: "8+ Anos",
      },
    ],
  },
  en: {
    badge: "Who We Are",
    title: "Meet Our Team",
    subtitle: "Specialized lawyers who understand your journey",
    cta: "Meet the Full Team",
    team: [
      {
        name: "Dr. Celso Sakuraba",
        role: "Founding Partner",
        specialty: "Transnational Law",
        quote: "I know exactly what it's like to navigate two legal systems while building a new life.",
        experience: "15+ Years",
      },
      {
        name: "Mariana Santos, Esq.",
        role: "Senior Attorney",
        specialty: "Family Law",
        quote: "Every family has a unique story. My role is to protect what matters most to you.",
        experience: "10+ Years",
      },
      {
        name: "Robert Chen, Esq.",
        role: "Associate Attorney",
        specialty: "Business Law",
        quote: "I help entrepreneurs expand their business between Brazil and Canada with legal certainty.",
        experience: "8+ Years",
      },
    ],
  },
};

const images = [lawyerCelso, lawyerMariana, lawyerRobert];

export function AboutPreview({ lang = "pt" }: AboutPreviewProps) {
  const t = translations[lang];
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? t.team.length - 1 : prev - 1));
  }, [t.team.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === t.team.length - 1 ? 0 : prev + 1));
  }, [t.team.length]);

  const currentMember = t.team[currentIndex];

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-medium text-accent uppercase tracking-wider mb-4">
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-lg overflow-hidden shadow-xl">
                <img
                  src={images[currentIndex]}
                  alt={currentMember.name}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-6 -right-6 md:bottom-8 md:-right-8 bg-card p-4 md:p-6 rounded-lg shadow-xl border border-border">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Award className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{currentMember.experience}</p>
                    <p className="text-xs text-muted-foreground">
                      {lang === "pt" ? "de Experiência" : "of Experience"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <div className="mb-2">
                <span className="text-sm font-medium text-accent">{currentMember.specialty}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {currentMember.name}
              </h3>
              <p className="text-muted-foreground mb-6">{currentMember.role}</p>

              {/* Quote */}
              <blockquote className="border-l-4 border-accent pl-6 py-2 mb-8">
                <p className="text-foreground italic text-lg">
                  "{currentMember.quote}"
                </p>
              </blockquote>

              {/* Navigation Dots */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex gap-2">
                  {t.team.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        idx === currentIndex
                          ? "bg-accent w-8"
                          : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      }`}
                      aria-label={`Go to team member ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPrevious}
                  className="rounded-full"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToNext}
                  className="rounded-full"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Link to="/sobre" className="ml-auto">
                  <Button size="lg">
                    {t.cta}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}