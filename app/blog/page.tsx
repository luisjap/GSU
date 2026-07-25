import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog — GSU',
  description: 'Contenido técnico sobre ingeniería eléctrica, climatización, gasfitería y mantenimiento integral.',
};

export default function BlogIndexPage() {
  return (
    <main className="bg-white py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="relative mb-14 max-w-2xl rounded-2xl overflow-hidden">
          <Image
            src="/images/library/textura-ductos.webp"
            alt=""
            aria-hidden="true"
            fill
            sizes="(max-width: 672px) 100vw, 672px"
            className="object-cover opacity-[0.08]"
          />
          <div className="relative p-8">
            <span className="text-brand text-sm font-semibold tracking-widest uppercase">Blog</span>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0A2342] leading-tight">
              Contenido técnico,<br />sin relleno
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl bg-[#E8ECEF] border border-black/[0.05] overflow-hidden hover:bg-white hover:shadow-lg hover:shadow-black/[0.05] transition-all duration-300"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={`/images/library/${post.image}.webp`}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-7 flex flex-col flex-1">
                <span className="text-brand text-[11px] font-semibold tracking-widest uppercase">{post.category}</span>
                <h2 className="mt-3 text-[#0A2342] font-display font-semibold text-xl leading-snug">{post.title}</h2>
                <p className="mt-3 text-[#4B4F54] text-sm leading-relaxed flex-1">{post.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-brand font-semibold text-sm">
                  Leer más
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
