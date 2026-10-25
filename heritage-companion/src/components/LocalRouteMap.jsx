import { useMemo } from 'react'
import { MapContainer, Marker, Polyline, Tooltip } from 'react-leaflet'
import L from 'leaflet'
import MapResizeHandler, { MapTileLayer } from './MapTiles'

function makeTransportIcon(point, offsetX, offsetY) {
  const markerClass = point.isDestination
    ? 'transport-map-marker-destination'
    : point.isActive
      ? 'transport-map-marker-active'
      : 'transport-map-marker-default'
  const symbol = point.icon

  return L.divIcon({
    className: `transport-map-marker ${markerClass}`,
    html: `<span style="--marker-offset-x:${offsetX}px;--marker-offset-y:${offsetY}px"><span>${symbol}</span></span>`,
    iconSize: [42, 48],
    iconAnchor: [21, 45],
    tooltipAnchor: [0, -39],
  })
}

function getMarkerOffsets(points) {
  const offsets = new Map()

  points.forEach((point, index) => {
    const sameLocationBefore = points
      .slice(0, index)
      .filter((previous) => previous.lat === point.lat && previous.lng === point.lng).length
    const sameLocationAfter = points
      .slice(index + 1)
      .filter((next) => next.lat === point.lat && next.lng === point.lng).length

    offsets.set(point.id, {
      x: (sameLocationBefore - sameLocationAfter) * 18,
      y: 0,
    })
  })

  return offsets
}

export default function LocalRouteMap({
  points,
  routeFromId,
  lang = 'en',
  className = '',
}) {
  const bounds = useMemo(
    () => L.latLngBounds(points.map(({ lat, lng }) => [lat, lng])),
    [points],
  )
  const markerOffsets = useMemo(() => getMarkerOffsets(points), [points])
  const selectedPoint = points.find(({ id }) => id === routeFromId)
  const destination = points.find(({ isDestination }) => isDestination)

  return (
    <div className={`transport-leaflet-map relative isolate overflow-hidden rounded-xl ${className}`}>
      <MapContainer
        bounds={bounds}
        boundsOptions={{ padding: [34, 34], maxZoom: 16 }}
        maxZoom={17}
        scrollWheelZoom={false}
        zoomControl
        attributionControl
        className="h-full w-full"
      >
        <MapResizeHandler />
        <MapTileLayer lang={lang} />

        {selectedPoint && destination && selectedPoint.id !== destination.id && (
          <Polyline
            positions={[
              [selectedPoint.lat, selectedPoint.lng],
              [destination.lat, destination.lng],
            ]}
            pathOptions={{
              color: '#087f8c',
              weight: 5,
              opacity: 0.8,
              dashArray: '9 8',
            }}
          />
        )}

        {points.map((point) => {
          const offset = markerOffsets.get(point.id)
          if (!point.onClick) {
            return (
              <Marker
                key={point.id}
                position={[point.lat, point.lng]}
                icon={makeTransportIcon(point, offset.x, offset.y)}
                title={point.label}
                alt={point.label}
                riseOnHover
              >
                <Tooltip direction="top" offset={[0, -30]}>
                  {point.label}
                </Tooltip>
              </Marker>
            )
          }

          return (
            <Marker
              key={point.id}
              position={[point.lat, point.lng]}
              icon={makeTransportIcon(point, offset.x, offset.y)}
              title={point.label}
              alt={point.label}
              riseOnHover
              eventHandlers={{ click: point.onClick }}
            >
              <Tooltip direction="top" offset={[0, -30]}>
                {point.label}
              </Tooltip>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}
