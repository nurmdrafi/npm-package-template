import { useEffect, useRef } from 'react';
import { Map, Marker, FullscreenControl, GeolocateControl, NavigationControl, ScaleControl, MapRef } from 'react-bkoi-gl';

// Import Types
import { BarikoiMapPropsType } from '../types';

// Import Hooks
import { useMap } from '../contexts/hooks/useMap'

// Import Styles
// @ts-ignore
// import "react-bkoi-gl/styles"

const BarikoiMap: React.FC<BarikoiMapPropsType> = ({apiKey, initialViewState, controls, mapStyle}) => {
  const {centerPoint} = useMap()

  const mapStyleUrl = `https://map.barikoi.com/styles/${mapStyle ?? 'osm-liberty'}/style.json?key=${apiKey}`
  const mapRef = useRef<MapRef>(null)
  const _initialViewState = {
    longitude: 90.36402,
    latitude: 23.823731,
    minZoom: 4,
    maxZoom: 30,
    zoom: 13,
    bearing: 0,
    pitch: 0,
    antialias: true,
    ...initialViewState
  }

  // On Change Center Point
  useEffect(() => {
    if (centerPoint?.lng && centerPoint?.lat) {
      mapRef?.current?.flyTo({
        center: [centerPoint.lng, centerPoint.lat],
        essential: true
      })
    }
  }, [centerPoint])

  return (
    <div
      style={{...containerStyles, maxWidth: _initialViewState?.width ?? 400, maxHeight: _initialViewState?.height ?? 400}}
    >
      <Map
        ref={mapRef}
        mapStyle={mapStyleUrl}
        style={{ width: "100%", height: "100%" }}
        initialViewState={_initialViewState}
        doubleClickZoom={false}
        dragRotate={false}
        attributionControl={false}
      >
        {/* Map Controls */}
        {controls?.geolocate?.enabled && <GeolocateControl position={controls?.geolocate?.position ?? "top-right"} />}
        {controls?.fullscreen?.enabled && <FullscreenControl position={controls?.fullscreen?.position ?? "top-right"} />}
        {controls?.navigation?.enabled && <NavigationControl position={controls?.navigation?.position ?? "top-right"} />}
        {controls?.scale?.enabled && <ScaleControl position={controls?.scale?.position ?? "bottom-right"} />}

        {/* Map Marker */}
        {centerPoint?.lng && centerPoint?.lat && controls?.marker?.enabled && (
          <Marker
            longitude={centerPoint.lng}
            latitude={centerPoint.lat}
            anchor="bottom"
          >
            <img src={controls?.marker?.url ?? "http://maps.google.com/mapfiles/ms/icons/blue.png"} alt="marker" />
          </Marker>
        )}

        {/* Barikoi Logo */}
        <div 
          className='barikoi-logo'
          style={{
            width: '80px',
            height: '15px',
            position: 'absolute', 
            left: 10, 
            bottom: 8,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            zIndex: 99999,
            backgroundImage: `url('data:image/png;base64,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')`
          }}
        />
      </Map>
    </div>
  )
}

// JSX Styles
const containerStyles = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
}

export default BarikoiMap

