import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import blogImmigration from "@/assets/blog-immigration.jpg";
import blogFamily from "@/assets/blog-family.jpg";
import blogDivorce from "@/assets/blog-divorce.jpg";

interface BlogPreviewProps {
  lang?: "pt" | "en";
}

const blogImages = [blogImmigration, blogFamily, blogDivorce];

const translations = {
  pt: {
    badge: "Blog Jurídico",
    title: "Artigos e Orientações",
    subtitle: "Conteúdo especializado para ajudar você a entender seus direitos e tomar decisões informadas.",
    viewAll: "Ver Todos os Artigos",
    readMore: "Ler Mais",
    minRead: "min",
    posts: [
      {
        category: "Imigração",
        title: "Engenheiro no Brasil x P.Eng no Canadá: O Guia Completo",
        excerpt: "Entenda o processo de validação profissional e os requisitos para atuar como engenheiro no Canadá.",
        readTime: 12,
        link: "/blog/engenheiro-brasil-canada",
      },
      {
        category: "Família",
        title: "Me separei no Canadá: Posso voltar ao Brasil com os filhos?",
        excerpt: "Orientações essenciais sobre guarda internacional e os direitos dos pais em casos de separação.",
        readTime: 8,
        link: "/blog/separacao-canada-filhos",
      },
      {
        category: "Imigração",
        title: "União Estável vs. Common-Law: Diferenças Jurídicas",
        excerpt: "Como a legislação canadense reconhece relacionamentos e quais são as implicações para imigração.",
        readTime: 10,
        link: "/blog/uniao-estavel-common-law",
      },
    ],
  },
  en: {
    badge: "Legal Blog",
    title: "Articles & Guidance",
    subtitle: "Expert content to help you understand your rights and make informed decisions.",
    viewAll: "View All Articles",
    readMore: "Read More",
    minRead: "min",
    posts: [
      {
        category: "Immigration",
        title: "Engineer in Brazil vs P.Eng in Canada: Complete Guide",
        excerpt: "Understand the professional validation process and requirements to work as an engineer in Canada.",
        readTime: 12,
        link: "/blog/engineer-brazil-canada",
      },
      {
        category: "Family",
        title: "Separated in Canada: Can I Return to Brazil with My Kids?",
        excerpt: "Essential guidance on international custody and parental rights in separation cases.",
        readTime: 8,
        link: "/blog/separation-canada-children",
      },
      {
        category: "Immigration",
        title: "Common-Law Relationships: Legal Differences Explained",
        excerpt: "How Canadian law recognizes relationships and the implications for immigration.",
        readTime: 10,
        link: "/blog/common-law-relationships",
      },
    ],
  },
};

const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case "imigração":
    case "immigration":
      return "bg-accent text-accent-foreground";
    case "família":
    case "family":
      return "bg-destructive/10 text-destructive";
    default:
      return "bg-primary/10 text-primary";
  }
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
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={blogImages[idx]}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className={`absolute top-3 left-3 ${getCategoryColor(post.category)}`}>
                  {post.category}
                </Badge>
              </div>

              <CardContent className="p-5">
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    <Clock className="h-3 w-3" />
                    {post.readTime} {t.minRead}
                  </span>
                  <Link to={post.link} className="inline-flex items-center text-sm text-primary font-medium hover:underline">
                    {t.readMore}
                    <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Link>
                </div>
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