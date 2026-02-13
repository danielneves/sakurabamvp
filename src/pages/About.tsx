import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { CheckCircle2, Linkedin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import lawyerImage from "@/assets/lawyer-celso.jpg";
import lawyerMariana from "@/assets/lawyer-mariana.jpg";
import lawyerRobert from "@/assets/lawyer-robert.jpg";

const defaultImages = [lawyerImage, lawyerMariana, lawyerRobert];

const AboutPage = () => {
  const [lang, setLang] = useState<"pt" | "en">("pt");
  const { data: teamFromDB } = useTeamMembers();

  const translations = {
    pt: {
      badge: "Sobre Nós",
      title: "A Ponte Jurídica Entre",
      titleHighlight: "Dois Mundos",
      subtitle: "Conheça a história por trás do Sakuraba Law e nossa missão de servir a comunidade brasileira no Canadá.",
      celsoTitle: "Dr. Celso Sakuraba",
      celsoRole: "Advogado Fundador",
      celsoBio1: "Dr. Celso Sakuraba é advogado licenciado no Brasil e no Canadá, com mais de 15 anos de experiência ajudando famílias brasileiras a navegar o sistema jurídico canadense.",
      celsoBio2: "Nascido no Brasil, Celso viveu pessoalmente a experiência de imigrar para o Canadá. Essa jornada o motivou a dedicar sua carreira a ajudar outros brasileiros que buscam construir uma nova vida no país.",
      quote: "Sei exatamente como é navegar dois sistemas jurídicos enquanto constrói uma vida nova. É por isso que faço o que faço.",
      credentialsTitle: "Formação & Credenciais",
      credentials: [
        "Membro da Law Society of Ontario",
        "Inscrito na OAB/Brasil",
        "Mestrado em Direito - Universidade de Toronto",
        "Doutorado em Direito Internacional",
        "Especialista em Direito Transnacional",
        "Fluente em Português, Inglês e Espanhol",
      ],
      missionTitle: "Nossa Missão",
      missionText: "Servir como a ponte jurídica e cultural entre Brasil e Canadá, oferecendo assessoria jurídica de excelência com a empatia de quem entende a jornada do imigrante.",
      teamTitle: "Nossa Equipe",
      teamSubtitle: "Profissionais dedicados a servir a comunidade brasileira no Canadá.",
    },
    en: {
      badge: "About Us",
      title: "The Legal Bridge Between",
      titleHighlight: "Two Worlds",
      subtitle: "Learn about the story behind Sakuraba Law and our mission to serve the Brazilian community in Canada.",
      celsoTitle: "Dr. Celso Sakuraba",
      celsoRole: "Founding Lawyer",
      celsoBio1: "Dr. Celso Sakuraba is a licensed lawyer in both Brazil and Canada, with over 15 years of experience helping Brazilian families navigate the Canadian legal system.",
      celsoBio2: "Born in Brazil, Celso personally experienced the journey of immigrating to Canada. This journey motivated him to dedicate his career to helping other Brazilians seeking to build a new life in the country.",
      quote: "I know exactly what it's like to navigate two legal systems while building a new life. That's why I do what I do.",
      credentialsTitle: "Education & Credentials",
      credentials: [
        "Member of the Law Society of Ontario",
        "Registered with OAB/Brazil",
        "Master's Degree - University of Toronto",
        "PhD in International Law",
        "Specialist in Transnational Law",
        "Fluent in Portuguese, English and Spanish",
      ],
      missionTitle: "Our Mission",
      missionText: "To serve as the legal and cultural bridge between Brazil and Canada, offering excellent legal advice with the empathy of someone who understands the immigrant journey.",
      teamTitle: "Our Team",
      teamSubtitle: "Professionals dedicated to serving the Brazilian community in Canada.",
    },
  };

  const t = translations[lang];

  const teamMembers = (teamFromDB ?? []).map((m, idx) => ({
    name: m.name,
    role: lang === "pt" ? m.role_pt : m.role_en,
    specialty: lang === "pt" ? m.specialty_pt : m.specialty_en,
    image_url: m.image_url || defaultImages[idx % defaultImages.length],
  }));

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
              <p className="text-lg text-primary-foreground/90 leading-relaxed">
                {t.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* About Content */}
        <section className="py-20">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Image */}
              <div>
                <div className="aspect-[4/5] rounded-lg overflow-hidden shadow-xl sticky top-24">
                  <img
                    src={lawyerImage}
                    alt="Dr. Celso Sakuraba"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div>
                <h2 className="text-3xl font-bold mb-2">{t.celsoTitle}</h2>
                <p className="text-accent font-medium mb-6">{t.celsoRole}</p>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {t.celsoBio1}
                </p>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {t.celsoBio2}
                </p>

                <blockquote className="border-l-4 border-accent pl-6 py-2 mb-8">
                  <p className="text-foreground italic text-lg">
                    "{t.quote}"
                  </p>
                </blockquote>

                <h3 className="text-xl font-bold mb-4">{t.credentialsTitle}</h3>
                <div className="grid gap-3 mb-8">
                  {t.credentials.map((credential, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">{credential}</span>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-bold mb-4">{t.missionTitle}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t.missionText}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-secondary">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t.teamTitle}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {t.teamSubtitle}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, idx) => (
                <Card key={idx} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-primary/10 flex items-center justify-center mb-4">
                      {member.image_url ? (
                        <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-3xl font-serif text-primary">
                          {member.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-sm rounded-full">
                      {member.specialty}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
      <WhatsAppButton />
    </div>
  );
};

export default AboutPage;
