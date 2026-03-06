
-- Block types: cards, process_list, text_cta, text_simple, featured_image, latest_posts
CREATE TABLE public.page_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug text NOT NULL,
  block_type text NOT NULL,
  block_order integer NOT NULL DEFAULT 0,
  title_pt text NOT NULL DEFAULT '',
  title_en text NOT NULL DEFAULT '',
  subtitle_pt text NOT NULL DEFAULT '',
  subtitle_en text NOT NULL DEFAULT '',
  content jsonb NOT NULL DEFAULT '{}',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE public.page_blocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read page_blocks" ON public.page_blocks
  FOR SELECT USING (true);

CREATE POLICY "Staff can modify page_blocks" ON public.page_blocks
  FOR ALL USING (
    has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role)
  ) WITH CHECK (
    has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'editor'::app_role)
  );

-- Trigger for updated_at
CREATE TRIGGER update_page_blocks_updated_at
  BEFORE UPDATE ON public.page_blocks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
