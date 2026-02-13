import { useState, useMemo } from "react";
import { icons } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";

interface IconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
  label?: string;
}

const popularIcons = [
  "Heart", "Home", "Building2", "FileCheck", "Scale", "Plane",
  "Users", "Shield", "Briefcase", "GraduationCap", "Globe",
  "Phone", "Mail", "MapPin", "Clock", "Calendar",
  "Star", "Award", "BookOpen", "Gavel", "HandShake",
  "FileText", "Landmark", "CircleDollarSign", "Baby", "Car",
];

export function IconPicker({ value, onChange, label }: IconPickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const allIconNames = useMemo(() => Object.keys(icons), []);

  const filteredIcons = useMemo(() => {
    if (!search) return popularIcons;
    const q = search.toLowerCase();
    return allIconNames.filter((name) => name.toLowerCase().includes(q)).slice(0, 60);
  }, [search, allIconNames]);

  const SelectedIcon = icons[value as keyof typeof icons];

  return (
    <div>
      {label && <Label className="mb-1.5 block">{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start gap-3 h-10">
            {SelectedIcon ? (
              <SelectedIcon className="h-4 w-4 text-primary" />
            ) : (
              <div className="h-4 w-4 rounded bg-muted" />
            )}
            <span className="text-sm">{value || "Selecionar ícone..."}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-3" align="start">
          <div className="relative mb-3">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Buscar ícone..."
              className="pl-8 h-8 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          </div>
          {!search && (
            <p className="text-xs text-muted-foreground mb-2">Populares</p>
          )}
          <ScrollArea className="h-52">
            <div className="grid grid-cols-6 gap-1">
              {filteredIcons.map((name) => {
                const Icon = icons[name as keyof typeof icons];
                if (!Icon) return null;
                return (
                  <button
                    key={name}
                    type="button"
                    title={name}
                    onClick={() => { onChange(name); setOpen(false); setSearch(""); }}
                    className={`flex items-center justify-center h-9 w-full rounded-md transition-colors hover:bg-muted ${
                      value === name ? "bg-primary/10 ring-1 ring-primary" : ""
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                );
              })}
            </div>
            {filteredIcons.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">Nenhum ícone encontrado</p>
            )}
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  );
}
