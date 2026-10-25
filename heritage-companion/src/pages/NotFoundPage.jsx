import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import PageTransition from '../components/PageTransition'

export default function NotFoundPage() {
  const { lang } = useLanguage()

  return (
    <PageTransition>
      <section className="mx-auto flex min-h-[55vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
        <span className="stamp-badge mb-4">404 · {lang === 'en' ? 'NOT FOUND' : 'नहीं मिला'}</span>
        <h1 className="text-4xl text-white sm:text-5xl">
          {lang === 'en' ? 'This page is off the map' : 'यह पृष्ठ मानचित्र पर नहीं है'}
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-300 sm:text-base">
          {lang === 'en'
            ? 'The link may be outdated or the address may be incorrect. Head back to the Heritage Companion home page.'
            : 'यह लिंक पुराना हो सकता है या पता गलत हो सकता है। हेरिटेज कम्पैनियन के मुख्य पृष्ठ पर लौटें।'}
        </p>
        <Link to="/" className="btn-retro tap-target mt-7 rounded-full px-6 py-3">
          {lang === 'en' ? 'Return home' : 'मुखपृष्ठ पर जाएँ'}
        </Link>
      </section>
    </PageTransition>
  )
}
