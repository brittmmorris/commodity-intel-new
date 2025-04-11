const mockNews = {
    Copper: {
      source: 'Mocked Mining News',
      articles: [
        {
          title: 'Chile ramps up copper exports amid EV boom',
          url: 'https://example.com/chile-copper-exports',
          date: 'April 5, 2024'
        },
        {
          title: 'New copper mine discovered in Zambia',
          url: 'https://example.com/zambia-new-copper-mine',
          date: 'April 3, 2024'
        },
        {
          title: 'US copper demand expected to rise through 2025',
          url: 'https://example.com/us-copper-demand-rise',
          date: 'March 30, 2024'
        }
      ]
    },
    Gold: {
      source: 'Mocked Finance News',
      articles: [
        {
          title: 'Gold prices surge as investors seek safe haven',
          url: 'https://example.com/gold-prices-surge',
          date: 'April 6, 2024'
        },
        {
          title: 'India’s gold imports hit record high in Q1',
          url: 'https://example.com/india-gold-imports',
          date: 'April 1, 2024'
        }
      ]
    }
  };
  
  export default function handler(req, res) {
    const { symbol } = req.query;
    const data = mockNews[symbol];
  
    if (!data) {
      return res.status(404).json({ error: 'No news found' });
    }
  
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  }
  