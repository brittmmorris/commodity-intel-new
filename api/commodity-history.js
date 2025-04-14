const historyData = {
    "Copper": [
      { "year": 2015, "value": 18500000 },
      { "year": 2016, "value": 18700000 },
      { "year": 2017, "value": 19000000 },
      { "year": 2018, "value": 19300000 },
      { "year": 2019, "value": 19500000 },
      { "year": 2020, "value": 20000000 },
      { "year": 2021, "value": 21000000 },
      { "year": 2022, "value": 21500000 },
      { "year": 2023, "value": 22000000 },
      { "year": 2024, "value": 22500000 }
    ],
    "Gold": [
      { "year": 2015, "value": 2900 },
      { "year": 2016, "value": 2950 },
      { "year": 2017, "value": 3000 },
      { "year": 2018, "value": 3100 },
      { "year": 2019, "value": 3050 },
      { "year": 2020, "value": 3150 },
      { "year": 2021, "value": 3200 },
      { "year": 2022, "value": 3250 },
      { "year": 2023, "value": 3300 },
      { "year": 2024, "value": 3400 }
    ],
    "Lithium": [
      { "year": 2015, "value": 32000 },
      { "year": 2016, "value": 35000 },
      { "year": 2017, "value": 42000 },
      { "year": 2018, "value": 50000 },
      { "year": 2019, "value": 60000 },
      { "year": 2020, "value": 70000 },
      { "year": 2021, "value": 85000 },
      { "year": 2022, "value": 100000 },
      { "year": 2023, "value": 105000 },
      { "year": 2024, "value": 113000 }
    ],
    "Iron Ore": [
      { "year": 2015, "value": 2100000000 },
      { "year": 2016, "value": 2150000000 },
      { "year": 2017, "value": 2200000000 },
      { "year": 2018, "value": 2250000000 },
      { "year": 2019, "value": 2300000000 },
      { "year": 2020, "value": 2350000000 },
      { "year": 2021, "value": 2400000000 },
      { "year": 2022, "value": 2450000000 },
      { "year": 2023, "value": 2500000000 },
      { "year": 2024, "value": 2550000000 }
    ],
    "Coal": [
      { "year": 2015, "value": 7600000000 },
      { "year": 2016, "value": 7800000000 },
      { "year": 2017, "value": 8000000000 },
      { "year": 2018, "value": 8200000000 },
      { "year": 2019, "value": 8300000000 },
      { "year": 2020, "value": 7900000000 },
      { "year": 2021, "value": 8000000000 },
      { "year": 2022, "value": 8100000000 },
      { "year": 2023, "value": 8200000000 },
      { "year": 2024, "value": 8300000000 }
    ],
    "Bauxite": [
      { "year": 2015, "value": 250000000 },
      { "year": 2016, "value": 260000000 },
      { "year": 2017, "value": 270000000 },
      { "year": 2018, "value": 280000000 },
      { "year": 2019, "value": 290000000 },
      { "year": 2020, "value": 300000000 },
      { "year": 2021, "value": 310000000 },
      { "year": 2022, "value": 320000000 },
      { "year": 2023, "value": 330000000 },
      { "year": 2024, "value": 340000000 }
    ],
    "Nickel": [
      { "year": 2015, "value": 2000000 },
      { "year": 2016, "value": 2100000 },
      { "year": 2017, "value": 2200000 },
      { "year": 2018, "value": 2300000 },
      { "year": 2019, "value": 2400000 },
      { "year": 2020, "value": 2500000 },
      { "year": 2021, "value": 2600000 },
      { "year": 2022, "value": 2700000 },
      { "year": 2023, "value": 2800000 },
      { "year": 2024, "value": 2900000 }
    ],
    "Zinc": [
      { "year": 2015, "value": 13000000 },
      { "year": 2016, "value": 13200000 },
      { "year": 2017, "value": 13400000 },
      { "year": 2018, "value": 13600000 },
      { "year": 2019, "value": 13800000 },
      { "year": 2020, "value": 14000000 },
      { "year": 2021, "value": 14200000 },
      { "year": 2022, "value": 14400000 },
      { "year": 2023, "value": 14600000 },
      { "year": 2024, "value": 14800000 }
    ],
    "Platinum": [
      { "year": 2015, "value": 180 },
      { "year": 2016, "value": 185 },
      { "year": 2017, "value": 190 },
      { "year": 2018, "value": 195 },
      { "year": 2019, "value": 200 },
      { "year": 2020, "value": 210 },
      { "year": 2021, "value": 220 },
      { "year": 2022, "value": 230 },
      { "year": 2023, "value": 240 },
      { "year": 2024, "value": 250 }
    ],
    "Rare Earth Elements": [
      { "year": 2015, "value": 120000 },
      { "year": 2016, "value": 125000 },
      { "year": 2017, "value": 130000 },
      { "year": 2018, "value": 135000 },
      { "year": 2019, "value": 140000 },
      { "year": 2020, "value": 150000 },
      { "year": 2021, "value": 160000 },
      { "year": 2022, "value": 170000 },
      { "year": 2023, "value": 180000 },
      { "year": 2024, "value": 190000 }
    ]
  }
  
  
  export default function handler(req, res) {
    const { symbol } = req.query;
    const data = historyData[symbol];
  
    if (!data) {
      return res.status(404).json({ error: 'No history found' });
    }
  
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  }
  