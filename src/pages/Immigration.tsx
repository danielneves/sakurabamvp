import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Plane, FileCheck, Users, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const ImmigrationPage = () => {
  const [lang, setLang] = useState<"pt" | "en">("pt");

  const services = [
    {
      icon: Plane,
      title: "Express Entry",
      description: "Sistema federal de imigração econômica para trabalhadores qualificados.",
    },
    {
      icon: FileCheck,
      title: "LMIA & Work Permits",
      description: "Autorização de trabalho com oferta de emprego de empresa canadense.",
    },
    {
      icon: Users,
      title: "Reagrupamento Familiar",
      description: "Sponsorship para cônjuges, filhos e pais de residentes permanentes.",
    },
    {
      icon: Clock,
      title: "Super Visa",
      description: "Visto de longa duração para pais e avós de canadenses.",
    },
  ];

  const steps = [
    "Avaliação inicial do seu perfil",
    "Análise de elegibilidade e estratégia",
    "Preparação e revisão de documentos",
    "Submissão e acompanhamento",
    "Aprovação e próximos passos",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={lang} onLanguageChange={setLang} />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="gradient-navy text-primary-foreground py-20 md:py-28">
          <div className="container">
            <div className="max-w-3xl">
              <span className="inline-block text-sm font-medium text-accent uppercase tracking-wider mb-4">
                Imigração para o Canadá
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                Realize Seu Sonho Canadense com <span className="text-accent">Segurança Jurídica</span>
              </h1>
              <p className="text-lg text-primary-foreground/90 mb-8 leading-relaxed">
                Navegue o sistema imigratório com quem entende cada detalhe técnico e já viveu essa jornada.
              </p>
              <Link to="/contato">
                <Button size="lg" variant="accent">
                  Agendar Avaliação Gratuita
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 bg-secondary">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Nossos Serviços de Imigração</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, idx) => (
                <Card key={idx} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6" />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-12">Como Funciona Nosso Processo</h2>
              <div className="space-y-4">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-4 text-left p-4 rounded-lg bg-secondary">
                    <div className="h-8 w-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </div>
                    <span className="text-foreground font-medium">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
      <WhatsAppButton />
    </div>
  );
};

export default ImmigrationPage;
