const TECHS = [
  'Next.js', 'React', 'TypeScript', 'Node.js', 'NestJS', 'PostgreSQL',
  'Redis', 'Tailwind CSS', 'Railway', 'Vercel', 'Stripe', 'WhatsApp API',
  'Google Sheets', 'Resend', 'Framer Motion', 'Docker',
];

export default function Marquee() {
  const items = [...TECHS, ...TECHS];
  return (
    <div className="bg-[#0b1220] border-y border-white/[0.05] py-5 overflow-hidden">
      <div
        className="flex gap-10 w-max"
        style={{ animation: 'marquee 36s linear infinite' }}
      >
        {items.map((tech, i) => (
          <span
            key={i}
            className="text-white/30 text-sm font-medium tracking-wide whitespace-nowrap flex items-center gap-3"
          >
            <span className="w-1 h-1 rounded-full bg-emerald-500/60 inline-block" />
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
