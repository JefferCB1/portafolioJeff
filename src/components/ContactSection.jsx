import { useState } from 'react'

// ── Input / Textarea base ─────────────────────────────────────────────────────
function Field({ label, type = 'text', name, rows, value, onChange }) {
  const [focused, setFocused] = useState(false)
  const shared = {
    width: '100%',
    background: '#111111',
    border: `1px solid ${focused ? '#fb973f' : 'rgba(255,255,255,0.08)'}`,
    borderRadius: '12px',
    padding: '1rem 1.1rem',
    color: '#ffffff',
    fontFamily: "'Inter', sans-serif",
    fontSize: '0.95rem',
    fontWeight: 300,
    outline: 'none',
    transition: 'border-color 0.25s, box-shadow 0.25s',
    boxShadow: focused ? '0 0 0 3px rgba(251,151,63,0.12)' : 'none',
    resize: rows ? 'vertical' : undefined,
    boxSizing: 'border-box',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '0.75rem',
        fontWeight: 500,
        color: '#9ca3af',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
      }}>
        {label}
      </label>
      {rows ? (
        <textarea
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={shared}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={shared}
        />
      )}
    </div>
  )
}

// ── Enlace de red social ──────────────────────────────────────────────────────
function SocialLink({ href, label, icon }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
        fontFamily: "'Inter', sans-serif",
        fontSize: '0.82rem',
        fontWeight: 500,
        color: hovered ? '#ffffff' : '#6b7280',
        textDecoration: 'none',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        transition: 'color 0.2s',
      }}
    >
      <span style={{ fontSize: '1rem' }}>{icon}</span>
      {label}
    </a>
  )
}

// ── ContactSection ────────────────────────────────────────────────────────────
export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [btnHovered, setBtnHovered] = useState(false)

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí conecta tu API / Formspree / EmailJS
    setSent(true)
  }

  return (
    <section
      id="contact"
      style={{
        backgroundColor: 'transparent',
        minHeight: '100vh',
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 5vw, 2.5rem)',
        position: 'relative',
        fontFamily: "'Inter', sans-serif",
        overflow: 'hidden',
      }}
    >
      {/* Glow de fondo — naranja centrado */}
      <div style={{
        position: 'absolute',
        top: '30%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'min(600px, 90vw)', height: 'min(400px, 50vw)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(251,151,63,0.12) 0%, transparent 70%)',
        filter: 'blur(80px)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '960px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ── Encabezado ── */}
        <p style={{
          textAlign: 'center',
          fontSize: '0.72rem',
          fontWeight: 600,
          color: '#fb973f',
          textTransform: 'uppercase',
          letterSpacing: '0.28em',
          marginBottom: '1rem',
        }}>
          Contacto
        </p>

        <h2 style={{
          textAlign: 'center',
          fontFamily: "'Syne', sans-serif",
          fontSize: 'clamp(2.2rem, 6vw, 4rem)',
          fontWeight: 800,
          color: '#ffffff',
          letterSpacing: '-0.04em',
          lineHeight: 1.1,
          marginBottom: '1.25rem',
        }}>
          ¿Listo para escalar<br />tu proyecto?
        </h2>

        <p style={{
          textAlign: 'center',
          fontSize: '1.05rem',
          fontWeight: 300,
          color: '#6b7280',
          maxWidth: '36rem',
          margin: '0 auto 3.5rem',
          lineHeight: 1.75,
        }}>
          Hablemos sobre código, automatización y cómo mejorar los indicadores de eficiencia de tu negocio.
        </p>

        {/* Línea decorativa */}
        <div style={{
          width: '3rem', height: '2px',
          background: 'linear-gradient(to right, #fb973f, transparent)',
          margin: '0 auto 4rem',
        }} />

        {/* ── Formulario glassmorphism ── */}
        <div style={{
          background: 'rgba(10,10,10,0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '1.75rem',
          padding: 'clamp(2rem, 5vw, 3rem)',
          marginBottom: '6rem',
        }}>
          {sent ? (
            /* Estado de éxito */
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✦</div>
              <h3 style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '0.75rem',
              }}>
                ¡Mensaje enviado!
              </h3>
              <p style={{ color: '#9ca3af', fontWeight: 300 }}>
                Te responderé lo antes posible.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

              {/* Nombre + Email en fila en desktop */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.5rem',
              }}>
                <Field
                  label="Nombre completo"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
                <Field
                  label="Correo electrónico"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <Field
                label="Mensaje"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
              />

              {/* Botón de envío */}
              <button
                type="submit"
                onMouseEnter={() => setBtnHovered(true)}
                onMouseLeave={() => setBtnHovered(false)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '9999px',
                  background: btnHovered
                    ? 'rgba(251,151,63,0.08)'
                    : 'transparent',
                  border: '1px solid #fb973f',
                  color: '#fb973f',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'background 0.3s, box-shadow 0.3s, transform 0.25s',
                  boxShadow: btnHovered
                    ? '0 0 24px rgba(251,151,63,0.4), 0 0 48px rgba(251,151,63,0.12)'
                    : 'none',
                  transform: btnHovered ? 'scale(1.02)' : 'scale(1)',
                }}
              >
                Enviar mensaje ✦
              </button>

            </form>
          )}
        </div>

        {/* ── Footer ── */}
        <footer style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '2rem',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
        }}>
          {/* Copyright + Ubicación */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.8rem',
              fontWeight: 300,
              color: '#4b5563',
              letterSpacing: '0.02em',
            }}>
              © 2026 Jefferson. Todos los derechos reservados.
            </p>
            <span style={{ color: '#4b5563', fontSize: '0.8rem' }}>•</span>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.8rem',
              fontWeight: 300,
              color: '#6b7280',
              letterSpacing: '0.02em',
            }}>
              📍 Bello, Antioquia
            </p>
          </div>

          {/* Redes */}
          <div style={{ display: 'flex', gap: '1.75rem', flexWrap: 'wrap' }}>
            <SocialLink href="mailto:carvajalberriojefferson@gmail.com" label="Email" icon="✉" />
            <SocialLink href="https://www.linkedin.com/in/jeffersonCarvajal" label="LinkedIn" icon="in" />
            <SocialLink href="https://github.com/JefferCB1" label="GitHub" icon="⌥" />
          </div>
        </footer>

      </div>
    </section>
  )
}
