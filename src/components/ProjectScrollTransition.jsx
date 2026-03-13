import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

// ── Datos para los recuadros ───────────────────────────────────────────────────
const PROJECT_PREVIEWS = [
  { id: 1, title: 'Bia Energy', subtitle: 'Agente IA', icon: '⚡', color: '#fb973f' },
  { id: 2, title: 'Musa', subtitle: 'App IA', icon: '✦', color: '#a4d30e' },
  { id: 3, title: 'E-Commerce', subtitle: 'Web App', icon: '◈', color: '#07408b' },
  { id: 4, title: 'Escala', subtitle: 'Inmobiliaria', icon: '◉', color: '#7c3aed' },
  { id: 5, title: 'Portafolio', subtitle: 'Personal', icon: '✦', color: '#fb973f' },
  { id: 6, title: 'n8n Automation', subtitle: 'Workflows', icon: '⚙️', color: '#22c55e' },
  { id: 7, title: 'Supabase API', subtitle: 'Backend', icon: '🔗', color: '#3b82f6' },
  { id: 8, title: 'Slack Bots', subtitle: 'Integración', icon: '💬', color: '#f97316' },
  { id: 9, title: 'OpenAI GPT', subtitle: 'IA Generativa', icon: '🤖', color: '#ec4899' },
  { id: 10, title: 'Pinecone DB', subtitle: 'Vectors', icon: '🔍', color: '#14b8a6' },
  { id: 11, title: 'Odoo ERP', subtitle: 'Enterprise', icon: '🏢', color: '#6366f1' },
  { id: 12, title: 'Make.com', subtitle: 'Automatización', icon: '🔄', color: '#f43f5e' },
  { id: 13, title: 'Flutter App', subtitle: 'Móvil', icon: '📱', color: '#0ea5e9' },
  { id: 14, title: 'React Web', subtitle: 'Frontend', icon: '⚛️', color: '#06b6d4' },
]

// ── Card con contenido atractivo ─────────────────────────────────────────────────
function Card({ project, style, className = '' }) {
  if (!project) {
    return (
      <motion.div
        style={style}
        className={`w-full aspect-[4/5] bg-[#111111] rounded-2xl border border-white/[0.06] ${className}`}
      />
    )
  }

  return (
    <motion.div
      style={style}
      className={`w-full aspect-[4/5] bg-[#111111] rounded-2xl border border-white/[0.08] overflow-hidden relative ${className}`}
    >
      {/* Fondo con gradiente sutil */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `linear-gradient(135deg, ${project.color}15 0%, transparent 60%)`,
        }}
      />
      
      {/* Contenido centrado */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4">
        {/* Icono */}
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
          style={{ 
            backgroundColor: `${project.color}20`,
            border: `1px solid ${project.color}30`
          }}
        >
          <span style={{ fontSize: '1.5rem', color: project.color }}>{project.icon}</span>
        </div>
        
        {/* Título */}
        <h3 
          className="text-center font-bold"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: '0.9rem',
            color: '#ffffff',
            letterSpacing: '0.02em',
          }}
        >
          {project.title}
        </h3>
        
        {/* Subtítulo */}
        <p 
          className="text-center mt-1"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.7rem',
            color: '#6b7280',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          {project.subtitle}
        </p>
      </div>

      {/* Borde con glow sutil en hover simulado */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          boxShadow: `inset 0 0 20px ${project.color}10`,
          border: `1px solid ${project.color}20`,
        }}
      />
    </motion.div>
  )
}

