import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";

interface ImageUploaderProps {
  label: string;
  currentUrl?: string | null;
  onUpload: (url: string) => void;
  folder?: string;
}

export function ImageUploader({ label, currentUrl, onUpload, folder = "uploads" }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${folder}/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("images").upload(path, file);
    if (error) {
      console.error("Upload error:", error);
      setUploading(false);
      return;
    }
    const { data: { publicUrl } } = supabase.storage.from("images").getPublicUrl(path);
    onUpload(publicUrl);
    setUploading(false);
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {currentUrl && (
        <div className="relative w-32 h-32">
          <img src={currentUrl} alt="" className="w-full h-full object-cover rounded-md border border-border" />
          <button onClick={() => onUpload("")} className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1">
            <X className="h-3 w-3" />
          </button>
        </div>
      )}
      <div className="flex items-center gap-2">
        <Input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} className="max-w-xs" />
        {uploading && <span className="text-sm text-muted-foreground">Enviando...</span>}
      </div>
    </div>
  );
}
