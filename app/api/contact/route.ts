import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { name, email, message, service } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Nombre, email y mensaje son obligatorios' },
      { status: 400 },
    );
  }

  console.log(
    `[cotización] ${new Date().toISOString()} — ${name} <${email}>${service ? ` · ${service}` : ''}: ${message}`,
  );

  return NextResponse.json({ ok: true });
}
