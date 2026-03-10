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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Save, Plus, Trash2, Star, Sparkles } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type BlogPost = Tables<"blog_posts"> & {
  lang?: string;
  service_id?: string | null;
  theme?: string;
  is_highlighted?: boolean;
  is_featured?: boolean;
};

export default function BlogEditor() {
  const queryClient = useQueryClient();
  const { data: posts, isLoading } = useQuery({
    queryKey: ["admin_blog_posts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as BlogPost[];
    },
  });

  const { data: services } = useQuery({
    queryKey: ["services_list"],
    queryFn: async () => {
      const { data, error } = await supabase.from("services").select("id, title_pt").eq("is_active", true).order("display_order");
      if (error) throw error;
      return data;
    },
  });

  const [editing, setEditing] = useState<BlogPost | null>(null);

  const save = async (post: BlogPost) => {
    const { id, ...rest } = post;
    const { error } = await supabase.from("blog_posts").update(rest as any).eq("id", id);
    if (error) { toast({ title: "Erro", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Salvo!" });
    queryClient.invalidateQueries({ queryKey: ["admin_blog_posts"] });
    queryClient.invalidateQueries({ queryKey: ["blog_posts"] });
    setEditing(null);
  };

  const addNew = async () => {
    const slug = `novo-artigo-${Date.now()}`;
    const { error } = await supabase.from("blog_posts").insert({ slug } as any);
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
    const postLang = editing.lang ?? "both";

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
          <CardContent className="pt-6 space-y-5">
            {/* Language selector */}
            <div className="flex items-center gap-4">
              <Label className="text-sm font-medium">Idioma do artigo</Label>
              <Select value={postLang} onValueChange={(v) => setEditing({ ...editing, lang: v } as BlogPost)}>
                <SelectTrigger className="w-44">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="both">🇧🇷🇨🇦 Ambos</SelectItem>
                  <SelectItem value="pt">🇧🇷 Apenas Português</SelectItem>
                  <SelectItem value="en">🇨🇦 Apenas English</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Titles */}
            {postLang === "both" ? (
              <BilingualInput label="Título" valuePt={editing.title_pt} valueEn={editing.title_en} onChangePt={(v) => setEditing({ ...editing, title_pt: v })} onChangeEn={(v) => setEditing({ ...editing, title_en: v })} />
            ) : postLang === "pt" ? (
              <div><Label>Título (PT)</Label><Input value={editing.title_pt} onChange={(e) => setEditing({ ...editing, title_pt: e.target.value })} /></div>
            ) : (
              <div><Label>Title (EN)</Label><Input value={editing.title_en} onChange={(e) => setEditing({ ...editing, title_en: e.target.value })} /></div>
            )}

            {/* Excerpts */}
            {postLang === "both" ? (
              <BilingualInput label="Resumo" valuePt={editing.excerpt_pt} valueEn={editing.excerpt_en} onChangePt={(v) => setEditing({ ...editing, excerpt_pt: v })} onChangeEn={(v) => setEditing({ ...editing, excerpt_en: v })} multiline />
            ) : postLang === "pt" ? (
              <div><Label>Resumo</Label><Input value={editing.excerpt_pt} onChange={(e) => setEditing({ ...editing, excerpt_pt: e.target.value })} /></div>
            ) : (
              <div><Label>Excerpt</Label><Input value={editing.excerpt_en} onChange={(e) => setEditing({ ...editing, excerpt_en: e.target.value })} /></div>
            )}

            {/* Content */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Conteúdo</Label>
              {postLang === "both" ? (
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
              ) : postLang === "pt" ? (
                <RichTextEditor content={editing.content_pt} onChange={(v) => setEditing({ ...editing, content_pt: v })} />
              ) : (
                <RichTextEditor content={editing.content_en} onChange={(v) => setEditing({ ...editing, content_en: v })} />
              )}
            </div>

            {/* Categorization */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Serviço Relacionado</Label>
                <Select value={editing.service_id ?? "none"} onValueChange={(v) => setEditing({ ...editing, service_id: v === "none" ? null : v } as BlogPost)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Nenhum" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Nenhum</SelectItem>
                    {services?.map(s => (
                      <SelectItem key={s.id} value={s.id}>{s.title_pt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Tema</Label>
                <Input value={editing.theme ?? ""} onChange={(e) => setEditing({ ...editing, theme: e.target.value } as BlogPost)} placeholder="ex: Cidadania, Divórcio" />
              </div>
            </div>

            {/* Legacy categories */}
            {postLang === "both" ? (
              <BilingualInput label="Categoria" valuePt={editing.category_pt} valueEn={editing.category_en} onChangePt={(v) => setEditing({ ...editing, category_pt: v })} onChangeEn={(v) => setEditing({ ...editing, category_en: v })} />
            ) : postLang === "pt" ? (
              <div><Label>Categoria (PT)</Label><Input value={editing.category_pt} onChange={(e) => setEditing({ ...editing, category_pt: e.target.value })} /></div>
            ) : (
              <div><Label>Category (EN)</Label><Input value={editing.category_en} onChange={(e) => setEditing({ ...editing, category_en: e.target.value })} /></div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div><Label>Slug</Label><Input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} /></div>
              <div><Label>Tempo de leitura (min)</Label><Input type="number" value={editing.read_time} onChange={(e) => setEditing({ ...editing, read_time: parseInt(e.target.value) || 5 })} /></div>
            </div>

            <ImageUploader label="Imagem de capa" currentUrl={editing.image_url} onUpload={(url) => setEditing({ ...editing, image_url: url || null })} folder="blog" />

            {/* Switches row */}
            <div className="flex items-center gap-6 flex-wrap pt-2 border-t border-border">
              <div className="flex items-center gap-2">
                <Switch checked={editing.published} onCheckedChange={(v) => setEditing({ ...editing, published: v })} />
                <Label className="text-sm">Publicado</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={editing.is_highlighted ?? false} onCheckedChange={(v) => setEditing({ ...editing, is_highlighted: v } as BlogPost)} />
                <Label className="text-sm flex items-center gap-1"><Star className="h-3.5 w-3.5 text-amber-500" /> Highlighted</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={editing.is_featured ?? false} onCheckedChange={(v) => setEditing({ ...editing, is_featured: v } as BlogPost)} />
                <Label className="text-sm flex items-center gap-1"><Sparkles className="h-3.5 w-3.5 text-primary" /> Destaque</Label>
              </div>
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
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="font-medium text-foreground">{p.title_pt || p.title_en || "Sem título"}</p>
                  {p.is_highlighted && <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />}
                  {p.is_featured && <Sparkles className="h-3.5 w-3.5 text-primary" />}
                </div>
                <p className="text-sm text-muted-foreground">
                  {p.category_pt || p.category_en} · {p.read_time} min
                  {p.lang && p.lang !== "both" && <span className="ml-2">{p.lang === "pt" ? "🇧🇷" : "🇨🇦"}</span>}
                </p>
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
