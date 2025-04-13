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
              Math.abs(site.lat - lat) < 0.2 &&
              Math.abs(site.lng - lng) < 0.2
          );

          if (clickedSite && onLocationSelect) {
            onLocationSelect(clickedSite.country); // or site.name depending on your setup
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
