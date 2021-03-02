import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import MapMarker from './MapMarker'
import { connect } from 'react-redux'
import { getAllParks } from '../actions/parks'

function MapContainer (props) {
  const defaultCenter = { lat: -40.900557, lng: 174.885971 }
  const { searchArea, parks } = props.parks
  const [map, setMap] = useState()
  const [selectedMarker, setSelectedMarker] = useState()

  function centerOnUserPosition (mapApi = map) {
    if (mapApi && navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newUserPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          mapApi.setZoom(15)
          mapApi.panTo(newUserPosition)
        },
        (err) => console.log('Error:', err.message)
      )
    }
  }

  function handleSearch () {
    map.setZoom(15)
    map.panTo(searchArea)
  }

  useEffect(() => {
    getAllParks()
  }, [])

  useEffect(() => {
    if (searchArea && map) handleSearch()
  }, [searchArea])

  const key = 'AIzaSyAwonXg89LWspEiD10wgptbWOuK8lLh6VI'

  function handleApiLoaded (map, maps) {
    setMap(map)
    const options = {
      disableDoubleClickZoom: true,
      clickableIcons: false
      // styles: [{ stylers: { visibility: 'simplified' } }]
    }
    map.setOptions(options)
    centerOnUserPosition(map)
  }

  return (
    <>
      <div className='map w-full max-w-7xl h-xl block m-auto'>
        <GoogleMapReact
          bootstrapURLKeys={{ key }}
          defaultCenter={defaultCenter}
          defaultZoom={5}
          hoverDistance={40}
          yesIWantToUseGoogleMapApiInternals={true}
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}>
          {parks.map((park) => {
            return park.occupied === 0 ? (
              <MapMarker
                key={park.lat}
                lat={park.lat}
                lng={park.lng}
                obj={park}
                selectedMarker={selectedMarker}
                toggleSelected={() => setSelectedMarker(park.id)}
              />
            ) : null
          })}
        </GoogleMapReact>

      </div>
    </>
  )
}

const mapStateToProps = (state) => ({ parks: state.parks })

export default connect(mapStateToProps)(MapContainer)
