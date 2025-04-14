
const mockData = {
    "Iron Ore": {
        "2024": {
            "year": 2024,
            "commodity": "Iron Ore",
            "topProducers": [
                {"country": "Australia", "production": "930,000,000 metric tons"},
                {"country": "Brazil", "production": "410,000,000 metric tons"},
                {"country": "China", "production": "360,000,000 metric tons"},
                {"country": "India", "production": "250,000,000 metric tons"},
                {"country": "Russia", "production": "100,000,000 metric tons"}
            ],
            "globalProductionTotal": "1,950,000,000 metric tons",
            "source": "USGS 2024 Iron Ore Summary"
        },
        "2023": {
            "year": 2023,
            "commodity": "Iron Ore",
            "topProducers": [
                {"country": "Australia", "production": "920,000,000 metric tons"},
                {"country": "Brazil", "production": "400,000,000 metric tons"},
                {"country": "China", "production": "350,000,000 metric tons"},
                {"country": "India", "production": "240,000,000 metric tons"},
                {"country": "Russia", "production": "95,000,000 metric tons"}
            ],
            "globalProductionTotal": "1,910,000,000 metric tons",
            "source": "USGS 2023 Iron Ore Summary"
        }
    },
    "Coal": {
        "2024": {
            "year": 2024,
            "commodity": "Coal",
            "topProducers": [
                {"country": "China", "production": "4,100,000,000 metric tons"},
                {"country": "India", "production": "900,000,000 metric tons"},
                {"country": "Indonesia", "production": "680,000,000 metric tons"},
                {"country": "USA", "production": "500,000,000 metric tons"},
                {"country": "Russia", "production": "400,000,000 metric tons"}
            ],
            "globalProductionTotal": "6,580,000,000 metric tons",
            "source": "IEA 2024 Coal Report"
        },
        "2023": {
            "year": 2023,
            "commodity": "Coal",
            "topProducers": [
                {"country": "China", "production": "4,000,000,000 metric tons"},
                {"country": "India", "production": "880,000,000 metric tons"},
                {"country": "Indonesia", "production": "660,000,000 metric tons"},
                {"country": "USA", "production": "490,000,000 metric tons"},
                {"country": "Russia", "production": "390,000,000 metric tons"}
            ],
            "globalProductionTotal": "6,420,000,000 metric tons",
            "source": "IEA 2023 Coal Report"
        }
    },
    "Bauxite": {
        "2024": {
            "year": 2024,
            "commodity": "Bauxite",
            "topProducers": [
                {"country": "Australia", "production": "110,000,000 metric tons"},
                {"country": "China", "production": "90,000,000 metric tons"},
                {"country": "Guinea", "production": "88,000,000 metric tons"},
                {"country": "Brazil", "production": "35,000,000 metric tons"},
                {"country": "India", "production": "30,000,000 metric tons"}
            ],
            "globalProductionTotal": "370,000,000 metric tons",
            "source": "USGS 2024 Bauxite Summary"
        },
        "2023": {
            "year": 2023,
            "commodity": "Bauxite",
            "topProducers": [
                {"country": "Australia", "production": "108,000,000 metric tons"},
                {"country": "China", "production": "89,000,000 metric tons"},
                {"country": "Guinea", "production": "85,000,000 metric tons"},
                {"country": "Brazil", "production": "33,000,000 metric tons"},
                {"country": "India", "production": "28,000,000 metric tons"}
            ],
            "globalProductionTotal": "360,000,000 metric tons",
            "source": "USGS 2023 Bauxite Summary"
        }
    },
    "Nickel": {
        "2024": {
            "year": 2024,
            "commodity": "Nickel",
            "topProducers": [
                {"country": "Indonesia", "production": "1,800,000 metric tons"},
                {"country": "Philippines", "production": "400,000 metric tons"},
                {"country": "Russia", "production": "270,000 metric tons"},
                {"country": "New Caledonia", "production": "220,000 metric tons"},
                {"country": "Canada", "production": "180,000 metric tons"}
            ],
            "globalProductionTotal": "3,100,000 metric tons",
            "source": "USGS 2024 Nickel Summary"
        },
        "2023": {
            "year": 2023,
            "commodity": "Nickel",
            "topProducers": [
                {"country": "Indonesia", "production": "1,750,000 metric tons"},
                {"country": "Philippines", "production": "390,000 metric tons"},
                {"country": "Russia", "production": "260,000 metric tons"},
                {"country": "New Caledonia", "production": "215,000 metric tons"},
                {"country": "Canada", "production": "175,000 metric tons"}
            ],
            "globalProductionTotal": "3,000,000 metric tons",
            "source": "USGS 2023 Nickel Summary"
        }
    }
}

export default function handler(req, res) {
  const { symbol, year = '2024' } = req.query;

  if (!mockData[symbol] || !mockData[symbol][year]) {
    return res.status(404).json({ error: 'Data not found for selected year or commodity' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json(mockData[symbol][year]);
}
