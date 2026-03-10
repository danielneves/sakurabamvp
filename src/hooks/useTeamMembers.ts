import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type TeamMember = Tables<"team_members"> & { bio_pt?: string; bio_en?: string; show_on_home?: boolean };

export function useTeamMembers(homeOnly = false) {
  return useQuery({
    queryKey: ["team_members", homeOnly],
    queryFn: async () => {
      let query = supabase
        .from("team_members")
        .select("*")
        .eq("is_active", true)
        .order("display_order");
      if (homeOnly) {
        query = query.eq("show_on_home", true);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data as TeamMember[];
    },
    staleTime: 5 * 60 * 1000,
  });
}
