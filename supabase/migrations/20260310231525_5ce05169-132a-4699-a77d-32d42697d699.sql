
ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS lang text NOT NULL DEFAULT 'both',
  ADD COLUMN IF NOT EXISTS service_id uuid REFERENCES public.services(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS theme text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS is_highlighted boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS is_featured boolean NOT NULL DEFAULT false;
