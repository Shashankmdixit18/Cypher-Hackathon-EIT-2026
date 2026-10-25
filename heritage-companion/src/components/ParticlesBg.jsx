import { useAccessibility } from '../context/AccessibilityContext'

const TRAVEL_MARKS = [
  { id: 0, type: 'aircraft', left: '4%', top: '28%', delay: '-3s', duration: '24s', driftX: 210, driftY: -120, color: '#8be5ee', size: 20 },
  { id: 1, type: 'beacon', left: '18%', top: '72%', delay: '-1s', duration: '4.4s', color: '#f4c977', size: 7 },
  { id: 2, type: 'aircraft', left: '23%', top: '84%', delay: '-15s', duration: '28s', driftX: 190, driftY: -140, color: '#f4c977', size: 16 },
  { id: 3, type: 'beacon', left: '37%', top: '22%', delay: '-2.5s', duration: '5.1s', color: '#8be5ee', size: 6 },
  { id: 4, type: 'aircraft', left: '42%', top: '54%', delay: '-8s', duration: '25s', driftX: 230, driftY: -150, color: '#8be5ee', size: 18 },
  { id: 5, type: 'beacon', left: '56%', top: '87%', delay: '-3.2s', duration: '4.8s', color: '#f4c977', size: 8 },
  { id: 6, type: 'aircraft', left: '61%', top: '18%', delay: '-19s', duration: '30s', driftX: 200, driftY: -130, color: '#f4c977', size: 17 },
  { id: 7, type: 'beacon', left: '72%', top: '56%', delay: '-0.8s', duration: '4.1s', color: '#8be5ee', size: 6 },
  { id: 8, type: 'aircraft', left: '78%', top: '78%', delay: '-11s', duration: '27s', driftX: 180, driftY: -130, color: '#8be5ee', size: 15 },
  { id: 9, type: 'aircraft', left: '88%', top: '38%', delay: '-5s', duration: '26s', driftX: 160, driftY: -100, color: '#f4c977', size: 18 },
]

function Aircraft() {
  return (
    <svg viewBox="0 0 48 48" width="100%" height="100%" aria-hidden="true">
      <path
        d="M43 20.5 27 23 18 8.5l-3.5.5 4.5 15-9 1.5-4-4-2 .5 2.5 6.5L4 34l2 .5 5-3.5 9-1.5-1 15 3.5-.5 5.5-16 16-3.5c2-.5 2-3.5 0-3.5Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function ParticlesBg() {
  const { isAccessible } = useAccessibility()

  if (isAccessible) return null

  return (
    <div className="particle-container" aria-hidden="true">
      {TRAVEL_MARKS.map(({ id, type, left, top, delay, duration, driftX, driftY, color, size }) => (
        <div
          key={id}
          className={`particle particle-${type}`}
          style={{
            left,
            top,
            width: size,
            height: size,
            color,
            opacity: type === 'beacon' ? 0.7 : 0,
            animationDuration: duration,
            animationDelay: delay,
            ...(type === 'aircraft' && {
              '--drift-x': `${driftX}px`,
              '--drift-y': `${driftY}px`,
              '--heading': '-28deg',
            }),
          }}
        >
          {type === 'aircraft' && <Aircraft />}
        </div>
      ))}
    </div>
  )
}
