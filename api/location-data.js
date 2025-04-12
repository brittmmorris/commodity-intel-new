const mockData = {
    Chile: {
      '2024': {
        commodities: ['Copper', 'Gold', 'Lithium'],
        summary: 'Chile is a top global exporter of copper and lithium. Mining makes up over 10% of its GDP.',
        source: 'Chilean Mining Council 2024'
      },
      '2023': {
        commodities: ['Copper', 'Gold'],
        summary: 'Chile continues to dominate copper exports globally. Lithium extraction also expanded in 2023.',
        source: 'Chilean Mining Council 2023'
      }
    },
    Ohio: {
      '2024': {
        commodities: ['Coal', 'Limestone', 'Salt'],
        summary: 'Ohio has active extraction of coal and limestone, supporting regional construction and energy.',
        source: 'Ohio Geological Survey 2024'
      },
      '2023': {
        commodities: ['Coal', 'Salt'],
        summary: 'Ohio’s coal production dipped slightly in 2023 due to regional regulations.',
        source: 'Ohio Geological Survey 2023'
      }
    }
  };
  
  export default function handler(req, res) {
    const { location, year = '2024' } = req.query;
  
    const locData = mockData[location];
    if (!locData || !locData[year]) {
      return res.status(404).json({ error: 'Location data not found for selected year' });
    }
  
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(locData[year]);
  }
  