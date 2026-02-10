import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface BilingualInputProps {
  label: string;
  valuePt: string;
  valueEn: string;
  onChangePt: (value: string) => void;
  onChangeEn: (value: string) => void;
  multiline?: boolean;
}

export function BilingualInput({ label, valuePt, valueEn, onChangePt, onChangeEn, multiline = false }: BilingualInputProps) {
  const Component = multiline ? Textarea : Input;

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <span className="text-xs text-muted-foreground mb-1 block">🇧🇷 Português</span>
          <Component value={valuePt} onChange={(e) => onChangePt(e.target.value)} />
        </div>
        <div>
          <span className="text-xs text-muted-foreground mb-1 block">🇨🇦 English</span>
          <Component value={valueEn} onChange={(e) => onChangeEn(e.target.value)} />
        </div>
      </div>
    </div>
  );
}
