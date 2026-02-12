import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Megaphone, Settings, FileText, Users, MessageSquare, PenSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
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

  const handleNewPost = async () => {
    const slug = `novo-artigo-${Date.now()}`;
    const { error } = await supabase.from("blog_posts").insert({ slug });
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
      return;
    }
    queryClient.invalidateQueries({ queryKey: ["admin_blog_posts"] });
    navigate("/admin/blog");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Painel Administrativo</h1>
        <Button onClick={handleNewPost}>
          <PenSquare className="h-4 w-4 mr-2" />
          Novo Post
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
  );
}
