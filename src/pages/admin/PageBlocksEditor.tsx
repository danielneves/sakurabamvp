import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAllPageBlocks, usePageSlugs, type PageBlock } from "@/hooks/usePageBlocks";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { IconPicker } from "@/components/admin/IconPicker";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { CtaLinkPicker } from "@/components/admin/CtaLinkPicker";
import { Plus, Save, Trash2, ArrowUp, ArrowDown, LayoutGrid, List, Type, Image, FileText, Newspaper } from "lucide-react";

const BLOCK_TYPES = [
  { value: "cards", label: "Bloco de Cards", icon: LayoutGrid },
  { value: "process_list", label: "Bloco de Listagem", icon: List },
  { value: "text_cta", label: "Texto + CTA", icon: Type },
  { value: "text_simple", label: "Texto Simples", icon: FileText },
  { value: "featured_image", label: "Imagem de Destaque", icon: Image },
  { value: "latest_posts", label: "Últimos Posts", icon: Newspaper },
];

const emptyBlock = (pageSlug: string, order: number): Partial<PageBlock> => ({
  page_slug: pageSlug,
  block_type: "cards",
  block_order: order,
  title_pt: "",
  title_en: "",
  subtitle_pt: "",
  subtitle_en: "",
  content: {},
  is_active: true,
});

