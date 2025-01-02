import { useEffect } from 'react'
import { useAutocomplete, useMap } from './contexts';
import { BarikoiAutocomplete, BarikoiMap } from './components';

const BarikoiMapWidget = () => {
  const { selectedPlace } = useAutocomplete();
  const { setCenterPoint } = useMap();
  const initialViewState = {
    longitude: 90.36402,
    latitude: 23.823731,
    minZoom: 4,
    maxZoom: 30,
    zoom: 13,
    width: '50%',
    height: '100vh',
  }

  useEffect(() => {
    setCenterPoint({ lat: selectedPlace?.latitude, lng: selectedPlace?.longitude })

  }, [selectedPlace])

  const BARIKOI_API_KEY = 'MjYyMzpHOVkzWFlGNjZG'
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100vh', margin: '0 100' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '50%' }}>
        <BarikoiAutocomplete apiKey={BARIKOI_API_KEY} />
      </div>
      <BarikoiMap
        apiKey={BARIKOI_API_KEY}
        initialViewState={initialViewState}
        controls={{
          marker: {
            enabled: true,
            url: "http://maps.google.com/mapfiles/ms/icons/blue.png"
          },
          fullscreen: {
            enabled: true,
            position: 'top-left'
          }
        }}
        mapStyle='osm-liberty'
      />
    </div>
  )
}

export default BarikoiMapWidget