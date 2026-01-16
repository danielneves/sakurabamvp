import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TestimonialsSectionProps {
  lang?: "pt" | "en";
}

const translations = {
  pt: {
    badge: "Depoimentos",
    title: "O Que Nossos Clientes Dizem",
    subtitle: "Histórias reais de famílias que confiaram em nós para suas jornadas jurídicas.",
    testimonials: [
      {
        name: "Patricia M.",
        location: "São Paulo → Toronto",
        text: "Estava paralisada com medo de ter o visto negado. Dr. Celso me mostrou exatamente onde estavam os riscos e como mitigá-los. Aprovado na primeira tentativa!",
        service: "Express Entry",
      },
      {
        name: "Ricardo & Ana",
        location: "Toronto, ON",
        text: "O divórcio já era difícil, mas ter que lidar com leis do Brasil e do Canadá ao mesmo tempo parecia impossível. A equipe foi humana e eficiente.",
        service: "Direito de Família",
      },
      {
        name: "Fernando S.",
        location: "Belo Horizonte → Vancouver",
        text: "Como engenheiro, eu queria entender cada detalhe do processo. Eles me explicaram tudo em termos técnicos que eu pudesse validar. Confiança total.",
        service: "LMIA + Work Permit",
      },
    ],
  },
  en: {
    badge: "Testimonials",
    title: "What Our Clients Say",
    subtitle: "Real stories from families who trusted us with their legal journeys.",
    testimonials: [
      {
        name: "Patricia M.",
        location: "São Paulo → Toronto",
        text: "I was paralyzed with fear of having my visa denied. Dr. Celso showed me exactly where the risks were and how to mitigate them. Approved on the first try!",
        service: "Express Entry",
      },
      {
        name: "Ricardo & Ana",
        location: "Toronto, ON",
        text: "The divorce was already hard, but having to deal with Brazilian and Canadian laws at the same time seemed impossible. The team was humane and efficient.",
        service: "Family Law",
      },
      {
        name: "Fernando S.",
        location: "Belo Horizonte → Vancouver",
        text: "As an engineer, I wanted to understand every detail of the process. They explained everything in technical terms I could validate. Complete trust.",
        service: "LMIA + Work Permit",
      },
    ],
  },
};

export function TestimonialsSection({ lang = "pt" }: TestimonialsSectionProps) {
  const t = translations[lang];

  return (
    <section className="py-20 md:py-28 bg-warm-muted">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-sm font-medium text-accent uppercase tracking-wider mb-4">
            {t.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.title}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t.subtitle}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card">
              <CardContent className="pt-6">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-accent text-accent"
                    />
                  ))}
                </div>

                {/* Quote */}
                <div className="relative mb-6">
                  <Quote className="absolute -top-2 -left-2 h-8 w-8 text-accent/20" />
                  <p className="text-foreground leading-relaxed pl-4">
                    "{testimonial.text}"
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.location}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
                    {testimonial.service}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
