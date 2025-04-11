const usesData = {
    Copper: {
      uses: [
        { name: 'Electrical wiring', percent: 60 },
        { name: 'Industrial machinery', percent: 20 },
        { name: 'Construction', percent: 15 },
        { name: 'Other', percent: 5 }
      ],
      source: 'USGS Mineral Commodity Summary, 2024'
    },
    Gold: {
      uses: [
        { name: 'Jewelry', percent: 50 },
        { name: 'Investment (bullion, ETFs)', percent: 30 },
        { name: 'Electronics', percent: 10 },
        { name: 'Dentistry & medical', percent: 5 },
        { name: 'Other', percent: 5 }
      ],
      source: 'USGS Mineral Commodity Summary, 2024'
    }
  };
  
  export default function handler(req, res) {
    const { symbol } = req.query;
    const data = usesData[symbol];
  
    if (!data) {
      return res.status(404).json({ error: 'Commodity not found' });
    }
  
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  }
  