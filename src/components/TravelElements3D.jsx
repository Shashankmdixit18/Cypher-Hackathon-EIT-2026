/**
 * TravelElements3D.jsx
 * Antique brass & celestial cartographic flourishes.
 * Fixed, pointer-events: none — ambient vintage travel background flourishes.
 * Suppressed in accessibility mode.
 */
import { useAccessibility } from '../context/AccessibilityContext'

// ── Antique Cartographic Compass Rose ───────────────────────────────────────
function CompassRose({ className = '' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Outer concentric rings */}
      <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" />
      <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.25" />
      
      {/* 8-pointed star points */}
      {/* North */}
      <polygon points="50,6 55,48 50,44 45,48" fill="currentColor" opacity="0.65" />
      {/* South */}
      <polygon points="50,94 55,52 50,56 45,52" fill="currentColor" opacity="0.4" />
      {/* East */}
      <polygon points="94,50 52,55 56,50 52,45" fill="currentColor" opacity="0.4" />
      {/* West */}
      <polygon points="6,50 48,55 44,50 48,45" fill="currentColor" opacity="0.4" />
      
      {/* NE, NW, SE, SW secondary points */}
      <polygon points="81,19 54,47 50,45 47,50" fill="currentColor" opacity="0.3" />
      <polygon points="19,19 46,47 50,45 53,50" fill="currentColor" opacity="0.3" />
      <polygon points="81,81 54,53 50,55 47,50" fill="currentColor" opacity="0.3" />
      <polygon points="19,81 46,53 50,55 53,50" fill="currentColor" opacity="0.3" />

      {/* Center rosette */}
      <circle cx="50" cy="50" r="5" fill="currentColor" opacity="0.6" />
      <circle cx="50" cy="50" r="2" fill="#fff" opacity="0.8" />

      {/* Degree ticks */}
      {Array.from({ length: 24 }, (_, i) => {
        const rad = (i * 15 * Math.PI) / 180
        const r1 = 44, r2 = 47
        return (
          <line
            key={i}
            x1={50 + r1 * Math.sin(rad)}
            y1={50 - r1 * Math.cos(rad)}
            x2={50 + r2 * Math.sin(rad)}
            y2={50 - r2 * Math.cos(rad)}
            stroke="currentColor"
            strokeWidth="0.6"
            opacity="0.3"
          />
        )
      })}
    </svg>
  )
}

// ── Retro Airplane Route ────────────────────────────────────────────────────
function RetroPlane({ className = '' }) {
  return (
    <svg viewBox="0 0 54 54" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M48 24 L8 9 L12 24 L7 26 L9 31 L17 29 L23 48 L28 46 L26 28 L34 26 L36 31 L44 26 Z"
        fill="currentColor"
        opacity="0.5"
      />
    </svg>
  )
}

// ── Sacred Lotus Bloom ──────────────────────────────────────────────────────
function SacredLotus({ className = '' }) {
  return (
    <svg viewBox="0 0 50 50" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Layered petals */}
      <ellipse cx="25" cy="27" rx="6" ry="15" fill="currentColor" opacity="0.45" />
      <ellipse cx="25" cy="27" rx="6" ry="15" fill="currentColor" opacity="0.4" transform="rotate(35 25 25)" />
      <ellipse cx="25" cy="27" rx="6" ry="15" fill="currentColor" opacity="0.4" transform="rotate(-35 25 25)" />
      <ellipse cx="25" cy="27" rx="6" ry="15" fill="currentColor" opacity="0.35" transform="rotate(70 25 25)" />
      <ellipse cx="25" cy="27" rx="6" ry="15" fill="currentColor" opacity="0.35" transform="rotate(-70 25 25)" />
      <circle cx="25" cy="25" r="4.5" fill="currentColor" opacity="0.6" />
    </svg>
  )
}

// ── Khanda Emblem (Sacred Heritage) ─────────────────────────────────────────
function SacredEmblem({ className = '' }) {
  return (
    <svg viewBox="0 0 60 80" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Central sword blade */}
      <path d="M30 4 L27 38 L33 38 Z" fill="currentColor" opacity="0.55" />
      <path d="M30 76 L27 42 L33 42 Z" fill="currentColor" opacity="0.55" />
      {/* Chakkar circle */}
      <circle cx="30" cy="40" r="14" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.45" />
      {/* Kirpans */}
      <path d="M12 18 Q 20 40 48 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      <path d="M48 18 Q 40 40 12 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    </svg>
  )
}

export default function TravelElements3D() {
  const { isAccessible: a } = useAccessibility()
  if (a) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">

      {/* Top-right cartographic compass */}
      <div
        className="absolute top-16 right-4 sm:right-8 w-24 h-24 sm:w-32 sm:h-32 text-brass-dark"
        style={{ opacity: 0.16 }}
      >
        <div className="compass-outer w-full h-full">
          <CompassRose className="w-full h-full" />
        </div>
      </div>

      {/* Top-left sacred lotus */}
      <div
        className="absolute top-28 left-6 sm:left-12 w-12 h-12 sm:w-16 sm:h-16 text-gold-600 travel-float"
        style={{ opacity: 0.14, animationDelay: '-2s' }}
      >
        <SacredLotus className="w-full h-full" />
      </div>

      {/* Bottom-left Khanda emblem */}
      <div
        className="absolute bottom-36 left-4 sm:left-8 w-12 h-16 sm:w-16 sm:h-22 text-saffron-700 travel-float"
        style={{ opacity: 0.12, animationDelay: '-4s' }}
      >
        <SacredEmblem className="w-full h-full" />
      </div>

      {/* Mid-right sacred lotus */}
      <div
        className="absolute top-1/2 right-4 sm:right-10 w-10 h-10 sm:w-14 sm:h-14 text-brass-DEFAULT travel-float"
        style={{ opacity: 0.13, animationDelay: '-1s' }}
      >
        <SacredLotus className="w-full h-full" />
      </div>

      {/* Subtle cruise airplane across the upper sky */}
      <div
        className="absolute top-10 left-1/4 w-8 h-8 sm:w-10 sm:h-10 text-saffron-600"
        style={{ opacity: 0.14, animation: 'plane-fly 14s ease-in-out infinite' }}
      >
        <RetroPlane className="w-full h-full" />
      </div>

      {/* Bottom-right celestial star compass */}
      <div
        className="absolute -bottom-8 -right-8 w-44 h-44 sm:w-56 sm:h-56 text-parchment-700"
        style={{ opacity: 0.08 }}
      >
        <div className="compass-outer w-full h-full">
          <CompassRose className="w-full h-full" />
        </div>
      </div>

    </div>
  )
}
