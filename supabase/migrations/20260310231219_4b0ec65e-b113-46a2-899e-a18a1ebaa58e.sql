
ALTER TABLE public.team_members
  ADD COLUMN IF NOT EXISTS bio_pt text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS bio_en text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS show_on_home boolean NOT NULL DEFAULT true;

-- Migrate existing quote data to bio
UPDATE public.team_members SET bio_pt = quote_pt, bio_en = quote_en WHERE quote_pt != '' OR quote_en != '';
