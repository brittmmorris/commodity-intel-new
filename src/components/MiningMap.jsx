import React from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
  marginTop: '20px'
};

const MiningMap = ({ sites, onLocationSelect }) => {
  const [selectedSite, setSelectedSite] = React.useState(null);
  const center = sites.length ? { lat: sites[0].lat, lng: sites[0].lng } : { lat: 20, lng: 0 };

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={2}
        onDblClick={async (e) => {
          const lat = e.latLng.lat();
          const lng = e.latLng.lng();
          console.log('Double clicked at:', lat, lng);
        
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (status === 'OK' && results[0]) {
              const countryComponent = results[0].address_components.find(c =>
                c.types.includes('country')
              );
        
              if (countryComponent) {
                const countryName = countryComponent.long_name;
                console.log('Country detected:', countryName);
                if (onLocationSelect) {
                  onLocationSelect(countryName);
                }
              } else {
                console.log('Country not found in results.');
              }
            } else {
              console.error('Geocoder failed due to:', status);
            }
          });
        }}
        
        
      >
        {sites.map((site, i) => (
          <Marker
            key={i}
            position={{ lat: site.lat, lng: site.lng }}
            onClick={() => setSelectedSite(site)}
            onDblClick={() => onLocationSelect(site.country)} // optional
          />
        ))}

        {selectedSite && (
          <InfoWindow
            position={{ lat: selectedSite.lat, lng: selectedSite.lng }}
            onCloseClick={() => setSelectedSite(null)}
          >
            <div>
              <strong>{selectedSite.name}</strong><br />
              {selectedSite.commodity}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MiningMap;