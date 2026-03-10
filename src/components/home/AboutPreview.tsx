import { Award, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useCallback } from "react";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import { useSiteContent } from "@/hooks/useSiteContent";
import lawyerCelso from "@/assets/lawyer-celso.jpg";
import lawyerMariana from "@/assets/lawyer-mariana.jpg";
import lawyerRobert from "@/assets/lawyer-robert.jpg";

interface AboutPreviewProps {
  lang?: "pt" | "en";
}

const defaultImages = [lawyerCelso, lawyerMariana, lawyerRobert];

const fallback = {
  pt: { badge: "Quem Somos", title: "Conheça Nossa Equipe", subtitle: "Advogados especializados que entendem sua jornada", cta: "Conheça a Equipe Completa" },
  en: { badge: "Who We Are", title: "Meet Our Team", subtitle: "Specialized lawyers who understand your journey", cta: "Meet the Full Team" },
};

export function AboutPreview({ lang = "pt" }: AboutPreviewProps) {
  const { data: members } = useTeamMembers(true);
  const { data: content } = useSiteContent();
  const fb = fallback[lang];
  const c = (key: string, fb: string) => content?.[key]?.[lang] ?? fb;

  const team = members ?? [];
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(team.length - 1, 0) : prev - 1));
  }, [team.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === team.length - 1 ? 0 : prev + 1));
  }, [team.length]);

  if (!team.length) return null;

  const member = team[currentIndex];
  const image = member?.image_url || defaultImages[currentIndex % defaultImages.length];
  const role = lang === "pt" ? member.role_pt : member.role_en;
  const specialty = lang === "pt" ? member.specialty_pt : member.specialty_en;
  const quote = lang === "pt" ? member.quote_pt : member.quote_en;

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-medium text-accent uppercase tracking-wider mb-4">{c("about_badge", fb.badge)}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{c("about_title", fb.title)}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{c("about_subtitle", fb.subtitle)}</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-lg overflow-hidden shadow-xl">
                <img src={image} alt={member.name} className="w-full h-full object-cover transition-opacity duration-300" />
              </div>
              <div className="absolute -bottom-6 -right-6 md:bottom-8 md:-right-8 bg-card p-4 md:p-6 rounded-lg shadow-xl border border-border">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Award className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{member.experience}</p>
                    <p className="text-xs text-muted-foreground">{lang === "pt" ? "de Experiência" : "of Experience"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-2"><span className="text-sm font-medium text-accent">{specialty}</span></div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{member.name}</h3>
              <p className="text-muted-foreground mb-6">{role}</p>
              <blockquote className="border-l-4 border-accent pl-6 py-2 mb-8">
                <p className="text-foreground italic text-lg">"{quote}"</p>
              </blockquote>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex gap-2">
                  {team.map((_, idx) => (
                    <button key={idx} onClick={() => setCurrentIndex(idx)} className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentIndex ? "bg-accent w-8" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"}`} aria-label={`Go to team member ${idx + 1}`} />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" onClick={goToPrevious} className="rounded-full"><ChevronLeft className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon" onClick={goToNext} className="rounded-full"><ChevronRight className="h-4 w-4" /></Button>
                <Link to="/sobre" className="ml-auto">
                  <Button size="lg">{lang === "pt" ? "Conheça a Equipe Completa" : "Meet the Full Team"}</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
