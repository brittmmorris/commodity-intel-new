const mockData = {
    Copper: {
      commodity: 'Copper',
      year: 2024,
      globalProductionTotal: '22,000,000 metric tons',
      topProducers: [
        { country: 'Chile', production: '5,300,000 metric tons' },
        { country: 'Peru', production: '2,300,000 metric tons' },
        { country: 'DR Congo', production: '2,000,000 metric tons' },
        { country: 'USA', production: '1,200,000 metric tons' },
        { country: 'Russia', production: '920,000 metric tons' }
      ],
      source: "USGS 2024 Mineral Commodity Summary"
    },
    Gold: {
      commodity: 'Gold',
      year: 2024,
      globalProductionTotal: '3,100 metric tons',
      topProducers: [
        { country: 'China', production: '370 metric tons' },
        { country: 'Russia', production: '310 metric tons' },
        { country: 'Australia', production: '290 metric tons' },
        { country: 'Canada', production: '210 metric tons' },
        { country: 'USA', production: '170 metric tons' }
      ],
      source: "USGS 2024 Mineral Commodity Summary"
    }
  };
  
  export default function handler(req, res) {
    const { symbol } = req.query;
    const data = mockData[symbol];
  
    if (!data) {
      return res.status(404).json({ error: 'Commodity not found' });
    }
  
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  }
  