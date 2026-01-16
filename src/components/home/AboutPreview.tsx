import { Award, BookOpen, GraduationCap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import lawyerImage from "@/assets/lawyer-celso.jpg";

interface AboutPreviewProps {
  lang?: "pt" | "en";
}

const translations = {
  pt: {
    badge: "Quem Somos",
    title: "Advogado que Viveu Sua Jornada",
    description: "Dr. Celso Sakuraba é advogado licenciado no Brasil e no Canadá. Com Mestrado em Direito pela Universidade de Toronto e Doutorado em Direito Internacional, ele não apenas entende a lei — ele viveu a experiência de ser imigrante.",
    quote: '"Sei exatamente como é navegar dois sistemas jurídicos enquanto constrói uma vida nova. É por isso que faço o que faço."',
    credentials: [
      "Membro da Law Society of Ontario",
      "Inscrito na OAB/Brasil",
      "Mestrado - Universidade de Toronto",
      "Especialista em Direito Transnacional",
    ],
    cta: "Conheça Nossa Equipe",
  },
  en: {
    badge: "Who We Are",
    title: "A Lawyer Who Lived Your Journey",
    description: "Dr. Celso Sakuraba is a licensed attorney in both Brazil and Canada. With a Master's degree from the University of Toronto and a PhD in International Law, he doesn't just understand the law — he's lived the immigrant experience.",
    quote: '"I know exactly what it\'s like to navigate two legal systems while building a new life. That\'s why I do what I do."',
    credentials: [
      "Member of Law Society of Ontario",
      "Registered with OAB/Brazil",
      "Master's - University of Toronto",
      "Transnational Law Specialist",
    ],
    cta: "Meet Our Team",
  },
};

export function AboutPreview({ lang = "pt" }: AboutPreviewProps) {
  const t = translations[lang];

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-lg overflow-hidden shadow-xl">
              <img
                src={lawyerImage}
                alt="Dr. Celso Sakuraba"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 md:bottom-8 md:-right-8 bg-card p-6 rounded-lg shadow-xl border border-border max-w-xs">
              <div className="flex items-center gap-4 mb-3">
                <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Award className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-sm">15+ Anos</p>
                  <p className="text-xs text-muted-foreground">
                    {lang === "pt" ? "de Experiência" : "of Experience"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="inline-block text-sm font-medium text-accent uppercase tracking-wider mb-4">
              {t.badge}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {t.title}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {t.description}
            </p>

            {/* Quote */}
            <blockquote className="border-l-4 border-accent pl-6 py-2 mb-8">
              <p className="text-foreground italic text-lg">
                {t.quote}
              </p>
              <footer className="mt-2 text-sm text-muted-foreground">
                — Dr. Celso Sakuraba
              </footer>
            </blockquote>

            {/* Credentials */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {t.credentials.map((credential, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-sm text-foreground">{credential}</span>
                </div>
              ))}
            </div>

            <Link to="/sobre">
              <Button size="lg">
                {t.cta}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
