const mockData = {
    "Copper": {
      "commodity": "Copper",
      "year": 2024,
      "globalProductionTotal": "22,000,000 metric tons",
      "topProducers": [
        { "country": "Chile", "production": "5,300,000 metric tons" },
        { "country": "Peru", "production": "2,300,000 metric tons" },
        { "country": "DR Congo", "production": "2,000,000 metric tons" },
        { "country": "USA", "production": "1,200,000 metric tons" },
        { "country": "Russia", "production": "920,000 metric tons" }
      ],
      "source": "USGS 2024 Mineral Commodity Summary"
    },
    "Gold": {
      "commodity": "Gold",
      "year": 2024,
      "globalProductionTotal": "3,100 metric tons",
      "topProducers": [
        { "country": "China", "production": "370 metric tons" },
        { "country": "Russia", "production": "310 metric tons" },
        { "country": "Australia", "production": "290 metric tons" },
        { "country": "Canada", "production": "210 metric tons" },
        { "country": "USA", "production": "170 metric tons" }
      ],
      "source": "USGS 2024 Mineral Commodity Summary"
    },
    "Lithium": {
      "commodity": "Lithium",
      "year": 2024,
      "globalProductionTotal": "113,000 metric tons",
      "topProducers": [
        { "country": "Australia", "production": "55,000 metric tons" },
        { "country": "Chile", "production": "26,000 metric tons" },
        { "country": "China", "production": "22,000 metric tons" },
        { "country": "Argentina", "production": "8,000 metric tons" },
        { "country": "Brazil", "production": "2,000 metric tons" }
      ],
      "source": "USGS 2024 Lithium Summary"
    },
    "Iron Ore": {
      "commodity": "Iron Ore",
      "year": 2024,
      "globalProductionTotal": "2,500,000,000 metric tons",
      "topProducers": [
        { "country": "Australia", "production": "900,000,000 metric tons" },
        { "country": "Brazil", "production": "410,000,000 metric tons" },
        { "country": "China", "production": "380,000,000 metric tons" },
        { "country": "India", "production": "250,000,000 metric tons" },
        { "country": "Russia", "production": "100,000,000 metric tons" }
      ],
      "source": "USGS 2024 Iron Ore Summary"
    },
    "Coal": {
      "commodity": "Coal",
      "year": 2024,
      "globalProductionTotal": "8,400,000,000 metric tons",
      "topProducers": [
        { "country": "China", "production": "4,000,000,000 metric tons" },
        { "country": "India", "production": "800,000,000 metric tons" },
        { "country": "USA", "production": "600,000,000 metric tons" },
        { "country": "Indonesia", "production": "500,000,000 metric tons" },
        { "country": "Australia", "production": "450,000,000 metric tons" }
      ],
      "source": "IEA Global Coal Production 2024"
    },
    "Bauxite": {
      "commodity": "Bauxite",
      "year": 2024,
      "globalProductionTotal": "390,000,000 metric tons",
      "topProducers": [
        { "country": "Australia", "production": "110,000,000 metric tons" },
        { "country": "China", "production": "80,000,000 metric tons" },
        { "country": "Guinea", "production": "76,000,000 metric tons" },
        { "country": "Brazil", "production": "34,000,000 metric tons" },
        { "country": "India", "production": "26,000,000 metric tons" }
      ],
      "source": "USGS 2024 Bauxite Summary"
    },
    "Nickel": {
      "commodity": "Nickel",
      "year": 2024,
      "globalProductionTotal": "3,300,000 metric tons",
      "topProducers": [
        { "country": "Indonesia", "production": "1,600,000 metric tons" },
        { "country": "Philippines", "production": "400,000 metric tons" },
        { "country": "Russia", "production": "250,000 metric tons" },
        { "country": "New Caledonia", "production": "190,000 metric tons" },
        { "country": "Canada", "production": "140,000 metric tons" }
      ],
      "source": "USGS 2024 Nickel Summary"
    },
    "Zinc": {
      "commodity": "Zinc",
      "year": 2024,
      "globalProductionTotal": "13,000,000 metric tons",
      "topProducers": [
        { "country": "China", "production": "4,200,000 metric tons" },
        { "country": "Peru", "production": "1,400,000 metric tons" },
        { "country": "Australia", "production": "1,200,000 metric tons" },
        { "country": "India", "production": "900,000 metric tons" },
        { "country": "USA", "production": "800,000 metric tons" }
      ],
      "source": "USGS 2024 Zinc Summary"
    },
    "Platinum": {
      "commodity": "Platinum",
      "year": 2024,
      "globalProductionTotal": "190 metric tons",
      "topProducers": [
        { "country": "South Africa", "production": "130 metric tons" },
        { "country": "Russia", "production": "22 metric tons" },
        { "country": "Zimbabwe", "production": "17 metric tons" },
        { "country": "Canada", "production": "10 metric tons" },
        { "country": "USA", "production": "8 metric tons" }
      ],
      "source": "USGS 2024 PGM Summary"
    },
    "Rare Earth Elements": {
      "commodity": "Rare Earth Elements",
      "year": 2024,
      "globalProductionTotal": "330,000 metric tons",
      "topProducers": [
        { "country": "China", "production": "210,000 metric tons" },
        { "country": "USA", "production": "43,000 metric tons" },
        { "country": "Myanmar", "production": "38,000 metric tons" },
        { "country": "Australia", "production": "18,000 metric tons" },
        { "country": "Russia", "production": "13,000 metric tons" }
      ],
      "source": "USGS 2024 REE Summary"
    }
  }
  
  
  export default function handler(req, res) {
    const { symbol } = req.query;
    const data = mockData[symbol];
  
    if (!data) {
      return res.status(404).json({ error: 'Commodity not found' });
    }
  
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  }
  