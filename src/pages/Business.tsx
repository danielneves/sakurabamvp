import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Building2, FileCheck, Users, Globe, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const translations = {
  pt: {
    badge: "Serviços Empresariais",
    title: "Soluções Jurídicas para",
    titleHighlight: "Empresas em Crescimento",
    subtitle: "Serviços jurídicos eficientes e orientados a resultados para empreendedores e corporações que operam no Canadá.",
    cta: "Agendar Consultoria",
    servicesTitle: "Nossos Serviços",
    services: [
      {
        icon: Building2,
        title: "Incorporação de Empresas",
        description: "Estruture sua empresa canadense com a estrutura e conformidade adequadas.",
      },
      {
        icon: FileCheck,
        title: "Contratos Comerciais",
        description: "Elaboração e revisão de contratos que protegem seus interesses comerciais.",
      },
      {
        icon: Users,
        title: "Direito Trabalhista",
        description: "Navegue pelas leis trabalhistas canadenses e contratos de trabalho.",
      },
      {
        icon: Globe,
        title: "Transações Internacionais",
        description: "Facilite operações comerciais entre Brasil e Canadá.",
      },
    ],
    whyTitle: "Por Que Empresas Nos Escolhem",
    whySubtitle: "Combinamos expertise jurídica com uma mentalidade prática de negócios, entregando soluções que funcionam para sua empresa.",
    benefits: [
      "Assessoria jurídica em linguagem clara",
      "Comunicação direta com seu advogado",
      "Estruturas de honorários fixos disponíveis",
      "Gestão de documentos digital",
      "Serviço bilíngue (PT/EN)",
    ],
    readyTitle: "Pronto para Começar?",
    readySubtitle: "Agende uma consultoria para discutir as necessidades da sua empresa.",
    bookConsult: "Agendar Consultoria",
  },
  en: {
    badge: "Business Services",
    title: "Legal Solutions for",
    titleHighlight: "Growing Businesses",
    subtitle: "Efficient, results-driven legal services for entrepreneurs and corporations doing business in Canada.",
    cta: "Schedule Consultation",
    servicesTitle: "Our Services",
    services: [
      {
        icon: Building2,
        title: "Business Incorporation",
        description: "Set up your Canadian corporation with proper structure and compliance.",
      },
      {
        icon: FileCheck,
        title: "Commercial Contracts",
        description: "Draft and review agreements that protect your business interests.",
      },
      {
        icon: Users,
        title: "Employment Law",
        description: "Navigate Canadian labour laws and employment agreements.",
      },
      {
        icon: Globe,
        title: "Cross-Border Transactions",
        description: "Facilitate business operations between Brazil and Canada.",
      },
    ],
    whyTitle: "Why Businesses Choose Us",
    whySubtitle: "We combine legal expertise with a practical business mindset, delivering solutions that work for your bottom line.",
    benefits: [
      "Plain-language legal advice",
      "Direct communication with your lawyer",
      "Fixed-fee structures available",
      "Digital-first document management",
      "Bilingual service (EN/PT)",
    ],
    readyTitle: "Ready to Get Started?",
    readySubtitle: "Book a consultation to discuss your business needs.",
    bookConsult: "Book Consultation",
  },
};

const BusinessPage = () => {
  const [lang, setLang] = useState<"pt" | "en">("pt");
  const t = translations[lang];

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={lang} onLanguageChange={setLang} />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="gradient-navy text-primary-foreground py-20 md:py-28">
          <div className="container">
            <div className="max-w-3xl">
              <span className="inline-block text-sm font-medium text-accent uppercase tracking-wider mb-4">
                {t.badge}
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                {t.title} <span className="text-accent">{t.titleHighlight}</span>
              </h1>
              <p className="text-lg text-primary-foreground/90 mb-8 leading-relaxed">
                {t.subtitle}
              </p>
              <Link to="/contato">
                <Button size="lg" variant="accent">
                  {t.cta}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 bg-secondary">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">{t.servicesTitle}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.services.map((service, idx) => (
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

        {/* Why Choose Us */}
        <section className="py-20">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">{t.whyTitle}</h2>
                <p className="text-muted-foreground text-lg mb-8">
                  {t.whySubtitle}
                </p>
                <ul className="space-y-4">
                  {t.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-secondary rounded-lg p-8">
                <h3 className="text-xl font-bold mb-4">{t.readyTitle}</h3>
                <p className="text-muted-foreground mb-6">
                  {t.readySubtitle}
                </p>
                <Link to="/contato">
                  <Button size="lg" className="w-full">{t.bookConsult}</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </div>
  );
};

export default BusinessPage;
