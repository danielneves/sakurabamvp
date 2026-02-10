import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BilingualInput } from "@/components/admin/BilingualInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Save, Plus, Trash2 } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

export default function TestimonialsEditor() {
  const queryClient = useQueryClient();
  const { data: items, isLoading } = useQuery({
    queryKey: ["admin_testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase.from("testimonials").select("*").order("display_order");
      if (error) throw error;
      return data;
    },
  });

  const [editing, setEditing] = useState<Tables<"testimonials"> | null>(null);

  const save = async (item: Tables<"testimonials">) => {
    const { id, ...rest } = item;
    const { error } = await supabase.from("testimonials").update(rest).eq("id", id);
    if (error) { toast({ title: "Erro", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Salvo!" });
    queryClient.invalidateQueries({ queryKey: ["admin_testimonials"] });
    queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    setEditing(null);
  };

  const addNew = async () => {
    const { error } = await supabase.from("testimonials").insert({ name: "Novo Depoimento", display_order: (items?.length ?? 0) + 1 });
    if (error) { toast({ title: "Erro", description: error.message, variant: "destructive" }); return; }
    queryClient.invalidateQueries({ queryKey: ["admin_testimonials"] });
  };

  const remove = async (id: string) => {
    await supabase.from("testimonials").delete().eq("id", id);
    queryClient.invalidateQueries({ queryKey: ["admin_testimonials"] });
    queryClient.invalidateQueries({ queryKey: ["testimonials"] });
  };

  if (isLoading) return <p className="text-muted-foreground">Carregando...</p>;

  if (editing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Editar Depoimento</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setEditing(null)}>Cancelar</Button>
            <Button onClick={() => save(editing)}><Save className="h-4 w-4 mr-2" />Salvar</Button>
          </div>
        </div>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Nome</Label><Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
              <div><Label>Localização</Label><Input value={editing.location} onChange={(e) => setEditing({ ...editing, location: e.target.value })} /></div>
            </div>
            <BilingualInput label="Depoimento" valuePt={editing.text_pt} valueEn={editing.text_en} onChangePt={(v) => setEditing({ ...editing, text_pt: v })} onChangeEn={(v) => setEditing({ ...editing, text_en: v })} multiline />
            <BilingualInput label="Serviço" valuePt={editing.service_pt} valueEn={editing.service_en} onChangePt={(v) => setEditing({ ...editing, service_pt: v })} onChangeEn={(v) => setEditing({ ...editing, service_en: v })} />
            <div><Label>Ordem</Label><Input type="number" value={editing.display_order} onChange={(e) => setEditing({ ...editing, display_order: parseInt(e.target.value) || 0 })} /></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Depoimentos</h1>
        <Button onClick={addNew}><Plus className="h-4 w-4 mr-2" />Novo Depoimento</Button>
      </div>
      <div className="grid gap-3">
        {items?.map((t) => (
          <Card key={t.id} className="hover:shadow-md transition-shadow">
            <CardContent className="flex items-center justify-between p-4">
              <div className="cursor-pointer" onClick={() => setEditing(t)}>
                <p className="font-medium text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.location} · {t.service_pt}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setEditing(t)}>Editar</Button>
                <Button variant="ghost" size="icon" onClick={() => remove(t.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
