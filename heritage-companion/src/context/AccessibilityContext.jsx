import { createContext, useContext, useState, useEffect } from 'react'

const AccessibilityContext = createContext()

export function AccessibilityProvider({ children }) {
  const [isAccessible, setIsAccessible] = useState(
    () => localStorage.getItem('hc_a11y') === 'true'
  )

  const toggleAccessibility = () => {
    const next = !isAccessible
    setIsAccessible(next)
    localStorage.setItem('hc_a11y', String(next))
  }

  // Add / remove class on <html> so CSS and child components can react
  useEffect(() => {
    const root = document.documentElement
    if (isAccessible) {
      root.classList.add('a11y')
    } else {
      root.classList.remove('a11y')
    }
  }, [isAccessible])

  return (
    <AccessibilityContext.Provider value={{ isAccessible, toggleAccessibility }}>
      {children}
    </AccessibilityContext.Provider>
  )
}

export const useAccessibility = () => useContext(AccessibilityContext)
