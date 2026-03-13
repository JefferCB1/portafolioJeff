# Design System: Jefferson Portfolio
**Project ID:** N/A (React + Vite + Three.js)

## 1. Visual Theme & Atmosphere

A sophisticated, ultra-premium dark portfolio with an ethereal, futuristic vibe. The aesthetic blends deep matte blacks with luminous blue accents and warm orange highlights, creating a high-end tech feel. The centerpiece is a mesmerizing 3D keyboard cluster with floating tech logos that animate organically, while the left side presents clean, bold typography with subtle gradient animations. The overall density is airy yet purposeful, with generous negative space that conveys confidence and professionalism.

## 2. Color Palette & Roles

### Core Backgrounds
- **Midnight Black** (#050505) - Primary canvas background, deep matte black
- **Soft Black** (#0a0a0a) - Body background fallback
- **Charcoal Transparent** - Gradient overlays for text/canvas transitions

### Accent Colors
- **Electric Orange** (#fb973f) - Primary accent for CTAs, gradient text animations, button glow effects on hover
- **Neon Lime** (#a4d30e) - Secondary accent for role/specialty labels, uppercase subtitles
- **Deep Azure** (#07408b) - Background spotlight and aurora effects

### 3D Element Colors (Keycaps)
- **Obsidian Shell** (#0c0c20) - Outer keycap surfaces
- **Violet Glow** (#1e1650) - Keycap emissive highlights
- **Void Recess** (#060612) - Inner dish surfaces
- **Deep Indigo** (#0c082a) - Recess emissive

### Lighting (3D Scene)
- **Arctic Blue** (#4a8fd4) - Key light, cool illumination
- **Royal Violet** (#7c3aed) - Rim lighting, depth
- **Amber Gold** (#d97706) - Warm accent light
- **Ice White** (#dde4ff) - Soft fill from above

### Text Colors
- **Pure White** (#ffffff) - Primary headings
- **Muted Silver** (#9ca3af / gray-400) - Body text, descriptions
- **Transparent Gradient** - Animated text effect (white → orange → white)

## 3. Typography Rules

### Font Stack
- **Primary:** Inter (sans-serif fallback)
- **Premium Alternatives:** Clash Display, Syne (imported for premium headers)

### Heading Hierarchy
- **Main Title ("Jefferson"):** 
  - Size: clamp(3.5rem, 9vw, 7rem) — massive, confident presence
  - Weight: 800 (Extra Bold)
  - Letter-spacing: -0.05em (tight, modern tracking)
  - Effect: Animated gradient text (shimmer effect)

- **Intro Line ("Hola, soy"):**
  - Size: text-2xl (1.5rem)
  - Weight: 300 (Light)
  - Letter-spacing: 0.01em (slightly tracked out)

- **Role Label ("FULL STACK DEVELOPER..."):**
  - Size: text-sm to text-base (0.875rem - 1rem)
  - Weight: 600 (Semi-bold)
  - Letter-spacing: 0.2em (generous tracking for expensive feel)
  - Transform: uppercase
  - Color: #a4d30e (Neon Lime)

- **Description:**
  - Size: text-lg (1.125rem)
  - Weight: 300 (Light)
  - Line-height: relaxed (1.625)
  - Color: #9ca3af (gray-400)

## 4. Component Stylings

### Buttons (Hire Me CTA)
- **Base State:** 
  - Background: transparent
  - Border: 1px solid #374151 (gray-800)
  - Border-radius: rounded-md (0.375rem / 6px)
  - Padding: py-3 px-8
  - Text: white, font-medium, letter-spacing 0.05em
  
- **Hover State:**
  - Scale: scale-105 (subtle grow)
  - Border: border-[#fb973f] (orange)
  - Shadow: shadow-[0_0_15px_#fb973f] (orange glow effect)
  - Transition: all duration-300 ease

### 3D Keycaps
- **Outer Shell:** 
  - Border-radius: rounded (0.07 smoothness 5)
  - Color: #0c0c20
  - Material: metalness 0.3, roughness 0.5
  - Emissive: #1e1650 at 0.5 intensity

- **Recessed Dish:**
  - Border-radius: rounded (0.05 smoothness 4)
  - Color: #060612
  - Material: metalness 0.1, roughness 0.8
  - Emissive: #0c082a at 0.7 intensity

- **Animation:** 
  - Floating motion with independent phase/amplitude per keycap
  - Micro-rotations (Z and X axis) for organic feel
  - Cluster-level slow sweep rotation

### Background Effects
- **Spotlight:**
  - Follows mouse position with 700ms ease-out transition
  - Size: 600px × 600px
  - Blur: blur-[120px]
  - Color: radial gradient #07408b → transparent
  - Opacity: 40%

- **Aurora Effect:**
  - Subtle pulse animation
  - Position: bottom-left quadrant
  - Color: rgba(7, 64, 139, 0.15)

## 5. Layout Principles

### Split-Screen Architecture (Desktop)
- **Left Panel (40%):** Text content, vertically centered
- **Right Panel (60%):** 3D Canvas with floating keyboard cluster

### Responsive Behavior
- **Desktop (md+):** Split layout, gradient fade from text to canvas
- **Mobile (< md):** Stacked layout, canvas below text at 60vw height

### Gradient Transitions
- Left-to-right fade: #050505 (solid at 30%) → transparent (100%)
- Creates seamless blend between text area and 3D visualization

### Spacing System
- Text container padding: px-10 md:px-16
- Max-width: max-w-lg (32rem)
- Vertical rhythm: mb-2, mb-4, mb-6, mb-8 increments

### Vertical Alignment
- Full viewport height: min-h-screen
- Centered content: flex items-center
- 3D Canvas: vertically centered with -translate-y-1/2

---

*This design system document serves as the semantic reference for prompting Stitch or similar tools to generate new screens that match the existing portfolio aesthetic.*
