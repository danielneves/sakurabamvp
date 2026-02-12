import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

const BlogPost = () => {
  const [lang, setLang] = useState<"pt" | "en">("pt");
  const { slug } = useParams<{ slug: string }>();
  const { data: posts, isLoading } = useBlogPosts();

  const post = posts?.find((p) => p.slug === slug);

  const t = {
    pt: { back: "Voltar ao Blog", notFound: "Artigo não encontrado", minRead: "min de leitura" },
    en: { back: "Back to Blog", notFound: "Article not found", minRead: "min read" },
  }[lang];

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={lang} onLanguageChange={setLang} />

      <main className="flex-1">
        <div className="container py-12 max-w-3xl">
          <Link to="/blog">
            <Button variant="ghost" size="sm" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t.back}
            </Button>
          </Link>

          {isLoading ? (
            <p className="text-muted-foreground">Carregando...</p>
          ) : !post ? (
            <p className="text-muted-foreground text-center py-20 text-lg">{t.notFound}</p>
          ) : (
            <article>
              <Badge variant="outline" className="mb-4">
                {lang === "pt" ? post.category_pt : post.category_en}
              </Badge>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                {lang === "pt" ? post.title_pt : post.title_en}
              </h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.created_at).toLocaleDateString(lang === "pt" ? "pt-BR" : "en-CA")}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.read_time} {t.minRead}
                </span>
              </div>
              {post.image_url && (
                <img src={post.image_url} alt="" className="w-full rounded-lg mb-8 aspect-video object-cover" />
              )}
              <div className="prose prose-lg max-w-none text-foreground">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {lang === "pt" ? post.excerpt_pt : post.excerpt_en}
                </p>
                {(lang === "pt" ? post.content_pt : post.content_en) && (
                  <div
                    className="mt-6"
                    dangerouslySetInnerHTML={{
                      __html: (lang === "pt" ? post.content_pt : post.content_en),
                    }}
                  />
                )}
              </div>
            </article>
          )}
        </div>
      </main>

      <Footer lang={lang} />
      <WhatsAppButton />
    </div>
  );
};

export default BlogPost;
