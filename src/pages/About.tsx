import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Award, BookOpen, GraduationCap, Globe, CheckCircle2 } from "lucide-react";
import lawyerImage from "@/assets/lawyer-celso.jpg";

const AboutPage = () => {
  const [lang] = useState<"pt" | "en">("pt");

  const credentials = [
    "Membro da Law Society of Ontario",
    "Inscrito na OAB/Brasil",
    "Mestrado em Direito - Universidade de Toronto",
    "Doutorado em Direito Internacional",
    "Especialista em Direito Transnacional",
    "Fluente em Português, Inglês e Espanhol",
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
                Sobre Nós
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                A Ponte Jurídica Entre <span className="text-accent">Dois Mundos</span>
              </h1>
              <p className="text-lg text-primary-foreground/90 leading-relaxed">
                Conheça a história por trás do Sakuraba Law e nossa missão de servir a comunidade brasileira no Canadá.
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
                <h2 className="text-3xl font-bold mb-6">Dr. Celso Sakuraba</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Dr. Celso Sakuraba é advogado licenciado no Brasil e no Canadá, com mais de 15 anos de experiência ajudando famílias brasileiras a navegar o sistema jurídico canadense.
                </p>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Nascido no Brasil, Celso viveu pessoalmente a experiência de imigrar para o Canadá. Essa jornada o motivou a dedicar sua carreira a ajudar outros brasileiros que buscam construir uma nova vida no país.
                </p>

                <blockquote className="border-l-4 border-accent pl-6 py-2 mb-8">
                  <p className="text-foreground italic text-lg">
                    "Sei exatamente como é navegar dois sistemas jurídicos enquanto constrói uma vida nova. É por isso que faço o que faço."
                  </p>
                </blockquote>

                <h3 className="text-xl font-bold mb-4">Formação & Credenciais</h3>
                <div className="grid gap-3 mb-8">
                  {credentials.map((credential, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">{credential}</span>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-bold mb-4">Nossa Missão</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Servir como a ponte jurídica e cultural entre Brasil e Canadá, oferecendo assessoria jurídica de excelência com a empatia de quem entende a jornada do imigrante.
                </p>
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

export default AboutPage;
