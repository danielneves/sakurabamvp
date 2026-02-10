import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useSiteContent() {
  return useQuery({
    queryKey: ["site_content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*");
      if (error) throw error;
      const map: Record<string, { pt: string; en: string }> = {};
      data?.forEach((row) => {
        map[row.section_key] = { pt: row.content_pt, en: row.content_en };
      });
      return map;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useContent(key: string, lang: "pt" | "en", fallback: string) {
  const { data } = useSiteContent();
  return data?.[key]?.[lang] ?? fallback;
}
