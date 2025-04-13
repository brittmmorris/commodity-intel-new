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
        
          let closestSite = null;
          let closestDistance = Infinity;
        
          sites.forEach(site => {
            const dist = Math.sqrt(
              Math.pow(site.lat - lat, 2) + Math.pow(site.lng - lng, 2)
            );
        
            if (dist < closestDistance) {
              closestDistance = dist;
              closestSite = site;
            }
          });
        
          // Optional: Only trigger if within ~5 degrees (~500km)
          if (closestDistance < 5) {
            console.log('Closest site:', closestSite);
            if (closestSite && onLocationSelect) {
              onLocationSelect(closestSite.country); // or site.name depending on your app
            }
          } else {
            console.log('No close site found');
          }
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