import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { BLOG_POSTS, getBlogPost } from '@/lib/blog';

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getBlogPost(params.slug);
  if (!post) return {};
  return { title: `${post.title} — GSU Ingeniería y Mantenimiento`, description: post.excerpt };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  return (
    <main className="bg-white py-20 px-4 sm:px-6">
      <article className="max-w-2xl mx-auto">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-[#4B4F54] hover:text-[#0A2342] text-sm mb-8 transition-colors">
          <ArrowLeft size={15} />
          Volver al blog
        </Link>

        <span className="text-brand text-[11px] font-semibold tracking-widest uppercase">{post.category}</span>
        <h1 className="mt-3 text-3xl sm:text-4xl font-display font-bold text-[#0A2342] leading-tight">{post.title}</h1>
        <time className="mt-4 block text-[#4B4F54] text-sm" dateTime={post.date}>
          {new Date(post.date).toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' })}
        </time>

        <div className="mt-8 flex flex-col gap-5">
          {post.content.map((p, i) => (
            <p key={i} className="text-[#0A2342]/90 text-base leading-relaxed">{p}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
