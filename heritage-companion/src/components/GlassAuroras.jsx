/**
 * GlassAuroras.jsx
 * Midnight atlas lights drifting behind frosted glass:
 *  - Deep ocean-blue navigation glow
 *  - Sarovar teal route-light
 *  - Restrained brass wayfinding accent
 * Suppressed in accessibility mode for WCAG compliance.
 */
import { useAccessibility } from '../context/AccessibilityContext'

export default function GlassAuroras() {
  const { isAccessible: a } = useAccessibility()
  if (a) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      {/* Deep ocean navigation glow — Top Center-Left */}
      <div
        className="absolute -top-24 left-1/4 w-[600px] h-[450px] rounded-full bg-gradient-to-b from-cyan-400/18 via-sky-500/14 to-transparent blur-[110px] animate-aurora-drift"
        style={{ animationDuration: '14s' }}
      />

      {/* Upper-right twilight glow */}
      <div
        className="absolute top-24 -right-28 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-500/20 via-indigo-500/12 to-cyan-400/10 blur-[120px] animate-aurora-drift"
        style={{ animationDuration: '18s', animationDelay: '-4s' }}
      />

      {/* Sarovar teal route-light — Mid-left */}
      <div
        className="absolute top-[38%] -left-32 w-[540px] h-[540px] rounded-full bg-gradient-to-tr from-teal-400/20 via-cyan-500/12 to-transparent blur-[115px] animate-aurora-drift"
        style={{ animationDuration: '16s', animationDelay: '-8s' }}
      />

      {/* Brass wayfinding glint — Lower Center-right */}
      <div
        className="absolute bottom-20 right-1/4 w-[580px] h-[420px] rounded-full bg-gradient-to-t from-amber-300/12 via-cyan-400/8 to-transparent blur-[125px] animate-aurora-drift"
        style={{ animationDuration: '20s', animationDelay: '-12s' }}
      />
    </div>
  )
}
