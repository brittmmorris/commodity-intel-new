export default async function handler(req, res) {
  const { symbol, range = '5d' } = req.query;

  const yahooSymbols = {
    Copper: 'HG=F',
    Gold: 'GC=F',
    Silver: 'SI=F',
    Platinum: 'PL=F',
    Nickel: 'NI=F',
    IronOre: '', // No direct symbol; consider using 'PICK' ETF as a proxy
    Coal: '', // No direct symbol; consider using 'KOL' ETF as a proxy
    Zinc: '', // No direct symbol; consider using 'PICK' ETF as a proxy
    Bauxite: '', // No direct symbol; consider using 'AA' or 'PICK' as proxies
    Lithium: '', // No direct symbol; consider using 'LIT' ETF as a proxy
    RareEarthElements: '' // Not traded directly; consider using 'REMX' ETF as a proxy
  };
  
  

  const yahooSymbol = yahooSymbols[symbol];
  if (!yahooSymbol) {
    return res.status(400).json({ error: 'Unsupported symbol' });
  }

  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${yahooSymbol}?range=${range}&interval=1d`;
    const response = await fetch(url);
    const data = await response.json();

    const prices = data?.chart?.result?.[0]?.indicators?.quote?.[0]?.close;
    const timestamps = data?.chart?.result?.[0]?.timestamp;

    const current = prices?.[prices.length - 1];
    const previous = prices?.[prices.length - 2];

    const history = prices?.map((p, i) => ({
      date: new Date(timestamps[i] * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: p?.toFixed(2)
    })) || [];

    if (!current || !previous) {
      return res.status(500).json({ error: 'Price history unavailable' });
    }

    const diff = (current - previous).toFixed(2);
    const pctChange = ((diff / previous) * 100).toFixed(2);

    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({
      price: current.toFixed(2),
      previous: previous.toFixed(2),
      change: diff,
      changePct: pctChange,
      unit: '/ oz',
      symbol,
      history
    });
  } catch (err) {
    console.error('Yahoo proxy error:', err);
    return res.status(500).json({ error: 'Error fetching from Yahoo' });
  }
}
