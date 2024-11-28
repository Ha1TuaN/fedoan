import React, {useState} from 'react';
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';

const locations = [
  {id: 1, name: 'Location 1', lat: 10.8231, lng: 106.6297},
  {id: 2, name: 'Location 2', lat: 10.762622, lng: 106.660172},
  {id: 3, name: 'Location 3', lat: 10.7769, lng: 106.7009},
];

const mapContainerStyle = {
  width: '100%',
  height: '500px',
};

const center = {
  lat: 10.762622,
  lng: 106.660172,
};

const MapHouse = () => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  const handleChange = (event) => {
    const locationId = parseInt(event.target.value, 10);
    const location = locations.find((loc) => loc.id === locationId);
    setSelectedLocation(location);
  };

  return (
    <div>
      <select onChange={handleChange} value={selectedLocation.id}>
        {locations.map((location) => (
          <option key={location.id} value={location.id}>
            {location.name}
          </option>
        ))}
      </select>

      <LoadScript googleMapsApiKey='AIzaSyCPmrcwqPtSIze8rorai9g0q63BySdWHQg'>
        <GoogleMap mapContainerStyle={mapContainerStyle} center={{lat: selectedLocation.lat, lng: selectedLocation.lng}} zoom={12}>
          <Marker position={{lat: selectedLocation.lat, lng: selectedLocation.lng}} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapHouse;
