export const WHATSAPP_NUMBER = '56998501325';
export const WHATSAPP_DEFAULT_MESSAGE = 'Hola, quiero consultar sobre sus servicios de ingeniería y mantenimiento.';

export function whatsappLink(message: string = WHATSAPP_DEFAULT_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
