import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export function useBlogPosts(onlyPublished = true) {
  return useQuery({
    queryKey: ["blog_posts", onlyPublished],
    queryFn: async () => {
      let query = supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
      if (onlyPublished) query = query.eq("published", true);
      const { data, error } = await query;
      if (error) throw error;
      return data as Tables<"blog_posts">[];
    },
    staleTime: 5 * 60 * 1000,
  });
}
