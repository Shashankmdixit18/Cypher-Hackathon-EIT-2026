import { MapContainer, Marker, Tooltip } from 'react-leaflet'
import L from 'leaflet'
import { useAccessibility } from '../context/AccessibilityContext'
import MapResizeHandler, { MapTileLayer } from './MapTiles'
import siteData from '../data/sites.json'

const site = siteData.sites[0]
const storyPoints = site.storyPoints
const storyBounds = L.latLngBounds(storyPoints.map(({ lat, lng }) => [lat, lng]))

function makeStoryIcon(number, isActive, isA11y) {
  const colorClass = isA11y
    ? 'story-map-marker-accessible'
    : isActive
      ? 'story-map-marker-active'
      : 'story-map-marker-default'

  return L.divIcon({
    className: `story-map-marker ${colorClass}`,
    html: `<span><span>${number}</span></span>`,
    iconSize: [38, 46],
    iconAnchor: [19, 44],
    tooltipAnchor: [0, -38],
  })
}

export default function StoryMap({ activeIndex, onSelectPoint, lang }) {
  const { isAccessible: isA11y } = useAccessibility()

  return (
    <section className={`overflow-hidden rounded-[20px_7px_20px_7px] border shadow-xl ${
      isA11y ? 'border-yellow-400' : 'border-cyan-100/30'
    }`}>
      <div className={`flex items-center justify-between gap-2 px-3 py-2.5 text-xs ${
        isA11y ? 'bg-gray-900 text-yellow-300' : 'bg-[#102b38] text-slate-100'
      }`}>
        <span className="font-semibold tracking-wide">
          {lang === 'en' ? '🗺️ Tour Map · tap a stop to explore' : '🗺️ दौरा मानचित्र · पड़ाव देखने के लिए टैप करें'}
        </span>
        <span className="font-mono text-[9px] text-cyan-200/70">
          {lang === 'en' ? 'MAP DATA · OPENSTREETMAP' : 'मानचित्र डेटा · ओपनस्ट्रीटमैप'}
        </span>
      </div>

      <MapContainer
        bounds={storyBounds}
        boundsOptions={{ padding: [42, 42], maxZoom: 17 }}
        maxZoom={17}
        scrollWheelZoom={false}
        zoomControl
        attributionControl
        className="story-leaflet-map h-[280px] w-full sm:h-[320px]"
      >
        <MapResizeHandler />
        <MapTileLayer lang={lang} />

        {storyPoints.map((point, index) => {
          const title = lang === 'en' ? point.title_en : point.title_hi
          const isActive = index === activeIndex

          return (
            <Marker
              key={point.id}
              position={[point.lat, point.lng]}
              icon={makeStoryIcon(index + 1, isActive, isA11y)}
              title={title}
              alt={title}
              riseOnHover
              eventHandlers={{ click: () => onSelectPoint(index) }}
            >
              <Tooltip direction="top" offset={[0, -30]}>
                {`${index + 1}. ${title}`}
              </Tooltip>
            </Marker>
          )
        })}
      </MapContainer>

    </section>
  )
}
