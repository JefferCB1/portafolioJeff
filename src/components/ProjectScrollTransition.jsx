import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

// ── Placeholder card ───────────────────────────────────────────────────────────
function Card({ style, className = '' }) {
  return (
    <motion.div
      style={style}
      className={`w-full aspect-[4/5] bg-[#111111] rounded-2xl border border-white/[0.06] ${className}`}
    />
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

        {/* ── Grid ── */}
        <motion.div
          className="grid grid-cols-3 md:grid-cols-5 grid-rows-3 gap-3 md:gap-6"
          style={{ width: '1200px', maxWidth: '90vw' }}
        >
          {/* Capa 1 — esquinas (solo desktop) */}
          <Card style={{ opacity: l1Opacity, scale: l1Scale }} className="hidden md:block md:col-start-1 row-start-1" />
          <Card style={{ opacity: l1Opacity, scale: l1Scale }} className="hidden md:block md:col-start-5 row-start-1" />
          <Card style={{ opacity: l1Opacity, scale: l1Scale }} className="hidden md:block md:col-start-1 row-start-3" />
          <Card style={{ opacity: l1Opacity, scale: l1Scale }} className="hidden md:block md:col-start-5 row-start-3" />

          {/* Capa 2 — intermedios */}
          <Card style={{ opacity: l2Opacity, scale: l2Scale }} className="hidden md:block md:col-start-1 row-start-2" />
          <Card style={{ opacity: l2Opacity, scale: l2Scale }} className="hidden md:block md:col-start-5 row-start-2" />
          <Card style={{ opacity: l2Opacity, scale: l2Scale }} className="col-start-1 md:col-start-2 row-start-1" />
          <Card style={{ opacity: l2Opacity, scale: l2Scale }} className="col-start-3 md:col-start-4 row-start-1" />
          <Card style={{ opacity: l2Opacity, scale: l2Scale }} className="col-start-1 md:col-start-2 row-start-3" />
          <Card style={{ opacity: l2Opacity, scale: l2Scale }} className="col-start-3 md:col-start-4 row-start-3" />

          {/* Capa 3 — adyacentes al centro */}
          <Card style={{ opacity: l3Opacity, scale: l3Scale }} className="hidden md:block md:col-start-2 row-start-2" />
          <Card style={{ opacity: l3Opacity, scale: l3Scale }} className="hidden md:block md:col-start-4 row-start-2" />
          <Card style={{ opacity: l3Opacity, scale: l3Scale }} className="col-start-2 md:col-start-3 row-start-1" />
          <Card style={{ opacity: l3Opacity, scale: l3Scale }} className="col-start-2 md:col-start-3 row-start-3" />

          {/* Centro */}
          <motion.div
            style={{ scale: centralScale }}
            className="col-start-2 md:col-start-3 row-start-2 relative z-20"
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
