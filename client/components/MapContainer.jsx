import React, { useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import MapMarker from './MapMarker'

import ListResults from './ListResults'

function MapContainer (props) {
  const { searchArea } = props
  useEffect(() => {
    // !searchArea ? default view : send address to api to get lat lng
    // then map.setCenter({ lat: -36.8499, lng: 174.7586 })
  }, [searchArea])
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

  const test = {
    lat: -36.8647183,
    lng: 174.7760362
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
        <MapMarker lat={test.lat} lng={test.lng}></MapMarker>

      </GoogleMapReact>

      <ListResults />

    </div>

  )
}

export default MapContainer
