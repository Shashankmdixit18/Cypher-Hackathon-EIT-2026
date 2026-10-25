import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useAccessibility } from '../context/AccessibilityContext'
import PageTransition from '../components/PageTransition'
import siteData from '../data/sites.json'

const site = siteData.sites[0]
const emergencyContacts = site.emergencyContacts

export default function SafetyPage() {
  const { lang, t } = useLanguage()
  const { isAccessible: a } = useAccessibility()

  const [confirmCall, setConfirmCall] = useState(null)

  const contactsList = [
    { id: 'police', ...emergencyContacts.police, icon: '🚓' },
    { id: 'ambulance', ...emergencyContacts.ambulance, icon: '🚑' },
    { id: 'touristHelpline', ...emergencyContacts.touristHelpline, icon: '📞' },
    { id: 'womenHelpline', ...emergencyContacts.womenHelpline, icon: '🛡️' },
    { id: 'siteOffice', ...emergencyContacts.siteOffice, icon: '🏛️' },
  ]

  const handleCall = (contact) => {
    setConfirmCall(contact)
  }

  const executeCall = () => {
    if (confirmCall) {
      const number = confirmCall.number.replace(/[^\d+]/g, '')
      window.location.href = `tel:${number}`
      setConfirmCall(null)
    }
  }

  return (
    <PageTransition>
      <div className="w-full mx-auto max-w-4xl px-4 sm:px-6 pt-4 sm:pt-6">
        
        {/* ── Page Header ───────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b pb-3 border-parchment-400/40">
          <div>
            <span className={`stamp-badge border-red-700 text-red-800 text-[10px] mb-1 ${a ? '' : 'badge-3d'}`}>
              {lang === 'en' ? 'OFFLINE SAFETY SYSTEM' : 'ऑफ़लाइन सुरक्षा प्रणाली'}
            </span>
            <h1 className={`text-2xl sm:text-3xl font-display font-bold ${a ? 'text-yellow-400' : 'text-white'}`}>
              {t('safety.pageTitle')}
            </h1>
          </div>
        </div>

        {/* ── Big Prominent SOS Emergency Button ────────────────────────── */}
        <div className="mb-8">
          <button
            onClick={() => handleCall({ label_en: 'Emergency Police/Help', label_hi: 'आपातकालीन पुलिस/सहायता', number: '100' })}
            className={`
              w-full tap-target py-6 sm:py-8 rounded-xl
              font-display italic font-bold text-lg sm:text-xl
              border transition-all flex flex-col items-center justify-center gap-1
              card-3d shine-sweep shadow-retro
              ${a
                ? 'bg-yellow-400 text-gray-950 border-yellow-400'
                : 'bg-red-700 hover:bg-red-800 text-white border-ink-900'
              }
            `}
          >
            <span className="text-3xl sm:text-4xl animate-bounce">🆘</span>
            <span>{t('safety.sosButton')}</span>
            <span className="font-mono text-xs font-normal opacity-90 tracking-normal">
              {lang === 'en' ? 'Instant one-tap call to National Emergency 100' : 'राष्ट्रीय आपातकालीन 100 पर तुरंत कॉल करें'}
            </span>
          </button>
        </div>

        {/* ── Emergency Numbers Grid ────────────────────────────────────── */}
        <div className={`retro-card card-3d rounded-2xl p-5 sm:p-6 mb-6 ${a ? 'bg-gray-900 border-yellow-400' : 'bg-white/75 backdrop-blur-xl border border-white/90 shadow-card'}`}>
          <h3 className="font-cinzel text-base font-bold text-ink-900 mb-4 flex items-center gap-2">
            <span>☎️</span>
            <span>{t('safety.emergencyTitle')}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {contactsList.map((c) => (
              <div
                key={c.id}
                className={`flex items-center justify-between p-3.5 rounded-2xl border border-white/90 bg-white/70 backdrop-blur-xl card-3d hover:border-gold-400/50 hover:bg-white/95 transition-all shadow-sm ${
                  a ? 'bg-gray-800 border-yellow-400' : ''
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{c.icon}</span>
                  <div>
                    <h4 className={`font-cinzel text-xs font-bold ${a ? 'text-yellow-400' : 'text-ink-900'}`}>
                      {lang === 'en' ? c.label_en : c.label_hi}
                    </h4>
                    <a
                      href={`tel:${c.number.replace(/[^\d+]/g, '')}`}
                      className={`font-mono text-sm font-semibold underline underline-offset-2 focus-visible:outline focus-visible:outline-2 ${
                        a ? 'text-yellow-300' : 'text-saffron-700'
                      }`}
                    >
                      {c.number}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => handleCall(c)}
                  className={`tap-target px-4 py-1.5 rounded-full font-cinzel text-xs font-bold border shadow-sm transition-all ${
                    a
                      ? 'bg-yellow-400 text-gray-950 border-yellow-400'
                      : 'bg-gradient-to-r from-saffron-600 to-gold-500 text-white hover:brightness-105 border-white/40 shadow-[0_2px_12px_rgba(245,158,11,0.3)] hover:scale-105'
                  }`}
                >
                  {t('safety.callButton')}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ── Call Confirmation Modal ───────────────────────────────────── */}
        {confirmCall && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="retro-card max-w-sm w-full p-6 rounded-xl bg-parchment-50 border-2 border-ink-900 shadow-retro-lg animate-scale-pop">
              <h3 className="font-cinzel font-bold text-base text-ink-900 mb-2">
                🚨 {t('safety.sosConfirm')}
              </h3>
              <p className="font-sans text-xs text-ink-700 mb-4">
                {lang === 'en' ? confirmCall.label_en : confirmCall.label_hi}:{' '}
                <strong className="font-mono text-sm">{confirmCall.number}</strong>
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={executeCall}
                  className="flex-1 tap-target py-2 rounded bg-red-700 hover:bg-red-800 text-white font-cinzel font-bold text-xs border border-red-900 shadow-sm"
                >
                  {t('common.yes')}, {t('safety.callButton')}
                </button>
                <button
                  onClick={() => setConfirmCall(null)}
                  className="flex-1 tap-target py-2 rounded bg-parchment-200 text-ink-800 font-cinzel text-xs border border-parchment-400"
                >
                  {t('common.no')}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </PageTransition>
  )
}
