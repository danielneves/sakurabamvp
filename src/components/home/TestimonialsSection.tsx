import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useTestimonials } from "@/hooks/useTestimonials";
import { useSiteContent } from "@/hooks/useSiteContent";

interface TestimonialsSectionProps {
  lang?: "pt" | "en";
}

const fallback = {
  pt: { badge: "Depoimentos", title: "O Que Nossos Clientes Dizem", subtitle: "Histórias reais de famílias que confiaram em nós para suas jornadas jurídicas." },
  en: { badge: "Testimonials", title: "What Our Clients Say", subtitle: "Real stories from families who trusted us with their legal journeys." },
};

export function TestimonialsSection({ lang = "pt" }: TestimonialsSectionProps) {
  const { data: testimonials } = useTestimonials();
  const { data: content } = useSiteContent();
  const fb = fallback[lang];
  const c = (key: string, fb: string) => content?.[key]?.[lang] ?? fb;

  const items = testimonials ?? [];

  return (
    <section className="py-20 md:py-28 bg-warm-muted">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-sm font-medium text-accent uppercase tracking-wider mb-4">{c("testimonials_badge", fb.badge)}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{c("testimonials_title", fb.title)}</h2>
          <p className="text-muted-foreground text-lg">{c("testimonials_subtitle", fb.subtitle)}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((testimonial) => {
            const text = lang === "pt" ? testimonial.text_pt : testimonial.text_en;
            const service = lang === "pt" ? testimonial.service_pt : testimonial.service_en;

            return (
              <Card key={testimonial.id} className="bg-card">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <div className="relative mb-6">
                    <Quote className="absolute -top-2 -left-2 h-8 w-8 text-accent/20" />
                    <p className="text-foreground leading-relaxed pl-4">"{text}"</p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                    <span className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">{service}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
