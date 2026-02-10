import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { useSiteContent } from "@/hooks/useSiteContent";
import blogImmigration from "@/assets/blog-immigration.jpg";
import blogFamily from "@/assets/blog-family.jpg";
import blogDivorce from "@/assets/blog-divorce.jpg";

interface BlogPreviewProps {
  lang?: "pt" | "en";
}

const defaultImages = [blogImmigration, blogFamily, blogDivorce];

const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case "imigração": case "immigration": return "bg-accent text-accent-foreground";
    case "família": case "family": return "bg-destructive/10 text-destructive";
    default: return "bg-primary/10 text-primary";
  }
};

const fallback = {
  pt: { badge: "Blog Jurídico", title: "Artigos e Orientações", subtitle: "Conteúdo especializado para ajudar você a entender seus direitos e tomar decisões informadas.", viewAll: "Ver Todos os Artigos", readMore: "Ler Mais", minRead: "min" },
  en: { badge: "Legal Blog", title: "Articles & Guidance", subtitle: "Expert content to help you understand your rights and make informed decisions.", viewAll: "View All Articles", readMore: "Read More", minRead: "min" },
};

export function BlogPreview({ lang = "pt" }: BlogPreviewProps) {
  const { data: posts } = useBlogPosts();
  const { data: content } = useSiteContent();
  const fb = fallback[lang];
  const c = (key: string, fb: string) => content?.[key]?.[lang] ?? fb;

  const displayPosts = posts?.slice(0, 3) ?? [];

  return (
    <section className="py-20 bg-secondary">
      <div className="container">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">{c("blog_badge", fb.badge)}</Badge>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">{c("blog_title", fb.title)}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{c("blog_subtitle", fb.subtitle)}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {displayPosts.map((post, idx) => {
            const title = lang === "pt" ? post.title_pt : post.title_en;
            const excerpt = lang === "pt" ? post.excerpt_pt : post.excerpt_en;
            const category = lang === "pt" ? post.category_pt : post.category_en;
            const image = post.image_url || defaultImages[idx % defaultImages.length];

            return (
              <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <Badge className={`absolute top-3 left-3 ${getCategoryColor(category)}`}>{category}</Badge>
                </div>
                <CardContent className="p-5">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">{title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      <Clock className="h-3 w-3" />{post.read_time} {fb.minRead}
                    </span>
                    <Link to={`/blog/${post.slug}`} className="inline-flex items-center text-sm text-primary font-medium hover:underline">
                      {fb.readMore}<ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Link to="/blog">
            <Button variant="outline" size="lg">{fb.viewAll}<ArrowRight className="h-4 w-4 ml-2" /></Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
