import { useRef, useEffect, Suspense, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader, MathUtils } from 'three'
import { RoundedBox } from '@react-three/drei'
import CurvedLoop from './CurvedLoop'
import VariableProximity from './VariableProximity'

// ── Aurora + Spotlight Background ────────────────────────────────────────────
function AuroraBackground() {
  const [pos, setPos] = useState({ x: 35, y: 50 })

  useEffect(() => {
    const onMove = (e) => setPos({
      x: (e.clientX / window.innerWidth)  * 100,
      y: (e.clientY / window.innerHeight) * 100,
    })
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <style>{`
        @keyframes auroraA {
          0%,100% { transform: translate(0px,  0px) scale(1);    }
          40%      { transform: translate(40px,-30px) scale(1.12); }
          70%      { transform: translate(-25px,20px) scale(0.94); }
        }
        @keyframes auroraB {
          0%,100% { transform: translate(0px, 0px) scale(1);    }
          35%      { transform: translate(-50px,35px) scale(1.1); }
          65%      { transform: translate(30px,-15px) scale(0.96); }
        }
        @keyframes auroraC {
          0%,100% { transform: translate(0px,0px) scale(1);   }
          50%      { transform: translate(20px,40px) scale(1.08); }
        }
      `}</style>

      <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: 'transparent' }}>

        {/* Blob 1 — deep blue, top-left, slow drift */}
        <div style={{
          position: 'absolute',
          top: '-15%', left: '-10%',
          width: '70vw', height: '70vh',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(7,64,139,0.55) 0%, transparent 65%)',
          filter: 'blur(90px)',
          animation: 'auroraA 14s ease-in-out infinite',
        }} />

        {/* Blob 2 — violet, mid-left */}
        <div style={{
          position: 'absolute',
          top: '30%', left: '-5%',
          width: '45vw', height: '55vh',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(91,33,182,0.35) 0%, transparent 65%)',
          filter: 'blur(80px)',
          animation: 'auroraB 18s ease-in-out infinite',
        }} />

        {/* Blob 3 — deep blue, bottom-right */}
        <div style={{
          position: 'absolute',
          bottom: '-10%', right: '5%',
          width: '40vw', height: '50vh',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(7,64,139,0.2) 0%, transparent 60%)',
          filter: 'blur(100px)',
          animation: 'auroraC 22s ease-in-out infinite',
        }} />

        {/* Mouse spotlight */}
        <div
          className="absolute rounded-full"
          style={{
            width: 'min(500px, 80vw)', height: 'min(500px, 80vw)',
            left: `${pos.x}%`, top: `${pos.y}%`,
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(7,64,139,0.22) 0%, transparent 65%)',
            filter: 'blur(55px)',
            transition: 'left 0.9s ease-out, top 0.9s ease-out',
          }}
        />

        {/* Noise texture overlay (grain adds depth) */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          opacity: 0.035,
        }} />
      </div>
    </>
  )
}

// Module-level mouse state — zero React re-renders from cursor movement
const mouse = { x: 0, y: 0 }