// ── ProjectScrollTransition ────────────────────────────────────────────────────
export default function ProjectScrollTransition() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const centralScale = useTransform(scrollYProgress, [0, 0.6], [8, 1])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0])

  const l1Opacity = useTransform(scrollYProgress, [0.1, 0.5], [0, 1])
  const l1Scale   = useTransform(scrollYProgress, [0.1, 0.5], [0.5, 1])

  const l2Opacity = useTransform(scrollYProgress, [0.3, 0.7], [0, 1])
  const l2Scale   = useTransform(scrollYProgress, [0.3, 0.7], [0.5, 1])

  const l3Opacity = useTransform(scrollYProgress, [0.5, 0.9], [0, 1])
  const l3Scale   = useTransform(scrollYProgress, [0.5, 0.9], [0.5, 1])

  return (
    <section
      ref={containerRef}
      className="h-[250vh] bg-transparent relative"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        {/* ── Texto superpuesto ── */}
        <motion.div
          style={{ opacity: titleOpacity }}
          className="absolute z-30 pointer-events-none mix-blend-difference text-white text-center"
        >
          <h2
            className="font-black tracking-tighter"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(1.8rem, 9vw, 8.1rem)',
              lineHeight: 1,
            }}
          >
            Mis Proyectos
          </h2>
        </motion.div>

        {/* ── Grid — versión mobile optimizada ── */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-6 px-4 md:px-0"
          style={{ width: '100%', maxWidth: '1200px' }}
        >
          {/* Mobile: solo las cards visibles, distributed evenly */}
          <Card project={PROJECT_PREVIEWS[0]} style={{ opacity: l2Opacity, scale: l2Scale }} className="col-span-1" />
          <Card project={PROJECT_PREVIEWS[1]} style={{ opacity: l2Opacity, scale: l2Scale }} className="col-span-1" />
          <Card project={PROJECT_PREVIEWS[2]} style={{ opacity: l2Opacity, scale: l2Scale }} className="col-span-1" />
          <Card project={PROJECT_PREVIEWS[3]} style={{ opacity: l2Opacity, scale: l2Scale }} className="col-span-1" />
          <Card project={PROJECT_PREVIEWS[4]} style={{ opacity: l2Opacity, scale: l2Scale }} className="col-span-1 md:hidden" />
          <Card project={PROJECT_PREVIEWS[5]} style={{ opacity: l2Opacity, scale: l2Scale }} className="col-span-1 md:hidden" />

          {/* Capa 1 — esquinas (solo desktop) */}
          <Card project={PROJECT_PREVIEWS[0]} style={{ opacity: l1Opacity, scale: l1Scale }} className="hidden md:block md:col-start-1 row-start-1" />
          <Card project={PROJECT_PREVIEWS[1]} style={{ opacity: l1Opacity, scale: l1Scale }} className="hidden md:block md:col-start-5 row-start-1" />
          <Card project={PROJECT_PREVIEWS[2]} style={{ opacity: l1Opacity, scale: l1Scale }} className="hidden md:block md:col-start-1 row-start-3" />
          <Card project={PROJECT_PREVIEWS[3]} style={{ opacity: l1Opacity, scale: l1Scale }} className="hidden md:block md:col-start-5 row-start-3" />

          {/* Capa 2 — intermedios (desktop) */}
          <Card project={PROJECT_PREVIEWS[4]} style={{ opacity: l2Opacity, scale: l2Scale }} className="hidden md:block md:col-start-1 row-start-2" />
          <Card project={PROJECT_PREVIEWS[5]} style={{ opacity: l2Opacity, scale: l2Scale }} className="hidden md:block md:col-start-5 row-start-2" />
          <Card project={PROJECT_PREVIEWS[6]} style={{ opacity: l2Opacity, scale: l2Scale }} className="hidden md:block md:col-start-2 row-start-1" />
          <Card project={PROJECT_PREVIEWS[7]} style={{ opacity: l2Opacity, scale: l2Scale }} className="hidden md:block md:col-start-4 row-start-1" />
          <Card project={PROJECT_PREVIEWS[8]} style={{ opacity: l2Opacity, scale: l2Scale }} className="hidden md:block md:col-start-2 row-start-3" />
          <Card project={PROJECT_PREVIEWS[9]} style={{ opacity: l2Opacity, scale: l2Scale }} className="hidden md:block md:col-start-4 row-start-3" />

          {/* Capa 3 — adyacentes al centro (desktop) */}
          <Card project={PROJECT_PREVIEWS[10]} style={{ opacity: l3Opacity, scale: l3Scale }} className="hidden md:block md:col-start-2 row-start-2" />
          <Card project={PROJECT_PREVIEWS[11]} style={{ opacity: l3Opacity, scale: l3Scale }} className="hidden md:block md:col-start-4 row-start-2" />
          <Card project={PROJECT_PREVIEWS[12]} style={{ opacity: l3Opacity, scale: l3Scale }} className="hidden md:block md:col-start-3 row-start-1" />
          <Card project={PROJECT_PREVIEWS[13]} style={{ opacity: l3Opacity, scale: l3Scale }} className="hidden md:block md:col-start-3 row-start-3" />

          {/* Centro */}
          <motion.div
            style={{ scale: centralScale }}
            className="col-span-2 md:col-span-1 md:col-start-3 row-start-1 md:row-start-2 relative z-20"
          >
            <div className="w-full aspect-[4/5] rounded-2xl bg-[#fb973f]/10 border border-[#fb973f]/20 flex items-center justify-center">
              <span style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '3rem',
                color: '#fb973f',
                opacity: 0.4,
              }}>✦</span>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
