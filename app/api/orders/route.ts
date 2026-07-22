import { NextRequest, NextResponse } from 'next/server';
import { orderSchema } from '@/lib/validation';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = orderSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Datos inválidos' },
      { status: 400 },
    );
  }

  const { name, email, phone, address, comuna, notes, items, total } = parsed.data;

  const orderId = `GSU-${Date.now().toString(36).toUpperCase()}`;
  const itemsSummary = items.map((i) => `${i.quantity}x ${i.name} ($${i.price.toLocaleString('es-CL')})`).join(' | ');

  console.log(
    `[pedido ${orderId}] ${new Date().toISOString()} — ${name} <${email}> · ${phone}${
      address ? ` · ${address}${comuna ? ', ' + comuna : ''}` : ''
    } — Total: $${total.toLocaleString('es-CL')} — Items: ${itemsSummary}${notes ? ` — Notas: ${notes}` : ''}`,
  );

  return NextResponse.json({ ok: true, orderId });
}
