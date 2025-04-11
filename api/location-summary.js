const locationData = {
    Chile: {
      commodities: ['Copper', 'Gold', 'Lithium'],
      mineCount: 54,
      topCommodities: [
        { name: 'Copper', share: '72%' },
        { name: 'Lithium', share: '18%' },
        { name: 'Gold', share: '10%' }
      ],
      source: 'USGS & Chilean Mining Council'
    },
    Ohio: {
      commodities: ['Coal', 'Limestone', 'Salt'],
      mineCount: 29,
      topCommodities: [
        { name: 'Coal', share: '60%' },
        { name: 'Limestone', share: '25%' },
        { name: 'Salt', share: '15%' }
      ],
      source: 'Ohio Geological Survey'
    }
  };
  
  export default function handler(req, res) {
    const { location } = req.query;
    const data = locationData[location];
  
    if (!data) {
      return res.status(404).json({ error: 'Location not found' });
    }
  
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  }
  