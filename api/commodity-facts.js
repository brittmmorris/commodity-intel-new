const facts = {
    Copper: {
      symbol: 'XCU',
      unit: 'Metric ton',
      density: '8.96 g/cm³',
      meltingPoint: '1,085°C',
      exporters: ['Chile', 'Peru', 'DR Congo'],
      critical: false,
      source: 'USGS & World Bank'
    },
    Gold: {
      symbol: 'XAU',
      unit: 'Troy ounce',
      density: '19.32 g/cm³',
      meltingPoint: '1,064°C',
      exporters: ['China', 'Russia', 'Australia'],
      critical: false,
      source: 'USGS & World Gold Council'
    }
  };
  
  export default function handler(req, res) {
    const { symbol } = req.query;
    const data = facts[symbol];
  
    if (!data) {
      return res.status(404).json({ error: 'Commodity not found' });
    }
  
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  }
  