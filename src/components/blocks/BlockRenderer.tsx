import type { PageBlock } from "@/hooks/usePageBlocks";
import { CardsBlock } from "./CardsBlock";
import { ProcessListBlock } from "./ProcessListBlock";
import { TextCtaBlock } from "./TextCtaBlock";
import { TextSimpleBlock } from "./TextSimpleBlock";
import { FeaturedImageBlock } from "./FeaturedImageBlock";
import { LatestPostsBlock } from "./LatestPostsBlock";

interface Props {
  block: PageBlock;
  lang: "pt" | "en";
}

export function BlockRenderer({ block, lang }: Props) {
  const title = lang === "pt" ? block.title_pt : block.title_en;
  const subtitle = lang === "pt" ? block.subtitle_pt : block.subtitle_en;
  const content = block.content as Record<string, any>;

  switch (block.block_type) {
    case "cards":
      return <CardsBlock title={title} subtitle={subtitle} content={content} lang={lang} />;
    case "process_list":
      return <ProcessListBlock title={title} subtitle={subtitle} content={content} lang={lang} />;
    case "text_cta":
      return <TextCtaBlock title={title} subtitle={subtitle} content={content} lang={lang} />;
    case "text_simple":
      return <TextSimpleBlock title={title} subtitle={subtitle} content={content} lang={lang} />;
    case "featured_image":
      return <FeaturedImageBlock title={title} subtitle={subtitle} content={content} lang={lang} />;
    case "latest_posts":
      return <LatestPostsBlock title={title} subtitle={subtitle} content={content} lang={lang} />;
    default:
      return null;
  }
}
