const historyData = {
    Copper: [
      { year: 2015, value: 18500000 },
      { year: 2016, value: 18700000 },
      { year: 2017, value: 19000000 },
      { year: 2018, value: 19300000 },
      { year: 2019, value: 19500000 },
      { year: 2020, value: 20000000 },
      { year: 2021, value: 21000000 },
      { year: 2022, value: 21500000 },
      { year: 2023, value: 22000000 },
      { year: 2024, value: 22500000 }
    ],
    Gold: [
      { year: 2015, value: 2900 },
      { year: 2016, value: 2950 },
      { year: 2017, value: 3000 },
      { year: 2018, value: 3100 },
      { year: 2019, value: 3050 },
      { year: 2020, value: 3150 },
      { year: 2021, value: 3200 },
      { year: 2022, value: 3250 },
      { year: 2023, value: 3300 },
      { year: 2024, value: 3400 }
    ]
  };
  
  export default function handler(req, res) {
    const { symbol } = req.query;
    const data = historyData[symbol];
  
    if (!data) {
      return res.status(404).json({ error: 'No history found' });
    }
  
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  }
  