// ── Logos ──────────────────────────────────────────────────────────────────────
const LOGOS = [
  { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',              name: 'React' },
  { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',  name: 'Tailwind' },
  { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',    name: 'TypeScript' },
  { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',    name: 'JavaScript' },
  { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',            name: 'Node.js' },
  { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',    name: 'PostgreSQL' },
  { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg',        name: 'Supabase' },
  { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg',          name: 'Flutter' },
  { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',            name: 'Python' },
  { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',            name: 'Docker' },
  { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg',          name: 'MongoDB' },
  { url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',            name: 'GitHub' },
]

// ── Base grid: 4-4-3 keyboard ──────────────────────────────────────────────────
const GRID = [
  [-1.55,  1.1, 0], [-0.52,  1.1, 0], [ 0.52,  1.1, 0], [1.55,  1.1, 0],
  [-1.55,  0.0, 0], [-0.52,  0.0, 0], [ 0.52,  0.0, 0], [1.55,  0.0, 0],
  [-1.03, -1.1, 0], [ 0.00, -1.1, 0], [ 1.03, -1.1, 0], [ 2.08, -1.1, 0],
]

// ── Deterministic per-key params (golden-ratio seeded, never Math.random) ──────
function sd(i, salt) {
  return (((i * 137.508 + salt * 97.31 + 1) % 100) + 100) % 100 / 100
}

const KEYCAP_DATA = LOGOS.map((logo, i) => ({
  ...logo,
  bx:         GRID[i][0] + (sd(i, 1) - 0.5) * 0.18,
  by:         GRID[i][1] + (sd(i, 2) - 0.5) * 0.14,
  bz:                      (sd(i, 3) - 0.5) * 1.4,   // ±0.7 Z depth → parallax
  floatPhase: sd(i, 4) * Math.PI * 2,                 // unique cycle start
  floatAmp:   0.04 + sd(i, 5) * 0.08,                 // [0.04 … 0.12]
  floatSpeed: 0.45 + sd(i, 1) * 0.40,                 // [0.45 … 0.85]
  rotPhaseZ:  sd(i, 6) * Math.PI * 2,
  rotPhaseX:  sd(i, 7) * Math.PI * 2,
  rotAmpZ:    0.007 + sd(i, 4) * 0.013,
  rotAmpX:    0.005 + sd(i, 5) * 0.009,
  rotSpeedZ:  0.25  + sd(i, 6) * 0.22,
  rotSpeedX:  0.16  + sd(i, 7) * 0.18,
}))

// ── Single keycap ──────────────────────────────────────────────────────────────
function Keycap({
  bx, by, bz, logoUrl,
  floatPhase, floatAmp, floatSpeed,
  rotPhaseZ, rotPhaseX, rotAmpZ, rotAmpX, rotSpeedZ, rotSpeedX,
}) {
  const ref = useRef()
  const tex = useLoader(TextureLoader, logoUrl)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    // Each key lives in its own time bubble — fully desynchronised float
    ref.current.position.set(
      bx,
      by + Math.sin(t * floatSpeed + floatPhase) * floatAmp,
      bz
    )
    ref.current.rotation.z = Math.sin(t * rotSpeedZ + rotPhaseZ) * rotAmpZ
    ref.current.rotation.x = Math.sin(t * rotSpeedX + rotPhaseX) * rotAmpX
  })

  return (
    <group ref={ref} position={[bx, by, bz]}>
      {/* Outer shell */}
      <RoundedBox args={[0.88, 0.88, 0.28]} radius={0.07} smoothness={5}>
        <meshStandardMaterial
          color="#0c0c20"
          emissive="#1e1650"
          emissiveIntensity={0.5}
          metalness={0.3}
          roughness={0.5}
        />
      </RoundedBox>
      {/* Recessed dish — backlit illusion */}
      <RoundedBox args={[0.66, 0.66, 0.06]} radius={0.05} smoothness={4} position={[0, 0, 0.165]}>
        <meshStandardMaterial
          color="#060612"
          emissive="#110d35"
          emissiveIntensity={0.85}
          metalness={0.1}
          roughness={0.8}
        />
      </RoundedBox>
      {/* Logo decal */}
      <mesh position={[0, 0, 0.2]}>
        <planeGeometry args={[0.5, 0.5]} />
        <meshBasicMaterial map={tex} transparent alphaTest={0.04} />
      </mesh>
    </group>
  )
}

// ── Mouse tracker — pointermove → module-level state, zero overhead ───────────
function MouseTracker() {
  useEffect(() => {
    const onMove = (e) => {
      mouse.x =  (e.clientX / window.innerWidth)  * 2 - 1
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])
  return null
}

// ── Interactive cluster — whole group tilts toward cursor ─────────────────────
function InteractiveLogosKeyboardCluster() {
  const ref = useRef()

  useFrame(() => {
    if (!ref.current) return
    // Mouse X → Y pan  |  Mouse Y → X tilt (inverted) + 0.18 base forward lean
    const targetY =  mouse.x * 0.52
    const targetX = -mouse.y * 0.38 + 0.18
    // Lerp factor 0.055 ≈ 18-frame settle — silky, not snappy
    ref.current.rotation.x = MathUtils.lerp(ref.current.rotation.x, targetX, 0.055)
    ref.current.rotation.y = MathUtils.lerp(ref.current.rotation.y, targetY, 0.055)
  })

  return (
    <group ref={ref} rotation={[0.18, 0, 0]}>
      {KEYCAP_DATA.map((kd) => (
        <Keycap key={kd.name} {...kd} logoUrl={kd.url} />
      ))}
    </group>
  )
}

// ── Scene lights ───────────────────────────────────────────────────────────────
function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.18} />
      {/* Blue key light — front-centre */}
      <pointLight position={[0, 1, 5.5]}    intensity={2.8} color="#4a8fd4" distance={14} />
      {/* Violet rim — upper left */}
      <pointLight position={[-5, 3.5, 2]}   intensity={1.6} color="#7c3aed" distance={15} />
      {/* Cool blue fill — lower right (replaced gold) */}
      <pointLight position={[4.5, -2.5, 3]} intensity={0.8} color="#3b82f6" distance={12} />
      {/* Soft white fill — from above */}
      <directionalLight position={[1, 6, 4]} intensity={0.38} color="#dde4ff" />
    </>
  )
}

// ── HeroSection ────────────────────────────────────────────────────────────────
export default function HeroSection() {
  const nameContainerRef = useRef(null)

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Aurora/Spotlight Background */}
      <AuroraBackground />

      {/* 3D canvas — right half, desktop */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[58%] h-full z-0 hidden md:block">
        <Canvas
          camera={{ position: [0, 0, 5.2], fov: 52 }}
          gl={{ antialias: true, alpha: true }}
        >
          <MouseTracker />
          <SceneLights />
          <Suspense fallback={null}>
            <InteractiveLogosKeyboardCluster />
          </Suspense>
        </Canvas>
      </div>

      {/* Gradient — text legible, fully transparent to not show seam */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none hidden md:block"
        style={{
          background:
            'linear-gradient(to right, rgba(5,5,5,0.95) 30%, rgba(5,5,5,0.55) 46%, rgba(5,5,5,0.04) 65%, transparent 100%)',
        }}
      />

      {/* Text — left half, vertically centered */}
      <div className="relative z-10 flex min-h-screen items-center px-8 md:px-20 lg:px-32">
        <div className="md:w-[42%] lg:w-[38%] pl-2 md:pl-4">

          {/* Línea 1 — saludo ligero */}
          <p
            className="select-none"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '1.35rem',
              color: '#d1d5db',
              letterSpacing: '0.06em',
              marginBottom: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            Hola, soy
            <span style={{
              display: 'inline-block',
              width: '2px',
              height: '1.2em',
              background: '#fb973f',
              borderRadius: '1px',
              animation: 'cursorBlink 1.1s step-end infinite',
              verticalAlign: 'middle',
              boxShadow: '0 0 6px rgba(251,151,63,0.7)',
            }} />
          </p>

          {/* Línea 2 — nombre */}
          <div ref={nameContainerRef} style={{ position: 'relative', display: 'inline-block' }}>
            <h1
              className="select-none"
              style={{
                fontFamily: "'Roboto Flex', sans-serif",
                fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
                fontWeight: 400,
                letterSpacing: '0.12em',
                lineHeight: 1,
                marginBottom: '1rem',
                color: '#fb973f',
                textTransform: 'uppercase',
              }}
            >
              <VariableProximity
                label="Jefferson"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={nameContainerRef}
                radius={150}
                falloff="linear"
                style={{ color: '#fb973f' }}
              />
            </h1>
          </div>

          {/* Línea 3 — subtítulo */}
          <p
            className="select-none"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: '0.85rem',
              color: '#fb973f',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              marginBottom: '1.5rem',
            }}
          >
            Full Stack Developer &amp; Automation Specialist
          </p>

          {/* Línea 4 — descripción */}
          <p
            className="select-none"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              fontSize: '1.05rem',
              color: '#6b7280',
              lineHeight: 1.8,
              maxWidth: '28rem',
              marginBottom: '2.5rem',
            }}
          >
            Construyo aplicaciones modernas, automatizo procesos complejos y transformo
            ideas en código puro.
          </p>

        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes nameShimmer {
          0%   { background-position:   0% center; }
          100% { background-position: 300% center; }
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>

      {/* Mobile: canvas below text */}
      <div className="relative z-0 md:hidden w-full" style={{ height: '85vw' }}>
        <Canvas
          camera={{ position: [0, 0, 5.8], fov: 56 }}
          gl={{ antialias: true, alpha: true }}
        >
          <SceneLights />
          <Suspense fallback={null}>
            <InteractiveLogosKeyboardCluster />
          </Suspense>
        </Canvas>
      </div>

      {/* Curved marquee — anchored to bottom of hero.
          The CurvedLoop wrapper has min-h-screen internally, so we clip it
          to a fixed height and use a negative translateY to pull the SVG
          (which sits at the vertical center of min-h-screen) into view. */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 pointer-events-auto"
        style={{ height: '7rem' }}
      >
        <div style={{ transform: 'translateY(calc(-50vh + 3.5rem))' }}>
          <CurvedLoop
            marqueeText="React ✦ TypeScript ✦ Node.js ✦ PostgreSQL ✦ Flutter ✦ Python ✦ Docker ✦ MongoDB ✦"
            speed={1.5}
            curveAmount={60}
            direction="left"
            interactive
            className="opacity-50 font-bold tracking-widest text-[1rem] md:text-[1.8rem]"
          />
        </div>
      </div>
    </section>
  )
}
