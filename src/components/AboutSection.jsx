import { useState } from 'react'

// ── Badge minimalista ─────────────────────────────────────────────────────────
function Badge({ label }) {
  return (
    <span
      style={{
        display: 'inline-block',
        fontFamily: "'Inter', sans-serif",
        fontSize: '0.75rem',
        fontWeight: 500,
        color: '#d1d5db',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '9999px',
        padding: '0.3rem 0.85rem',
        letterSpacing: '0.04em',
      }}
    >
      {label}
    </span>
  )
}

// ── Avatar con fallback ───────────────────────────────────────────────────────
function Avatar() {
  const [broken, setBroken] = useState(false)

  if (broken) {
    return (
      <div
        style={{
          width: 'clamp(4.5rem, 10vw, 7rem)', height: 'clamp(4.5rem, 10vw, 7rem)',
          borderRadius: '50%',
          border: '2px solid #fb973f',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #0d0d1a 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: '2.5rem' }}>👨‍💻</span>
      </div>
    )
  }

  return (
    <img
      src="/image.png"
      alt="Jefferson"
      onError={() => setBroken(true)}
      style={{
        width: 'clamp(4.5rem, 10vw, 7rem)', height: 'clamp(4.5rem, 10vw, 7rem)',
        borderRadius: '50%',
        border: '2px solid #fb973f',
        objectFit: 'cover',
        flexShrink: 0,
      }}
    />
  )
}

// ── Tarjeta base ──────────────────────────────────────────────────────────────
function BentoCard({ children, style = {}, className = '' }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'rgba(17,17,17,0.75)',
        border: `1px solid ${hovered ? '#fb973f' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: '1.5rem',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.3s',
        ...style,
      }}
    >
      {/* Glow interno en hover */}
      {hovered && (
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(251,151,63,0.06) 0%, transparent 70%)',
          borderRadius: '1.5rem',
        }} />
      )}
      {children}
    </div>
  )
}

// ── AboutSection ──────────────────────────────────────────────────────────────
export default function AboutSection() {
  return (
    <section
      id="about"
      style={{
        backgroundColor: 'transparent',
        minHeight: '100vh',
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 5vw, 2.5rem)',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p style={{
          textAlign: 'center',
          fontSize: '0.72rem',
          fontWeight: 600,
          color: '#fb973f',
          textTransform: 'uppercase',
          letterSpacing: '0.28em',
          marginBottom: '0.75rem',
        }}>
          Mi historia
        </p>

        <h2 style={{
          textAlign: 'center',
          fontFamily: "'Syne', sans-serif",
          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          fontWeight: 800,
          color: '#ffffff',
          letterSpacing: '-0.03em',
          marginBottom: '1rem',
        }}>
          Sobre mí &amp; Tech Stack
        </h2>

        {/* Línea decorativa */}
        <div style={{
          width: '3rem', height: '2px',
          background: 'linear-gradient(to right, #fb973f, transparent)',
          margin: '0 auto 4rem',
        }} />

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">

          {/* Caja 1 — Perfil (col-span-2) */}
          <BentoCard style={{ gridColumn: 'span 1' }} className="md:col-span-2">
            <div style={{ display: 'flex', gap: '1.75rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <Avatar />
              <div style={{ flex: 1, minWidth: '140px' }}>
                <h3 style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  letterSpacing: '-0.02em',
                  marginBottom: '0.75rem',
                }}>
                  Ingeniería, Estrategia & Mejora Continua
                </h3>
                <p style={{
                  fontSize: '0.95rem',
                  fontWeight: 300,
                  color: '#9ca3af',
                  lineHeight: 1.85,
                }}>
                  Desarrollador de software y analista de mejora continua enfocado en la automatización 
                  de procesos y la innovación tecnológica. No solo escribo código; construyo soluciones. 
                  Combino el desarrollo frontend y móvil con arquitecturas de automatización avanzadas 
                  y herramientas low-code. Desde la creación de interfaces modernas hasta la 
                  implementación de flujos con IA para agilizar operaciones en entornos corporativos, 
                  mi enfoque es transformar la complejidad técnica en valor de negocio directo.
                </p>
              </div>
            </div>
          </BentoCard>

          {/* Caja 2 — Frontend & Móvil (col-span-1) */}
          <BentoCard>
            {/* Icono decorativo */}
            <div style={{
              width: '2.2rem', height: '2.2rem',
              borderRadius: '8px',
              background: 'rgba(164,211,14,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '1rem',
              fontSize: '1rem',
            }}>
              🖥️
            </div>
            <h3 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '1.15rem',
              fontWeight: 700,
              color: '#a4d30e',
              letterSpacing: '-0.01em',
              marginBottom: '1.1rem',
            }}>
              Frontend &amp; Móvil
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {['React', 'Tailwind CSS', 'TypeScript', 'Flutter', 'JavaScript', 'HTML', 'CSS'].map(t => (
                <Badge key={t} label={t} />
              ))}
            </div>
          </BentoCard>

          {/* Caja 3 — Automatización & IA (row-span-2) */}
          <BentoCard className="md:row-span-2">
            <div style={{
              width: '2.2rem', height: '2.2rem',
              borderRadius: '8px',
              background: 'rgba(7,64,139,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '1rem',
              fontSize: '1rem',
            }}>
              ⚡
            </div>
            <h3 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '1.15rem',
              fontWeight: 700,
              color: '#60a5fa',
              letterSpacing: '-0.01em',
              marginBottom: '0.6rem',
            }}>
              Automatización &amp; IA
            </h3>
            <p style={{
              fontSize: '0.85rem',
              fontWeight: 300,
              color: '#6b7280',
              lineHeight: 1.7,
              marginBottom: '1.4rem',
            }}>
              Diseño de flujos inteligentes y bases vectoriales para optimizar el acceso y gestión del conocimiento.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {['n8n', 'OpenAI', 'Pinecone', 'Slack Bots', 'Odoo', 'Kustomer', 'Make'].map(t => (
                <Badge key={t} label={t} />
              ))}
            </div>

            {/* Decoración visual */}
            <div style={{
              position: 'absolute',
              bottom: '-2rem', right: '-2rem',
              width: '8rem', height: '8rem',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(7,64,139,0.2) 0%, transparent 70%)',
              filter: 'blur(20px)',
              pointerEvents: 'none',
            }} />
          </BentoCard>

          {/* Caja 4 — Backend & Datos (col-span-2) */}
          <BentoCard className="md:col-span-2">
            <div style={{
              width: '2.2rem', height: '2.2rem',
              borderRadius: '8px',
              background: 'rgba(251,151,63,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '1rem',
              fontSize: '1rem',
            }}>
              🗄️
            </div>
            <h3 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '1.15rem',
              fontWeight: 700,
              color: '#fb973f',
              letterSpacing: '-0.01em',
              marginBottom: '1.1rem',
            }}>
              Backend &amp; Datos
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {['Python', 'Java', 'Node.js', 'Supabase', 'PostgreSQL', 'APIs REST'].map(t => (
                <Badge key={t} label={t} />
              ))}
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  )
}
