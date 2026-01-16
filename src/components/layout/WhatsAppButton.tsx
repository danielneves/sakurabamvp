import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
}

export function WhatsAppButton({
  phoneNumber = "14161234567",
  message = "Olá! Gostaria de uma orientação inicial sobre meu caso.",
  className,
}: WhatsAppButtonProps) {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-6 right-6 z-50 md:hidden",
        "flex items-center justify-center",
        "h-14 w-14 rounded-full",
        "bg-[#25D366] text-white shadow-lg",
        "hover:bg-[#20BA5C] hover:scale-110",
        "transition-all duration-300 ease-out",
        "animate-fade-in",
        className
      )}
      aria-label="Fale conosco no WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
      
      {/* Pulse animation */}
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-30 animate-ping" />
    </a>
  );
}
