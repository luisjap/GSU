import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validation';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Datos inválidos' },
      { status: 400 },
    );
  }

  const { name, email, message, service } = parsed.data;

  console.log(
    `[propuesta técnica] ${new Date().toISOString()} — ${name} <${email}>${service ? ` · ${service}` : ''}: ${message}`,
  );

  return NextResponse.json({ ok: true });
}