export default function PageBlocksEditor() {
  const [pageSlug, setPageSlug] = useState("imigracao");
  const [newSlug, setNewSlug] = useState("");
  const { data: slugs } = usePageSlugs();
  const { data: blocks, refetch } = useAllPageBlocks(pageSlug);
  const [editBlocks, setEditBlocks] = useState<Partial<PageBlock>[]>([]);
  const [saving, setSaving] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (blocks) setEditBlocks(blocks.map(b => ({ ...b, content: { ...b.content } })));
  }, [blocks]);

  const addBlock = () => {
    setEditBlocks(prev => [...prev, emptyBlock(pageSlug, prev.length)]);
  };

  const removeBlock = (idx: number) => {
    setEditBlocks(prev => prev.filter((_, i) => i !== idx));
  };

  const moveBlock = (idx: number, dir: -1 | 1) => {
    setEditBlocks(prev => {
      const arr = [...prev];
      const target = idx + dir;
      if (target < 0 || target >= arr.length) return arr;
      [arr[idx], arr[target]] = [arr[target], arr[idx]];
      return arr.map((b, i) => ({ ...b, block_order: i }));
    });
  };

  const updateBlock = (idx: number, field: string, value: any) => {
    setEditBlocks(prev => prev.map((b, i) => i === idx ? { ...b, [field]: value } : b));
  };

  const updateContent = (idx: number, key: string, value: any) => {
    setEditBlocks(prev => prev.map((b, i) =>
      i === idx ? { ...b, content: { ...(b.content as any), [key]: value } } : b
    ));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Delete removed blocks
      const existingIds = (blocks ?? []).map(b => b.id);
      const keepIds = editBlocks.filter(b => b.id).map(b => b.id!);
      const deleteIds = existingIds.filter(id => !keepIds.includes(id));

      if (deleteIds.length > 0) {
        await supabase.from("page_blocks").delete().in("id", deleteIds);
      }

      for (let i = 0; i < editBlocks.length; i++) {
        const block = { ...editBlocks[i], block_order: i, page_slug: pageSlug };
        if (block.id) {
        const { id: blockId, created_at, updated_at, ...rest } = block;
          await supabase.from("page_blocks").update(rest as any).eq("id", blockId!);
        } else {
          const { id: _id, created_at, updated_at, ...rest } = block;
          await supabase.from("page_blocks").insert(rest as any);
        }
      }

      queryClient.invalidateQueries({ queryKey: ["page_blocks"] });
      queryClient.invalidateQueries({ queryKey: ["page_blocks_admin"] });
      queryClient.invalidateQueries({ queryKey: ["page_slugs"] });
      await refetch();
      toast({ title: "Blocos salvos com sucesso!" });
    } catch (e: any) {
      toast({ title: "Erro ao salvar", description: e.message, variant: "destructive" });
    }
    setSaving(false);
  };

  const handleCreatePage = () => {
    if (!newSlug.trim()) return;
    const slug = newSlug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
    setPageSlug(slug);
    setEditBlocks([emptyBlock(slug, 0)]);
    setNewSlug("");
  };

  const allSlugs = [...new Set([...(slugs ?? []), pageSlug])];

  return (
    <div className="space-y-6">
      {/* Sticky top bar */}
      <div className="sticky top-0 z-10 bg-secondary/95 backdrop-blur py-4 -mx-6 px-6 border-b border-border flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold text-foreground">Construtor de Páginas</h1>
        <div className="flex items-center gap-3">
          <Select value={pageSlug} onValueChange={setPageSlug}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {allSlugs.map(s => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2">
            <Input
              placeholder="nova-pagina"
              value={newSlug}
              onChange={e => setNewSlug(e.target.value)}
              className="w-36"
            />
            <Button variant="outline" size="sm" onClick={handleCreatePage}>Criar</Button>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </div>

      {/* Blocks */}
      {editBlocks.map((block, idx) => (
        <Card key={idx} className={!block.is_active ? "opacity-50" : ""}>
          <CardHeader className="flex-row items-center justify-between gap-4 space-y-0 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-1">
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveBlock(idx, -1)} disabled={idx === 0}>
                  <ArrowUp className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveBlock(idx, 1)} disabled={idx === editBlocks.length - 1}>
                  <ArrowDown className="h-3 w-3" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono text-muted-foreground">#{idx + 1}</span>
                <Select value={block.block_type} onValueChange={v => updateBlock(idx, "block_type", v)}>
                  <SelectTrigger className="w-52">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {BLOCK_TYPES.map(t => (
                      <SelectItem key={t.value} value={t.value}>
                        <span className="flex items-center gap-2">
                          <t.icon className="h-4 w-4" />
                          {t.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Label htmlFor={`active-${idx}`} className="text-sm">Ativo</Label>
                <Switch id={`active-${idx}`} checked={block.is_active} onCheckedChange={v => updateBlock(idx, "is_active", v)} />
              </div>
              <Button variant="destructive" size="icon" onClick={() => removeBlock(idx)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Title & Subtitle bilingual */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Título (PT)</Label>
                <Input value={block.title_pt ?? ""} onChange={e => updateBlock(idx, "title_pt", e.target.value)} />
              </div>
              <div>
                <Label>Título (EN)</Label>
                <Input value={block.title_en ?? ""} onChange={e => updateBlock(idx, "title_en", e.target.value)} />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Subtítulo (PT)</Label>
                <Textarea value={block.subtitle_pt ?? ""} onChange={e => updateBlock(idx, "subtitle_pt", e.target.value)} rows={2} />
              </div>
              <div>
                <Label>Subtítulo (EN)</Label>
                <Textarea value={block.subtitle_en ?? ""} onChange={e => updateBlock(idx, "subtitle_en", e.target.value)} rows={2} />
              </div>
            </div>

            {/* Block-type specific editors */}
            <BlockContentEditor
              blockType={block.block_type ?? "cards"}
              content={(block.content ?? {}) as Record<string, any>}
              onUpdate={(key, val) => updateContent(idx, key, val)}
            />
          </CardContent>
        </Card>
      ))}

      <Button variant="outline" onClick={addBlock} className="w-full border-dashed">
        <Plus className="h-4 w-4 mr-2" />
        Adicionar Bloco
      </Button>
    </div>
  );
}

// ---- Sub-editors per block type ----

function BlockContentEditor({
  blockType,
  content,
  onUpdate,
}: {
  blockType: string;
  content: Record<string, any>;
  onUpdate: (key: string, value: any) => void;
}) {
  switch (blockType) {
    case "cards":
      return <CardsEditor content={content} onUpdate={onUpdate} />;
    case "process_list":
      return <ProcessListEditor content={content} onUpdate={onUpdate} />;
    case "text_cta":
      return <TextCtaEditor content={content} onUpdate={onUpdate} />;
    case "text_simple":
      return <TextSimpleEditor content={content} onUpdate={onUpdate} />;
    case "featured_image":
      return <FeaturedImageEditor content={content} onUpdate={onUpdate} />;
    case "latest_posts":
      return <LatestPostsEditor content={content} onUpdate={onUpdate} />;
    default:
      return null;
  }
}

function CardsEditor({ content, onUpdate }: { content: Record<string, any>; onUpdate: (k: string, v: any) => void }) {
  const cards: any[] = content.cards ?? [];

  const addCard = () => {
    if (cards.length >= 6) return;
    onUpdate("cards", [...cards, { icon: "Scale", title_pt: "", title_en: "", description_pt: "", description_en: "" }]);
  };

  const updateCard = (idx: number, field: string, value: string) => {
    onUpdate("cards", cards.map((c, i) => i === idx ? { ...c, [field]: value } : c));
  };

  const removeCard = (idx: number) => {
    onUpdate("cards", cards.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Label>Colunas</Label>
        <Select value={String(content.columns ?? 2)} onValueChange={v => onUpdate("columns", Number(v))}>
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {cards.map((card, idx) => (
        <Card key={idx} className="bg-muted/50">
          <CardContent className="pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">Card {idx + 1}</Label>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeCard(idx)}>
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
            <div>
              <Label className="text-xs">Ícone</Label>
              <IconPicker value={card.icon ?? ""} onChange={v => updateCard(idx, "icon", v)} />
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Título (PT)</Label>
                <Input value={card.title_pt ?? ""} onChange={e => updateCard(idx, "title_pt", e.target.value)} />
              </div>
              <div>
                <Label className="text-xs">Título (EN)</Label>
                <Input value={card.title_en ?? ""} onChange={e => updateCard(idx, "title_en", e.target.value)} />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Descrição (PT)</Label>
                <Textarea value={card.description_pt ?? ""} onChange={e => updateCard(idx, "description_pt", e.target.value)} rows={2} />
              </div>
              <div>
                <Label className="text-xs">Descrição (EN)</Label>
                <Textarea value={card.description_en ?? ""} onChange={e => updateCard(idx, "description_en", e.target.value)} rows={2} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {cards.length < 6 && (
        <Button variant="outline" size="sm" onClick={addCard}>
          <Plus className="h-3 w-3 mr-1" /> Adicionar Card ({cards.length}/6)
        </Button>
      )}
    </div>
  );
}

function ProcessListEditor({ content, onUpdate }: { content: Record<string, any>; onUpdate: (k: string, v: any) => void }) {
  const steps: any[] = content.steps ?? [];

  const addStep = () => {
    onUpdate("steps", [...steps, { text_pt: "", text_en: "" }]);
  };

  const updateStep = (idx: number, field: string, value: string) => {
    onUpdate("steps", steps.map((s, i) => i === idx ? { ...s, [field]: value } : s));
  };

  const removeStep = (idx: number) => {
    onUpdate("steps", steps.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-3">
      {steps.map((step, idx) => (
        <div key={idx} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
          <span className="h-8 w-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
            {idx + 1}
          </span>
          <div className="flex-1 grid md:grid-cols-2 gap-3">
            <Input placeholder="Passo (PT)" value={step.text_pt ?? ""} onChange={e => updateStep(idx, "text_pt", e.target.value)} />
            <Input placeholder="Step (EN)" value={step.text_en ?? ""} onChange={e => updateStep(idx, "text_en", e.target.value)} />
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0" onClick={() => removeStep(idx)}>
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={addStep}>
        <Plus className="h-3 w-3 mr-1" /> Adicionar Passo
      </Button>
    </div>
  );
}

function TextCtaEditor({ content, onUpdate }: { content: Record<string, any>; onUpdate: (k: string, v: any) => void }) {
  return (
    <div className="space-y-3">
      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <Label className="text-xs">Texto do Botão (PT)</Label>
          <Input value={content.cta_text_pt ?? ""} onChange={e => onUpdate("cta_text_pt", e.target.value)} />
        </div>
        <div>
          <Label className="text-xs">Button Text (EN)</Label>
          <Input value={content.cta_text_en ?? ""} onChange={e => onUpdate("cta_text_en", e.target.value)} />
        </div>
      </div>
      <CtaLinkPicker value={content.cta_link ?? "/contato"} onChange={v => onUpdate("cta_link", v)} />
    </div>
  );
}

function TextSimpleEditor({ content, onUpdate }: { content: Record<string, any>; onUpdate: (k: string, v: any) => void }) {
  const itemsPt: string[] = content.items_pt ?? [];
  const itemsEn: string[] = content.items_en ?? [];

  const addItem = () => {
    onUpdate("items_pt", [...itemsPt, ""]);
    onUpdate("items_en", [...itemsEn, ""]);
  };

  const updateItem = (lang: "pt" | "en", idx: number, value: string) => {
    const key = `items_${lang}`;
    const arr = lang === "pt" ? [...itemsPt] : [...itemsEn];
    arr[idx] = value;
    onUpdate(key, arr);
  };

  const removeItem = (idx: number) => {
    onUpdate("items_pt", itemsPt.filter((_, i) => i !== idx));
    onUpdate("items_en", itemsEn.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-3">
      {itemsPt.map((_, idx) => (
        <div key={idx} className="flex items-center gap-3">
          <Input placeholder="Item (PT)" value={itemsPt[idx] ?? ""} onChange={e => updateItem("pt", idx, e.target.value)} />
          <Input placeholder="Item (EN)" value={itemsEn[idx] ?? ""} onChange={e => updateItem("en", idx, e.target.value)} />
          <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0" onClick={() => removeItem(idx)}>
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      ))}
      <Button variant="outline" size="sm" onClick={addItem}>
        <Plus className="h-3 w-3 mr-1" /> Adicionar Item
      </Button>
    </div>
  );
}

function FeaturedImageEditor({ content, onUpdate }: { content: Record<string, any>; onUpdate: (k: string, v: any) => void }) {
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-xs">Imagem</Label>
        <ImageUploader
          label="Imagem de destaque"
          currentUrl={content.image_url ?? ""}
          onUpload={v => onUpdate("image_url", v)}
          folder="pages"
        />
      </div>
      <div>
        <Label className="text-xs">Alt text</Label>
        <Input value={content.image_alt ?? ""} onChange={e => onUpdate("image_alt", e.target.value)} />
      </div>
      <div>
        <Label className="text-xs">Posição da imagem</Label>
        <Select value={content.image_position ?? "left"} onValueChange={v => onUpdate("image_position", v)}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Esquerda</SelectItem>
            <SelectItem value="right">Direita</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <Label className="text-xs">Corpo (PT)</Label>
          <Textarea value={content.body_pt ?? ""} onChange={e => onUpdate("body_pt", e.target.value)} rows={5} />
        </div>
        <div>
          <Label className="text-xs">Body (EN)</Label>
          <Textarea value={content.body_en ?? ""} onChange={e => onUpdate("body_en", e.target.value)} rows={5} />
        </div>
      </div>
    </div>
  );
}

function LatestPostsEditor({ content, onUpdate }: { content: Record<string, any>; onUpdate: (k: string, v: any) => void }) {
  return (
    <div className="space-y-3">
      <div>
        <Label className="text-xs">Máximo de posts</Label>
        <Input type="number" value={content.max_posts ?? 3} onChange={e => onUpdate("max_posts", Number(e.target.value))} className="w-24" />
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <Label className="text-xs">Filtrar categorias (PT) - separar por vírgula</Label>
          <Input
            value={(content.categories_pt ?? []).join(", ")}
            onChange={e => onUpdate("categories_pt", e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean))}
          />
        </div>
        <div>
          <Label className="text-xs">Filter categories (EN) - comma separated</Label>
          <Input
            value={(content.categories_en ?? []).join(", ")}
            onChange={e => onUpdate("categories_en", e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean))}
          />
        </div>
      </div>
    </div>
  );
}
