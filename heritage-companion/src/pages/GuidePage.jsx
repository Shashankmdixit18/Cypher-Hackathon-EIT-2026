/**
 * GuidePage.jsx
 * Three logical sections inside one tab:
 *
 *  LIST VIEW
 *    ┌─ StoryMap  — Leaflet map, 6 numbered markers, tap → open detail
 *    └─ Cards     — vertical list, tap → open detail
 *
 *  DETAIL VIEW  (replaces the list when a story is selected)
 *    ├─ Back / progress
 *    ├─ Hero image
 *    ├─ "Simulate Arrival" button → ArrivalModal
 *    ├─ TTSControls (Play / Pause / Stop + speed)
 *    ├─ Story text
 *    └─ Prev / Next + step dots
 *
 * Rules (PROJECT_SPEC):
 *  - Content only from sites.json — never hardcoded
 *  - Audio only starts on explicit user tap
 *  - Accessibility: ≥48 px tap targets, isAccessible respected
 */

import { useState, useCallback, useEffect, useRef } from 'react'
import { useLanguage }         from '../context/LanguageContext'
import { useAccessibility }    from '../context/AccessibilityContext'
import TTSControls             from '../components/TTSControls'
import StoryMap                from '../components/StoryMap'
import ArrivalModal            from '../components/ArrivalModal'
import PageTransition          from '../components/PageTransition'
import useTTS                  from '../hooks/useTTS'
import siteData                from '../data/sites.json'

const site        = siteData.sites[0]
const storyPoints = site.storyPoints

const FALLBACK_IMG = '/images/sp-2-raja-jai-singh.jpg'

function distanceInMetres(latitude, longitude, targetLatitude, targetLongitude) {
  const radians = (degrees) => (degrees * Math.PI) / 180
  const latitudeDelta = radians(targetLatitude - latitude)
  const longitudeDelta = radians(targetLongitude - longitude)
  const arc = Math.sin(latitudeDelta / 2) ** 2
    + Math.cos(radians(latitude)) * Math.cos(radians(targetLatitude))
    * Math.sin(longitudeDelta / 2) ** 2

  return 6371000 * 2 * Math.atan2(Math.sqrt(arc), Math.sqrt(1 - arc))
}

function getPreview(story) {
  if (!story || story.startsWith('[')) return null
  const first = story.split(/[.।]/)[0].trim()
  return first.length > 80 ? first.slice(0, 80) + '…' : first
}

