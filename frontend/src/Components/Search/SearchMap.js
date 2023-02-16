/**
 * @file Search map component for the search data page and location selection with visual google map search 
 * @author Ugo Balducci
 * @version 1.0.0
 * @see https://react-google-maps-api-docs.netlify.app/
 */

import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '90%',
    borderRadius: '20px'
  };
  
  const center = {
    lat: 0,
    lng: 0
  };

const SearchMap = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDwKPUsVhsrUFtZCKqo659N9gCOFDbxQwY"  //Ugo's API key - replace with your own
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
      setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
    }, [])

    return isLoaded && (
        <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={2}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{ mapId: "4a860eb96ab7589d" }}
        >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
        </GoogleMap>
    )
}

export default React.memo(SearchMap)