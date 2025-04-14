const locationData = {
  Chile: {
    commodities: ['Copper', 'Gold', 'Lithium'],
    mineCount: 54,
    topCommodities: [
      { name: 'Copper', share: '72%' },
      { name: 'Lithium', share: '18%' },
      { name: 'Gold', share: '10%' }
    ],
    summary: 'Chile is a top global exporter of copper and lithium. Mining makes up over 10% of its GDP.',
    didYouKnow: 'Chile holds over 50% of the world’s known lithium reserves.',
    economicImportance: 'Mining contributes more than 10% to Chile’s GDP.',
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
    summary: 'Ohio has active extraction of coal and limestone, supporting regional construction and energy.',
    didYouKnow: 'Ohio’s salt mines supply road salt used across the Midwest during winter.',
    economicImportance: 'Mining supports thousands of jobs in the Ohio Valley region.',
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
  