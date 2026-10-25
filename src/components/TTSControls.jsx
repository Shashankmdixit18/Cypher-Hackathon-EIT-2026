/**
 * TTSControls.jsx
 * Reusable audio player controls for the Story Guide.
 *
 * Props:
 *   tts       — object from useTTS()
 *   text      — the full text to speak
 *   locale    — 'en-IN' or 'hi-IN'
 *   isA11y    — accessibility mode flag (already at slow speed in a11y)
 */

import { useEffect } from 'react'
import { useAccessibility } from '../context/AccessibilityContext'

const SPEEDS = [
  { label: '0.7×', value: 0.7 },
  { label: '1×',   value: 1   },
  { label: '1.2×', value: 1.2 },
]

export default function TTSControls({ tts, text, locale }) {
  const { isAccessible: a } = useAccessibility()

  // When accessibility mode is on, default to slow speed
  useEffect(() => {
    if (a) tts.setRate(0.7)
  }, [a]) // eslint-disable-line react-hooks/exhaustive-deps

  // Stop speech when the text or locale changes (i.e. user switched story point)
  useEffect(() => {
    tts.stop()
  }, [text, locale]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!tts.supported) {
    return (
      <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-xs font-sans text-amber-900 flex items-center gap-2">
        <span>🔇</span>
        <span>Audio is not supported on this device or browser. The full text is shown below.</span>
      </div>
    )
  }

  const isPlaying = tts.status === 'playing'
  const isPaused  = tts.status === 'paused'
  const isActive  = isPlaying || isPaused

  return (
    <div className={`rounded-2xl border p-3 sm:p-4 flex flex-col gap-3 ${
      a ? 'bg-gray-900 border-yellow-400' : 'bg-white/[0.07] backdrop-blur-xl border border-white/20'
    }`}>

      {/* ── No-voice friendly note ────────────────────────────────────── */}
      {tts.noVoice && (
        <div className="rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-sans text-amber-800 flex items-start gap-2">
          <span className="mt-0.5 shrink-0">ℹ️</span>
          <span>
            {locale.startsWith('hi')
              ? 'आपके ब्राउज़र में हिंदी की आवाज़ नहीं मिली। अंग्रेज़ी की आवाज़ में सुनाया जाएगा। नीचे हिंदी पाठ पढ़ सकते हैं।'
              : "No matching voice found; using the browser\u2019s default voice."}
          </span>
        </div>
      )}

      {/* ── Main controls row ─────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-2">

        {/* Play / Re-play button */}
        <button
          onClick={() => tts.play(text, locale)}
          disabled={isPlaying}
          aria-label="Play audio"
          className={`tap-target px-4 py-2 rounded-full font-sans font-semibold text-xs tracking-wide border transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed ${
            isPlaying
              ? a ? 'bg-yellow-400 text-gray-950 border-yellow-400' : 'bg-saffron-700 text-white border-ink-900'
              : a ? 'bg-yellow-400 text-gray-950 border-yellow-400 hover:bg-yellow-300' : 'bg-saffron-600 text-white border-ink-900 hover:bg-saffron-700'
          }`}
        >
          {isPlaying ? '🔊' : '▶'}
          <span>{isPlaying ? 'Playing…' : 'Play'}</span>
        </button>

        {/* Pause / Resume toggle — only shown while active */}
        {isActive && (
          <button
            onClick={tts.pause}
            aria-label={isPaused ? 'Resume audio' : 'Pause audio'}
            className={`tap-target px-4 py-2 rounded-full font-sans font-semibold text-xs tracking-wide border transition-all flex items-center gap-1.5 ${
              a
                ? 'border-yellow-400 text-yellow-400 hover:bg-yellow-400/20'
                : 'border-ink-800 text-ink-900 bg-parchment-200 hover:bg-parchment-300'
            }`}
          >
            {isPaused ? '▶ Resume' : '⏸ Pause'}
          </button>
        )}

        {/* Stop button — only shown while active */}
        {isActive && (
          <button
            onClick={tts.stop}
            aria-label="Stop audio"
            className={`tap-target px-4 py-2 rounded-full font-sans font-semibold text-xs tracking-wide border transition-all flex items-center gap-1.5 ${
              a
                ? 'border-yellow-400/60 text-yellow-300 hover:bg-yellow-400/10'
                : 'border-parchment-400 text-ink-700 hover:bg-parchment-200'
            }`}
          >
            ⏹ Stop
          </button>
        )}
      </div>

      {/* ── Speed selector ────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`label-cinzel text-[10px] ${a ? 'text-yellow-500' : 'text-ink-500'}`}>
          SPEED
        </span>
        {SPEEDS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => {
              tts.setRate(value)
              // If already speaking, restart at new speed
              if (isActive) tts.play(text, locale)
            }}
            aria-pressed={tts.rate === value}
            className={`px-3 py-1 rounded text-xs font-mono border transition-all ${
              tts.rate === value
                ? a
                  ? 'bg-yellow-400 text-gray-950 border-yellow-400 font-bold'
                  : 'bg-ink-900 text-white border-ink-900 font-bold'
                : a
                ? 'border-yellow-400/40 text-yellow-300 hover:bg-yellow-400/10'
                : 'border-parchment-400 text-ink-700 bg-parchment-50 hover:bg-parchment-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

    </div>
  )
}
