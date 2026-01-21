import { ArrowRight, Plane, Home, Building2, FileCheck, Heart, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ServicesSectionProps {
  lang?: "pt" | "en";
}

const translations = {
  pt: {
    badge: "Áreas de Atuação",
    title: "Como Podemos Ajudar Você?",
    subtitle: "Seja começando sua jornada no Canadá ou já vivendo aqui, temos a expertise para guiar você.",
    learnMore: "Saiba Mais",
    services: [
      {
        icon: Heart,
        title: "Família & Divórcio",
        description: "Separação, guarda de filhos, pensão e questões transnacionais Brasil-Canadá.",
        href: "/familia",
        featured: true,
      },
      {
        icon: Home,
        title: "Imóveis & Transações",
        description: "Compra e venda de imóveis, closing costs e proteção do seu investimento.",
        href: "/familia",
        featured: true,
      },
      {
        icon: Building2,
        title: "Empresas & Corporativo",
        description: "Abertura de empresas, compliance, contratos comerciais e M&A.",
        href: "/empresas",
        featured: true,
      },
      {
        icon: FileCheck,
        title: "Testamentos & Herança",
        description: "Planejamento sucessório com ativos em ambos os países.",
        href: "/familia",
        featured: false,
      },
      {
        icon: Scale,
        title: "Direito Civil",
        description: "Contratos, disputas e resolução de conflitos no sistema canadense.",
        href: "/familia",
        featured: false,
      },
      {
        icon: Plane,
        title: "Imigração",
        description: "Vistos de trabalho, Express Entry, LMIA, reagrupamento familiar e muito mais.",
        href: "/imigracao",
        highlighted: true,
      },
    ],
  },
  en: {
    badge: "Practice Areas",
    title: "How Can We Help You?",
    subtitle: "Whether starting your journey to Canada or already living here, we have the expertise to guide you.",
    learnMore: "Learn More",
    services: [
      {
        icon: Heart,
        title: "Family & Divorce",
        description: "Separation, child custody, support and cross-border matters.",
        href: "/familia",
        featured: true,
      },
      {
        icon: Home,
        title: "Real Estate",
        description: "Buying and selling properties, closing costs and protecting your investment.",
        href: "/familia",
        featured: true,
      },
      {
        icon: Building2,
        title: "Business & Corporate",
        description: "Company incorporation, compliance, commercial contracts and M&A.",
        href: "/empresas",
        featured: true,
      },
      {
        icon: FileCheck,
        title: "Wills & Estate",
        description: "Estate planning with assets in both countries.",
        href: "/familia",
        featured: false,
      },
      {
        icon: Scale,
        title: "Civil Law",
        description: "Contracts, disputes and conflict resolution in the Canadian system.",
        href: "/familia",
        featured: false,
      },
      {
        icon: Plane,
        title: "Immigration",
        description: "Work permits, Express Entry, LMIA, family reunification and more.",
        href: "/imigracao",
        highlighted: true,
      },
    ],
  },
};

export function ServicesSection({ lang = "pt" }: ServicesSectionProps) {
  const t = translations[lang];

  return (
    <section className="py-20 md:py-28 bg-secondary">
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.services.map((service, index) => {
            const isHighlighted = 'highlighted' in service && service.highlighted;
            const isFeatured = 'featured' in service && service.featured;
            
            return (
              <Card
                key={index}
                className={cn(
                  "group transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
                  isHighlighted && "border-accent bg-accent/10 ring-1 ring-accent/30",
                  isFeatured && !isHighlighted && "border-primary/30 bg-primary/5"
                )}
              >
                <CardHeader>
                  <div
                    className={cn(
                      "h-12 w-12 rounded-lg flex items-center justify-center mb-4 transition-colors",
                      isHighlighted
                        ? "bg-accent text-accent-foreground"
                        : isFeatured
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                    )}
                  >
                    <service.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to={service.href}>
                    <Button variant="link" className="p-0 h-auto group/btn">
                      {t.learnMore}
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
