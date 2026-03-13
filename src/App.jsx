import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ProjectScrollTransition from './components/ProjectScrollTransition'
import ProjectsSection from './components/ProjectsSection'
import ContactSection from './components/ContactSection'
import Particles from './components/Particles'
import './index.css'

export default function App() {
  return (
    <>
      {/* Fondo de partículas fijo detrás de toda la página */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Particles
          particleColors={['#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>

      <main style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection />
        <AboutSection />
        <ProjectScrollTransition />
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  )
}
