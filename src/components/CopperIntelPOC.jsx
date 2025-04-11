// components/CopperIntelPOC.jsx
import React, { useState } from 'react';
import { Container, Tabs, Tab, Box, Autocomplete, TextField, Button, CircularProgress, Grid } from '@mui/material';
import MiningMap from './MiningMap';
import AskAI from './AskAI';
import SummaryCard from './SummaryCard';
import { fetchCommodityData, fetchLocationData, fetchMiningSites } from '../utils/dataUtils';
import { fetchCommodityPrice } from '../utils/dataUtils';

const commodities = ['Copper', 'Gold'];
const locations = ['Chile', 'Ohio'];

const CopperIntelPOC = () => {
  const [view, setView] = useState(0);
  const [selectedCommodity, setSelectedCommodity] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [mapSites, setMapSites] = useState([]);
  const [price, setPrice] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setSummary('');
    setMapSites([]);
    console.log("test")
    try {
      const allSites = await fetchMiningSites();
      const filteredSites = allSites.filter(site => {
        return view === 0
          ? site.commodity.toLowerCase() === selectedCommodity.toLowerCase()
          : site.country.toLowerCase() === selectedLocation.toLowerCase();
      });
      setMapSites(filteredSites);

      if (view === 0 && selectedCommodity) {
        const data = await fetchCommodityData(selectedCommodity);
        setSummary(data.summary);
        const symbolMap = {
          Gold: 'XAU',
          Copper: 'COPPER'
        };
        
        const latestPrice = await fetchCommodityPrice(symbolMap[selectedCommodity]);
        
        setPrice(latestPrice);
      } else if (view === 1 && selectedLocation) {
        const data = await fetchLocationData(selectedLocation);
        setSummary(data.summary);
        setPrice('');
      }
    } catch (err) {
      console.error(err);
      setSummary('Failed to load data.');
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="lg" sx={{ pt: 4 }}>
      <Tabs value={view} onChange={(e, v) => setView(v)} centered>
        <Tab label="By Commodity" />
        <Tab label="By Location" />
      </Tabs>

      <Box mt={3}>
        {view === 0 ? (
          <Autocomplete
            options={commodities}
            value={selectedCommodity}
            onChange={(e, v) => setSelectedCommodity(v)}
            renderInput={(params) => <TextField {...params} label="Select a Commodity" />}
          />
        ) : (
          <Autocomplete
            options={locations}
            value={selectedLocation}
            onChange={(e, v) => setSelectedLocation(v)}
            renderInput={(params) => <TextField {...params} label="Select a Location" />}
          />
        )}
      </Box>

      <Box mt={2}>
        <Button
          variant="contained"
          onClick={handleSearch}
          disabled={loading || (view === 0 && !selectedCommodity) || (view === 1 && !selectedLocation)}
        >
          {loading ? 'Fetching...' : 'Search'}
        </Button>
      </Box>

      {loading && <CircularProgress sx={{ mt: 2 }} />}

      {summary && <SummaryCard summary={summary} price={price} />}
      {mapSites.length > 0 && <MiningMap sites={mapSites} />}
      <AskAI context={summary} />
    </Container>
  );
};

export default CopperIntelPOC;
