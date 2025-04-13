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
        onDblClick={(e) => {
          const lat = e.latLng.lat();
          const lng = e.latLng.lng();
          console.log('Double clicked at:', lat, lng);
          
          // Try to find a site near the clicked coordinates (within ~0.2 degrees)
          const clickedSite = sites.find(
            (site) =>
              Math.abs(site.lat - lat) < 0.5 && Math.abs(site.lng - lng) < 0.5
          );          
            console.log('clickedSite:', clickedSite);
            
            if (clickedSite && onLocationSelect) {
              console.log('clickedSite && onLocationSelect: True');
              console.log('clickedSite.country:', clickedSite.country);
              onLocationSelect(clickedSite.country); // or site.name depending on your setup
            }
            console.log('out of if');
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