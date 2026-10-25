import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useAccessibility } from '../context/AccessibilityContext'
import PageTransition from '../components/PageTransition'
import siteData from '../data/sites.json'

const site = siteData.sites[0]

export default function HomePage() {
  const navigate = useNavigate()
  const { lang, t } = useLanguage()
  const { isAccessible: a } = useAccessibility()

  const name = lang === 'en' ? site.name_en : site.name_hi
  const address = lang === 'en' ? site.address.en : site.address.hi
  const description = lang === 'en' ? site.shortDescription_en : site.shortDescription_hi
  const hours = lang === 'en' ? site.openingHours_en : site.openingHours_hi

  const launches = [
    { to: '/guide',     icon: '🎧', title: lang === 'en' ? 'Audio Tour'    : 'ऑडियो यात्रा', desc: lang === 'en' ? '6 sacred story stops' : '6 पावन पड़ाव' },
    { to: '/crowd',     icon: '🌊', title: lang === 'en' ? 'Crowd Pulse'   : 'भीड़ पल्स',    desc: lang === 'en' ? 'Real-time footfall'   : 'भीड़ का अनुमान' },
    { to: '/transport', icon: '🚇', title: lang === 'en' ? 'Transit Guide' : 'रास्ता',        desc: lang === 'en' ? 'Metro · auto · fares' : 'मेट्रो · ऑटो · किराया' },
    { to: '/safety',    icon: '🛡️',  title: lang === 'en' ? 'Offline SOS'   : 'सुरक्षा',       desc: lang === 'en' ? 'Emergency helplines' : 'हेल्पलाइन तैयार' },
  ]

  const features = [
    { icon: '📜', title: lang === 'en' ? '6 Story Points'    : '6 ऐतिहासिक बिंदु', desc: lang === 'en' ? 'Hindi & English narration' : 'हिंदी और अंग्रेज़ी ऑडियो' },
    { icon: '🥣', title: lang === 'en' ? 'Guru ka Langar'    : 'गुरु का लंगर',      desc: lang === 'en' ? 'Community meals 24×7'     : 'सभी के लिए 24 घंटे भोजन' },
    { icon: '💧', title: lang === 'en' ? 'Sacred Sarovar'    : 'पवित्र सरोवर',      desc: lang === 'en' ? 'Healing sarovar water'    : 'श्रद्धा का पावन जल' },
    { icon: '📍', title: lang === 'en' ? 'Patel Chowk Metro' : 'पटेल चौक मेट्रो', desc: lang === 'en' ? '10 min walk (Gate 3/4)'  : 'गेट 3/4 से 10 मिनट' },
  ]

  return (
    <PageTransition>
      <div className="w-full mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">

        {/* ── Immersive Magazine Cover Hero ──────────────────────────────────── */}
        <section
          className={`relative overflow-hidden rounded-[32px_10px_32px_10px] min-h-[380px] sm:min-h-[480px] mb-6 border transition-all ${
            a
              ? 'border-yellow-400 bg-gray-900'
              : 'border-brass/40 shadow-card hover:shadow-card-hover'
          }`}
          style={{
            boxShadow: a
              ? undefined
              : '0 24px 60px -15px rgba(20,14,10,0.35), inset 0 0 0 1px rgba(255,255,255,0.25)',
          }}
        >
          {/* Main Hero Photograph */}
          <img
            src="/images/hero-main.jpg"
            alt={name}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 hover:scale-105 ${
              a ? '' : 'atlas-photo'
            }`}
            fetchPriority="high"
            onError={(e) => {
              if (!e.currentTarget.dataset.fallbackApplied) {
                e.currentTarget.dataset.fallbackApplied = 'true'
                e.currentTarget.src = '/images/hero-wide.jpg'
              }
            }}
          />

          {/* Luxury atmospheric vignettes */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#06131d] via-[#071a25]/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071a25]/55 via-transparent to-transparent" />

          {/* Antique Gilded Coin (ESTD 1783) — Top Right */}
          <div className={`absolute top-4 right-4 sm:top-6 sm:right-6 ${a ? 'hidden' : ''}`}>
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-gold-300/80 bg-black/50 backdrop-blur-md flex flex-col items-center justify-center travel-float shadow-[0_8px_25px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,230,120,0.6)] ring-2 ring-gold-500/30"
              style={{ animationDelay: '-1.5s' }}
            >
              <span className="font-mono text-[9px] sm:text-[10px] text-gold-200 tracking-[0.2em] font-bold">ESTD</span>
              <span className="font-display text-base sm:text-lg text-gold-300 font-bold leading-tight">1783</span>
              <span className="font-sans text-[7px] sm:text-[8px] text-gold-400/80 tracking-widest uppercase">DELHI</span>
            </div>
          </div>

          {/* Hero Content Overlay */}
          <div className="relative z-10 flex h-full min-h-[340px] sm:min-h-[440px] flex-col justify-between p-5 sm:p-8">
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className={`stamp-badge border-gold-400/60 text-gold-200 bg-black/45 backdrop-blur-md ${a ? '' : 'badge-3d'}`}>
                {lang === 'en' ? 'Sacred Heritage Sanctuary' : 'पावन ऐतिहासिक तीर्थ'}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600/90 border border-emerald-400/40 px-2.5 py-1 text-[11px] font-sans font-bold text-white shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                {lang === 'en' ? 'Open 24 Hours' : '24 घंटे खुला'}
              </span>
            </div>

            {/* Bottom Title & Actions */}
            <div className="max-w-xl">
              <p className="font-sans text-[11px] tracking-[0.25em] uppercase text-gold-300/90 font-bold mb-2">
                {lang === 'en' ? 'Sikh Historical Gurudwara · New Delhi' : 'ऐतिहासिक सिख गुरुद्वारा · नई दिल्ली'}
              </p>
              <h1 className="font-display italic text-4xl sm:text-5xl lg:text-[3.5rem] text-white leading-[1.04] mb-3 drop-shadow-md">
                {name}
              </h1>
              <p className="font-sans text-sm sm:text-base text-parchment-100/90 max-w-md leading-relaxed drop-shadow-sm">
                {t('home.tagline')}
              </p>

              {/* Action Buttons */}
              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate('/guide')}
                  className={`
                    tap-target py-3.5 px-6 rounded-full
                    font-sans font-bold text-sm tracking-wide
                    btn-retro animate-glow-pulse
                    ${a ? 'bg-yellow-400 text-gray-950 border-2 border-yellow-400' : ''}
                  `}
                >
                  <span className="mr-2">🎧</span>
                  {lang === 'en' ? 'Start Audio Walk' : 'ऑडियो यात्रा शुरू करें'}
                </button>
                <button
                  onClick={() => navigate('/etiquette')}
                  className={`
                    tap-target py-3.5 px-5 rounded-full
                    font-sans font-semibold text-sm
                    border transition-all
                    ${a
                      ? 'border-2 border-yellow-400 text-yellow-400 bg-gray-900'
                      : 'border-white/35 text-white bg-white/10 backdrop-blur-md hover:bg-white/20 hover:border-white/50 shadow-sm'
                    }
                  `}
                >
                  {t('home.viewEtiquette')}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Vintage Dial Live Facts Strip ─────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {[
            {
              k: lang === 'en' ? 'Hours of Sanctuary' : 'दर्शन का समय',
              v: hours,
              icon: '⌛',
            },
            {
              k: lang === 'en' ? 'Pilgrim Entry' : 'प्रवेश शुल्क',
              v: lang === 'en' ? 'Free for everyone' : 'सभी के लिए निःशुल्क',
              icon: '🕊️',
            },
            {
              k: lang === 'en' ? 'Current Footfall' : 'भीड़ की स्थिति',
              v: lang === 'en' ? 'Calm · ideal for Darshan' : 'शांत · दर्शन हेतु अनुकूल',
              icon: '🌊',
            },
          ].map((item) => (
            <div
              key={item.k}
              className={`rounded-2xl px-4 py-3.5 card-3d border transition-all ${
                a
                  ? 'bg-gray-900 border-yellow-400 text-yellow-300'
                  : 'bg-white/75 backdrop-blur-xl border-white/90 hover:border-gold-400/50 hover:bg-white/95 shadow-card'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <p className={`font-sans text-[10px] tracking-[0.18em] uppercase font-bold ${
                  a ? 'text-yellow-500' : 'text-saffron-700'
                }`}>
                  {item.k}
                </p>
                <span className="text-base">{item.icon}</span>
              </div>
              <p className={`font-display text-base sm:text-lg font-bold leading-snug ${
                a ? 'text-yellow-200' : 'text-ink-900'
              }`}>
                {item.v}
              </p>
            </div>
          ))}
        </div>

        {/* ── Story Card + Launches Grid ───────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-8">
          
          {/* Main Editorial Story Card */}
          <div
            className={`md:col-span-7 retro-card rounded-3xl p-5 sm:p-7 card-3d ${
              a ? 'bg-gray-900 border-yellow-400 text-yellow-300' : ''
            }`}
          >
            {/* 4 Antique Brass Corner Flourishes */}
            <span className="corner-flourish tl" />
            <span className="corner-flourish tr" />
            <span className="corner-flourish bl" />
            <span className="corner-flourish br" />

            <div className="flex items-center justify-between mb-2">
              <span className={`label-cinzel ${a ? 'text-yellow-500' : 'text-saffron-800'}`}>
                {lang === 'en' ? 'The Living Heritage' : 'जीवंत ऐतिहासिक धरोहर'}
              </span>
              <span className="text-xs font-mono text-ink-500">ESTD · 1783</span>
            </div>

            <p className={`font-serif italic text-base sm:text-xl leading-relaxed my-3 ${
              a ? 'text-yellow-100' : 'text-ink-900'
            }`}>
              "{description}"
            </p>

            <div className="ornament-divider my-4">✦ ── ❖ ── ✦</div>

            <div className="flex items-start gap-2 text-xs sm:text-sm font-sans">
              <span className="text-base shrink-0 mt-0.5">📍</span>
              <p className={`leading-relaxed ${a ? 'text-yellow-200' : 'text-ink-700'}`}>
                {address}
              </p>
            </div>
          </div>

          {/* 4 Fast Launch Tiles */}
          <div className="md:col-span-5 grid grid-cols-2 gap-3">
            {launches.map((item) => (
              <button
                key={item.to}
                onClick={() => navigate(item.to)}
                className={`text-left rounded-2xl p-4 card-3d shine-sweep border transition-all ${
                  a
                    ? 'bg-gray-900 border-yellow-400'
                    : 'bg-white/75 backdrop-blur-xl border-white/90 shadow-card hover:border-gold-400/60 hover:bg-white/95'
                }`}
              >
                <span className="text-3xl block mb-2">{item.icon}</span>
                <span className={`block font-display text-[15px] sm:text-base font-bold leading-tight ${
                  a ? 'text-yellow-400' : 'text-ink-900'
                }`}>
                  {item.title}
                </span>
                <span className={`block font-sans text-xs mt-1 ${
                  a ? 'text-yellow-200' : 'text-ink-600'
                }`}>
                  {item.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Feature Cards (Museum Exhibition Pills) ───────────────────────── */}
        <div className="mb-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`rounded-2xl p-4 text-center card-3d border transition-all ${
                a
                  ? 'bg-gray-900 border-yellow-400'
                  : 'bg-white/75 backdrop-blur-xl border-white/90 hover:border-gold-400/50 hover:bg-white/95 shadow-card'
              }`}
            >
              <span
                className={`text-3xl mb-1.5 block ${a ? '' : 'travel-float'}`}
                style={{ animationDelay: `${i * -1.5}s` }}
              >
                {feature.icon}
              </span>
              <h4 className={`font-display text-sm font-bold mb-0.5 ${
                a ? 'text-yellow-400' : 'text-ink-900'
              }`}>
                {feature.title}
              </h4>
              <p className={`font-sans text-[11px] leading-tight ${
                a ? 'text-yellow-200' : 'text-ink-600'
              }`}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </PageTransition>
  )
}
