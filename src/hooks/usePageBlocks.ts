import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface PageBlock {
  id: string;
  page_slug: string;
  block_type: string;
  block_order: number;
  title_pt: string;
  title_en: string;
  subtitle_pt: string;
  subtitle_en: string;
  content: Record<string, any>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export function usePageBlocks(pageSlug: string) {
  return useQuery({
    queryKey: ["page_blocks", pageSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_blocks")
        .select("*")
        .eq("page_slug", pageSlug)
        .eq("is_active", true)
        .order("block_order", { ascending: true });
      if (error) throw error;
      return data as PageBlock[];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useAllPageBlocks(pageSlug: string) {
  return useQuery({
    queryKey: ["page_blocks_admin", pageSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_blocks")
        .select("*")
        .eq("page_slug", pageSlug)
        .order("block_order", { ascending: true });
      if (error) throw error;
      return data as PageBlock[];
    },
    staleTime: 0,
  });
}

export function usePageSlugs() {
  return useQuery({
    queryKey: ["page_slugs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_blocks")
        .select("page_slug")
        .order("page_slug");
      if (error) throw error;
      const slugs = [...new Set((data as { page_slug: string }[]).map(d => d.page_slug))];
      return slugs;
    },
    staleTime: 0,
  });
}
