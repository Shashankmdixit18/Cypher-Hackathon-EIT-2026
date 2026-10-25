import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useAccessibility } from '../context/AccessibilityContext'
import PageTransition from '../components/PageTransition'
import siteData from '../data/sites.json'

const site = siteData.sites[0]

export default function EtiquettePage() {
  const { lang } = useLanguage()
  const { isAccessible } = useAccessibility()

  return (
    <PageTransition>
      <div className="mx-auto w-full max-w-4xl px-4 pt-5 sm:px-6 sm:pt-7">
        <header className="mb-6 border-b border-parchment-400/40 pb-4">
          <span className="stamp-badge mb-2">
            {lang === 'en' ? 'VISITOR GUIDE' : 'आगंतुक मार्गदर्शिका'}
          </span>
          <h1 className={`text-3xl sm:text-4xl ${
            isAccessible ? 'text-yellow-400' : 'text-white'
          }`}>
            {lang === 'en' ? 'Visitor Etiquette' : 'आगंतुक शिष्टाचार'}
          </h1>
          <p className={`mt-2 max-w-2xl text-sm leading-relaxed sm:text-base ${
            isAccessible ? 'text-yellow-200' : 'text-slate-200'
          }`}>
            {lang === 'en'
              ? 'A few simple courtesies help everyone enjoy the peace and hospitality of the Gurudwara.'
              : 'कुछ सरल शिष्टाचार सभी को गुरुद्वारे की शांति और आतिथ्य का सम्मान करने में मदद करते हैं।'}
          </p>
        </header>

        <ul className="grid gap-3 sm:grid-cols-2">
          {site.etiquette.map((rule, index) => (
            <li
              key={index}
              className={`retro-card rounded-2xl p-4 text-sm leading-relaxed ${
                isAccessible
                  ? 'bg-gray-900 text-yellow-100 border-yellow-400'
                  : 'bg-white/90 text-ink-800 border-white/80'
              }`}
            >
              <span className={`mb-2 block font-semibold ${
                isAccessible ? 'text-yellow-400' : 'text-[#075b70]'
              }`}>
                {lang === 'en' ? `Guideline ${index + 1}` : `नियम ${index + 1}`}
              </span>
              {lang === 'en' ? rule.en : rule.hi}
            </li>
          ))}
        </ul>

        <Link
          to="/guide"
          className={`tap-target mt-6 inline-flex rounded-full border px-5 py-3 text-sm font-semibold ${
            isAccessible
              ? 'border-yellow-400 text-yellow-300 hover:bg-yellow-400/10'
              : 'border-cyan-200/40 bg-white/10 text-white hover:bg-white/15'
          }`}
        >
          {lang === 'en' ? 'Explore the story walk →' : 'कहानी यात्रा देखें →'}
        </Link>
      </div>
    </PageTransition>
  )
}
