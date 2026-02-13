import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BilingualInput } from "@/components/admin/BilingualInput";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Save, Plus, Trash2 } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

export default function TeamEditor() {
  const queryClient = useQueryClient();
  const { data: members, isLoading } = useQuery({
    queryKey: ["admin_team_members"],
    queryFn: async () => {
      const { data, error } = await supabase.from("team_members").select("*").order("display_order");
      if (error) throw error;
      return data;
    },
  });

  const [editing, setEditing] = useState<Tables<"team_members"> | null>(null);

  const save = async (member: Tables<"team_members">) => {
    const { id, ...rest } = member;
    const { error } = await supabase.from("team_members").update(rest).eq("id", id);
    if (error) { toast({ title: "Erro", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Salvo!" });
    queryClient.invalidateQueries({ queryKey: ["admin_team_members"] });
    queryClient.invalidateQueries({ queryKey: ["team_members"] });
    setEditing(null);
  };

  const addNew = async () => {
    const { error } = await supabase.from("team_members").insert({ name: "Novo Membro", display_order: (members?.length ?? 0) + 1 });
    if (error) { toast({ title: "Erro", description: error.message, variant: "destructive" }); return; }
    queryClient.invalidateQueries({ queryKey: ["admin_team_members"] });
  };

  const remove = async (id: string) => {
    await supabase.from("team_members").delete().eq("id", id);
    queryClient.invalidateQueries({ queryKey: ["admin_team_members"] });
    queryClient.invalidateQueries({ queryKey: ["team_members"] });
  };

  if (isLoading) return <p className="text-muted-foreground">Carregando...</p>;

  if (editing) {
    return (
      <div className="space-y-6">
        <div className="sticky top-0 z-10 bg-secondary/95 backdrop-blur pb-4 -mt-6 -mx-6 px-6 pt-6 border-b border-border mb-2 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Editar Membro</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setEditing(null)}>Cancelar</Button>
            <Button onClick={() => save(editing)}><Save className="h-4 w-4 mr-2" />Salvar</Button>
          </div>
        </div>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div><Label>Nome</Label><Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
            <BilingualInput label="Cargo" valuePt={editing.role_pt} valueEn={editing.role_en} onChangePt={(v) => setEditing({ ...editing, role_pt: v })} onChangeEn={(v) => setEditing({ ...editing, role_en: v })} />
            <BilingualInput label="Especialidade" valuePt={editing.specialty_pt} valueEn={editing.specialty_en} onChangePt={(v) => setEditing({ ...editing, specialty_pt: v })} onChangeEn={(v) => setEditing({ ...editing, specialty_en: v })} />
            <BilingualInput label="Citação" valuePt={editing.quote_pt} valueEn={editing.quote_en} onChangePt={(v) => setEditing({ ...editing, quote_pt: v })} onChangeEn={(v) => setEditing({ ...editing, quote_en: v })} multiline />
            <div><Label>Experiência</Label><Input value={editing.experience} onChange={(e) => setEditing({ ...editing, experience: e.target.value })} /></div>
            <ImageUploader label="Foto" currentUrl={editing.image_url} onUpload={(url) => setEditing({ ...editing, image_url: url || null })} folder="team" />
            <div><Label>Ordem</Label><Input type="number" value={editing.display_order} onChange={(e) => setEditing({ ...editing, display_order: parseInt(e.target.value) || 0 })} /></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-10 bg-secondary/95 backdrop-blur pb-4 -mt-6 -mx-6 px-6 pt-6 border-b border-border mb-2 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Equipe</h1>
        <Button onClick={addNew}><Plus className="h-4 w-4 mr-2" />Novo Membro</Button>
      </div>
      <div className="grid gap-4">
        {members?.map((m) => (
          <Card key={m.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4" onClick={() => setEditing(m)}>
                {m.image_url && <img src={m.image_url} alt={m.name} className="w-12 h-12 rounded-full object-cover" />}
                <div>
                  <p className="font-medium text-foreground">{m.name}</p>
                  <p className="text-sm text-muted-foreground">{m.role_pt}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setEditing(m)}>Editar</Button>
                <Button variant="ghost" size="icon" onClick={() => remove(m.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
