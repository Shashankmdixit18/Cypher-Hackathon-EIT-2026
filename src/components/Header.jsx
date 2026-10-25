import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useAccessibility } from '../context/AccessibilityContext'

const DESKTOP_TABS = [
  { to: '/guide',     icon: '📖', key: 'nav.guide' },
  { to: '/crowd',     icon: '👥', key: 'nav.crowd' },
  { to: '/transport', icon: '🚌', key: 'nav.transport' },
  { to: '/safety',    icon: '🛡️',  key: 'nav.safety' },
]

export default function Header() {
  const { lang, toggleLang, t } = useLanguage()
  const { isAccessible, toggleAccessibility } = useAccessibility()
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const a = isAccessible

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-2.5 sm:top-3.5 z-50 px-3 sm:px-6 desktop-header pointer-events-none">
      <div
        className={`pointer-events-auto relative mx-auto max-w-5xl rounded-[20px_7px_20px_7px] px-3.5 sm:px-6 py-2 transition-all ${
          a
            ? 'bg-gray-950 border-2 border-yellow-400'
            : 'border border-cyan-100/15 bg-[#0a1d2a]/90 backdrop-blur-2xl shadow-[0_18px_42px_-14px_rgba(0,0,0,0.62),inset_0_1px_0_rgba(255,255,255,0.08)] ring-1 ring-white/5'
        }`}
      >
        <div className="flex min-w-0 items-center justify-between h-11 sm:h-12 gap-2 sm:gap-3">

          {/* Logo / Brand */}
          <Link
            to="/"
            className="flex min-w-0 items-center gap-2 sm:gap-3 group"
          >
            {/* Jewel Ik Onkar Emblem */}
            <span
              className={`flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full text-base font-display italic transition-all duration-300 group-hover:scale-105 ${
                a
                  ? 'bg-yellow-400 text-gray-950'
                  : 'bg-gradient-to-br from-cyan-300 via-teal-500 to-[#08758a] text-white shadow-[0_0_22px_rgba(34,211,238,0.28)] ring-2 ring-cyan-100/20'
              }`}
              aria-hidden="true"
            >
              ੴ
            </span>
            <span className="flex min-w-0 flex-col leading-tight">
              <span
                className={`font-display italic text-sm sm:text-base font-bold truncate tracking-tight transition-colors ${
                  a ? 'text-yellow-400' : 'text-slate-50 group-hover:text-cyan-200'
                }`}
              >
                Heritage Companion
              </span>
              <span
                className={`font-sans text-[8px] sm:text-[9px] tracking-[0.22em] uppercase font-bold truncate ${
                  a ? 'text-yellow-500' : 'text-cyan-300/80'
                }`}
              >
                {lang === 'en' ? 'Bangla Sahib · New Delhi' : 'बांग्ला साहिब · नई दिल्ली'}
              </span>
            </span>
          </Link>

          {/* Desktop Navigation Links — Floating Crystal Pills */}
          <nav className="hidden md:flex items-center gap-1.5" aria-label="Desktop navigation">
            {DESKTOP_TABS.map(({ to, icon, key }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-4 py-1.5 rounded-full font-sans text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? a
                        ? 'bg-yellow-400 text-gray-950 shadow-sm'
                        : 'bg-gradient-to-r from-[#08758a] to-[#12a4a2] text-white font-bold shadow-[0_5px_18px_rgba(8,145,160,0.32)] border border-cyan-100/20'
                      : a
                        ? 'text-yellow-300 hover:bg-gray-800'
                        : 'text-slate-300 hover:text-white hover:bg-white/[0.08] border border-transparent'
                  }`
                }
              >
                <span className="mr-1.5">{icon}</span>
                {t(key)}
              </NavLink>
            ))}
          </nav>

          {/* Quick Action Controls */}
          <div className="hidden shrink-0 items-center gap-2 md:flex">
            {/* Language toggle capsule */}
            <button
              onClick={toggleLang}
              aria-label={lang === 'en' ? 'Switch to Hindi' : 'Switch to English'}
              className={`
                tap-target px-3.5 h-8 sm:h-8.5 rounded-full
                font-sans text-xs font-bold tracking-wider
                border transition-all
                ${a
                  ? 'border-yellow-400 text-yellow-400 bg-gray-900 hover:bg-gray-800'
                  : 'border-white/15 text-slate-100 bg-white/[0.07] hover:bg-white/[0.14] hover:border-cyan-200/40'
                }
              `}
            >
              {lang === 'en' ? 'हिन्दी' : 'EN'}
            </button>

            {/* Accessibility toggle capsule */}
            <button
              onClick={toggleAccessibility}
              aria-label={a ? 'Disable accessibility mode' : 'Enable accessibility mode'}
              title={t('settings.accessibilityMode')}
              className={`
                tap-target w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full
                border text-sm transition-all flex items-center justify-center
                ${a
                  ? 'bg-yellow-400 border-yellow-400 text-gray-900 shadow-[0_0_12px_rgba(250,204,21,0.6)]'
                  : 'border-white/15 text-slate-100 bg-white/[0.07] hover:bg-white/[0.14] hover:border-cyan-200/40'
                }
              `}
            >
              {a ? '🔆' : '♿'}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen
              ? (lang === 'en' ? 'Close menu' : 'मेनू बंद करें')
              : (lang === 'en' ? 'Open menu' : 'मेनू खोलें')}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className={`tap-target flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-xl md:hidden ${
              a
                ? 'border-yellow-400 bg-gray-900 text-yellow-400'
                : 'border-white/15 bg-white/[0.07] text-slate-100 hover:bg-white/[0.14]'
            }`}
          >
            <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
          </button>

          <nav
              hidden={!menuOpen}
              id="mobile-navigation"
              aria-label={lang === 'en' ? 'Mobile navigation' : 'मोबाइल नेविगेशन'}
              className={`absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 rounded-2xl border p-3 shadow-2xl md:hidden ${
                a
                  ? 'border-yellow-400 bg-gray-950'
                  : 'border-cyan-100/20 bg-[#0a1d2a]/[0.98] backdrop-blur-2xl'
              }`}
            >
              <ul className="grid grid-cols-2 gap-2">
                {[
                  { to: '/', icon: '🏠', label: lang === 'en' ? 'Home' : 'मुखपृष्ठ' },
                  { to: '/guide', icon: '📖', label: t('nav.guide') },
                  { to: '/crowd', icon: '👥', label: t('nav.crowd') },
                  { to: '/transport', icon: '🚌', label: t('nav.transport') },
                  { to: '/safety', icon: '🛡️', label: t('nav.safety') },
                  { to: '/etiquette', icon: '🙏', label: t('etiquette.pageTitle') },
                ].map(({ to, icon, label }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      end={to === '/'}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) => `tap-target justify-start gap-2 rounded-xl px-3 text-sm font-semibold ${
                        isActive
                          ? a ? 'bg-yellow-400 text-gray-950' : 'bg-[#08758a] text-white'
                          : a ? 'text-yellow-200 hover:bg-gray-800' : 'text-slate-200 hover:bg-white/[0.08]'
                      }`}
                    >
                      <span aria-hidden="true">{icon}</span>
                      <span>{label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div className={`mt-3 flex items-center justify-end gap-2 border-t pt-3 ${
                a ? 'border-yellow-400/40' : 'border-white/10'
              }`}>
                <button
                  onClick={toggleLang}
                  aria-label={lang === 'en' ? 'Switch to Hindi' : 'Switch to English'}
                  className={`tap-target h-10 rounded-full border px-3.5 font-sans text-xs font-bold tracking-wider transition-all ${
                    a
                      ? 'border-yellow-400 bg-gray-900 text-yellow-400 hover:bg-gray-800'
                      : 'border-white/15 bg-white/[0.07] text-slate-100 hover:border-cyan-200/40 hover:bg-white/[0.14]'
                  }`}
                >
                  {lang === 'en' ? 'हिन्दी' : 'EN'}
                </button>
                <button
                  onClick={toggleAccessibility}
                  aria-label={a ? 'Disable accessibility mode' : 'Enable accessibility mode'}
                  title={t('settings.accessibilityMode')}
                  className={`tap-target flex h-10 w-10 items-center justify-center rounded-full border text-sm transition-all ${
                    a
                      ? 'border-yellow-400 bg-yellow-400 text-gray-900 shadow-[0_0_12px_rgba(250,204,21,0.6)]'
                      : 'border-white/15 bg-white/[0.07] text-slate-100 hover:border-cyan-200/40 hover:bg-white/[0.14]'
                  }`}
                >
                  {a ? '🔆' : '♿'}
                </button>
              </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
