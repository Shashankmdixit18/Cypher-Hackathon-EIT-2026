/**
 * PageTransition.jsx
 * Smooth, reliable entrance animation for pages.
 */
export default function PageTransition({ children, className = '' }) {
  return (
    <div className={`w-full page-enter ${className}`}>
      {children}
    </div>
  )
}
