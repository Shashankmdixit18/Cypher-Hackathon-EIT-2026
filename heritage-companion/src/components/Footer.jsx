import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useAccessibility } from '../context/AccessibilityContext'

export default function Footer() {
  const { lang, t } = useLanguage()
  const { isAccessible } = useAccessibility()

  const links = [
    { to: '/', label: lang === 'en' ? 'Home' : 'मुखपृष्ठ' },
    { to: '/guide', label: t('nav.guide') },
    { to: '/crowd', label: t('nav.crowd') },
    { to: '/transport', label: t('nav.transport') },
    { to: '/safety', label: t('nav.safety') },
    { to: '/etiquette', label: t('etiquette.pageTitle') },
  ]

  return (
    <footer className={`relative z-10 mt-8 border-t px-4 py-8 sm:px-6 ${
      isAccessible
        ? 'border-yellow-400 bg-gray-950 text-yellow-200'
        : 'border-cyan-100/15 bg-[#07131d]/80 text-slate-300'
    }`}>
      <div className="mx-auto grid max-w-5xl gap-7 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <Link to="/" className={`font-display text-lg font-bold ${
            isAccessible ? 'text-yellow-400' : 'text-white'
          }`}>
            {lang === 'en' ? 'Heritage Companion' : 'हेरिटेज कम्पैनियन'}
          </Link>
          <p className="mt-2 max-w-sm text-sm leading-relaxed">
            {lang === 'en'
              ? 'A thoughtful travel companion for Gurudwara Bangla Sahib, New Delhi.'
              : 'गुरुद्वारा बंगला साहिब, नई दिल्ली की यात्रा के लिए आपका साथी।'}
          </p>
        </div>

        <nav aria-label={lang === 'en' ? 'Footer navigation' : 'फुटर नेविगेशन'}>
          <h2 className={`mb-3 font-semibold ${
            isAccessible ? 'text-yellow-400' : 'text-white'
          }`}>
            {lang === 'en' ? 'Explore' : 'देखें'}
          </h2>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {links.map(({ to, label }) => (
              <li key={to}>
                <Link className="underline-offset-4 hover:text-cyan-200 hover:underline" to={to}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={`mb-3 font-semibold ${
            isAccessible ? 'text-yellow-400' : 'text-white'
          }`}>
            {lang === 'en' ? 'Contact' : 'संपर्क'}
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a className="underline underline-offset-4 hover:text-cyan-200" href="tel:+911123712580">
                011-23712580
              </a>
              <span className="ml-2 text-xs opacity-75">
                {lang === 'en' ? '24-hour reception' : '24 घंटे रिसेप्शन'}
              </span>
            </li>
            <li>
              <a className="underline underline-offset-4 hover:text-cyan-200" href="mailto:info@dsgmc.in">
                info@dsgmc.in
              </a>
            </li>
            <li>
              <a
                className="underline underline-offset-4 hover:text-cyan-200"
                href="https://dsgmc.in/Home/Contact"
                target="_blank"
                rel="noopener noreferrer"
              >
                {lang === 'en' ? 'Official contact page ↗' : 'आधिकारिक संपर्क पृष्ठ ↗'}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-7 max-w-5xl border-t border-current/15 pt-4 text-xs opacity-75">
        © {new Date().getFullYear()} Heritage Companion
      </p>
    </footer>
  )
}
