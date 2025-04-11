export default async function handler(req, res) {
    const { symbol } = req.query;
    const apiKey = process.env.TE_API_KEY;
  
    if (!symbol || !apiKey) {
      return res.status(400).json({ error: 'Missing symbol or API key' });
    }
  
    try {
      const apiUrl = `https://api.tradingeconomics.com/markets/symbol/${symbol}?c=${apiKey}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      if (!data || !data[0] || !data[0].Last) {
        return res.status(500).json({ error: 'Invalid response from TradingEconomics' });
      }
  
      res.setHeader('Access-Control-Allow-Origin', '*');
      return res.status(200).json({
        price: data[0].Last.toFixed(2),
        unit: '/ oz',
        symbol
      });
    } catch (err) {
      console.error('Proxy error:', err);
      return res.status(500).json({ error: 'Error fetching from TradingEconomics' });
    }
  }
  