import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Linkedin, Instagram } from "lucide-react";

interface FooterProps {
  lang?: "pt" | "en";
}

const translations = {
  pt: {
    tagline: "A ponte jurídica entre Brasil e Canadá",
    services: "Áreas de Atuação",
    immigration: "Imigração",
    family: "Família & Civil",
    business: "Empresas",
    about: "Sobre",
    aboutUs: "Sobre Nós",
    team: "Nossa Equipe",
    blog: "Blog & Artigos",
    contact: "Contato",
    schedule: "Agendar Consulta",
    address: "Toronto, ON, Canadá",
    rights: "Todos os direitos reservados.",
    disclaimer: "Este site é apenas informativo e não constitui aconselhamento jurídico.",
  },
  en: {
    tagline: "The legal bridge between Brazil and Canada",
    services: "Practice Areas",
    immigration: "Immigration",
    family: "Family & Civil",
    business: "Business",
    about: "About",
    aboutUs: "About Us",
    team: "Our Team",
    blog: "Blog & Articles",
    contact: "Contact",
    schedule: "Schedule Consultation",
    address: "Toronto, ON, Canada",
    rights: "All rights reserved.",
    disclaimer: "This website is informational only and does not constitute legal advice.",
  },
};

export function Footer({ lang = "pt" }: FooterProps) {
  const t = translations[lang];
  const year = new Date().getFullYear();

  return (
    <footer className="gradient-navy text-primary-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block">
              <span className="font-serif text-2xl font-bold">Sakuraba Law</span>
            </Link>
            <p className="mt-4 text-primary-foreground/80 text-sm leading-relaxed">
              {t.tagline}
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="font-sans font-semibold text-sm uppercase tracking-wider mb-4">
              {t.services}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/imigracao"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  {t.immigration}
                </Link>
              </li>
              <li>
                <Link
                  to="/familia"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  {t.family}
                </Link>
              </li>
              <li>
                <Link
                  to="/empresas"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  {t.business}
                </Link>
              </li>
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h4 className="font-sans font-semibold text-sm uppercase tracking-wider mb-4">
              {t.about}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/sobre"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  {t.aboutUs}
                </Link>
              </li>
              <li>
                <Link
                  to="/equipe"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  {t.team}
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  {t.blog}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-sans font-semibold text-sm uppercase tracking-wider mb-4">
              {t.contact}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="text-primary-foreground/80 text-sm">
                  {t.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a
                  href="tel:+14161234567"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  +1 (416) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a
                  href="mailto:contato@sakurabalaw.ca"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  contato@sakurabalaw.ca
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-xs text-center md:text-left">
              © {year} Sakuraba Law. {t.rights}
            </p>
            <p className="text-primary-foreground/60 text-xs text-center md:text-right max-w-md">
              {t.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
