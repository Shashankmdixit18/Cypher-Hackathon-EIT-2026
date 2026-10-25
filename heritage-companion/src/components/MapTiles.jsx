import { useEffect, useRef, useState } from 'react'
import { TileLayer, useMap } from 'react-leaflet'

const TILE_SOURCES = [
  {
    key: 'openstreetmap-de',
    url: 'https://tile.openstreetmap.de/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    label: 'OpenStreetMap',
  },
  {
    key: 'esri-streets',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Sources: Esri, TomTom, Garmin, FAO, NOAA, USGS, &copy; OpenStreetMap contributors, and the GIS User Community',
    label: 'Esri',
  },
  {
    key: 'openstreetmap-fr-hot',
    url: 'https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &middot; Style by <a href="https://www.hotosm.org/">HOT</a> / <a href="https://openstreetmap.fr/">OpenStreetMap France</a>',
    label: 'OpenStreetMap HOT',
  },
]

function MapResizeHandler() {
  const map = useMap()

  useEffect(() => {
    const invalidateSize = () => {
      window.requestAnimationFrame(() => map.invalidateSize({ pan: false }))
    }
    const observer = new ResizeObserver(invalidateSize)
    observer.observe(map.getContainer())
    window.addEventListener('orientationchange', invalidateSize)
    const timeoutId = window.setTimeout(invalidateSize, 100)

    return () => {
      observer.disconnect()
      window.removeEventListener('orientationchange', invalidateSize)
      window.clearTimeout(timeoutId)
    }
  }, [map])

  return null
}

export function MapTileLayer({ lang }) {
  const [sourceIndex, setSourceIndex] = useState(0)
  const attemptedSources = useRef(new Set())
  const source = TILE_SOURCES[sourceIndex]

  const handleTileError = () => {
    if (attemptedSources.current.has(sourceIndex) || sourceIndex >= TILE_SOURCES.length - 1) return

    attemptedSources.current.add(sourceIndex)
    setSourceIndex((currentIndex) => Math.max(currentIndex, sourceIndex + 1))
  }

  return (
    <>
      <TileLayer
        key={source.key}
        url={source.url}
        maxZoom={17}
        attribution={source.attribution}
        eventHandlers={{ tileerror: handleTileError }}
      />
      {sourceIndex > 0 && (
        <p
          className="map-tile-status"
          role="status"
          aria-live="polite"
        >
          {lang === 'en'
            ? `Using ${source.label} map tiles.`
            : `${source.label} मानचित्र टाइलों का उपयोग हो रहा है।`}
        </p>
      )}
    </>
  )
}

export default MapResizeHandler
