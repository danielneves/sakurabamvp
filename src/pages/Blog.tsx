import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Calendar, Clock, ArrowRight, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useBlogPosts } from "@/hooks/useBlogPosts";

const POSTS_PER_PAGE = 10;

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
    noPosts: "Nenhum artigo encontrado.",
    page: "Página",
    of: "de",
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
    noPosts: "No articles found.",
    page: "Page",
    of: "of",
  },
};

const getCategoryColor = (category: string) => {
  const lower = category.toLowerCase();
  if (lower.includes("imigra") || lower.includes("immigra")) return "bg-accent text-accent-foreground";
  if (lower.includes("famíl") || lower.includes("family")) return "bg-destructive/10 text-destructive";
  return "bg-primary/10 text-primary";
};

const BlogPage = () => {
  const [lang, setLang] = useState<"pt" | "en">("pt");
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const { data: posts, isLoading } = useBlogPosts();
  const t = translations[lang];

  const filteredPosts = (posts ?? []).filter((post: any) => {
    // Filter by language
    const postLang = post.lang ?? "both";
    if (postLang !== "both" && postLang !== lang) return false;

    const category = lang === "pt" ? post.category_pt : post.category_en;
    const title = lang === "pt" ? post.title_pt : post.title_en;
    const excerpt = lang === "pt" ? post.excerpt_pt : post.excerpt_en;
    const matchesFilter = filter === "all" || category.toLowerCase().includes(filter.toLowerCase());
    const matchesSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginatedPosts = filteredPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  const categories = [
    { key: "all", label: t.all },
    { key: "imigra", label: t.immigration },
    { key: "famíl", label: t.family },
    { key: "empres", label: t.business },
  ];

  // Reset page on filter/search change
  const handleFilter = (f: string) => { setFilter(f); setPage(1); };
  const handleSearch = (q: string) => { setSearchQuery(q); setPage(1); };

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={lang} onLanguageChange={setLang} />

      <main className="flex-1">
        {/* Hero */}
        <section className="gradient-navy text-primary-foreground py-16 md:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">{t.title}</h1>
              <p className="text-lg text-primary-foreground/90">{t.subtitle}</p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b border-border">
          <div className="container">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t.search}
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              <div className="flex gap-2 flex-wrap justify-center">
                {categories.map((cat) => (
                  <Button
                    key={cat.key}
                    variant={filter === cat.key ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilter(cat.key)}
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
            {isLoading ? (
              <p className="text-center text-muted-foreground py-12">Carregando...</p>
            ) : paginatedPosts.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">{t.noPosts}</p>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedPosts.map((post: any) => {
                    const title = lang === "pt" ? post.title_pt : post.title_en;
                    const excerpt = lang === "pt" ? post.excerpt_pt : post.excerpt_en;
                    const category = lang === "pt" ? post.category_pt : post.category_en;

                    return (
                      <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                        <CardHeader className="pb-3">
                          <Badge className={`${getCategoryColor(category)} w-fit mb-2`}>{category}</Badge>
                          <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                            {title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-base mb-4 line-clamp-3">{excerpt}</CardDescription>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(post.created_at).toLocaleDateString(lang === "pt" ? "pt-BR" : "en-CA")}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {post.read_time} {t.minRead}
                            </span>
                          </div>
                          <Link to={`/blog/${post.slug}`}>
                            <Button
                              variant="outline"
                              className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                            >
                              {t.readMore}
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10">
                    <Button variant="outline" size="icon" disabled={currentPage <= 1} onClick={() => setPage(p => p - 1)}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                      <Button
                        key={p}
                        variant={p === currentPage ? "default" : "outline"}
                        size="sm"
                        className="w-9 h-9"
                        onClick={() => setPage(p)}
                      >
                        {p}
                      </Button>
                    ))}
                    <Button variant="outline" size="icon" disabled={currentPage >= totalPages} onClick={() => setPage(p => p + 1)}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <Footer lang={lang} />
      <WhatsAppButton />
    </div>
  );
};

export default BlogPage;
