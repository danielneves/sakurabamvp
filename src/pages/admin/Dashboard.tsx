import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Megaphone, Settings, FileText, Users, MessageSquare } from "lucide-react";

const sections = [
  { title: "Hero & Textos", description: "Edite títulos, subtítulos e CTAs", icon: Megaphone, href: "/admin/hero" },
  { title: "Serviços", description: "Gerencie áreas de atuação", icon: Settings, href: "/admin/services" },
  { title: "Blog", description: "Crie e edite artigos", icon: FileText, href: "/admin/blog" },
  { title: "Equipe", description: "Gerencie membros da equipe", icon: Users, href: "/admin/team" },
  { title: "Depoimentos", description: "Gerencie depoimentos de clientes", icon: MessageSquare, href: "/admin/testimonials" },
];

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-6">Painel Administrativo</h1>
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
