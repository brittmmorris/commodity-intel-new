// components/MiningMap.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
// import 'react-leaflet-markercluster/dist/styles.min.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Optional: Fix icon issue for Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MiningMap = ({ sites }) => {
  const center = sites.length ? [sites[0].lat, sites[0].lng] : [20, 0];

  return (
    <MapContainer center={center} zoom={2} style={{ height: 400, width: '100%', marginTop: 20 }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MarkerClusterGroup>
        {sites.map((site, i) => (
          <Marker key={i} position={[site.lat, site.lng]}>
            <Popup>
              <strong>{site.name}</strong><br />
              {site.commodity}
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default MiningMap;

