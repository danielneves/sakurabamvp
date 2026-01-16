import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Calendar, Clock, ArrowRight, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const translations = {
  pt: {
    title: "Blog Jurídico",
    subtitle: "Conteúdo especializado para ajudar você a entender seus direitos",
    search: "Buscar artigos...",
    all: "Todos",
    immigration: "Imigração",
    family: "Família",
    business: "Empresas",
    readMore: "Ler Artigo",
    minRead: "min de leitura",
    posts: [
      {
        category: "Imigração",
        categoryColor: "bg-blue-100 text-blue-800",
        title: "Engenheiro no Brasil x P.Eng no Canadá: O Guia Completo",
        excerpt: "Entenda o processo de validação profissional e os requisitos para atuar como engenheiro licenciado no Canadá.",
        date: "15 Jan 2025",
        readTime: 12,
        link: "/imigracao",
        persona: "lucas",
      },
      {
        category: "Família",
        categoryColor: "bg-rose-100 text-rose-800",
        title: "Me separei no Canadá: Posso voltar ao Brasil com os filhos?",
        excerpt: "Orientações essenciais sobre guarda internacional e os direitos dos pais em casos de separação.",
        date: "10 Jan 2025",
        readTime: 8,
        link: "/familia",
        persona: "mariana",
      },
      {
        category: "Imigração",
        categoryColor: "bg-blue-100 text-blue-800",
        title: "União Estável vs. Common-Law: Diferenças Jurídicas",
        excerpt: "Como a legislação canadense reconhece relacionamentos e quais são as implicações para imigração.",
        date: "5 Jan 2025",
        readTime: 10,
        link: "/imigracao",
        persona: "lucas",
      },
      {
        category: "Família",
        categoryColor: "bg-rose-100 text-rose-800",
        title: "Testamento e Herança: Como proteger bens no Brasil e Canadá",
        excerpt: "Guia prático sobre planejamento sucessório para brasileiros que possuem bens nos dois países.",
        date: "28 Dez 2024",
        readTime: 15,
        link: "/familia",
        persona: "mariana",
      },
      {
        category: "Empresas",
        categoryColor: "bg-amber-100 text-amber-800",
        title: "Abrindo uma Empresa no Canadá: Guia para Brasileiros",
        excerpt: "Passo a passo para brasileiros que desejam empreender no Canadá, desde a incorporação até o compliance.",
        date: "20 Dez 2024",
        readTime: 14,
        link: "/empresas",
        persona: "robert",
      },
      {
        category: "Imigração",
        categoryColor: "bg-blue-100 text-blue-800",
        title: "O Fantasma do Misrepresentation: Fraude vs. Erro Honesto",
        excerpt: "Como evitar problemas com IRCC e entender a diferença entre erro e má-fé no processo imigratório.",
        date: "15 Dez 2024",
        readTime: 11,
        link: "/imigracao",
        persona: "lucas",
      },
    ],
  },
  en: {
    title: "Legal Blog",
    subtitle: "Expert content to help you understand your rights",
    search: "Search articles...",
    all: "All",
    immigration: "Immigration",
    family: "Family",
    business: "Business",
    readMore: "Read Article",
    minRead: "min read",
    posts: [
      {
        category: "Immigration",
        categoryColor: "bg-blue-100 text-blue-800",
        title: "Engineer in Brazil vs P.Eng in Canada: Complete Guide",
        excerpt: "Understand the professional validation process and requirements to work as a licensed engineer in Canada.",
        date: "Jan 15, 2025",
        readTime: 12,
        link: "/imigracao",
        persona: "lucas",
      },
      {
        category: "Family",
        categoryColor: "bg-rose-100 text-rose-800",
        title: "Separated in Canada: Can I Return to Brazil with My Kids?",
        excerpt: "Essential guidance on international custody and parental rights in separation cases.",
        date: "Jan 10, 2025",
        readTime: 8,
        link: "/familia",
        persona: "mariana",
      },
      {
        category: "Immigration",
        categoryColor: "bg-blue-100 text-blue-800",
        title: "Common-Law Relationships: Legal Differences Explained",
        excerpt: "How Canadian law recognizes relationships and the implications for immigration.",
        date: "Jan 5, 2025",
        readTime: 10,
        link: "/imigracao",
        persona: "lucas",
      },
      {
        category: "Family",
        categoryColor: "bg-rose-100 text-rose-800",
        title: "Wills and Estates: Protecting Assets in Brazil and Canada",
        excerpt: "Practical guide on estate planning for Brazilians with assets in both countries.",
        date: "Dec 28, 2024",
        readTime: 15,
        link: "/familia",
        persona: "mariana",
      },
      {
        category: "Business",
        categoryColor: "bg-amber-100 text-amber-800",
        title: "Starting a Business in Canada: Guide for Brazilians",
        excerpt: "Step-by-step guide for Brazilians who want to start a business in Canada, from incorporation to compliance.",
        date: "Dec 20, 2024",
        readTime: 14,
        link: "/empresas",
        persona: "robert",
      },
      {
        category: "Immigration",
        categoryColor: "bg-blue-100 text-blue-800",
        title: "The Misrepresentation Issue: Fraud vs. Honest Mistake",
        excerpt: "How to avoid problems with IRCC and understand the difference between error and bad faith.",
        date: "Dec 15, 2024",
        readTime: 11,
        link: "/imigracao",
        persona: "lucas",
      },
    ],
  },
};

const BlogPage = () => {
  const [lang, setLang] = useState<"pt" | "en">("pt");
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const t = translations[lang];

  const filteredPosts = t.posts.filter(post => {
    const matchesFilter = filter === "all" || post.category.toLowerCase().includes(filter.toLowerCase());
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const categories = [
    { key: "all", label: t.all },
    { key: "imigra", label: t.immigration },
    { key: "famíl", label: t.family },
    { key: "empres", label: t.business },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={lang} onLanguageChange={setLang} />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="gradient-navy text-primary-foreground py-16 md:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                {t.title}
              </h1>
              <p className="text-lg text-primary-foreground/90">
                {t.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b border-border">
          <div className="container">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder={t.search}
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Category Filters */}
              <div className="flex gap-2 flex-wrap justify-center">
                {categories.map(cat => (
                  <Button
                    key={cat.key}
                    variant={filter === cat.key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter(cat.key)}
                  >
                    {cat.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="py-12">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, idx) => (
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
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime} {t.minRead}
                      </span>
                    </div>
                    <Link to={post.link}>
                      <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        {t.readMore}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
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

export default BlogPage;
