const mockData = {
    Copper: {
      '2024': {
        year: 2024,
        commodity: 'Copper',
        topProducers: [
          { country: 'Chile', production: '5,300,000 metric tons' },
          { country: 'Peru', production: '2,300,000 metric tons' },
          { country: 'DR Congo', production: '2,000,000 metric tons' },
          { country: 'USA', production: '1,200,000 metric tons' },
          { country: 'Russia', production: '920,000 metric tons' }
        ],
        globalProductionTotal: '22,000,000 metric tons',
        source: 'USGS 2024 Mineral Commodity Summary'
      },
      '2023': {
        year: 2023,
        commodity: 'Copper',
        topProducers: [
          { country: 'Chile', production: '5,000,000 metric tons' },
          { country: 'Peru', production: '2,200,000 metric tons' },
          { country: 'DR Congo', production: '1,900,000 metric tons' },
          { country: 'USA', production: '1,100,000 metric tons' },
          { country: 'Russia', production: '900,000 metric tons' }
        ],
        globalProductionTotal: '21,000,000 metric tons',
        source: 'USGS 2023 Mineral Commodity Summary'
      }
    },
    Gold: {
      '2024': {
        year: 2024,
        commodity: 'Gold',
        topProducers: [
          { country: 'China', production: '370 metric tons' },
          { country: 'Russia', production: '310 metric tons' },
          { country: 'Australia', production: '290 metric tons' },
          { country: 'Canada', production: '210 metric tons' },
          { country: 'USA', production: '170 metric tons' }
        ],
        globalProductionTotal: '3,100 metric tons',
        source: 'USGS 2024 Gold Summary'
      },
      '2023': {
        year: 2023,
        commodity: 'Gold',
        topProducers: [
          { country: 'China', production: '360 metric tons' },
          { country: 'Russia', production: '300 metric tons' },
          { country: 'Australia', production: '280 metric tons' },
          { country: 'Canada', production: '205 metric tons' },
          { country: 'USA', production: '165 metric tons' }
        ],
        globalProductionTotal: '3,000 metric tons',
        source: 'USGS 2023 Gold Summary'
      }
    }
  };
  
  export default function handler(req, res) {
    const { symbol, year = '2024' } = req.query;
  
    if (!mockData[symbol] || !mockData[symbol][year]) {
      return res.status(404).json({ error: 'Data not found for selected year or commodity' });
    }
  
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(mockData[symbol][year]);
  }
  