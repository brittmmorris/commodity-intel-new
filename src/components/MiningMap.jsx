import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
  marginTop: '20px'
};

// Approximate country centroids (fallback for now)
const countryCenters = {
  Chile: { lat: -33.45, lng: -70.6667 },
  Ohio: { lat: 40.3675, lng: -82.9962 },
  // Add more as needed
};

const MiningMap = ({ sites, onLocationSelect, centerCountry }) => {
  const [selectedSite, setSelectedSite] = useState(null);
  const [center, setCenter] = useState({ lat: 20, lng: 0 });

  useEffect(() => {
    if (sites.length) {
      setCenter({ lat: sites[0].lat, lng: sites[0].lng });
    } else if (centerCountry && countryCenters[centerCountry]) {
      setCenter(countryCenters[centerCountry]);
    }
  }, [sites, centerCountry]);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={2}
        onDblClick={async (e) => {
          const lat = e.latLng.lat();
          const lng = e.latLng.lng();

          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (status === 'OK' && results[0]) {
              const countryComponent = results[0].address_components.find(c =>
                c.types.includes('country')
              );
              if (countryComponent) {
                const countryName = countryComponent.long_name;
                onLocationSelect?.(countryName);
              }
            }
          });
        }}
      >
        {sites.map((site, i) => (
          <Marker
            key={i}
            position={{ lat: site.lat, lng: site.lng }}
            onClick={() => setSelectedSite(site)}
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
