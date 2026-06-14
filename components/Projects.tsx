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

function ProjectCard({ project }: { project: Project }) {
  const { title, description, tech, demoUrl, category, preview, thumbnail } = project;

  return (
    <div className={`group relative flex flex-col rounded-2xl bg-white/[0.03] border border-white/[0.07] overflow-hidden hover:border-white/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40 h-full${demoUrl ? ' cursor-pointer' : ''}`}>
      {demoUrl && (
        <a
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
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
        {/* gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0b1220] to-transparent" />

        {/* domain chip */}
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
        {demoUrl && (
          <span className="mt-2 inline-flex items-center gap-1.5 text-emerald-400 group-hover:text-emerald-300 text-sm font-medium transition-colors">
            Ver proyecto
            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </span>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [cat, setCat] = useState('todos');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then((r) => r.json())
      .then((data) => { setProjects(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = cat === 'todos' ? projects : projects.filter((p) => p.category === cat);

  return (
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
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
