import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import MapMarker from './MapMarker'

import { getGeoCode } from '../API/mapsHelper'
import ListResults from './ListResults'
import getAllParking from './addressBarHelper'

function MapContainer (props) {
  const { searchArea } = props
  const [center, setCenter] = useState({
    lat: 0,
    lng: 0
  })
  const [map, setMap] = useState()

  const [parkings, setParkings] = useState({})
  useEffect(() => {
    getAllParking()
  }, [])

  useEffect(() => {
    // !searchArea ? default view : send address to api to get lat lng
    // then map.setCenter({ lat: -36.8499, lng: 174.7586 })

    getGeoCode({ address: searchArea })
      .then(res => {
        const { location } = res.body

        setCenter({
          lat: location.lat,
          lng: location.lng
        })
        map.setCenter({ lat: location.lat, lng: location.lng })
        return null
      })
      .catch((e) => { console.log(e.message) })
  }, [searchArea])

  const key = 'AIzaSyAwonXg89LWspEiD10wgptbWOuK8lLh6VI'

  function handleApiLoaded (map, maps) {
    console.log('map', map)
    console.log('maps', maps)
    setMap(map)
    const options = { disableDoubleClickZoom: true }
    map.setOptions(options)
  }

  const test = [{
    lat: -36.8647183,
    lng: 174.7760362
  }, {
    lat: -36.84829,
    lng: 174.76224
  }, {
    lat: -36.84852065618249,
    lng: 174.7647278136159
  }, {
    lat: -36.85341636476441,
    lng: 174.766453585174
  }, {
    lat: -36.852166078918216,
    lng: 174.76905365409488
  }]

  console.log(parkings)

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
        {test.map(marker => {
          return <MapMarker key={marker.lat} lat={marker.lat} lng={marker.lng}></MapMarker>
        })}

      </GoogleMapReact>
      <ListResults />

    </div>

  )
}

export default MapContainer
