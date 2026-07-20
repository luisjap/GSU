import { NextRequest, NextResponse } from 'next/server';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { name, email, phone, address, comuna, notes, items, total } = body as {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    comuna?: string;
    notes?: string;
    items?: OrderItem[];
    total?: number;
  };

  if (!name || !email || !phone || !items || items.length === 0) {
    return NextResponse.json(
      { error: 'Nombre, email, teléfono y al menos un producto son obligatorios' },
      { status: 400 },
    );
  }

  const orderId = `GSU-${Date.now().toString(36).toUpperCase()}`;
  const itemsSummary = items.map((i) => `${i.quantity}x ${i.name} ($${i.price.toLocaleString('es-CL')})`).join(' | ');

  console.log(
    `[pedido ${orderId}] ${new Date().toISOString()} — ${name} <${email}> · ${phone}${
      address ? ` · ${address}${comuna ? ', ' + comuna : ''}` : ''
    } — Total: $${(total ?? 0).toLocaleString('es-CL')} — Items: ${itemsSummary}${notes ? ` — Notas: ${notes}` : ''}`,
  );

  return NextResponse.json({ ok: true, orderId });
}
