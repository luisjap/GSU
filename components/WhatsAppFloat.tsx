import { MessageCircle } from 'lucide-react';
import { whatsappLink } from '@/lib/contact';

export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-5 left-5 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 hover:brightness-105 hover:scale-105 transition-all duration-200"
    >
      <MessageCircle size={26} strokeWidth={2} />
    </a>
  );
}
