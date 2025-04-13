import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { feature } from 'topojson-client';
import { geoContains } from 'd3-geo';

const containerStyle = {
  width: '100%',
  height: '400px',
  marginTop: '20px'
};

const MiningMap = ({ sites, onLocationSelect }) => {
  const [selectedSite, setSelectedSite] = useState(null);
  const [worldGeo, setWorldGeo] = useState(null);

  const center = sites.length
    ? { lat: sites[0].lat, lng: sites[0].lng }
    : { lat: 20, lng: 0 };

  // Load world boundaries (once)
  useEffect(() => {
    const loadGeo = async () => {
      const res = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json");
      const topo = await res.json();
      const geojson = feature(topo, topo.objects.countries);
      setWorldGeo(geojson);
    };
    loadGeo();
  }, []);

  // Determine country from lat/lng
  const getCountryFromCoords = (lat, lng) => {
    if (!worldGeo) return null;
    const match = worldGeo.features.find(f => geoContains(f, [lng, lat]));
    return match?.properties.name || null;
  };

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

          const country = getCountryFromCoords(lat, lng);
          console.log('Detected country:', country);

          if (country && onLocationSelect) {
            onLocationSelect(country);
          }
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
