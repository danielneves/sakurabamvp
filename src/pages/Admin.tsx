import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { AdminLayout } from "@/components/admin/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
import HeroEditor from "@/pages/admin/HeroEditor";
import BlogEditor from "@/pages/admin/BlogEditor";
import TeamEditor from "@/pages/admin/TeamEditor";
import TestimonialsEditor from "@/pages/admin/TestimonialsEditor";
import ServicesEditor from "@/pages/admin/ServicesEditor";
import PageBlocksEditor from "@/pages/admin/PageBlocksEditor";

export default function Admin() {
  const { user, loading, isAdmin, isEditor } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><p className="text-muted-foreground">Carregando...</p></div>;
  }

  if (!user) return null;

  if (!isAdmin && !isEditor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Acesso Negado</h1>
          <p className="text-muted-foreground">Você não tem permissão para acessar o painel administrativo.</p>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="hero" element={<HeroEditor />} />
        <Route path="blog" element={<BlogEditor />} />
        <Route path="team" element={<TeamEditor />} />
        <Route path="testimonials" element={<TestimonialsEditor />} />
        <Route path="services" element={<ServicesEditor />} />
        <Route path="pages" element={<PageBlocksEditor />} />
      </Routes>
    </AdminLayout>
  );
}
