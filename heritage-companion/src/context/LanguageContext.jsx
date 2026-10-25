import { createContext, useContext, useState } from 'react'
import translations from '../data/translations'

const LanguageContext = createContext()

/**
 * Resolves a dot-separated key like "nav.guide" against the translations
 * object and returns the string for the current language.
 */
function resolve(dotKey, lang) {
  const keys = dotKey.split('.')
  let node = translations
  for (const k of keys) {
    if (node == null) return dotKey
    node = node[k]
  }
  if (node == null) return dotKey
  return node[lang] ?? node['en'] ?? dotKey
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(
    () => localStorage.getItem('hc_lang') || 'en'
  )

  const toggleLang = () => {
    const next = lang === 'en' ? 'hi' : 'en'
    setLang(next)
    localStorage.setItem('hc_lang', next)
  }

  /** t('nav.guide') → "Guide" or "गाइड" */
  const t = (dotKey) => resolve(dotKey, lang)

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
