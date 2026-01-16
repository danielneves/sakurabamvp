import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

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
    freeConsult: "Orientação Inicial",
  },
  en: {
    immigration: "Immigration",
    family: "Family & Civil",
    business: "Business",
    about: "About Us",
    contact: "Contact",
    freeConsult: "Free Consultation",
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
    { href: "/contato", label: t.contact },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 md:h-20 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="font-serif text-xl md:text-2xl font-bold text-primary tracking-tight">
              Sakuraba Law
            </span>
            <span className="text-[10px] md:text-xs text-muted-foreground tracking-widest uppercase">
              {lang === "pt" ? "Brasil · Canadá" : "Brazil · Canada"}
            </span>
          </div>
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
        <div className="flex items-center gap-2 md:gap-4">
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1.5">
                <Globe className="h-4 w-4" />
                <span className="uppercase text-xs font-medium">{lang}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onLanguageChange?.("pt")}>
                🇧🇷 Português
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onLanguageChange?.("en")}>
                🇨🇦 English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* CTA Button - Desktop */}
          <Button className="hidden md:inline-flex" size="sm">
            <Phone className="h-4 w-4 mr-2" />
            {t.freeConsult}
          </Button>

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
            <Button className="mt-4 w-full" size="lg">
              <Phone className="h-4 w-4 mr-2" />
              {t.freeConsult}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
