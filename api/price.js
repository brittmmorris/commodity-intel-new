export default async function handler(req, res) {
  const { symbol } = req.query;

  // Map user-friendly names to Yahoo symbols
  const yahooSymbols = {
    Copper: 'HG=F', // Copper Futures
    Gold: 'GC=F'    // Gold Futures
  };

  const yahooSymbol = yahooSymbols[symbol];
  if (!yahooSymbol) {
    return res.status(400).json({ error: 'Unsupported symbol. Try Copper or Gold.' });
  }

  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${yahooSymbol}?range=1d&interval=1d`;
    const response = await fetch(url);
    const data = await response.json();

    const price = data?.chart?.result?.[0]?.meta?.regularMarketPrice;

    if (!price) {
      return res.status(500).json({ error: 'Failed to extract price from Yahoo' });
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({
      price: price.toFixed(2),
      unit: '/ oz',
      symbol
    });
  } catch (err) {
    console.error('Yahoo proxy error:', err);
    return res.status(500).json({ error: 'Error fetching from Yahoo' });
  }
}
