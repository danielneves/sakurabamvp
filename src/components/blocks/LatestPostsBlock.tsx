import { useBlogPosts } from "@/hooks/useBlogPosts";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { format } from "date-fns";

interface Props {
  title: string;
  subtitle: string;
  content: {
    categories_pt?: string[];
    categories_en?: string[];
    max_posts?: number;
  };
  lang: "pt" | "en";
}

export function LatestPostsBlock({ title, subtitle, content, lang }: Props) {
  const { data: posts } = useBlogPosts(true);
  const max = content.max_posts || 3;
  const categories = lang === "pt" ? content.categories_pt : content.categories_en;

  const filtered = (posts ?? [])
    .filter((p) => {
      if (!categories || categories.length === 0) return true;
      const cat = lang === "pt" ? p.category_pt : p.category_en;
      return categories.some(c => cat.toLowerCase().includes(c.toLowerCase()));
    })
    .slice(0, max);

  return (
    <section className="py-20 bg-secondary">
      <div className="container">
        {title && <h2 className="text-3xl font-bold text-center mb-4">{title}</h2>}
        {subtitle && <p className="text-muted-foreground text-center text-lg mb-12 max-w-2xl mx-auto">{subtitle}</p>}
        <div className="space-y-4 max-w-3xl mx-auto">
          {filtered.map((post) => (
            <Link key={post.id} to={`/blog/${post.slug}`}>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="flex-row items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg line-clamp-1">
                      {lang === "pt" ? post.title_pt : post.title_en}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(post.created_at), "dd/MM/yyyy")}
                      <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-full">
                        {lang === "pt" ? post.category_pt : post.category_en}
                      </span>
                    </CardDescription>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                </CardHeader>
              </Card>
            </Link>
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground">Nenhum post encontrado.</p>
          )}
        </div>
      </div>
    </section>
  );
}
