import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BilingualInput } from "@/components/admin/BilingualInput";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Save, Plus, Trash2, Pencil, Home } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type TeamMember = Tables<"team_members"> & { bio_pt?: string; bio_en?: string; show_on_home?: boolean };

export default function TeamEditor() {
  const queryClient = useQueryClient();
  const { data: members, isLoading } = useQuery({
    queryKey: ["admin_team_members"],
    queryFn: async () => {
      const { data, error } = await supabase.from("team_members").select("*").order("display_order");
      if (error) throw error;
      return data as TeamMember[];
    },
  });

  const [editing, setEditing] = useState<TeamMember | null>(null);

  const save = async (member: TeamMember) => {
    const { id, ...rest } = member;
    const { error } = await supabase.from("team_members").update(rest as any).eq("id", id);
    if (error) { toast({ title: "Erro", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Salvo!" });
    queryClient.invalidateQueries({ queryKey: ["admin_team_members"] });
    queryClient.invalidateQueries({ queryKey: ["team_members"] });
    setEditing(null);
  };

  const addNew = async () => {
    const { error } = await supabase.from("team_members").insert({ name: "Novo Membro", display_order: (members?.length ?? 0) + 1 } as any);
    if (error) { toast({ title: "Erro", description: error.message, variant: "destructive" }); return; }
    queryClient.invalidateQueries({ queryKey: ["admin_team_members"] });
  };

  const remove = async (id: string) => {
    await supabase.from("team_members").delete().eq("id", id);
    queryClient.invalidateQueries({ queryKey: ["admin_team_members"] });
    queryClient.invalidateQueries({ queryKey: ["team_members"] });
  };

  const toggleHome = async (member: TeamMember) => {
    const newVal = !(member.show_on_home ?? true);
    await supabase.from("team_members").update({ show_on_home: newVal } as any).eq("id", member.id);
    queryClient.invalidateQueries({ queryKey: ["admin_team_members"] });
    queryClient.invalidateQueries({ queryKey: ["team_members"] });
  };

  const toggleActive = async (member: TeamMember) => {
    await supabase.from("team_members").update({ is_active: !member.is_active }).eq("id", member.id);
    queryClient.invalidateQueries({ queryKey: ["admin_team_members"] });
    queryClient.invalidateQueries({ queryKey: ["team_members"] });
  };

  if (isLoading) return <p className="text-muted-foreground">Carregando...</p>;

  // ---- EDIT MODE ----
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
          <CardContent className="pt-6 space-y-5">
            <ImageUploader label="Foto" currentUrl={editing.image_url} onUpload={(url) => setEditing({ ...editing, image_url: url || null })} folder="team" />

            <div><Label>Nome</Label><Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>

            <BilingualInput label="Cargo" valuePt={editing.role_pt} valueEn={editing.role_en} onChangePt={(v) => setEditing({ ...editing, role_pt: v })} onChangeEn={(v) => setEditing({ ...editing, role_en: v })} />

            <BilingualInput label="Especialidade" valuePt={editing.specialty_pt} valueEn={editing.specialty_en} onChangePt={(v) => setEditing({ ...editing, specialty_pt: v })} onChangeEn={(v) => setEditing({ ...editing, specialty_en: v })} />

            <div className="space-y-3">
              <Label className="text-sm font-medium">Bio</Label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-xs text-muted-foreground mb-1 block">🇧🇷 Português</span>
                  <RichTextEditor content={editing.bio_pt ?? ""} onChange={(v) => setEditing({ ...editing, bio_pt: v })} />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground mb-1 block">🇨🇦 English</span>
                  <RichTextEditor content={editing.bio_en ?? ""} onChange={(v) => setEditing({ ...editing, bio_en: v })} />
                </div>
              </div>
            </div>

            <div><Label>Experiência</Label><Input value={editing.experience} onChange={(e) => setEditing({ ...editing, experience: e.target.value })} /></div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch checked={editing.show_on_home ?? true} onCheckedChange={(v) => setEditing({ ...editing, show_on_home: v })} />
                <Label className="text-sm">Aparecer na Home</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={editing.is_active} onCheckedChange={(v) => setEditing({ ...editing, is_active: v })} />
                <Label className="text-sm">Ativo</Label>
              </div>
            </div>

            <div><Label>Ordem</Label><Input type="number" value={editing.display_order} onChange={(e) => setEditing({ ...editing, display_order: parseInt(e.target.value) || 0 })} className="w-24" /></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ---- TABLE LIST MODE ----
  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-10 bg-secondary/95 backdrop-blur pb-4 -mt-6 -mx-6 px-6 pt-6 border-b border-border mb-2 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Equipe</h1>
        <Button onClick={addNew}><Plus className="h-4 w-4 mr-2" />Novo Membro</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Foto</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead className="w-20 text-center">Ordem</TableHead>
                <TableHead className="w-20 text-center">Home</TableHead>
                <TableHead className="w-20 text-center">Ativo</TableHead>
                <TableHead className="w-24 text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members?.map((m) => (
                <TableRow key={m.id}>
                  <TableCell>
                    {m.image_url ? (
                      <img src={m.image_url} alt={m.name} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xs font-bold">
                        {m.name.charAt(0)}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{m.name}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{m.role_pt}</TableCell>
                  <TableCell className="text-center text-sm">{m.display_order}</TableCell>
                  <TableCell className="text-center">
                    <Switch checked={m.show_on_home ?? true} onCheckedChange={() => toggleHome(m)} />
                  </TableCell>
                  <TableCell className="text-center">
                    <Switch checked={m.is_active} onCheckedChange={() => toggleActive(m)} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditing(m)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => remove(m.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
