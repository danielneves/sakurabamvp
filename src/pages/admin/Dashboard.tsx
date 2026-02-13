import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Megaphone, Settings, FileText, Users, MessageSquare, PenSquare, ArrowRight, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

const sections = [
  { title: "Hero & Textos", description: "Edite títulos, subtítulos e CTAs", icon: Megaphone, href: "/admin/hero" },
  { title: "Serviços", description: "Gerencie áreas de atuação", icon: Settings, href: "/admin/services" },
  { title: "Blog", description: "Crie e edite artigos", icon: FileText, href: "/admin/blog" },
  { title: "Equipe", description: "Gerencie membros da equipe", icon: Users, href: "/admin/team" },
  { title: "Depoimentos", description: "Gerencie depoimentos de clientes", icon: MessageSquare, href: "/admin/testimonials" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: recentPosts } = useQuery({
    queryKey: ["admin_recent_posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title_pt, slug, published, updated_at, category_pt")
        .order("updated_at", { ascending: false })
        .limit(5);
      if (error) throw error;
      return data;
    },
  });

  const handleNewPost = async () => {
    const slug = `novo-artigo-${Date.now()}`;
    const { error } = await supabase.from("blog_posts").insert({ slug });
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
      return;
    }
    queryClient.invalidateQueries({ queryKey: ["admin_blog_posts"] });
    queryClient.invalidateQueries({ queryKey: ["admin_recent_posts"] });
    navigate("/admin/blog");
  };

  return (
    <div>
      {/* Sticky top bar */}
      <div className="sticky top-0 z-10 bg-secondary/95 backdrop-blur pb-4 -mt-6 -mx-6 px-6 pt-6 border-b border-border mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Painel Administrativo</h1>
          <Button onClick={handleNewPost}>
            <PenSquare className="h-4 w-4 mr-2" />
            Novo Post
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sections grid */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sections.map((section) => (
              <Link key={section.href} to={section.href}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardHeader className="flex flex-row items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <section.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{section.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Posts sidebar */}
        <div>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base">Posts Recentes</CardTitle>
              <Link to="/admin/blog">
                <Button variant="ghost" size="sm" className="text-xs">
                  Ver todos <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentPosts?.map((post) => (
                <Link
                  key={post.id}
                  to="/admin/blog"
                  className="flex items-start gap-3 p-2 -mx-2 rounded-md hover:bg-muted transition-colors group"
                >
                  <FileText className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                      {post.title_pt || "Sem título"}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant={post.published ? "default" : "secondary"} className="text-[10px] px-1.5 py-0">
                        {post.published ? "Publicado" : "Rascunho"}
                      </Badge>
                      <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Clock className="h-2.5 w-2.5" />
                        {new Date(post.updated_at).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
              {(!recentPosts || recentPosts.length === 0) && (
                <p className="text-sm text-muted-foreground text-center py-4">Nenhum post ainda</p>
              )}
              <Button onClick={handleNewPost} variant="outline" size="sm" className="w-full mt-2">
                <PenSquare className="h-3.5 w-3.5 mr-2" />
                Novo Post
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
