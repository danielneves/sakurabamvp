import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { BlogPreview } from "@/components/home/BlogPreview";
import { AboutPreview } from "@/components/home/AboutPreview";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  const [lang, setLang] = useState<"pt" | "en">("pt");

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={lang} onLanguageChange={setLang} />
      
      <main className="flex-1">
        <HeroSection lang={lang} />
        <ServicesSection lang={lang} />
        <BlogPreview lang={lang} />
        <AboutPreview lang={lang} />
        <TestimonialsSection lang={lang} />
        <CTASection lang={lang} />
      </main>

      <Footer lang={lang} />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
