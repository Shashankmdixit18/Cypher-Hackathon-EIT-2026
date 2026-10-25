/**
 * useTTS.js
 * Custom hook encapsulating the browser Web Speech API (SpeechSynthesis).
 *
 * Features:
 *  - Play, Pause (toggle resume), Stop
 *  - Speed control (rate multiplier)
 *  - Voice selection: prefers the user's language; falls back gracefully
 *  - Returns a `noVoice` flag so the UI can show a friendly note
 *
 * Rules:
 *  - Audio NEVER starts automatically — must be triggered by user action
 *  - Cleans up on unmount (cancels any active speech)
 */

import { useState, useEffect, useRef, useCallback } from 'react'

const SUPPORTED = typeof window !== 'undefined' && 'speechSynthesis' in window

/**
 * Find the best voice for the requested locale from the browser's voice list.
 * Priority: exact locale match → language match → any voice
 */
function pickVoice(voices, locale) {
  if (!voices.length) return null
  const exact = voices.find((v) => v.lang.toLowerCase() === locale.toLowerCase())
  if (exact) return exact
  const langCode = locale.split('-')[0]
  const loose = voices.find((v) => v.lang.toLowerCase().startsWith(langCode))
  if (loose) return loose
  return null
}

export default function useTTS() {
  const [status, setStatus]   = useState('idle')   // 'idle' | 'playing' | 'paused'
  const [rate, setRate]       = useState(1)         // 0.7 | 1 | 1.2
  const [noVoice, setNoVoice] = useState(false)
  const [voices, setVoices]   = useState([])

  const utterRef = useRef(null)

  // Load voices (some browsers deliver them async)
  useEffect(() => {
    if (!SUPPORTED) return
    const load = () => setVoices(window.speechSynthesis.getVoices())
    load()
    window.speechSynthesis.addEventListener('voiceschanged', load)
    return () => window.speechSynthesis.removeEventListener('voiceschanged', load)
  }, [])

  // Cancel any speech on unmount
  useEffect(() => {
    return () => { if (SUPPORTED) window.speechSynthesis.cancel() }
  }, [])

  /**
   * play(text, locale) — starts speaking `text` in `locale`.
   * Must only be called from a user-gesture handler (button click).
   */
  const play = useCallback(
    (text, locale) => {
      if (!SUPPORTED) return
      window.speechSynthesis.cancel()

      const utter = new SpeechSynthesisUtterance(text)
      utter.lang = locale
      utter.rate = rate

      const voice = pickVoice(voices, locale)
      if (voice) {
        utter.voice = voice
        setNoVoice(false)
      } else {
        setNoVoice(true)
      }

      utter.onstart  = () => setStatus('playing')
      utter.onpause  = () => setStatus('paused')
      utter.onresume = () => setStatus('playing')
      utter.onend    = () => setStatus('idle')
      utter.onerror  = () => setStatus('idle')

      utterRef.current = utter
      window.speechSynthesis.speak(utter)
      setStatus('playing')
    },
    [voices, rate]
  )

  const pause = useCallback(() => {
    if (!SUPPORTED) return
    if (status === 'playing') {
      window.speechSynthesis.pause()
      setStatus('paused')
    } else if (status === 'paused') {
      window.speechSynthesis.resume()
      setStatus('playing')
    }
  }, [status])

  const stop = useCallback(() => {
    if (!SUPPORTED) return
    window.speechSynthesis.cancel()
    setStatus('idle')
    setNoVoice(false)
  }, [])

  return { supported: SUPPORTED, status, rate, setRate, noVoice, play, pause, stop }
}
