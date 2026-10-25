import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useAccessibility } from '../context/AccessibilityContext'
import PageTransition from '../components/PageTransition'
import LocalRouteMap from '../components/LocalRouteMap'
import siteData from '../data/sites.json'

const site = siteData.sites[0]
const transportList = site.transport

export default function TransportPage() {
  const { lang, t } = useLanguage()
  const { isAccessible: a } = useAccessibility()

  const [selectedTransport, setSelectedTransport] = useState(transportList[0])
  const handleSelect = (tr) => {
    setSelectedTransport(tr)
  }

  const mapPoints = [
    {
      id: 'destination',
      lat: site.coordinates.lat,
      lng: site.coordinates.lng,
      label: lang === 'en' ? site.name_en : site.name_hi,
      icon: '🕌',
      isDestination: true,
    },
    ...transportList.map((transport) => ({
      id: transport.id,
      lat: transport.pickupLat,
      lng: transport.pickupLng,
      label: `${transport.pickupLabel} · ${lang === 'en' ? transport.name_en : transport.name_hi} · ${lang === 'en' ? transport.approx_fare_en : transport.approx_fare_hi}`,
      icon: transport.icon,
      isActive: transport.id === selectedTransport.id,
      onClick: () => handleSelect(transport),
    })),
  ]

  const cardStyle = `retro-card card-3d rounded-2xl p-5 sm:p-6 ${a ? 'bg-gray-900 border-yellow-400' : 'bg-white/75 backdrop-blur-xl border border-white/90 shadow-card'}`

  return (
    <PageTransition>
    <div className="w-full mx-auto max-w-4xl px-4 sm:px-6 pt-4 sm:pt-6 pb-24 sm:pb-8">

      {/* ── Page Header ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b pb-3 border-parchment-400/40">
        <div>
          <span className={`stamp-badge border-saffron-700 text-saffron-800 text-[10px] mb-1 ${a ? '' : 'badge-3d'}`}>
            {t('transport.badge')}
          </span>
          <h1 className={`text-2xl sm:text-3xl font-display font-bold ${a ? 'text-yellow-400' : 'text-white'}`}>
            {t('transport.pageTitle')}
          </h1>
        </div>
      </div>

      {/* ── Metro Recommendation Banner ───────────────────────────────────────── */}
      <div
        className={`p-3.5 rounded-2xl text-xs sm:text-sm font-sans mb-5 border flex items-start gap-3 ${
          a
            ? 'bg-yellow-400/10 text-yellow-300 border-yellow-400'
            : 'bg-emerald-50/85 border border-emerald-300/80 text-emerald-950 backdrop-blur-md shadow-sm'
        }`}
      >
        <span className="text-xl shrink-0">🚇</span>
        <div className="leading-relaxed">
          <span className="font-bold font-cinzel text-emerald-900">
            {lang === 'en' ? 'Smart Travel Advice: ' : 'स्मार्ट यात्रा सलाह: '}
          </span>
          {t('transport.metroRecommended')}
        </div>
      </div>

      {/* ── Fair-Fare Checker Mode Selector ──────────────────────────────────── */}
      <div className="mb-2">
        <h2 className={`font-cinzel text-xs font-bold uppercase tracking-wider mb-2.5 ${a ? 'text-yellow-400' : 'text-cyan-200'}`}>
          {t('transport.selectMode')}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
          {transportList.map((tr) => {
            const isSelected = selectedTransport.id === tr.id
            return (
              <button
                key={tr.id}
                onClick={() => handleSelect(tr)}
                className={`tap-target p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between card-3d shine-sweep ${
                  isSelected
                    ? a
                      ? 'bg-yellow-400 text-gray-950 border-yellow-400 font-bold shadow-retro-sm'
                      : 'bg-gradient-to-br from-saffron-600 to-gold-600 text-white border-white/40 shadow-[0_8px_25px_rgba(234,88,12,0.4)] font-bold'
                    : a
                    ? 'border-yellow-400/40 text-yellow-300 bg-gray-900'
                    : 'bg-white/75 backdrop-blur-xl border border-white/90 text-ink-900 hover:bg-white/95 hover:border-gold-400/50 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="text-2xl">{tr.icon}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${
                    isSelected
                      ? (a ? 'bg-black text-yellow-400' : 'bg-saffron-900 text-white')
                      : (a ? 'bg-yellow-400/20 text-yellow-300' : 'bg-parchment-300 text-ink-800')
                  }`}>
                    {tr.mode}
                  </span>
                </div>
                <span className="font-cinzel text-xs line-clamp-1 leading-snug">
                  {lang === 'en' ? tr.name_en : tr.name_hi}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Selected Transport Mode Detail Card ──────────────────────────────── */}
      <div className={`${cardStyle} mb-6`}>
        {/* Title & Fare Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-parchment-300">
          <div className="flex items-center gap-3">
            <span className="text-3xl sm:text-4xl">{selectedTransport.icon}</span>
            <div>
              <h3 className={`font-display text-xl sm:text-2xl font-bold ${a ? 'text-yellow-400' : 'text-ink-900'}`}>
                {lang === 'en' ? selectedTransport.name_en : selectedTransport.name_hi}
              </h3>
              <p className={`font-mono text-xs ${a ? 'text-yellow-300' : 'text-ink-500'}`}>
                {selectedTransport.pickupLabel}
              </p>
            </div>
          </div>

          <div className={`p-2.5 rounded-lg border flex flex-col items-start sm:items-end ${
            a ? 'bg-black/60 border-yellow-400' : 'bg-saffron-50 border-saffron-300'
          }`}>
            <span className={`font-mono text-[10px] uppercase font-bold tracking-wider ${a ? 'text-yellow-300' : 'text-saffron-800'}`}>
              {t('transport.approxFare')}
            </span>
            <span className={`font-display font-bold text-sm sm:text-base ${a ? 'text-yellow-400' : 'text-ink-900'}`}>
              {lang === 'en' ? selectedTransport.approx_fare_en : selectedTransport.approx_fare_hi}
            </span>
          </div>
        </div>

        {/* Route & Directions */}
        <div className="my-4">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-base">📍</span>
            <span className={`font-cinzel font-bold text-xs uppercase tracking-wider ${a ? 'text-yellow-400' : 'text-ink-900'}`}>
              {t('transport.route')}
            </span>
          </div>
          <p className={`text-sm sm:text-base font-sans leading-relaxed pl-6 ${a ? 'text-yellow-200' : 'text-ink-800'}`}>
            {lang === 'en' ? selectedTransport.route_en : selectedTransport.route_hi}
          </p>
        </div>

        {/* Walk / Step Count badge (if walking required) */}
        {selectedTransport.walkTime_en && (
          <div className={`p-3 rounded-lg mb-4 flex items-center justify-between flex-wrap gap-2 text-xs font-mono border ${
            a
              ? 'bg-yellow-400/10 text-yellow-300 border-yellow-400'
              : 'bg-parchment-200/80 text-ink-800 border-parchment-400'
          }`}>
            <div className="flex items-center gap-2">
              <span className="text-base">🚶</span>
              <span>{lang === 'en' ? selectedTransport.walkTime_en : selectedTransport.walkTime_hi}</span>
            </div>
            {selectedTransport.walkSteps > 0 && (
              <span className="font-bold opacity-90">
                👣 ~{selectedTransport.walkSteps} {lang === 'en' ? 'steps' : 'कदम'}
              </span>
            )}
          </div>
        )}

        {/* Accessibility & Senior Info */}
        {selectedTransport.accessible_en && (
          <div className={`p-3 rounded-lg mb-4 text-xs font-sans border ${
            a
              ? 'bg-gray-800 border-yellow-400 text-yellow-200'
              : 'bg-parchment-100 border-parchment-300 text-ink-700'
          }`}>
            <div className="flex items-center gap-2 mb-1 font-bold font-cinzel text-xs text-saffron-800">
              <span>♿</span>
              <span>{t('transport.accessibility')}</span>
            </div>
            <p className="leading-relaxed">
              {lang === 'en' ? selectedTransport.accessible_en : selectedTransport.accessible_hi}
            </p>
          </div>
        )}

        {/* Local Travel Tip & Anti-Overcharge Advice */}
        <div className={`p-3.5 rounded-lg mb-4 text-xs font-sans border ${
          a
            ? 'bg-yellow-400/10 border-yellow-400 text-yellow-300'
            : 'bg-amber-50 border-amber-300 text-amber-950'
        }`}>
          <div className="flex items-center gap-1.5 font-bold font-cinzel text-xs text-amber-900 mb-1">
            <span>💡</span>
            <span>{t('transport.tip')}</span>
          </div>
          <p className="leading-relaxed">
            {lang === 'en' ? selectedTransport.tip_en : selectedTransport.tip_hi}
          </p>
        </div>

        {/* External Service / Booking Quick Action */}
        {selectedTransport.bookingLink && (
          <div className="pt-2 flex justify-end">
            <a
              href={selectedTransport.bookingLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`tap-target inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-cinzel font-bold border transition-all ${
                a
                  ? 'bg-yellow-400 text-gray-950 border-yellow-400 hover:bg-yellow-300'
                  : 'bg-saffron-700 text-white border-saffron-900 hover:bg-saffron-800 shadow-sm'
              }`}
            >
              <span>{lang === 'en' ? selectedTransport.bookingLabel_en : selectedTransport.bookingLabel_hi}</span>
              <span className="text-sm">↗</span>
            </a>
          </div>
        )}
      </div>

      {/* ── Interactive Transit & Pickup Map ──────────────────────────────────── */}
      <div className={`${cardStyle} mb-6`}>
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <h3 className={`font-cinzel text-sm sm:text-base font-bold ${a ? 'text-yellow-400' : 'text-ink-900'}`}>
            🗺️ {t('transport.mapTitle')}
          </h3>
          <span className={`font-mono text-[10px] ${a ? 'text-yellow-300' : 'text-ink-600'}`}>
            LOCAL TRANSIT MAP · APPROXIMATE ROUTES
          </span>
        </div>

        <LocalRouteMap
          points={mapPoints}
          routeFromId={selectedTransport.id}
          lang={lang}
          className="h-72 w-full rounded-lg border border-cyan-100/30 shadow-inner sm:h-80"
        />

        {/* Map Legend */}
        <div className="flex items-center justify-center flex-wrap gap-4 mt-3 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="text-base">🕌</span>
            <span className={a ? 'text-yellow-300' : 'text-ink-700'}>
              {lang === 'en' ? 'Destination (Gurudwara)' : 'गंतव्य (गुरुद्वारा)'}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-base">🚇</span>
            <span className={a ? 'text-yellow-300' : 'text-ink-700'}>
              {lang === 'en' ? 'Metro Hubs' : 'मेट्रो स्टेशन'}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-base">🛺</span>
            <span className={a ? 'text-yellow-300' : 'text-ink-700'}>
              {lang === 'en' ? 'Auto / E-Rickshaw Stand' : 'ऑटो स्टैंड'}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-base">🚕</span>
            <span className={a ? 'text-yellow-300' : 'text-ink-700'}>
              {lang === 'en' ? 'Cab Drop' : 'कैब ड्रॉप'}
            </span>
          </div>
        </div>
        <div className="mt-3 flex justify-center">
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${site.coordinates.lat},${site.coordinates.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`tap-target rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
              a
                ? 'border-yellow-400 text-yellow-300 hover:bg-yellow-400/10'
                : 'border-cyan-800/20 bg-cyan-50 text-[#075b70] hover:bg-cyan-100'
            }`}
          >
            {lang === 'en' ? 'Open turn-by-turn directions ↗' : 'बारी-बारी से दिशा-निर्देश खोलें ↗'}
          </a>
        </div>
      </div>

      {/* ── Parking Advisory & Driving Advice ─────────────────────────────────── */}
      {site.parkingNote_en && (
        <div className={`${cardStyle} mb-6`}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🅿️</span>
            <h3 className={`font-cinzel text-sm sm:text-base font-bold ${a ? 'text-yellow-400' : 'text-ink-900'}`}>
              {t('transport.parkingTitle')}
            </h3>
          </div>
          <p className={`text-xs sm:text-sm font-sans leading-relaxed ${a ? 'text-yellow-200' : 'text-ink-700'}`}>
            {lang === 'en' ? site.parkingNote_en : site.parkingNote_hi}
          </p>
        </div>
      )}

      {/* ── Standard Auto / Taxi Meter Rate Reference (Delhi Govt Rules) ──────── */}
      <div className={`p-4 rounded-xl border text-xs font-sans ${
        a
          ? 'bg-gray-900 border-yellow-400 text-yellow-300'
          : 'bg-parchment-200/60 border-parchment-400 text-ink-700 shadow-sm'
      }`}>
        <div className="flex items-center gap-2 mb-1.5 font-bold font-cinzel text-xs text-ink-900">
          <span>⚖️</span>
          <span>{t('transport.officialRates')}</span>
        </div>
        <p className="leading-relaxed mb-2">
          {lang === 'en'
            ? 'Delhi Govt Auto Fare: ₹30 for first 1.5 km, ₹11 per additional km. Night surcharge (25%) applies between 11:00 PM – 5:00 AM.'
            : 'दिल्ली सरकार ऑटो किराया: पहले 1.5 किमी के लिए ₹30, उसके बाद ₹11 प्रति किमी। रात 11:00 से सुबह 5:00 बजे तक 25% अतिरिक्त शुल्क लगता है।'}
        </p>
        <p className="font-mono text-[11px] opacity-80">
          ℹ️ {t('transport.fareDisclaimer')}
        </p>
      </div>

    </div>
    </PageTransition>
  )
}
