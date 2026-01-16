import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import sakurabaLogo from "@/assets/sakuraba-logo.svg";

interface HeaderProps {
  lang?: "pt" | "en";
  onLanguageChange?: (lang: "pt" | "en") => void;
}

const translations = {
  pt: {
    immigration: "Imigração",
    family: "Família & Civil",
    business: "Empresas",
    about: "Sobre Nós",
    contact: "Contato",
    blog: "Blog",
    whatsapp: "Fale Conosco",
  },
  en: {
    immigration: "Immigration",
    family: "Family & Civil",
    business: "Business",
    about: "About Us",
    contact: "Contact",
    blog: "Blog",
    whatsapp: "Talk to Us",
  },
};

export function Header({ lang = "pt", onLanguageChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const t = translations[lang];

  const navLinks = [
    { href: "/imigracao", label: t.immigration },
    { href: "/familia", label: t.family },
    { href: "/empresas", label: t.business },
    { href: "/sobre", label: t.about },
    { href: "/blog", label: t.blog },
    { href: "/contato", label: t.contact },
  ];

  const isActive = (href: string) => location.pathname === href;

  const whatsappUrl = "https://wa.me/14165551234?text=" + encodeURIComponent(
    lang === "pt" 
      ? "Olá! Gostaria de agendar uma orientação inicial." 
      : "Hello! I would like to schedule an initial consultation."
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 md:h-20 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img 
            src={sakurabaLogo} 
            alt="Sakuraba Law" 
            className="h-10 md:h-12 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
                isActive(link.href)
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Language Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-lg" role="img" aria-label="Brazil">🇧🇷</span>
            <Switch
              checked={lang === "en"}
              onCheckedChange={(checked) => onLanguageChange?.(checked ? "en" : "pt")}
              className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-primary"
            />
            <span className="text-lg" role="img" aria-label="Canada">🇨🇦</span>
          </div>

          {/* WhatsApp CTA Button - Desktop */}
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <Button className="hidden md:inline-flex bg-[#25D366] hover:bg-[#128C7E] text-white" size="sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              {t.whatsapp}
            </Button>
          </a>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-4 py-3 text-base font-medium rounded-md transition-colors",
                  isActive(link.href)
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4"
            >
              <Button className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white" size="lg">
                <MessageCircle className="h-4 w-4 mr-2" />
                {t.whatsapp}
              </Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
