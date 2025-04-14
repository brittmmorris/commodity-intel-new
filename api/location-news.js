const locationNews = {
    Chile: {
      articles: [
        {
          title: 'Chile Expands Lithium Production in Atacama',
          link: 'https://example.com/chile-lithium',
          date: '2024-03-15'
        },
        {
          title: 'Copper Mining in Chile Sees Record Output',
          link: 'https://example.com/chile-copper',
          date: '2024-01-10'
        }
      ],
      source: 'Mining Journal 2024'
    },
    Ohio: {
      articles: [
        {
          title: 'Ohio Coal Plants Undergo Safety Audits',
          link: 'https://example.com/ohio-coal',
          date: '2024-02-18'
        },
        {
          title: 'Salt Mining in Lake Erie Gets Tech Upgrade',
          link: 'https://example.com/ohio-salt',
          date: '2024-01-05'
        }
      ],
      source: 'Ohio Mining Review'
    }
  };
  
  export default function handler(req, res) {
    const { location } = req.query;
    const data = locationNews[location];
  
    if (!data) {
      return res.status(404).json({ error: 'News not found for this location' });
    }
  
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  }
  