import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import MapMarker from './MapMarker'
import { connect } from 'react-redux'

import { getGeoCode } from '../API/mapsHelper'
import ListResults from './ListResults'

function MapContainer (props) {
  const { searchArea } = props
  const [center, setCenter] = useState({
    lat: 0,
    lng: 0
  })
  const [map, setMap] = useState()
  const { parks } = props

  useEffect(() => {
    // !searchArea ? default view : send address to api to get lat lng
    // then map.setCenter({ lat: -36.8499, lng: 174.7586 })

    getGeoCode({ address: searchArea })
      .then((res) => {
        const { location } = res.body

        setCenter({
          lat: location.lat,
          lng: location.lng
        })
        map.setCenter({ lat: location.lat, lng: location.lng })
        return null
      })
      .catch((e) => {
        console.log(e.message)
      })
  }, [searchArea])

  const key = 'AIzaSyAwonXg89LWspEiD10wgptbWOuK8lLh6VI'

  function handleApiLoaded (map, maps) {
    console.log('map', map)
    console.log('maps', maps)
    setMap(map)
    const options = { disableDoubleClickZoom: true }
    map.setOptions(options)
  }

  return (
    <div className="map w-full h-screen">
      <GoogleMapReact
        bootstrapURLKeys={{ key }}
        defaultCenter={center}
        defaultZoom={15}
        hoverDistance={40}
        yesIWantToUseGoogleMapApiInternals={true}
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}>
        {test.map((marker) => {
          return (
            <MapMarker
              key={marker.lat}
              lat={marker.lat}
              lng={marker.lng}
            />
          )
        })}
      </GoogleMapReact>
      <ListResults />
    </div>
  )
}

const mapStateToProps = (state) => ({ parks: state.parks })

export default connect(mapStateToProps)(MapContainer)
