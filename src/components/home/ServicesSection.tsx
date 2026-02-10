import { ArrowRight, Plane, Home, Building2, FileCheck, Heart, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useServices } from "@/hooks/useServices";
import { useSiteContent } from "@/hooks/useSiteContent";
import type { LucideIcon } from "lucide-react";

interface ServicesSectionProps {
  lang?: "pt" | "en";
}

const iconMap: Record<string, LucideIcon> = {
  Heart, Home, Building2, FileCheck, Scale, Plane,
};

const fallbackServices = {
  pt: { badge: "Áreas de Atuação", title: "Como Podemos Ajudar Você?", subtitle: "Seja começando sua jornada no Canadá ou já vivendo aqui, temos a expertise para guiar você.", learnMore: "Saiba Mais" },
  en: { badge: "Practice Areas", title: "How Can We Help You?", subtitle: "Whether starting your journey to Canada or already living here, we have the expertise to guide you.", learnMore: "Learn More" },
};

export function ServicesSection({ lang = "pt" }: ServicesSectionProps) {
  const { data: services } = useServices();
  const { data: content } = useSiteContent();
  const fb = fallbackServices[lang];

  const c = (key: string, fb: string) => content?.[key]?.[lang] ?? fb;
  const learnMore = lang === "pt" ? "Saiba Mais" : "Learn More";

  return (
    <section className="py-20 md:py-28 bg-secondary">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-sm font-medium text-accent uppercase tracking-wider mb-4">
            {c("services_badge", fb.badge)}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {c("services_title", fb.title)}
          </h2>
          <p className="text-muted-foreground text-lg">
            {c("services_subtitle", fb.subtitle)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services?.map((service) => {
            const Icon = iconMap[service.icon_name] || Scale;
            const title = lang === "pt" ? service.title_pt : service.title_en;
            const description = lang === "pt" ? service.description_pt : service.description_en;

            return (
              <Card
                key={service.id}
                className={cn(
                  "group transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
                  service.is_highlighted && "border-accent bg-accent/10 ring-1 ring-accent/30",
                  service.is_featured && !service.is_highlighted && "border-primary/30 bg-primary/5"
                )}
              >
                <CardHeader>
                  <div className={cn(
                    "h-12 w-12 rounded-lg flex items-center justify-center mb-4 transition-colors",
                    service.is_highlighted ? "bg-accent text-accent-foreground" :
                    service.is_featured ? "bg-primary text-primary-foreground" :
                    "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                  )}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to={service.href}>
                    <Button variant="link" className="p-0 h-auto group/btn">
                      {learnMore}
                      <ArrowRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
