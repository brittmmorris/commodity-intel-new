const newsData = {
  Copper: {
    articles: [
      {
        title: 'Chile Expands ESG Mining Regulations for Copper',
        url: '#',
        date: '2025-04-09'
      },
      {
        title: 'Global Demand for “Green Copper” Surges',
        url: '#',
        date: '2025-04-06'
      },
      {
        title: 'Copper’s Role in Clean Energy Transition',
        url: '#',
        date: '2025-04-02'
      }
    ],
    source: 'Green Energy News Network'
  },
  Gold: {
    articles: [
      { title: 'Gold Mining Faces New Environmental Oversight in Peru', url: '#', date: '2025-04-02' },
      { title: 'Investors Shift to Ethical Gold Funds', url: '#', date: '2025-04-02' },
      { title: 'Gold’s ESG Risks Remain High in 2024', url: '#', date: '2025-04-02' }
    ],
    source: 'Sustainable Mining Weekly'
  }
};

export default function handler(req, res) {
  const { symbol } = req.query;
  const data = newsData[symbol];

  if (!data) {
    return res.status(404).json({ error: 'No ESG news found' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json(data);
}
