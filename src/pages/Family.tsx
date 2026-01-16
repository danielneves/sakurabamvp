import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Heart, Home, FileText, Scale, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const FamilyPage = () => {
  const [lang] = useState<"pt" | "en">("pt");

  const services = [
    {
      icon: Heart,
      title: "Divórcio & Separação",
      description: "Orientação sensível para separações com aspectos binacionais Brasil-Canadá.",
    },
    {
      icon: Home,
      title: "Compra de Imóveis",
      description: "Proteção jurídica completa na aquisição do seu lar canadense.",
    },
    {
      icon: FileText,
      title: "Testamentos & Herança",
      description: "Planejamento sucessório considerando bens em ambos os países.",
    },
    {
      icon: Scale,
      title: "Direito Civil",
      description: "Contratos, disputas e resolução de conflitos no sistema canadense.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={lang} />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="gradient-navy text-primary-foreground py-20 md:py-28">
          <div className="container">
            <div className="max-w-3xl">
              <span className="inline-block text-sm font-medium text-accent uppercase tracking-wider mb-4">
                Família & Civil
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                Proteção Jurídica para Você e <span className="text-accent">Sua Família</span>
              </h1>
              <p className="text-lg text-primary-foreground/90 mb-8 leading-relaxed">
                Momentos delicados merecem um advogado que fala sua língua e entende sua cultura.
              </p>
              <Link to="/contato">
                <Button size="lg" variant="accent">
                  Fale Conosco
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 bg-secondary">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Áreas de Atuação</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {services.map((service, idx) => (
                <Card key={idx} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-accent/20 text-accent flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6" />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-warm-muted">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Precisa de Orientação?</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Estamos aqui para ajudar. Entre em contato para uma conversa inicial sem compromisso.
            </p>
            <Link to="/contato">
              <Button size="lg">Agendar Conversa</Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
      <WhatsAppButton />
    </div>
  );
};

export default FamilyPage;
