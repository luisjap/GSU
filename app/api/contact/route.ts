import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validation';
import { prisma } from '@/lib/prisma';

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

  if (process.env.DATABASE_URL) {
    try {
      await prisma.contactRequest.create({ data: { name, email, message, service } });
    } catch (err) {
      console.error('[contact] error al guardar en la base de datos:', err);
    }
  }

  console.log(
    `[propuesta técnica] ${new Date().toISOString()} — ${name} <${email}>${service ? ` · ${service}` : ''}: ${message}`,
  );

  return NextResponse.json({ ok: true });
}
