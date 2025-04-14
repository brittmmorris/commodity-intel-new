const trendData = {
    Chile: [
      { year: 2015, value: 520000 },
      { year: 2016, value: 540000 },
      { year: 2017, value: 560000 },
      { year: 2018, value: 580000 },
      { year: 2019, value: 610000 },
      { year: 2020, value: 635000 },
      { year: 2021, value: 660000 },
      { year: 2022, value: 685000 },
      { year: 2023, value: 710000 },
      { year: 2024, value: 740000 }
    ],
    Ohio: [
      { year: 2015, value: 200000 },
      { year: 2016, value: 205000 },
      { year: 2017, value: 210000 },
      { year: 2018, value: 215000 },
      { year: 2019, value: 220000 },
      { year: 2020, value: 222000 },
      { year: 2021, value: 225000 },
      { year: 2022, value: 230000 },
      { year: 2023, value: 235000 },
      { year: 2024, value: 240000 }
    ]
  };
  
  export default function handler(req, res) {
    const { location } = req.query;
    const data = trendData[location];
  
    if (!data) {
      return res.status(404).json({ error: 'Trend data not found for this location' });
    }
  
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  }
  