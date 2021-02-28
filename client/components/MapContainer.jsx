import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import MapMarker from './MapMarker'
import { connect } from 'react-redux'

import { getGeoCode } from '../api/mapsHelper'
// import { updateUserPosition } from '../actions/user'
import ListResults from './ListResults'

function MapContainer (props) {
  const defaultCenter = { lat: 0, lng: 0 }
  // const userPosition = props.user.position
  const { searchArea, parks } = props
  const [map, setMap] = useState()

  function centerOnUserPosition (mapApi = map) {
    if (mapApi && navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newUserPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          mapApi.setCenter(newUserPosition)
        },
        (err) => console.log('Error:', err.message)
      )
    }
  }

  function handleSearch () {
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
    if (searchArea) handleSearch()
  }, [searchArea])

  const key = 'AIzaSyAwonXg89LWspEiD10wgptbWOuK8lLh6VI'

  function handleApiLoaded (map, maps) {
    setMap(map)
    const options = {
      disableDoubleClickZoom: true,
      clickableIcons: false
    }
    map.setOptions(options)
    centerOnUserPosition(map)
  }

  return (
    <div className='map' style={{ height: '450px', width: '500px' }}>
      <button onClick={() => centerOnUserPosition()}>Use my location</button>
      <GoogleMapReact
        bootstrapURLKeys={{ key }}
        defaultCenter={defaultCenter}
        defaultZoom={15}
        hoverDistance={40}
        yesIWantToUseGoogleMapApiInternals={true}
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}>
        {parks.map((park) => {
          return (
            <MapMarker key={park.lat} lat={park.lat} lng={park.lng}></MapMarker>
          )
        })}
      </GoogleMapReact>
      <ListResults />
    </div>
  )
}

const mapStateToProps = (state) => ({ parks: state.parks, user: state.user })

export default connect(mapStateToProps)(MapContainer)
