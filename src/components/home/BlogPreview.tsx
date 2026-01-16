import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface BlogPreviewProps {
  lang?: "pt" | "en";
}

const translations = {
  pt: {
    badge: "Blog Jurídico",
    title: "Artigos e Orientações",
    subtitle: "Conteúdo especializado para ajudar você a entender seus direitos e tomar decisões informadas.",
    viewAll: "Ver Todos os Artigos",
    readMore: "Ler Mais",
    minRead: "min de leitura",
    posts: [
      {
        category: "Imigração",
        categoryColor: "bg-blue-100 text-blue-800",
        title: "Engenheiro no Brasil x P.Eng no Canadá: O Guia Completo",
        excerpt: "Entenda o processo de validação profissional e os requisitos para atuar como engenheiro no Canadá.",
        date: "15 Jan 2025",
        readTime: 12,
        link: "/blog/engenheiro-brasil-canada",
        persona: "lucas",
      },
      {
        category: "Família",
        categoryColor: "bg-rose-100 text-rose-800",
        title: "Me separei no Canadá: Posso voltar ao Brasil com os filhos?",
        excerpt: "Orientações essenciais sobre guarda internacional e os direitos dos pais em casos de separação.",
        date: "10 Jan 2025",
        readTime: 8,
        link: "/blog/separacao-canada-filhos",
        persona: "mariana",
      },
      {
        category: "Imigração",
        categoryColor: "bg-blue-100 text-blue-800",
        title: "União Estável vs. Common-Law: Diferenças Jurídicas",
        excerpt: "Como a legislação canadense reconhece relacionamentos e quais são as implicações para imigração.",
        date: "5 Jan 2025",
        readTime: 10,
        link: "/blog/uniao-estavel-common-law",
        persona: "lucas",
      },
    ],
  },
  en: {
    badge: "Legal Blog",
    title: "Articles & Guidance",
    subtitle: "Expert content to help you understand your rights and make informed decisions.",
    viewAll: "View All Articles",
    readMore: "Read More",
    minRead: "min read",
    posts: [
      {
        category: "Immigration",
        categoryColor: "bg-blue-100 text-blue-800",
        title: "Engineer in Brazil vs P.Eng in Canada: Complete Guide",
        excerpt: "Understand the professional validation process and requirements to work as an engineer in Canada.",
        date: "Jan 15, 2025",
        readTime: 12,
        link: "/blog/engineer-brazil-canada",
        persona: "lucas",
      },
      {
        category: "Family",
        categoryColor: "bg-rose-100 text-rose-800",
        title: "Separated in Canada: Can I Return to Brazil with My Kids?",
        excerpt: "Essential guidance on international custody and parental rights in separation cases.",
        date: "Jan 10, 2025",
        readTime: 8,
        link: "/blog/separation-canada-children",
        persona: "mariana",
      },
      {
        category: "Immigration",
        categoryColor: "bg-blue-100 text-blue-800",
        title: "Common-Law Relationships: Legal Differences Explained",
        excerpt: "How Canadian law recognizes relationships and the implications for immigration.",
        date: "Jan 5, 2025",
        readTime: 10,
        link: "/blog/common-law-relationships",
        persona: "lucas",
      },
    ],
  },
};

export function BlogPreview({ lang = "pt" }: BlogPreviewProps) {
  const t = translations[lang];

  return (
    <section className="py-20 bg-secondary">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            {t.badge}
          </Badge>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {t.posts.map((post, idx) => (
            <Card key={idx} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <CardHeader className="pb-3">
                <Badge className={post.categoryColor + " w-fit mb-2"}>
                  {post.category}
                </Badge>
                <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4 line-clamp-3">
                  {post.excerpt}
                </CardDescription>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readTime} {t.minRead}
                    </span>
                  </div>
                </div>
                <Link to={post.link} className="mt-4 inline-flex items-center text-primary font-medium hover:underline">
                  {t.readMore}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link to="/blog">
            <Button variant="outline" size="lg">
              {t.viewAll}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
