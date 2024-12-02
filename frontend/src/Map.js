import React from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

// Define the style for the map container
const containerStyle = {
  width: '100%',
  height: '400px'
};

const Map = ({ pantries }) => {
  // Set default center to the first pantry's location or a fallback
  const defaultCenter = {
    lat: pantries.length > 0 ? pantries[0].latitude : 0,
    lng: pantries.length > 0 ? pantries[0].longitude : 0
  };

  return (
    // Load Google Maps script with API key
    <LoadScript googleMapsApiKey="AIzaSyDuuwSS5l45rptEcPwiTM3o7EWMvYtPMOU">
      <GoogleMap
        mapContainerStyle={containerStyle} // Apply styles to map container
        center={defaultCenter} // Center map on default location
        zoom={13} // Set initial zoom level
      >
        {pantries.map((pantry, index) => (
          // Render a marker for each pantry
          <Marker
            key={index} // Unique key for each marker
            position={{ lat: pantry.latitude, lng: pantry.longitude }} // Set marker position
            title={pantry.name} // Set marker title
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;

//Comments:
//We use useEffect to fetch food pantry locations from the backend when the component mounts or when the zipCode changes.
//The fetch function retrieves data from the backend, which should return a list of locations.
//We set the map's center to the first location in the list.