// components/CopperIntelPOC.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Tabs,
  Tab,
  Box,
  Autocomplete,
  TextField,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Stack
} from '@mui/material';
import MiningMap from './MiningMap';
import AskAI from './AskAI';
import SummaryCard from './SummaryCard';
import { fetchCommodityData, fetchLocationData, fetchMiningSites } from '../utils/dataUtils';
import { fetchCommodityPrice } from '../utils/dataUtils';
import TopUsesCard from './TopUsesCard';
import { fetchCommodityUses } from '../utils/dataUtils';
import { fetchCommodityNews } from '../utils/dataUtils';
import { fetchLocationSummary } from '../utils/dataUtils';
import NewsCard from './NewsCard';
import LocationSummaryCard from './LocationSummaryCard';
import FactPanelCard from './FactPanelCard';
import { fetchCommodityFacts } from '../utils/dataUtils';
import ProductionTrendCard from './ProductionTrendCard';
import { fetchCommodityHistory } from '../utils/dataUtils';
import { fetchLocationHistory } from '../utils/dataUtils';
import { fetchLocationNews } from '../utils/dataUtils';

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
  const years = ['2024', '2023', '2022'];
  const [trendData, setTrendData] = useState([]);
  const [trendLength, setTrendLength] = useState('30d');

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
          ? site.commodity.toLowerCase() === selectedCommodity?.toLowerCase()
          : site.country.toLowerCase() === selectedLocation?.toLowerCase();
      });
      setMapSites(filteredSites);
      console.log('Filtered sites:', filteredSites);

      if (view === 0 && selectedCommodity) {
        const data = await fetchCommodityData(selectedCommodity, year);
        const summaryText = `In ${data.year}, global ${data.commodity.toLowerCase()} production was ${data.globalProductionTotal}. Top producers: ${data.topProducers.map((p) => `${p.country} (${p.production})`).join(', ')}`;
        setSummary(summaryText);

        const latestPrice = await fetchCommodityPrice(selectedCommodity, trendLength);
        setPrice(latestPrice);

        const usesData = await fetchCommodityUses(selectedCommodity);
        setUses(usesData.uses);
        setUsesSource(usesData.source);

        const newsData = await fetchCommodityNews(selectedCommodity);
        setNews(newsData.articles || []);
        setNewsSource(newsData.source || '');

        const factsData = await fetchCommodityFacts(selectedCommodity);
        setFacts(factsData);

        const trend = await fetchCommodityHistory(selectedCommodity);
        setTrendData(trend);
      } else if (view === 1 && selectedLocation) {
        const data = await fetchLocationData(selectedLocation, year);
        setSummary(data.summary);

        const locData = await fetchLocationSummary(selectedLocation);
        setLocationSummary(locData);

        const trend = await fetchLocationHistory(selectedLocation);
        setTrendData(trend);

        const newsData = await fetchLocationNews(selectedLocation);
        setNews(newsData.articles || []);
        setNewsSource(newsData.source || '');

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

  useEffect(() => {
    if (view === 1 && selectedLocation) {
      handleSearch();
    }
  }, [selectedLocation, view]);

  useEffect(() => {
    if (view === 0 && selectedCommodity) {
      handleSearch();
    }
  }, [selectedCommodity, view]);
  

  const handleCommoditySelect = (commodityName) => {
    setView(0);
    setSelectedCommodity(commodityName);
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
    setTrendData([]);
  };
  

  const handleLocationSelect = (locationName) => {
    setView(1);
    setSelectedLocation(locationName);
    setSelectedCommodity(null);
    setSummary('');
    setPrice('');
    setUses([]);
    setUsesSource('');
    setNews([]);
    setNewsSource('');
    setMapSites([]);
    setLocationSummary(null);
    setFacts(null);
    setTrendData([]);
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
          setTrendData([]);
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
          fullWidth
        >
          {years.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
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

      {/* {loading && <CircularProgress sx={{ mt: 2 }} />} */}

      {summary && (
        <SummaryCard
          summary={summary}
          price={price}
          trendLength={trendLength}
          setTrendLength={setTrendLength}
        />
      )}

      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap mt={2}>
        {facts && <Box flex={1} minWidth={300}><FactPanelCard facts={facts} /></Box>}
        {uses.length > 0 && <Box flex={1} minWidth={300}><TopUsesCard data={uses} source={usesSource} /></Box>}
        {news.length > 0 && <Box flex={1} minWidth={300}><NewsCard articles={news} source={newsSource} /></Box>}
        {trendData.length > 0 && <Box flex={1} minWidth={300}><ProductionTrendCard data={trendData} /></Box>}
      </Stack>

        <MiningMap
          sites={mapSites}
          onLocationSelect={handleLocationSelect}
          centerCountry={view === 1 ? selectedLocation : null}
        />

      {locationSummary && (
        <LocationSummaryCard location={selectedLocation} data={locationSummary} onCommodityClick={handleCommoditySelect} />
      )}

      <AskAI context={summary} trendLength={trendLength} />
    </Container>
  );
};

export default CopperIntelPOC;
