import { useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { usePageBlocks } from "@/hooks/usePageBlocks";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";

const DynamicPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [lang, setLang] = useState<"pt" | "en">("pt");
  const { data: blocks, isLoading } = usePageBlocks(slug ?? "");

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={lang} onLanguageChange={setLang} />

      <main className="flex-1">
        {isLoading && (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">Carregando...</p>
          </div>
        )}
        {blocks?.map((block) => (
          <BlockRenderer key={block.id} block={block} lang={lang} />
        ))}
        {!isLoading && (!blocks || blocks.length === 0) && (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">Página não encontrada.</p>
          </div>
        )}
      </main>

      <Footer lang={lang} />
      <WhatsAppButton />
    </div>
  );
};

export default DynamicPage;
