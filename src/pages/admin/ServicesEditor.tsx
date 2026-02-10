import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BilingualInput } from "@/components/admin/BilingualInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { Save, Plus, Trash2 } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

export default function ServicesEditor() {
  const queryClient = useQueryClient();
  const { data: services, isLoading } = useQuery({
    queryKey: ["admin_services"],
    queryFn: async () => {
      const { data, error } = await supabase.from("services").select("*").order("display_order");
      if (error) throw error;
      return data;
    },
  });

  const [editing, setEditing] = useState<Tables<"services"> | null>(null);

  const save = async (svc: Tables<"services">) => {
    const { id, ...rest } = svc;
    const { error } = await supabase.from("services").update(rest).eq("id", id);
    if (error) { toast({ title: "Erro", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Salvo!" });
    queryClient.invalidateQueries({ queryKey: ["admin_services"] });
    queryClient.invalidateQueries({ queryKey: ["services"] });
    setEditing(null);
  };

  const addNew = async () => {
    const { error } = await supabase.from("services").insert({ display_order: (services?.length ?? 0) + 1 });
    if (error) { toast({ title: "Erro", description: error.message, variant: "destructive" }); return; }
    queryClient.invalidateQueries({ queryKey: ["admin_services"] });
  };

  const remove = async (id: string) => {
    await supabase.from("services").delete().eq("id", id);
    queryClient.invalidateQueries({ queryKey: ["admin_services"] });
    queryClient.invalidateQueries({ queryKey: ["services"] });
  };

  if (isLoading) return <p className="text-muted-foreground">Carregando...</p>;

  if (editing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Editar Serviço</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setEditing(null)}>Cancelar</Button>
            <Button onClick={() => save(editing)}><Save className="h-4 w-4 mr-2" />Salvar</Button>
          </div>
        </div>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <BilingualInput label="Título" valuePt={editing.title_pt} valueEn={editing.title_en} onChangePt={(v) => setEditing({ ...editing, title_pt: v })} onChangeEn={(v) => setEditing({ ...editing, title_en: v })} />
            <BilingualInput label="Descrição" valuePt={editing.description_pt} valueEn={editing.description_en} onChangePt={(v) => setEditing({ ...editing, description_pt: v })} onChangeEn={(v) => setEditing({ ...editing, description_en: v })} multiline />
            <div className="grid grid-cols-3 gap-4">
              <div><Label>Ícone (Lucide)</Label><Input value={editing.icon_name} onChange={(e) => setEditing({ ...editing, icon_name: e.target.value })} /></div>
              <div><Label>Link (href)</Label><Input value={editing.href} onChange={(e) => setEditing({ ...editing, href: e.target.value })} /></div>
              <div><Label>Ordem</Label><Input type="number" value={editing.display_order} onChange={(e) => setEditing({ ...editing, display_order: parseInt(e.target.value) || 0 })} /></div>
            </div>
            <div className="flex gap-6">
              <div className="flex items-center gap-2"><Switch checked={editing.is_featured} onCheckedChange={(v) => setEditing({ ...editing, is_featured: v })} /><Label>Destaque</Label></div>
              <div className="flex items-center gap-2"><Switch checked={editing.is_highlighted} onCheckedChange={(v) => setEditing({ ...editing, is_highlighted: v })} /><Label>Highlighted</Label></div>
              <div className="flex items-center gap-2"><Switch checked={editing.is_active} onCheckedChange={(v) => setEditing({ ...editing, is_active: v })} /><Label>Ativo</Label></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Serviços</h1>
        <Button onClick={addNew}><Plus className="h-4 w-4 mr-2" />Novo Serviço</Button>
      </div>
      <div className="grid gap-3">
        {services?.map((s) => (
          <Card key={s.id} className="hover:shadow-md transition-shadow">
            <CardContent className="flex items-center justify-between p-4">
              <div className="cursor-pointer" onClick={() => setEditing(s)}>
                <p className="font-medium text-foreground">{s.title_pt || "Sem título"}</p>
                <p className="text-sm text-muted-foreground">{s.icon_name} · {s.href}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setEditing(s)}>Editar</Button>
                <Button variant="ghost" size="icon" onClick={() => remove(s.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
