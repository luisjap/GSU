import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const PREVIEW_TTL = 24 * 60 * 60 * 1000;
const cache = new Map<string, { at: number; data: Preview }>();

interface Preview {
  domain: string;
  favicon: string;
  image: string;
  title: string | null;
  description: string | null;
}

function pickMeta(html: string, prop: string) {
  const a = html.match(new RegExp(`<meta[^>]+(?:property|name)=["']${prop}["'][^>]*content=["']([^"']+)["']`, 'i'));
  if (a) return a[1];
  const b = html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]*(?:property|name)=["']${prop}["']`, 'i'));
  return b ? b[1] : null;
}

async function linkPreview(url: string): Promise<Preview> {
  const hit = cache.get(url);
  if (hit && Date.now() - hit.at < PREVIEW_TTL) return hit.data;

  const host = new URL(url).hostname;
  const data: Preview = {
    domain: host,
    favicon: `https://www.google.com/s2/favicons?domain=${host}&sz=64`,
    image: `https://image.thum.io/get/width/640/crop/400/${url}`,
    title: null,
    description: null,
  };
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      signal: AbortSignal.timeout(6000),
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; LuDevPreview/1.0)' },
    });
    const html = await res.text();
    const og = pickMeta(html, 'og:image');
    if (og) data.image = new URL(og, url).href;
    data.title = pickMeta(html, 'og:title') ?? html.match(/<title[^>]*>([^<]*)/i)?.[1] ?? null;
    data.description = pickMeta(html, 'og:description') ?? pickMeta(html, 'description');
  } catch (e) {
    console.warn(`Preview ${host}: usando screenshot`, (e as Error).message);
  }
  cache.set(url, { at: Date.now(), data });
  return data;
}

export async function GET() {
  try {
    const raw = fs.readFileSync(path.join(process.cwd(), 'data', 'projects.json'), 'utf8');
    const projects = JSON.parse(raw);
    const enriched = await Promise.all(
      projects.map(async (p: Record<string, unknown>) => ({
        ...p,
        preview: p.demoUrl ? await linkPreview(p.demoUrl as string).catch(() => null) : null,
      })),
    );
    return NextResponse.json(enriched);
  } catch {
    return NextResponse.json({ error: 'No se pudieron cargar los proyectos' }, { status: 500 });
  }
}
