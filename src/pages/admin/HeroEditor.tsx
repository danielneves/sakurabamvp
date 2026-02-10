import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSiteContent } from "@/hooks/useSiteContent";
import { BilingualInput } from "@/components/admin/BilingualInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Save } from "lucide-react";

const KEYS = [
  { key: "hero_badge", label: "Badge" },
  { key: "hero_title", label: "Título" },
  { key: "hero_title_highlight", label: "Título (destaque)" },
  { key: "hero_subtitle", label: "Subtítulo", multiline: true },
  { key: "hero_cta_primary", label: "CTA Primário" },
  { key: "hero_cta_secondary", label: "CTA Secundário" },
  { key: "hero_stat_1_value", label: "Stat 1 - Valor" },
  { key: "hero_stat_1_label", label: "Stat 1 - Label" },
  { key: "hero_stat_2_value", label: "Stat 2 - Valor" },
  { key: "hero_stat_2_label", label: "Stat 2 - Label" },
  { key: "hero_stat_3_value", label: "Stat 3 - Valor" },
  { key: "hero_stat_3_label", label: "Stat 3 - Label" },
  { key: "services_badge", label: "Serviços - Badge" },
  { key: "services_title", label: "Serviços - Título" },
  { key: "services_subtitle", label: "Serviços - Subtítulo", multiline: true },
  { key: "blog_badge", label: "Blog - Badge" },
  { key: "blog_title", label: "Blog - Título" },
  { key: "blog_subtitle", label: "Blog - Subtítulo", multiline: true },
  { key: "about_badge", label: "Sobre - Badge" },
  { key: "about_title", label: "Sobre - Título" },
  { key: "about_subtitle", label: "Sobre - Subtítulo" },
  { key: "testimonials_badge", label: "Depoimentos - Badge" },
  { key: "testimonials_title", label: "Depoimentos - Título" },
  { key: "testimonials_subtitle", label: "Depoimentos - Subtítulo", multiline: true },
  { key: "cta_title", label: "CTA Final - Título" },
  { key: "cta_subtitle", label: "CTA Final - Subtítulo", multiline: true },
];

export default function HeroEditor() {
  const { data: content, isLoading } = useSiteContent();
  const [form, setForm] = useState<Record<string, { pt: string; en: string }>>({});
  const [saving, setSaving] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (content) setForm({ ...content });
  }, [content]);

  const update = (key: string, lang: "pt" | "en", value: string) => {
    setForm((prev) => ({ ...prev, [key]: { ...prev[key], [lang]: value } }));
  };

  const handleSave = async () => {
    setSaving(true);
    for (const { key } of KEYS) {
      const val = form[key];
      if (!val) continue;
      await supabase
        .from("site_content")
        .update({ content_pt: val.pt, content_en: val.en })
        .eq("section_key", key);
    }
    queryClient.invalidateQueries({ queryKey: ["site_content"] });
    toast({ title: "Salvo com sucesso!" });
    setSaving(false);
  };

  if (isLoading) return <p className="text-muted-foreground">Carregando...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Hero & Textos do Site</h1>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? "Salvando..." : "Salvar Tudo"}
        </Button>
      </div>
      <Card>
        <CardHeader><CardTitle>Conteúdos Editáveis</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          {KEYS.map(({ key, label, multiline }) => (
            <BilingualInput
              key={key}
              label={label}
              valuePt={form[key]?.pt ?? ""}
              valueEn={form[key]?.en ?? ""}
              onChangePt={(v) => update(key, "pt", v)}
              onChangeEn={(v) => update(key, "en", v)}
              multiline={multiline}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
