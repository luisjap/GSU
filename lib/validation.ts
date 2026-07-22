import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Ingresa tu nombre completo'),
  email: z.string().trim().email('Ingresa un email válido'),
  service: z.string().optional(),
  message: z.string().trim().min(10, 'Cuéntanos con un poco más de detalle qué necesitas'),
});

export type ContactInput = z.infer<typeof contactSchema>;

const orderItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().nonnegative(),
  quantity: z.number().int().positive(),
});

export const orderSchema = z.object({
  name: z.string().trim().min(2, 'Ingresa tu nombre completo'),
  email: z.string().trim().email('Ingresa un email válido'),
  phone: z.string().trim().min(6, 'Ingresa un teléfono válido'),
  address: z.string().trim().optional(),
  comuna: z.string().trim().optional(),
  notes: z.string().trim().optional(),
  items: z.array(orderItemSchema).min(1, 'El carrito está vacío'),
  total: z.number().nonnegative(),
});

export type OrderInput = z.infer<typeof orderSchema>;
