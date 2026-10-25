import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useAccessibility } from '../context/AccessibilityContext'

export default function SOSButton() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const { isAccessible: a } = useAccessibility()

  return (
    <button
      onClick={() => navigate('/safety')}
      aria-label={t('safety.sosButton')}
      className={`
        fixed right-4 sm:right-6 z-40
        w-14 h-14 rounded-full
        flex flex-col items-center justify-center
        font-sans text-[11px] font-bold tracking-[0.16em]
        transition-all duration-200 active:scale-95 hover:scale-105
        ${a
          ? 'bg-yellow-400 text-gray-900 border-2 border-gray-900 shadow-lg'
          : 'bg-gradient-to-br from-red-600 via-red-700 to-red-900 text-white shadow-[0_8px_25px_rgba(185,28,28,0.5),0_0_0_2px_rgba(254,202,202,0.35)] ring-4 ring-red-500/20'
        }
      `}
      style={{
        bottom: 'calc(env(safe-area-inset-bottom, 0px) + 84px)',
      }}
    >
      <span className="text-xs leading-none">🆘</span>
      <span className="text-[10px] mt-0.5 font-mono">SOS</span>
    </button>
  )
}
