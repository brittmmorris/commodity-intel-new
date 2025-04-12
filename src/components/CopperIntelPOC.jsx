// components/CopperIntelPOC.jsx
import React, { useState } from 'react';
import { Container, Tabs, Tab, Box, Autocomplete, TextField, Button, CircularProgress, Grid } from '@mui/material';
import MiningMap from './MiningMap';
import AskAI from './AskAI';
import SummaryCard from './SummaryCard';
import { fetchCommodityData, fetchLocationData, fetchMiningSites } from '../utils/dataUtils';
import { fetchCommodityPrice } from '../utils/dataUtils';
import TopUsesCard from './TopUsesCard';
import { fetchCommodityUses } from '../utils/dataUtils'; // make sure this is imported
import { fetchCommodityNews } from '../utils/dataUtils'; // make sure this is imported
import { fetchLocationSummary } from '../utils/dataUtils';
import NewsCard from './NewsCard';
import LocationSummaryCard from './LocationSummaryCard';
import FactPanelCard from './FactPanelCard';
import { fetchCommodityFacts } from '../utils/dataUtils';

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
  const [uses, setUses] = useState([]);
  const [usesSource, setUsesSource] = useState('');
  const [news, setNews] = useState([]);
  const [newsSource, setNewsSource] = useState('');
  const [locationSummary, setLocationSummary] = useState(null);
  const [facts, setFacts] = useState(null);
  const [year, setYear] = useState('2024');
  const years = ['2024', '2023', '2022']; // can expand later
  
  const handleSearch = async () => {
    setLoading(true);
    setSummary('');
    setMapSites([]);
    setUses([]);
    setUsesSource('');
  
    try {
      const allSites = await fetchMiningSites();
      const filteredSites = allSites.filter(site => {
        return view === 0
          ? site.commodity.toLowerCase() === selectedCommodity.toLowerCase()
          : site.country.toLowerCase() === selectedLocation.toLowerCase();
      });
      setMapSites(filteredSites);
  
      if (view === 0 && selectedCommodity) {
        const data = await fetchCommodityData(selectedCommodity, year);
        setSummary(data.summary);
      
        const latestPrice = await fetchCommodityPrice(selectedCommodity);
        setPrice(latestPrice);
      
        const usesData = await fetchCommodityUses(selectedCommodity);
        setUses(usesData.uses);
        setUsesSource(usesData.source);
      
        // ✅ Add this block for recent news
        const newsData = await fetchCommodityNews(selectedCommodity);
        setNews(newsData.articles || []);
        setNewsSource(newsData.source || '');
        
        const factsData = await fetchCommodityFacts(selectedCommodity);
        setFacts(factsData);

      } else if (view === 1 && selectedLocation) {
        const data = await fetchLocationData(selectedLocation, year);
        setSummary(data.summary);
        
        const locData = await fetchLocationSummary(selectedLocation);
        setLocationSummary(locData);
        setPrice('');
        setUses([]);
        setUsesSource('');
        setFacts(null);
      }
    } catch (err) {
      console.error(err);
      setSummary('Failed to load data.');
      setUses([]);
      setUsesSource('');
      setLocationSummary(null);
    }
  
    setLoading(false);
  };
  

  return (
    <Container maxWidth="lg" sx={{ pt: 4 }}>
      <Tabs
        value={view}
        onChange={(e, v) => {
          setView(v);
          setSelectedCommodity(null);
          setSelectedLocation(null);
          setSummary('');
          setPrice('');
          setUses([]);
          setUsesSource('');
          setNews([]);
          setNewsSource('');
          setMapSites([]);
          setLocationSummary(null);
          setFacts(null);
        }}
        centered
      >
        <Tab label="By Commodity" />
        <Tab label="By Location" />
      </Tabs>
      <Box mt={2}>
        <TextField
          select
          label="Select a Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          native
          fullWidth
        >
          {years.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>
      </Box>

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
      {uses.length > 0 && <TopUsesCard data={uses} source={usesSource} />}
      {news.length > 0 && <NewsCard articles={news} source={newsSource} />}
      {mapSites.length > 0 && <MiningMap sites={mapSites} />}
      {locationSummary && <LocationSummaryCard location={selectedLocation} data={locationSummary} />}
      {facts && <FactPanelCard facts={facts} />}
      <AskAI context={summary} />

    </Container>
  );
};

export default CopperIntelPOC;
