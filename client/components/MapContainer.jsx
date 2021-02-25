import React from 'react'
import GoogleMapReact from 'google-map-react'
import MapMarker from './MapMarker'

function MapContainer (props) {
  const key = 'AIzaSyAwonXg89LWspEiD10wgptbWOuK8lLh6VI'

  const center = {
    lat: -36.84978,
    lng: 174.7586
  }

  function handleApiLoaded (map, maps) {
    console.log('map', map)
    console.log('maps', maps)
    const options = { disableDoubleClickZoom: true }
    map.setOptions(options)
  }

  return (
    <div className='map' style={{ height: '450px', width: '500px' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key }}
        defaultCenter={center}
        defaultZoom={15}
        hoverDistance={40}
        yesIWantToUseGoogleMapApiInternals={true}
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}>
        <MapMarker lat={center.lat} lng={center.lng}></MapMarker>
      </GoogleMapReact>
    </div>
  )
}

export default MapContainer
