import { useState } from 'react'

// ── Datos de proyectos ─────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1,
    title: 'Agente de IA Corporativo (Bia Energy)',
    description:
      'Desarrollo de automatizaciones complejas integrando Pinecone, OpenAI, Slack, Odoo y Kustomer. Reduje el tiempo de consulta en un 80% y los tiempos del proceso de emergencias en un 15%, mejorando directamente los indicadores NPS de la compañía.',
    stack: ['n8n', 'OpenAI', 'Pinecone', 'Odoo', 'Slack Bots'],
    accent: '#fb973f',
    gradient: 'linear-gradient(135deg, #1a0a00 0%, #2e1500 50%, #1a0a00 100%)',
    icon: '✦',
    demo: '#',
    code: '#',
  },
  {
    id: 2,
    title: 'Musa - App de Creación con IA',
    description:
      'Aplicación móvil nativa diseñada para idear y generar contenido optimizado para redes sociales utilizando modelos de Inteligencia Artificial.',
    stack: ['Flutter', 'IA Generativa', 'Node.js'],
    accent: '#a4d30e',
    gradient: 'linear-gradient(135deg, #0d1a00 0%, #1a2e00 50%, #0d1a00 100%)',
    icon: '⬡',
    demo: '#',
    code: '#',
  },
  {
    id: 3,
    title: 'E-Commerce & Startups Web',
    description:
      'Desarrollo web enfocado en conversión y experiencia de usuario para empresas emergentes (Ameliestore y Rinesyllantaskm).',
    stack: ['React', 'Tailwind CSS', 'Frontend'],
    accent: '#07408b',
    gradient: 'linear-gradient(135deg, #00091a 0%, #001433 50%, #00091a 100%)',
    icon: '◈',
    demo: '#',
    code: '#',
  },
  {
    id: 4,
    title: 'Escala Inmobiliaria',
    description:
      'Plataforma web automatizada para el sector de bienes raíces, enfocada en la gestión ágil de propiedades y optimización de flujos de contacto.',
    stack: ['React', 'n8n', 'Supabase'],
    accent: '#7c3aed',
    gradient: 'linear-gradient(135deg, #0d0014 0%, #1a0029 50%, #0d0014 100%)',
    icon: '◉',
    demo: '#',
    code: '#',
  },
]

// ── Badge de stack ─────────────────────────────────────────────────────────────
function StackBadge({ label }) {
  return (
    <span style={{
      display: 'inline-block',
      fontFamily: "'Inter', sans-serif",
      fontSize: '0.7rem',
      fontWeight: 500,
      color: '#9ca3af',
      background: '#000000',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '9999px',
      padding: '0.25rem 0.75rem',
      letterSpacing: '0.04em',
    }}>
      {label}
    </span>
  )
}

// ── Tarjeta de proyecto ────────────────────────────────────────────────────────
function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false)

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#111111',
        border: `1px solid ${hovered ? project.accent : 'rgba(255,255,255,0.08)'}`,
        borderRadius: '1.5rem',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 20px 60px rgba(0,0,0,0.5), 0 0 30px ${project.accent}22`
          : '0 4px 20px rgba(0,0,0,0.3)',
        cursor: 'default',
      }}
    >
      {/* Imagen / Mockup placeholder */}
      <div style={{
        height: 'clamp(9rem, 18vw, 16rem)',
        background: project.gradient,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {/* Grid de puntos decorativo */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(circle, ${project.accent}18 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }} />

        {/* Icono central grande */}
        <span style={{
          fontSize: 'clamp(3rem, 6vw, 5rem)',
          color: project.accent,
          opacity: hovered ? 0.9 : 0.5,
          transition: 'opacity 0.3s, transform 0.3s',
          transform: hovered ? 'scale(1.15)' : 'scale(1)',
          position: 'relative', zIndex: 1,
          fontWeight: 100,
          lineHeight: 1,
        }}>
          {project.icon}
        </span>

        {/* Glow detrás del ícono */}
        <div style={{
          position: 'absolute',
          width: '12rem', height: '12rem',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${project.accent}30 0%, transparent 70%)`,
          filter: 'blur(30px)',
          transition: 'opacity 0.3s',
          opacity: hovered ? 1 : 0.4,
        }} />

        {/* Número de proyecto */}
        <span style={{
          position: 'absolute',
          top: '1.25rem', left: '1.5rem',
          fontFamily: "'Syne', sans-serif",
          fontSize: '0.7rem',
          fontWeight: 700,
          color: project.accent,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          opacity: 0.8,
        }}>
          0{project.id}
        </span>
      </div>

      {/* Cuerpo */}
      <div style={{ padding: '2rem' }}>

        {/* Título */}
        <h3 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: '1.35rem',
          fontWeight: 700,
          color: '#ffffff',
          letterSpacing: '-0.02em',
          marginBottom: '0.75rem',
        }}>
          {project.title}
        </h3>

        {/* Descripción */}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.92rem',
          fontWeight: 300,
          color: '#9ca3af',
          lineHeight: 1.75,
          marginBottom: '1.4rem',
        }}>
          {project.description}
        </p>

        {/* Stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
          {project.stack.map(t => <StackBadge key={t} label={t} />)}
        </div>

        {/* Separador */}
        <div style={{
          height: '1px',
          background: 'rgba(255,255,255,0.06)',
          marginBottom: '1.25rem',
        }} />

        {/* Enlaces */}
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a
            href={project.demo}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.8rem',
              fontWeight: 500,
              color: project.accent,
              textDecoration: 'none',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Ver Demo ↗
          </a>
          <a
            href={project.code}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.8rem',
              fontWeight: 500,
              color: '#6b7280',
              textDecoration: 'none',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#d1d5db')}
            onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}
          >
            Código →
          </a>
        </div>

      </div>
    </article>
  )
}

// ── ProjectsSection ────────────────────────────────────────────────────────────
export default function ProjectsSection() {
  return (
    <section
      id="projects"
      style={{
        backgroundColor: 'transparent',
        minHeight: '100vh',
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 5vw, 2.5rem)',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Encabezado */}
        <p style={{
          textAlign: 'center',
          fontSize: '0.72rem',
          fontWeight: 600,
          color: '#fb973f',
          textTransform: 'uppercase',
          letterSpacing: '0.28em',
          marginBottom: '0.75rem',
        }}>
          Mi trabajo
        </p>

        <h2 style={{
          textAlign: 'center',
          fontFamily: "'Syne', sans-serif",
          fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
          fontWeight: 800,
          color: '#ffffff',
          letterSpacing: '-0.04em',
          marginBottom: '0.75rem',
        }}>
          Proyectos Destacados
        </h2>

        <p style={{
          textAlign: 'center',
          fontSize: '1.1rem',
          fontWeight: 300,
          color: '#6b7280',
          marginBottom: '1rem',
        }}>
          Del código a la solución real.
        </p>

        {/* Línea decorativa */}
        <div style={{
          width: '3rem', height: '2px',
          background: 'linear-gradient(to right, #fb973f, transparent)',
          margin: '0 auto 4rem',
        }} />

        {/* Grid de proyectos */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
          gap: '1.75rem',
        }}>
          {PROJECTS.map(p => <ProjectCard key={p.id} project={p} />)}
        </div>

      </div>
    </section>
  )
}
