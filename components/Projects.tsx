'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Badge } from '@relume_io/relume-ui';

interface Preview {
  domain: string;
  favicon: string;
  image: string;
  title: string | null;
  description: string | null;
}

interface Project {
  id: string;
  title: string;
  description?: string;
  longDescription?: string;
  category: string;
  status?: string;
  tech?: string[];
  thumbnail?: string;
  demoUrl?: string;
  repoUrl?: string;
  featured?: boolean;
  year?: number;
  preview?: Preview | null;
}

const CATS = ['todos', 'personal', 'cliente'];

function Modal({ project, onClose }: { project: Project; onClose: () => void }) {
  const { title, description, longDescription, tech, thumbnail, preview, demoUrl, repoUrl, year } = project;
  const image = preview?.image || thumbnail;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#111827] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* image */}
        {image && (
          <div className="relative w-full h-52 bg-[#0b1220]">
            <Image src={image} alt={title} fill className="object-cover object-top" unoptimized />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#111827] to-transparent" />
          </div>
        )}

        {/* close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-white font-display font-bold text-xl leading-snug">{title}</h3>
            {year && <span className="text-white/30 text-sm shrink-0">{year}</span>}
          </div>

          {(longDescription || description) && (
            <p className="text-white/60 text-sm leading-relaxed">{longDescription || description}</p>
          )}

          {tech && tech.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tech.map((t) => (
                <span key={t} className="text-[11px] text-white/50 bg-white/[0.05] border border-white/[0.08] px-2.5 py-1 rounded-full">
                  {t}
                </span>
              ))}
            </div>
          )}

          {(demoUrl || repoUrl) && (
            <div className="flex gap-3 pt-1">
              {demoUrl && (
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-[#0b1220] font-semibold text-sm px-4 py-2 rounded-full transition-colors"
                >
                  Ver en vivo
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
              {repoUrl && (
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 border border-white/10 text-white/60 hover:text-white hover:border-white/20 text-sm px-4 py-2 rounded-full transition-colors"
                >
                  Repositorio
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const { title, description, tech, demoUrl, category, preview, thumbnail } = project;

  const handleClick = () => { if (!demoUrl) onOpen(); };

  return (
    <div
      onClick={handleClick}
      className={`group relative flex flex-col rounded-2xl bg-white/[0.03] border border-white/[0.07] overflow-hidden hover:border-white/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40 h-full cursor-pointer`}
    >
      {demoUrl && (
        <a
          href={demoUrl}
          target={demoUrl.startsWith('/') ? '_self' : '_blank'}
          rel={demoUrl.startsWith('/') ? undefined : 'noopener noreferrer'}
          aria-label={`Ver proyecto ${title}`}
          className="absolute inset-0 z-10"
        />
      )}

      {/* screenshot */}
      <div className="relative w-full h-44 bg-[#111827] overflow-hidden shrink-0">
        {(preview?.image || thumbnail) ? (
          <Image
            src={preview?.image || thumbnail!}
            alt={title}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width:768px) 100vw, 33vw"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-2xl">
              {category === 'cliente' ? '💼' : '⚙️'}
            </div>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0b1220] to-transparent" />

        {preview?.favicon && preview?.domain && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#0b1220]/80 backdrop-blur-sm border border-white/10 rounded-full px-2.5 py-1">
            <Image src={preview.favicon} alt="" width={12} height={12} unoptimized className="rounded-sm" />
            <span className="text-white/60 text-[11px] font-medium">{preview.domain}</span>
          </div>
        )}

        {project.featured && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full">
              Destacado
            </Badge>
          </div>
        )}
      </div>

      {/* body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="text-white font-display font-semibold text-base leading-snug group-hover:text-gradient transition-all line-clamp-2">
          {title}
        </h3>
        {description && (
          <p className="text-white/40 text-sm leading-relaxed line-clamp-3">{description}</p>
        )}
        {tech && (
          <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
            {tech.slice(0, 4).map((t) => (
              <span key={t} className="text-[11px] text-white/40 bg-white/[0.04] border border-white/[0.06] px-2 py-0.5 rounded-full">
                {t}
              </span>
            ))}
          </div>
        )}
        <span className="mt-2 inline-flex items-center gap-1.5 text-emerald-400 group-hover:text-emerald-300 text-sm font-medium transition-colors">
          {demoUrl ? 'Ver proyecto' : 'Ver detalles'}
          <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={demoUrl ? 'M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' : 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'} />
          </svg>
        </span>
      </div>
    </div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [cat, setCat] = useState('todos');
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    fetch('/api/projects')
      .then((r) => r.json())
      .then((data) => { setProjects(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = cat === 'todos' ? projects : projects.filter((p) => p.category === cat);

  return (
    <>
      {selected && <Modal project={selected} onClose={() => setSelected(null)} />}

      <section id="proyectos" className="bg-[#0d1526] py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-emerald-400 text-sm font-semibold tracking-widest uppercase">Proyectos</span>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white">
                Trabajo real,<br />resultados medibles
              </h2>
            </div>
            <div className="flex gap-2 bg-white/[0.03] border border-white/[0.07] rounded-full p-1 self-start">
              {CATS.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all duration-200 ${
                    cat === c
                      ? 'bg-emerald-500 text-[#0b1220] shadow-lg shadow-emerald-500/20'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-72 rounded-2xl bg-white/[0.03] border border-white/[0.05] animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((p) => (
                <ProjectCard key={p.id} project={p} onOpen={() => setSelected(p)} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
