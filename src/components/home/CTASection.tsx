import { Phone, Calendar, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface CTASectionProps {
  lang?: "pt" | "en";
}

const translations = {
  pt: {
    title: "Pronto para Dar o Próximo Passo?",
    subtitle: "Agende uma orientação inicial gratuita e descubra como podemos ajudar com sua jornada jurídica.",
    cta1: "Agendar Orientação",
    cta2: "Fale pelo WhatsApp",
    or: "ou",
  },
  en: {
    title: "Ready to Take the Next Step?",
    subtitle: "Schedule a free initial consultation and discover how we can help with your legal journey.",
    cta1: "Schedule Consultation",
    cta2: "Chat on WhatsApp",
    or: "or",
  },
};

export function CTASection({ lang = "pt" }: CTASectionProps) {
  const t = translations[lang];

  return (
    <section className="py-20 md:py-28 gradient-navy text-primary-foreground">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {t.title}
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10">
            {t.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contato">
              <Button size="lg" variant="accent" className="w-full sm:w-auto">
                <Calendar className="h-5 w-5 mr-2" />
                {t.cta1}
              </Button>
            </Link>
            <span className="text-primary-foreground/60 text-sm hidden sm:block">
              {t.or}
            </span>
            <a
              href="https://wa.me/14161234567?text=Olá! Gostaria de uma orientação inicial."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                {t.cta2}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
