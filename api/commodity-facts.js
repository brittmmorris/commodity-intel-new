const facts = {
  "Copper": {
      "symbol": "XCU",
      "unit": "Metric ton",
      "density": "8.96 g/cm³",
      "meltingPoint": "1,085°C",
      "exporters": ["Chile", "Peru", "DR Congo"],
      "critical": false,
      "source": "USGS & World Bank"
  },
  "Gold": {
      "symbol": "XAU",
      "unit": "Troy ounce",
      "density": "19.32 g/cm³",
      "meltingPoint": "1,064°C",
      "exporters": ["China", "Russia", "Australia"],
      "critical": false,
      "source": "USGS & World Gold Council"
  },
  "Lithium": {
      "symbol": "Li",
      "unit": "Metric ton (LCE)",
      "density": "0.53 g/cm³",
      "meltingPoint": "180.5°C",
      "exporters": ["Australia", "Chile", "China"],
      "critical": true,
      "source": "USGS & IEA"
  },
  "Iron Ore": {
      "symbol": "Fe",
      "unit": "Metric ton",
      "density": "7.87 g/cm³",
      "meltingPoint": "1,538°C",
      "exporters": ["Australia", "Brazil", "South Africa"],
      "critical": false,
      "source": "USGS & World Steel Association"
  },
  "Coal": {
      "symbol": "COAL",
      "unit": "Metric ton",
      "density": "Varies",
      "meltingPoint": "Does not melt (decomposes)",
      "exporters": ["Indonesia", "Australia", "Russia"],
      "critical": true,
      "source": "IEA & US EIA"
  },
  "Bauxite": {
      "symbol": "BX",
      "unit": "Metric ton",
      "density": "2.4–2.6 g/cm³",
      "meltingPoint": "Releases alumina at 2,072°C",
      "exporters": ["Australia", "Guinea", "Indonesia"],
      "critical": true,
      "source": "USGS & Aluminium Association"
  },
  "Nickel": {
      "symbol": "NI",
      "unit": "Metric ton",
      "density": "8.90 g/cm³",
      "meltingPoint": "1,455°C",
      "exporters": ["Indonesia", "Philippines", "Russia"],
      "critical": true,
      "source": "USGS & Nickel Institute"
  },
  "Zinc": {
      "symbol": "ZN",
      "unit": "Metric ton",
      "density": "7.14 g/cm³",
      "meltingPoint": "419.5°C",
      "exporters": ["China", "Peru", "Australia"],
      "critical": false,
      "source": "USGS & ILZSG"
  },
  "Platinum": {
      "symbol": "XPT",
      "unit": "Troy ounce",
      "density": "21.45 g/cm³",
      "meltingPoint": "1,768°C",
      "exporters": ["South Africa", "Russia", "Zimbabwe"],
      "critical": true,
      "source": "USGS & World Platinum Investment Council"
  },
  "Rare Earth Elements": {
      "symbol": "REE",
      "unit": "Metric ton (REO)",
      "density": "Varies by element",
      "meltingPoint": "Varies by element",
      "exporters": ["China", "USA", "Myanmar"],
      "critical": true,
      "source": "USGS & IEA"
  }
}
  
  export default function handler(req, res) {
    const { symbol } = req.query;
    const data = facts[symbol];
  
    if (!data) {
      return res.status(404).json({ error: 'Commodity not found' });
    }
  
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  }
  