// ─────────────────────────────────────────────────────────────────────────────
// STORY CARD (list view)
// ─────────────────────────────────────────────────────────────────────────────
function StoryCard({ point, index, lang, isA11y, onClick }) {
  const title   = lang === 'en' ? point.title_en : point.title_hi
  const preview = getPreview(lang === 'en' ? point.story_en : point.story_hi)

  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left flex items-stretch rounded-2xl overflow-hidden
        border shadow-card card-3d shine-sweep transition-all duration-200
        focus-visible:outline-2 focus-visible:outline-offset-2
        ${isA11y
          ? 'bg-gray-900 border-yellow-400 focus-visible:outline-yellow-400'
          : 'bg-white/75 backdrop-blur-xl border border-white/90 hover:border-gold-400/50 hover:bg-white/95 focus-visible:outline-saffron-600'
        }
      `}
      aria-label={`Story point ${index + 1}: ${title}`}
    >
      {/* Thumbnail */}
      <div className="relative w-24 sm:w-32 shrink-0 bg-parchment-200 overflow-hidden">
        <img
          src={point.image}
          alt=""
          aria-hidden="true"
          className="story-photo absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            if (!e.currentTarget.dataset.fallbackApplied) {
              e.currentTarget.dataset.fallbackApplied = 'true'
              e.currentTarget.src = FALLBACK_IMG
            }
          }}
        />
        <div className="absolute top-2 left-2 w-7 h-7 rounded-full bg-gradient-to-br from-gold-400 to-saffron-700 text-white font-cinzel text-xs font-bold flex items-center justify-center shadow-md ring-1 ring-gold-200/50">
          {index + 1}
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col justify-center px-4 py-3 min-w-0 flex-1">
        <h3 className={`font-display font-bold text-base sm:text-lg leading-snug mb-1 ${
          isA11y ? 'text-yellow-400' : 'text-ink-900'
        }`}>
          {title}
        </h3>

        {preview ? (
          <p className={`font-sans text-xs sm:text-sm leading-relaxed line-clamp-2 ${
            isA11y ? 'text-yellow-200' : 'text-ink-600'
          }`}>
            {preview}
          </p>
        ) : (
          <p className={`font-sans text-xs italic ${isA11y ? 'text-yellow-600' : 'text-ink-400'}`}>
            {lang === 'en' ? 'Tap to read the full story' : 'पूरी कहानी पढ़ने के लिए टैप करें'}
          </p>
        )}

        <span className={`mt-2 text-xs font-mono ${isA11y ? 'text-yellow-500' : 'text-saffron-600'}`}>
          {lang === 'en' ? 'Read & Listen →' : 'पढ़ें और सुनें →'}
        </span>
      </div>
    </button>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// STORY DETAIL
// ─────────────────────────────────────────────────────────────────────────────
function StoryDetail({ index, setIndex, lang, isA11y, onBack, tts }) {
  const [showArrival, setShowArrival] = useState(false)
  const [gpsEnabled, setGpsEnabled] = useState(false)
  const [arrivalSource, setArrivalSource] = useState('simulation')
  const [locationError, setLocationError] = useState('')
  const [locationStatus, setLocationStatus] = useState('')
  const arrivalTriggered = useRef(false)

  const point  = storyPoints[index]
  const title  = lang === 'en' ? point.title_en : point.title_hi
  const story  = lang === 'en' ? point.story_en : point.story_hi
  const locale = lang === 'en' ? 'en-IN' : 'hi-IN'
  const isPlaceholder = story.startsWith('[')
  const total = storyPoints.length

  useEffect(() => {
    arrivalTriggered.current = false
  }, [point.id])

  useEffect(() => {
    if (!gpsEnabled || arrivalTriggered.current) return undefined

    if (!navigator.geolocation) {
      setLocationError(lang === 'en'
        ? 'Location detection is not available in this browser.'
        : 'इस ब्राउज़र में स्थान पहचान उपलब्ध नहीं है।')
      setGpsEnabled(false)
      return undefined
    }

    setLocationError('')
    const watchId = navigator.geolocation.watchPosition(
      ({ coords }) => {
        setLocationStatus(lang === 'en'
          ? 'Location alerts are active. You will be notified within 30 metres of this stop.'
          : 'स्थान-आधारित सूचना चालू हैं। इस पड़ाव से 30 मीटर के भीतर पहुँचने पर आपको सूचित किया जाएगा।')
        const distance = distanceInMetres(coords.latitude, coords.longitude, point.lat, point.lng)
        if (distance <= 30 && !arrivalTriggered.current) {
          arrivalTriggered.current = true
          setLocationStatus('')
          setArrivalSource('gps')
          setShowArrival(true)
          setGpsEnabled(false)
        }
      },
      (error) => {
        const message = error.code === 1
          ? (lang === 'en'
            ? 'Location permission was not granted. You can still simulate arrival below.'
            : 'स्थान की अनुमति नहीं मिली। आप नीचे पहुँचने का अनुकरण कर सकते हैं।')
          : error.code === 2
            ? (lang === 'en'
              ? 'Your location is unavailable right now. Try again or simulate arrival below.'
              : 'अभी आपका स्थान उपलब्ध नहीं है। फिर कोशिश करें या नीचे पहुँचने का अनुकरण करें।')
            : (lang === 'en'
              ? 'Location check timed out. Try again or simulate arrival below.'
              : 'स्थान जाँच का समय समाप्त हुआ। फिर कोशिश करें या नीचे पहुँचने का अनुकरण करें।')

        setLocationError(message)
        setLocationStatus('')
        setGpsEnabled(false)
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 20000 },
    )

    return () => navigator.geolocation.clearWatch(watchId)
  }, [gpsEnabled, lang, point.id, point.lat, point.lng])

  const goTo = (newIdx) => {
    tts.stop()
    setShowArrival(false)
    setLocationStatus('')
    setLocationError('')
    setArrivalSource('simulation')
    setIndex(newIdx)
  }

  const handleSimulatedArrival = () => {
    setGpsEnabled(false)
    setLocationStatus('')
    setLocationError('')
    setArrivalSource('simulation')
    setShowArrival(true)
  }

  const handleEnableLocation = () => {
    arrivalTriggered.current = false
    setLocationError('')
    setLocationStatus('')
    setGpsEnabled(true)
  }

  // Arrival modal: "Yes, Play" handler
  const handleArrivalPlay = () => {
    setShowArrival(false)
    tts.play(isPlaceholder ? title : `${title}. ${story}`, locale)
  }

  return (
    <div className="flex flex-col min-h-full">

      {/* ── Back + progress ───────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-4 gap-3">
        <button
          onClick={onBack}
          className={`tap-target flex items-center gap-1.5 px-3 py-1.5 rounded-full border font-sans text-xs font-semibold transition-all ${
            isA11y
              ? 'border-yellow-400 text-yellow-400 hover:bg-yellow-400/10'
              : 'border-ink-700 text-ink-800 bg-parchment-200/60 hover:bg-parchment-300'
          }`}
        >
          ← {lang === 'en' ? 'All Stories' : 'सभी कहानियाँ'}
        </button>

        <span className={`font-mono text-xs ${isA11y ? 'text-yellow-500' : 'text-ink-400'}`}>
          {index + 1} / {total}
        </span>
      </div>

      {/* ── Hero image ───────────────────────────────────────────────── */}
      <div className={`relative rounded-xl overflow-hidden h-48 sm:h-64 mb-5 border-2 ${
        isA11y ? 'border-yellow-400' : 'border-parchment-300'
      }`}>
        <img
          src={point.image}
          alt={title}
          className="story-photo absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            if (!e.currentTarget.dataset.fallbackApplied) {
              e.currentTarget.dataset.fallbackApplied = 'true'
              e.currentTarget.src = FALLBACK_IMG
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <span className="stamp-badge border-parchment-300/60 text-parchment-100 text-[10px] mb-1">
            {lang === 'en' ? `STORY POINT ${index + 1}` : `कहानी बिंदु ${index + 1}`}
          </span>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-white drop-shadow-lg mt-1">
            {title}
          </h2>
        </div>
      </div>

      {/* ── Simulate Arrival button ───────────────────────────────────── */}
      <div className="mb-4">
        <div className={`mb-3 rounded-xl border p-3 ${
          isA11y ? 'border-yellow-400 bg-gray-900' : 'border-cyan-100/50 bg-[#102b38]/90'
        }`}>
          <p className={`font-sans text-xs leading-relaxed ${
            isA11y ? 'text-yellow-200' : 'text-slate-200'
          }`}>
            {lang === 'en'
              ? 'Want an arrival alert near this stop? If you enable location, it is checked only while you are viewing a story.'
              : 'इस पड़ाव के पास पहुँचने पर सूचना चाहिए? स्थान की अनुमति देने पर जाँच केवल कहानी देखते समय होगी।'}
          </p>
          <button
            type="button"
            onClick={handleEnableLocation}
            disabled={gpsEnabled}
            className={`mt-2 tap-target w-full justify-center rounded-lg border px-3 py-2 text-xs font-semibold transition-colors disabled:cursor-wait disabled:opacity-70 ${
              isA11y
                ? 'border-yellow-400 text-yellow-300 hover:bg-yellow-400/10'
                : 'border-cyan-200/30 bg-white/[0.06] text-cyan-100 hover:bg-white/[0.12]'
            }`}
          >
            {gpsEnabled
              ? (lang === 'en' ? 'Waiting for your location…' : 'आपके स्थान की प्रतीक्षा…')
              : (lang === 'en' ? 'Enable nearby arrival alerts' : 'पास पहुँचने की सूचना चालू करें')}
          </button>
          {locationError && (
            <p role="alert" className={`mt-2 text-xs leading-relaxed ${isA11y ? 'text-yellow-300' : 'text-amber-200'}`}>
              {locationError}
            </p>
          )}
          {locationStatus && (
            <p role="status" aria-live="polite" className={`mt-2 text-xs leading-relaxed ${
              isA11y ? 'text-yellow-300' : 'text-emerald-200'
            }`}>
              {locationStatus}
            </p>
          )}
        </div>
        <button
          onClick={handleSimulatedArrival}
          className={`
            w-full tap-target py-3 rounded-full font-sans font-semibold text-sm tracking-wide
            border flex items-center justify-center gap-2 transition-all
            active:translate-y-0.5
            ${isA11y
              ? 'bg-yellow-400/10 border-yellow-400 text-yellow-400 hover:bg-yellow-400/20'
              : 'bg-parchment-200/60 border-saffron-500 text-saffron-800 hover:bg-parchment-300'
            }
          `}
        >
          <span>📍</span>
          <span>{lang === 'en' ? 'Simulate Arrival Here' : 'यहाँ पहुँचने का अनुकरण करें'}</span>
        </button>
        <p className={`text-center font-mono text-[10px] mt-1.5 tracking-wide ${
          isA11y ? 'text-yellow-600' : 'text-ink-400'
        }`}>
          {lang === 'en' ? '📍 Or use the demo fallback at any time' : '📍 या किसी भी समय डेमो विकल्प चुनें'}
        </p>
      </div>

      {/* ── TTS audio controls ────────────────────────────────────────── */}
      <div className="mb-5">
        <TTSControls
          tts={tts}
          text={isPlaceholder ? title : `${title}. ${story}`}
          locale={locale}
        />
      </div>

      {/* ── Story text ───────────────────────────────────────────────── */}
      <div className={`retro-card rounded-xl p-5 sm:p-6 mb-6 relative ${
        isA11y ? 'bg-gray-900 border-yellow-400' : 'bg-parchment-50'
      }`}>
        <div className="corner-flourish tl" />
        <div className="corner-flourish tr" />
        <div className="corner-flourish bl" />
        <div className="corner-flourish br" />

        {isPlaceholder ? (
          <div className="flex flex-col items-center py-8 text-center gap-3">
            <span className="text-3xl opacity-40">📜</span>
            <p className={`font-sans text-sm italic ${isA11y ? 'text-yellow-400' : 'text-ink-500'}`}>
              {lang === 'en'
                ? 'Full story text coming soon. Title and location are confirmed above.'
                : 'पूरी कहानी जल्द ही आएगी। शीर्षक और स्थान ऊपर पुष्टि की गई है।'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {story.split('\n').filter(Boolean).map((para, i) => (
              <p key={i} className={`font-serif text-sm sm:text-base leading-relaxed ${
                isA11y ? 'text-yellow-100' : 'text-ink-800'
              }`}>
                {para}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* ── Prev / Next + step dots ──────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3 pb-4">
        <button
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          className={`tap-target flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-sans font-semibold text-sm border transition-all ${
            index === 0
              ? 'opacity-30 cursor-not-allowed border-transparent'
              : isA11y
              ? 'border-yellow-400 text-yellow-400 hover:bg-yellow-400/10'
              : 'border-ink-800 text-ink-900 bg-parchment-100 hover:bg-parchment-200'
          }`}
        >
          ← {lang === 'en' ? 'Previous' : 'पिछला'}
        </button>

        <div className="flex gap-1.5 shrink-0">
          {storyPoints.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to story ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === index
                  ? isA11y ? 'bg-yellow-400 scale-125' : 'bg-saffron-600 scale-125'
                  : isA11y ? 'bg-yellow-400/30' : 'bg-parchment-400'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => goTo(index + 1)}
          disabled={index === total - 1}
          className={`tap-target flex-1 flex items-center justify-center gap-2 py-3 rounded-full font-sans font-semibold text-sm border transition-all ${
            index === total - 1
              ? 'opacity-30 cursor-not-allowed border-transparent'
              : isA11y
              ? 'bg-yellow-400 text-gray-950 border-yellow-400 hover:bg-yellow-300'
              : 'bg-saffron-600 text-white border-ink-900 hover:bg-saffron-700'
          }`}
        >
          {lang === 'en' ? 'Next' : 'अगला'} →
        </button>
      </div>

      {/* ── Arrival modal (portal-like, rendered in-tree but fixed) ───── */}
      {showArrival && (
        <ArrivalModal
          title={title}
          lang={lang}
          isA11y={isA11y}
          arrivalSource={arrivalSource}
          onPlay={handleArrivalPlay}
          onClose={() => setShowArrival(false)}
        />
      )}

    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// GUIDE PAGE — root
// ─────────────────────────────────────────────────────────────────────────────
export default function GuidePage() {
  const { lang, t }              = useLanguage()
  const { isAccessible: isA11y } = useAccessibility()

  // null = list view; number = detail view index
  const [activeIndex, setActiveIndex] = useState(null)

  // Shared TTS instance — persists across prev/next within detail view
  const tts = useTTS()

  const openDetail = useCallback((idx) => {
    tts.stop()
    setActiveIndex(idx)
    // Scroll to top of page so detail starts from the top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [tts])

  const closeDetail = useCallback(() => {
    tts.stop()
    setActiveIndex(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [tts])

  return (
    <PageTransition>
      <div className="w-full mx-auto max-w-3xl px-4 sm:px-6 pt-4 sm:pt-6">

      {activeIndex === null ? (
        /* ╔══════════════ LIST VIEW ══════════════╗ */
        <>
          {/* Page header */}
          <div className="mb-5 border-b pb-3 border-parchment-400/40">
            <span className={`stamp-badge text-[10px] mb-1.5 ${
              isA11y ? 'border-yellow-400 text-yellow-400' : 'border-saffron-700 text-saffron-800'
            }`}>
              {lang === 'en' ? 'AUDIO COMPANION · 6 STOPS' : 'ऑडियो साथी · 6 पड़ाव'}
            </span>
            <h1 className={`text-2xl sm:text-3xl font-display font-bold ${
              isA11y ? 'text-yellow-400' : 'text-white'
            }`}>
              {t('guide.pageTitle')}
            </h1>
            <p className={`font-sans text-xs mt-1 ${isA11y ? 'text-yellow-300' : 'text-ink-600'}`}>
              {lang === 'en'
                ? 'Tap a marker on the map or a card below to start the story.'
                : 'कहानी शुरू करने के लिए मानचित्र पर मार्कर या नीचे कार्ड टैप करें।'}
            </p>
          </div>

          {/* ── Leaflet tour map ────────────────────────────────────── */}
          <div className="mb-6">
            <StoryMap
              activeIndex={activeIndex}
              onSelectPoint={openDetail}
              lang={lang}
            />
          </div>

          {/* ── Story cards ─────────────────────────────────────────── */}
          <div className="flex flex-col gap-3 pb-6">
            {storyPoints.map((point, idx) => (
              <StoryCard
                key={point.id}
                point={point}
                index={idx}
                lang={lang}
                isA11y={isA11y}
                onClick={() => openDetail(idx)}
              />
            ))}
          </div>

          {/* Etiquette reminder strip */}
          <div className={`mb-8 rounded-2xl border p-4 flex items-start gap-3 ${
            isA11y ? 'bg-gray-900 border-yellow-400' : 'bg-white/95 backdrop-blur-xl border-cyan-100/70 shadow-lg'
          }`}>
            <span className="text-2xl shrink-0">🙏</span>
            <div>
              <h3 className={`font-cinzel text-xs font-bold mb-0.5 ${isA11y ? 'text-yellow-400' : 'text-[#075b70]'}`}>
                {t('etiquette.pageTitle')}
              </h3>
              <ul className={`font-sans text-xs space-y-1 ${isA11y ? 'text-yellow-200' : 'text-ink-800'}`}>
                {site.etiquette.slice(0, 3).map((rule, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-[#087f8c] font-bold shrink-0">•</span>
                    {lang === 'en' ? rule.en : rule.hi}
                  </li>
                ))}
                <li className={`italic ${isA11y ? 'text-yellow-500' : 'text-ink-600'}`}>
                  {lang === 'en' ? '…and more inside' : '…और अधिक अंदर'}
                </li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        /* ╔══════════════ DETAIL VIEW ═════════════╗ */
        <StoryDetail
          index={activeIndex}
          setIndex={setActiveIndex}
          lang={lang}
          isA11y={isA11y}
          onBack={closeDetail}
          tts={tts}
        />
      )}

      </div>
    </PageTransition>
  )
}
