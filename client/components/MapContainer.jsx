import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import MapMarker from './MapMarker'
import { connect } from 'react-redux'

import { getGeoCode } from '../api/mapsHelper'
import { updateUserPosition } from '../actions/user'
import ListResults from './ListResults'

function MapContainer (props) {
  const defaultCenter = { lat: 0, lng: 0 }
  const userPosition = props.user.position
  const { searchArea, parks } = props
  const [center, setCenter] = useState(defaultCenter)

  const [map, setMap] = useState()

  function getUserPosition (options) {
    navigator.geolocation.getCurrentPosition((position) => {
      const newUserPosition = { lat: position.coords.latitude, lng: position.coords.longitude }
      updateUserPosition(newUserPosition, props.dispatch)
      if (options?.center && map) {
        console.log('centering on user pos')
        map.setCenter(userPosition)
      }
    })
  }

  // function centerOn (latlng) {

  // }

  function centerOnUserPosition () {
    if (map && userPosition) { map.setCenter(userPosition) }
  }

  function search (latlng) {
    getGeoCode({ address: searchArea })
      .then((res) => {
        const { location } = res.body
        map.setCenter({ lat: location.lat, lng: location.lng })
        return null
      })
      .catch((e) => {
        console.log(e.message)
      })
  }

  useEffect(() => {
    if (!userPosition) {
      getUserPosition()
    }
    search()
  }, [searchArea])

  const key = 'AIzaSyAwonXg89LWspEiD10wgptbWOuK8lLh6VI'

  function handleApiLoaded (map, maps) {
    setMap(map)
    console.log('map loaded')
    const options = {
      disableDoubleClickZoom: true,
      clickableIcons: false
    }
    map.setOptions(options)
  }

  return (
    <div className='map w-full h-screen'>
      <button onClick={centerOnUserPosition}>Use my location</button>
      <GoogleMapReact
        bootstrapURLKeys={{ key }}
        defaultCenter={defaultCenter}
        defaultZoom={15}
        hoverDistance={40}
        yesIWantToUseGoogleMapApiInternals={true}
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}>
        {parks.map((marker) => {
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

const mapStateToProps = (state) => ({ parks: state.parks, user: state.user })

export default connect(mapStateToProps)(MapContainer)
