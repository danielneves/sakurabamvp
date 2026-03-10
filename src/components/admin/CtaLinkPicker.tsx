import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const INTERNAL_PAGES = [
  { value: "/", label: "Home" },
  { value: "/imigracao", label: "Imigração" },
  { value: "/familia", label: "Direito Familiar" },
  { value: "/empresas", label: "Empresas" },
  { value: "/sobre", label: "Sobre Nós" },
  { value: "/contato", label: "Contato" },
  { value: "/blog", label: "Blog" },
];

interface CtaLinkPickerProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export function CtaLinkPicker({ value, onChange, label = "Link do botão" }: CtaLinkPickerProps) {
  const isInternal = INTERNAL_PAGES.some(p => p.value === value) || value.startsWith("/p/");
  const [mode, setMode] = useState<string>(isInternal ? "internal" : "external");

  return (
    <div className="space-y-2">
      <Label className="text-xs">{label}</Label>
      <Tabs value={mode} onValueChange={setMode} className="w-full">
        <TabsList className="h-8">
          <TabsTrigger value="internal" className="text-xs px-3 h-7">Página Interna</TabsTrigger>
          <TabsTrigger value="external" className="text-xs px-3 h-7">URL Externa</TabsTrigger>
        </TabsList>
        <TabsContent value="internal" className="mt-2">
          <Select value={isInternal ? value : ""} onValueChange={onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma página" />
            </SelectTrigger>
            <SelectContent>
              {INTERNAL_PAGES.map(p => (
                <SelectItem key={p.value} value={p.value}>{p.label} <span className="text-muted-foreground ml-2 text-xs">{p.value}</span></SelectItem>
              ))}
            </SelectContent>
          </Select>
        </TabsContent>
        <TabsContent value="external" className="mt-2">
          <Input
            placeholder="https://exemplo.com"
            value={!isInternal ? value : ""}
            onChange={e => onChange(e.target.value)}
          />
        </TabsContent>
      </Tabs>
      {value && (
        <p className="text-xs text-muted-foreground">Atual: <code className="bg-muted px-1 rounded">{value}</code></p>
      )}
    </div>
  );
}
