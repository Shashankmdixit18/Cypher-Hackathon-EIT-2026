import { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from 'recharts'
import { useLanguage } from '../context/LanguageContext'
import { useAccessibility } from '../context/AccessibilityContext'
import PageTransition from '../components/PageTransition'
import siteData from '../data/sites.json'

const site = siteData.sites[0]
const ch = site.crowdHistory          // shorthand
const thresholds = ch.crowdThresholds // { low, medium, high, vhigh }

// ── helpers ────────────────────────────────────────────────────────────────────

/** Return levelKey ('low' | 'medium' | 'high' | 'vhigh') for a numeric value */
function getLevelKey(val) {
  if (val >= (thresholds.vhigh?.min ?? 85)) return 'vhigh'
  if (val >= (thresholds.high?.min  ?? 70)) return 'high'
  if (val >= (thresholds.medium?.min ?? 41)) return 'medium'
  return 'low'
}

/** Tailwind text colour classes per level */
const LEVEL_TEXT = {
  low:    'text-emerald-700',
  medium: 'text-amber-600',
  high:   'text-orange-600',
  vhigh:  'text-red-600',
}

/** Hex colours for Recharts Cell fills */
const BAR_COLOR = {
  low:    '#10b981', // emerald-500
  medium: '#f59e0b', // amber-500
  high:   '#f97316', // orange-500
  vhigh:  '#ef4444', // red-500
}

/** a11y overrides — always gold on dark */
const A11Y_BAR = '#facc15'

// ── component ──────────────────────────────────────────────────────────────────

export default function CrowdPage() {
  const { lang, t } = useLanguage()
  const { isAccessible: a } = useAccessibility()

  const [selectedDay, setSelectedDay]       = useState('weekday')
  const [festivalOpen, setFestivalOpen]     = useState(false)

  // Current IST hour
  const currentHour     = new Date().getHours()
  const activeHours     = ch[selectedDay].hours
  const currentVal      = activeHours[currentHour] ?? 30
  const levelKey        = getLevelKey(currentVal)
  const levelLabel      = lang === 'en'
    ? thresholds[levelKey].label_en
    : thresholds[levelKey].label_hi

  // Day-level note from data
  const dayNote = lang === 'en'
    ? ch[selectedDay]._note
    : ch[selectedDay]._note   // (same field — data doesn't have _note_hi; use en)

  // Recharts data
  const chartData = activeHours.map((val, hour) => {
    const h = hour % 12 || 12
    const period = hour < 12 ? 'AM' : 'PM'
    return {
      hour,
      label: hour === 0 ? '12 AM' : `${h} ${period}`,
      crowd: val,
      isCurrent: hour === currentHour,
      levelKey: getLevelKey(val),
    }
  })

  // ── Retro card class helper
  const card = `retro-card card-3d rounded-2xl p-5 sm:p-6 ${a ? 'bg-gray-900 border-yellow-400' : 'bg-white/75 backdrop-blur-xl border border-white/90 shadow-card'}`

  return (
    <PageTransition>
    <div className="w-full mx-auto max-w-4xl px-4 sm:px-6 pt-4 sm:pt-6 pb-24 sm:pb-6">

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b pb-3 border-parchment-400/40">
        <div>
          <span className={`stamp-badge border-saffron-700 text-saffron-800 text-[10px] mb-1 ${a ? '' : 'badge-3d'}`}>
            {lang === 'en' ? 'FOOTFALL PATTERNS' : 'भीड़ का अनुमान'}
          </span>
          <h1 className={`text-2xl sm:text-3xl font-display font-bold ${a ? 'text-yellow-400' : 'text-white'}`}>
            {t('crowd.pageTitle')}
          </h1>
        </div>

        {/* Day selector */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/75 backdrop-blur-md border border-white/90 shadow-sm">
          {[
            { id: 'weekday',  label: t('crowd.weekday')  },
            { id: 'saturday', label: t('crowd.saturday') },
            { id: 'sunday',   label: t('crowd.sunday')   },
          ].map((day) => (
            <button
              key={day.id}
              onClick={() => setSelectedDay(day.id)}
              className={`tap-target px-3.5 py-1 text-xs font-cinzel font-bold rounded-full transition-all ${
                selectedDay === day.id
                  ? 'bg-gradient-to-r from-saffron-700 to-gold-700 text-white shadow-sm'
                  : 'text-ink-700 hover:text-ink-900'
              }`}
            >
              {day.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Source / disclaimer strip ────────────────────────────────────────── */}
      <div className={`p-3 rounded-2xl text-xs font-mono mb-4 border flex items-start gap-2 ${
        a
          ? 'bg-yellow-400/10 text-yellow-300 border-yellow-400'
          : 'bg-amber-50/80 text-amber-900 border-amber-300/80 backdrop-blur-md shadow-sm'
      }`}>
        <span className="text-base mt-0.5 shrink-0">📊</span>
        <div>
          <span className="font-bold text-saffron-900">{t('crowd.sourceLabel')}: </span>
          {lang === 'en' ? ch._source_en : ch._source_hi}
          <div className="mt-1 opacity-90 text-ink-700">
            {lang === 'en' ? ch._disclaimer_en : ch._disclaimer_hi}
          </div>
        </div>
      </div>

      {/* ── Daily Visitors badge + day-note strip ────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        {/* Daily visitors stat */}
        <div className={`retro-card card-3d shine-sweep flex-1 rounded-2xl p-4 flex items-center gap-3 ${
          a ? 'bg-gray-900 border-yellow-400' : 'bg-white/75 backdrop-blur-xl border border-white/90 shadow-card'
        }`}>
          <span className="text-2xl">🕌</span>
          <div>
            <p className={`font-mono text-xs uppercase tracking-wider mb-0.5 ${a ? 'text-yellow-300' : 'text-saffron-700'}`}>
              {t('crowd.dailyVisitors')}
            </p>
            <p className={`font-display font-bold text-lg leading-tight ${a ? 'text-yellow-400' : 'text-ink-900'}`}>
              {lang === 'en' ? ch.dailyVisitors_en : ch.dailyVisitors_hi}
            </p>
          </div>
        </div>

        {/* Day note */}
        {dayNote && (
          <div className={`retro-card card-3d shine-sweep flex-[2] rounded-2xl p-4 flex items-start gap-3 ${
            a ? 'bg-gray-900 border-yellow-400' : 'bg-white/75 backdrop-blur-xl border border-white/90 shadow-card'
          }`}>
            <span className="text-xl mt-0.5">📋</span>
            <div>
              <p className={`font-mono text-xs uppercase tracking-wider mb-0.5 ${a ? 'text-yellow-300' : 'text-ink-600'}`}>
                {t('crowd.dayNote')} — {ch[selectedDay]._label}
              </p>
              <p className={`text-sm font-sans leading-relaxed ${a ? 'text-yellow-200' : 'text-ink-800'}`}>
                {dayNote}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ── Festival Warning (collapsible) ───────────────────────────────────── */}
      <div className={`rounded-xl mb-5 border overflow-hidden ${
        a ? 'border-yellow-400' : 'border-orange-300'
      }`}>
        <button
          onClick={() => setFestivalOpen(v => !v)}
          className={`w-full flex items-center justify-between px-4 py-3 text-left font-cinzel text-sm font-bold tap-target ${
            a
              ? 'bg-yellow-400/10 text-yellow-400'
              : 'bg-orange-50 text-orange-800'
          }`}
        >
          <span>{t('crowd.festivalAlert')}</span>
          <span className="text-lg">{festivalOpen ? '▲' : '▼'}</span>
        </button>
        {festivalOpen && (
          <div className={`px-4 pb-4 pt-2 text-sm font-sans leading-relaxed ${
            a ? 'bg-gray-900 text-yellow-200' : 'bg-orange-50 text-orange-900'
          }`}>
            {lang === 'en' ? ch.festivalWarning_en : ch.festivalWarning_hi}
          </div>
        )}
      </div>

      {/* ── Top-row cards: Current Level + Best Time ─────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">

        {/* Card 1: Current Meter */}
        <div className={card}>
          <span className={`font-mono text-xs uppercase tracking-wider ${a ? 'text-yellow-300' : 'text-ink-500'}`}>
            {t('crowd.currentLevel')}
          </span>
          <div className="flex items-baseline gap-3 my-2 flex-wrap">
            <span className={`text-3xl sm:text-4xl font-display font-bold ${a ? 'text-yellow-400' : LEVEL_TEXT[levelKey]}`}>
              {levelLabel}
            </span>
            <span className={`font-mono text-sm ${a ? 'text-yellow-300' : 'text-ink-600'}`}>
              ~{currentVal}%
            </span>
          </div>
          {/* Mini progress bar */}
          <div className={`h-2 rounded-full mt-1 ${a ? 'bg-gray-700' : 'bg-parchment-300'}`}>
            <div
              className="h-2 rounded-full transition-all duration-500"
              style={{
                width: `${currentVal}%`,
                backgroundColor: a ? '#facc15' : BAR_COLOR[levelKey],
              }}
            />
          </div>
          <p className={`text-xs font-sans mt-2 ${a ? 'text-yellow-200' : 'text-ink-600'}`}>
            {lang === 'en'
              ? 'Estimated density around the Darbar Sahib and Sarovar.'
              : 'दरबार साहिब और सरोवर के आसपास अनुमानित भीड़।'}
          </p>
        </div>

        {/* Card 2: Best Time */}
        <div className={card}>
          <span className={`font-mono text-xs uppercase tracking-wider ${a ? 'text-yellow-300' : 'text-saffron-700'}`}>
            {t('crowd.bestTime')}
          </span>
          <div className={`text-base sm:text-lg font-display font-bold my-2 leading-snug ${a ? 'text-yellow-400' : 'text-ink-900'}`}>
            {lang === 'en' ? ch.bestTimeNote_en : ch.bestTimeNote_hi}
          </div>
        </div>

      </div>

      {/* ── Recharts Hourly Bar Chart ─────────────────────────────────────────── */}
      <div className={`${card} sm:p-6`}>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h3 className={`font-cinzel text-sm sm:text-base font-bold ${a ? 'text-yellow-400' : 'text-ink-900'}`}>
            📊 {t('crowd.chartTitle')}
            <span className={`font-mono text-xs ml-2 font-normal ${a ? 'text-yellow-300' : 'text-ink-500'}`}>
              ({ch[selectedDay]._label})
            </span>
          </h3>
          <span className={`font-mono text-[11px] ${a ? 'text-yellow-300' : 'text-ink-500'}`}>
            00:00 — 23:00 HRS
          </span>
        </div>

        <div className="h-64 sm:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <XAxis
                dataKey="label"
                interval={2}
                tick={{ fontSize: 10, fontFamily: 'DM Mono', fill: a ? '#facc15' : '#695545' }}
                stroke={a ? '#facc15' : 'rgba(217,119,6,0.3)'}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 10, fontFamily: 'DM Mono', fill: a ? '#facc15' : '#695545' }}
                stroke={a ? '#facc15' : 'rgba(217,119,6,0.3)'}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload
                    const lbl = lang === 'en'
                      ? thresholds[d.levelKey].label_en
                      : thresholds[d.levelKey].label_hi
                    return (
                      <div className="p-2 bg-ink-900 text-parchment-100 rounded border border-parchment-500 text-xs font-mono shadow-md">
                        <p className="font-bold">{d.label}{d.isCurrent ? ' ← Now' : ''}</p>
                        <p className="text-saffron-300">Density: {d.crowd}%</p>
                        <p style={{ color: a ? '#facc15' : BAR_COLOR[d.levelKey] }}>{lbl}</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              {/* Reference lines */}
              <ReferenceLine y={40} stroke="#10b981" strokeDasharray="3 3"
                label={{ value: 'Low', fill: '#10b981', fontSize: 10 }} />
              <ReferenceLine y={70} stroke="#f97316" strokeDasharray="3 3"
                label={{ value: 'Busy', fill: '#f97316', fontSize: 10 }} />
              <ReferenceLine y={85} stroke="#ef4444" strokeDasharray="3 3"
                label={{ value: 'V.Busy', fill: '#ef4444', fontSize: 10 }} />

              <Bar dataKey="crowd" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={a ? A11Y_BAR : BAR_COLOR[entry.levelKey]}
                    opacity={entry.isCurrent ? 1 : 0.75}
                    stroke={entry.isCurrent ? (a ? '#fff' : '#1a0a00') : 'none'}
                    strokeWidth={entry.isCurrent ? 2 : 0}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Colour legend */}
        <div className="flex items-center justify-center flex-wrap gap-4 mt-4 text-xs font-mono">
          {[
            { key: 'low',    label: lang === 'en' ? '0–40% Low'       : '0–40% कम',           color: BAR_COLOR.low    },
            { key: 'medium', label: lang === 'en' ? '41–69% Moderate' : '41–69% मध्यम',       color: BAR_COLOR.medium },
            { key: 'high',   label: lang === 'en' ? '70–84% Busy'     : '70–84% व्यस्त',     color: BAR_COLOR.high   },
            { key: 'vhigh',  label: lang === 'en' ? '85–100% Very Busy': '85–100% बहुत व्यस्त', color: BAR_COLOR.vhigh },
          ].map(({ key, label, color }) => (
            <div key={key} className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: a ? A11Y_BAR : color }} />
              <span className={a ? 'text-yellow-300' : 'text-ink-600'}>{label}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
    </PageTransition>
  )
}
