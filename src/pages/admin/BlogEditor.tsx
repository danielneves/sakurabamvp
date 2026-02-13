import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BilingualInput } from "@/components/admin/BilingualInput";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Save, Plus, Trash2 } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

export default function BlogEditor() {
  const queryClient = useQueryClient();
  const { data: posts, isLoading } = useQuery({
    queryKey: ["admin_blog_posts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const [editing, setEditing] = useState<Tables<"blog_posts"> | null>(null);

  const save = async (post: Tables<"blog_posts">) => {
    const { id, ...rest } = post;
    const { error } = await supabase.from("blog_posts").update(rest).eq("id", id);
    if (error) { toast({ title: "Erro", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Salvo!" });
    queryClient.invalidateQueries({ queryKey: ["admin_blog_posts"] });
    queryClient.invalidateQueries({ queryKey: ["blog_posts"] });
    setEditing(null);
  };

  const addNew = async () => {
    const slug = `novo-artigo-${Date.now()}`;
    const { error } = await supabase.from("blog_posts").insert({ slug });
    if (error) { toast({ title: "Erro", description: error.message, variant: "destructive" }); return; }
    queryClient.invalidateQueries({ queryKey: ["admin_blog_posts"] });
  };

  const remove = async (id: string) => {
    await supabase.from("blog_posts").delete().eq("id", id);
    queryClient.invalidateQueries({ queryKey: ["admin_blog_posts"] });
    queryClient.invalidateQueries({ queryKey: ["blog_posts"] });
  };

  if (isLoading) return <p className="text-muted-foreground">Carregando...</p>;

  if (editing) {
    return (
      <div className="space-y-6">
        <div className="sticky top-0 z-10 bg-secondary/95 backdrop-blur pb-4 -mt-6 -mx-6 px-6 pt-6 border-b border-border mb-2 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Editar Artigo</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setEditing(null)}>Cancelar</Button>
            <Button onClick={() => save(editing)}><Save className="h-4 w-4 mr-2" />Salvar</Button>
          </div>
        </div>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <BilingualInput label="Título" valuePt={editing.title_pt} valueEn={editing.title_en} onChangePt={(v) => setEditing({ ...editing, title_pt: v })} onChangeEn={(v) => setEditing({ ...editing, title_en: v })} />
            <BilingualInput label="Resumo" valuePt={editing.excerpt_pt} valueEn={editing.excerpt_en} onChangePt={(v) => setEditing({ ...editing, excerpt_pt: v })} onChangeEn={(v) => setEditing({ ...editing, excerpt_en: v })} multiline />
            <div className="space-y-3">
              <Label className="text-sm font-medium">Conteúdo</Label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-xs text-muted-foreground mb-1 block">🇧🇷 Português</span>
                  <RichTextEditor content={editing.content_pt} onChange={(v) => setEditing({ ...editing, content_pt: v })} />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground mb-1 block">🇨🇦 English</span>
                  <RichTextEditor content={editing.content_en} onChange={(v) => setEditing({ ...editing, content_en: v })} />
                </div>
              </div>
            </div>
            <BilingualInput label="Categoria" valuePt={editing.category_pt} valueEn={editing.category_en} onChangePt={(v) => setEditing({ ...editing, category_pt: v })} onChangeEn={(v) => setEditing({ ...editing, category_en: v })} />
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Slug</Label><Input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} /></div>
              <div><Label>Tempo de leitura (min)</Label><Input type="number" value={editing.read_time} onChange={(e) => setEditing({ ...editing, read_time: parseInt(e.target.value) || 5 })} /></div>
            </div>
            <ImageUploader label="Imagem" currentUrl={editing.image_url} onUpload={(url) => setEditing({ ...editing, image_url: url || null })} folder="blog" />
            <div className="flex items-center gap-2">
              <Switch checked={editing.published} onCheckedChange={(v) => setEditing({ ...editing, published: v })} />
              <Label>Publicado</Label>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-10 bg-secondary/95 backdrop-blur pb-4 -mt-6 -mx-6 px-6 pt-6 border-b border-border mb-2 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Blog</h1>
        <Button onClick={addNew}><Plus className="h-4 w-4 mr-2" />Novo Artigo</Button>
      </div>
      <div className="grid gap-3">
        {posts?.map((p) => (
          <Card key={p.id} className="hover:shadow-md transition-shadow">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex-1 cursor-pointer" onClick={() => setEditing(p)}>
                <p className="font-medium text-foreground">{p.title_pt || "Sem título"}</p>
                <p className="text-sm text-muted-foreground">{p.category_pt} · {p.read_time} min</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={p.published ? "default" : "secondary"}>{p.published ? "Publicado" : "Rascunho"}</Badge>
                <Button variant="outline" size="sm" onClick={() => setEditing(p)}>Editar</Button>
                <Button variant="ghost" size="icon" onClick={() => remove(p.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
