import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Building2, FileCheck, Users, Globe, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const BusinessPage = () => {
  const [lang] = useState<"pt" | "en">("en");

  const services = [
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
  ];

  const benefits = [
    "Plain-language legal advice",
    "Direct communication with your lawyer",
    "Fixed-fee structures available",
    "Digital-first document management",
    "Bilingual service (EN/PT)",
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
                Business Services
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                Legal Solutions for <span className="text-accent">Growing Businesses</span>
              </h1>
              <p className="text-lg text-primary-foreground/90 mb-8 leading-relaxed">
                Efficient, results-driven legal services for entrepreneurs and corporations doing business in Canada.
              </p>
              <Link to="/contato">
                <Button size="lg" variant="accent">
                  Schedule Consultation
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 bg-secondary">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
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

        {/* Why Choose Us */}
        <section className="py-20">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Why Businesses Choose Us</h2>
                <p className="text-muted-foreground text-lg mb-8">
                  We combine legal expertise with a practical business mindset, delivering solutions that work for your bottom line.
                </p>
                <ul className="space-y-4">
                  {benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-secondary rounded-lg p-8">
                <h3 className="text-xl font-bold mb-4">Ready to Get Started?</h3>
                <p className="text-muted-foreground mb-6">
                  Book a consultation to discuss your business needs.
                </p>
                <Link to="/contato">
                  <Button size="lg" className="w-full">Book Consultation</Button>
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
