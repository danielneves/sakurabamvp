interface Props {
  title: string;
  subtitle: string;
  content: {
    image_url?: string;
    image_alt?: string;
    body_pt?: string;
    body_en?: string;
    image_position?: "left" | "right";
  };
  lang: "pt" | "en";
}

export function FeaturedImageBlock({ title, subtitle, content, lang }: Props) {
  const body = lang === "pt" ? content.body_pt : content.body_en;
  const imageFirst = content.image_position !== "right";

  return (
    <section className="py-20">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {imageFirst && (
            <div className="aspect-[4/5] rounded-lg overflow-hidden shadow-xl sticky top-24">
              {content.image_url && (
                <img
                  src={content.image_url}
                  alt={content.image_alt || title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          )}

          <div>
            {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
            {subtitle && <p className="text-accent font-medium mb-6">{subtitle}</p>}
            {body && (
              <div
                className="text-lg text-muted-foreground leading-relaxed prose prose-lg"
                dangerouslySetInnerHTML={{ __html: body }}
              />
            )}
          </div>

          {!imageFirst && (
            <div className="aspect-[4/5] rounded-lg overflow-hidden shadow-xl sticky top-24">
              {content.image_url && (
                <img
                  src={content.image_url}
                  alt={content.image_alt || title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
