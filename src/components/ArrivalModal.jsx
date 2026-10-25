/**
 * ArrivalModal.jsx
 * "Simulate Arrival" confirmation popup shown on each story detail screen.
 *
 * Props:
 *   title   — localised title of the story point
 *   lang    — 'en' | 'hi'
 *   isA11y  — accessibility flag
 *   onPlay  — callback: user confirmed → start TTS
 *   onClose — callback: user dismissed modal
 */

export default function ArrivalModal({ title, lang, isA11y, arrivalSource, onPlay, onClose }) {
  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-ink-900/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={lang === 'en' ? 'Arrival notification' : 'आगमन सूचना'}
    >
      {/* Modal card */}
      <div
        className={`retro-card relative w-full max-w-sm rounded-3xl p-6 animate-fade-up ${
          isA11y ? 'bg-gray-900 border-yellow-400' : 'bg-parchment-50 border-saffron-600'
        }`}
      >
        {/* Corner flourishes */}
        <div className="corner-flourish tl" />
        <div className="corner-flourish tr" />
        <div className="corner-flourish bl" />
        <div className="corner-flourish br" />

        {/* Icon */}
        <div className="text-4xl text-center mb-3" aria-hidden="true">📍</div>

        {/* Arrived headline */}
        <p className={`label-cinzel text-center mb-1 ${isA11y ? 'text-yellow-500' : 'text-saffron-700'}`}>
          {lang === 'en' ? "YOU'VE REACHED" : 'आप पहुँच गए हैं'}
        </p>

        <h2
          className={`font-display font-bold text-xl sm:text-2xl text-center mb-4 leading-snug ${
            isA11y ? 'text-yellow-400' : 'text-ink-900'
          }`}
        >
          {title}
        </h2>

        {/* Divider */}
        <div className="ornament-divider mb-4">✦ ✦ ✦</div>

        {/* Question */}
        <p className={`font-sans text-sm text-center mb-5 ${isA11y ? 'text-yellow-200' : 'text-ink-700'}`}>
          {lang === 'en' ? 'Play story?' : 'कहानी सुनें?'}
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          {/* Yes — play */}
          <button
            onClick={onPlay}
            autoFocus
            className={`
              tap-target flex-1 py-3 rounded-full font-sans font-semibold text-sm tracking-wide
              border transition-all
              flex items-center justify-center gap-2
              ${isA11y
                ? 'bg-yellow-400 text-gray-950 border-yellow-400 hover:bg-yellow-300'
                : 'bg-saffron-600 text-white border-ink-900 hover:bg-saffron-700'
              }
            `}
          >
            <span>🔊</span>
            <span>{lang === 'en' ? 'Yes, Play' : 'हाँ, सुनें'}</span>
          </button>

          {/* No — dismiss */}
          <button
            onClick={onClose}
            className={`
              tap-target flex-1 py-3 rounded-full font-sans font-semibold text-sm tracking-wide
              border transition-all
              ${isA11y
                ? 'border-yellow-400 text-yellow-300 hover:bg-yellow-400/10'
                : 'border-parchment-400 text-ink-800 bg-parchment-200 hover:bg-parchment-300'
              }
            `}
          >
            {lang === 'en' ? 'Not now' : 'अभी नहीं'}
          </button>
        </div>

        {/* GPS note */}
        <p className={`mt-4 text-center font-mono text-[10px] tracking-wider ${
          isA11y ? 'text-yellow-600' : 'text-ink-400'
        }`}>
          {arrivalSource === 'gps'
            ? (lang === 'en' ? '📍 Nearby stop detected using your location' : '📍 आपके स्थान से पास का पड़ाव पहचाना गया')
            : (lang === 'en' ? '📍 Demo arrival · location was not used' : '📍 डेमो आगमन · स्थान का उपयोग नहीं हुआ')}
        </p>
      </div>
    </div>
  )
}
