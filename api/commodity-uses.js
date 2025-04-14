const usesData = {
    "Copper": {
      "uses": [
        { "name": "Electrical wiring", "percent": 60 },
        { "name": "Industrial machinery", "percent": 20 },
        { "name": "Construction", "percent": 15 },
        { "name": "Other", "percent": 5 }
      ],
      "source": "USGS Mineral Commodity Summary, 2024"
    },
    "Gold": {
      "uses": [
        { "name": "Jewelry", "percent": 50 },
        { "name": "Investment (bullion, ETFs)", "percent": 30 },
        { "name": "Electronics", "percent": 10 },
        { "name": "Dentistry & medical", "percent": 5 },
        { "name": "Other", "percent": 5 }
      ],
      "source": "USGS Mineral Commodity Summary, 2024"
    },
    "Lithium": {
      "uses": [
        { "name": "Rechargeable batteries", "percent": 74 },
        { "name": "Glass and ceramics", "percent": 14 },
        { "name": "Lubricating greases", "percent": 5 },
        { "name": "Air treatment", "percent": 3 },
        { "name": "Other", "percent": 4 }
      ],
      "source": "USGS Lithium Statistics and Information, 2024"
    },
    "Iron Ore": {
      "uses": [
        { "name": "Steel production", "percent": 98 },
        { "name": "Powdered iron (for magnets, metallurgy)", "percent": 1 },
        { "name": "Other", "percent": 1 }
      ],
      "source": "USGS Iron Ore Statistics and Information, 2024"
    },
    "Coal": {
      "uses": [
        { "name": "Electric power generation", "percent": 65 },
        { "name": "Cement manufacturing", "percent": 10 },
        { "name": "Steel production (coking coal)", "percent": 15 },
        { "name": "Industrial heating", "percent": 5 },
        { "name": "Other", "percent": 5 }
      ],
      "source": "IEA World Energy Outlook, 2024"
    },
    "Bauxite": {
      "uses": [
        { "name": "Aluminum production", "percent": 90 },
        { "name": "Abrasives", "percent": 4 },
        { "name": "Refractories", "percent": 3 },
        { "name": "Cement additive", "percent": 3 }
      ],
      "source": "USGS Bauxite and Alumina Statistics, 2024"
    },
    "Nickel": {
      "uses": [
        { "name": "Stainless steel", "percent": 70 },
        { "name": "Batteries (EVs)", "percent": 15 },
        { "name": "Alloys", "percent": 10 },
        { "name": "Plating", "percent": 3 },
        { "name": "Other", "percent": 2 }
      ],
      "source": "USGS Nickel Statistics and Information, 2024"
    },
    "Zinc": {
      "uses": [
        { "name": "Galvanizing (steel corrosion protection)", "percent": 60 },
        { "name": "Alloys (brass, bronze)", "percent": 20 },
        { "name": "Die-casting", "percent": 10 },
        { "name": "Chemicals", "percent": 5 },
        { "name": "Other", "percent": 5 }
      ],
      "source": "USGS Zinc Statistics and Information, 2024"
    },
    "Platinum": {
      "uses": [
        { "name": "Automotive catalytic converters", "percent": 40 },
        { "name": "Jewelry", "percent": 30 },
        { "name": "Industrial applications", "percent": 20 },
        { "name": "Investment", "percent": 5 },
        { "name": "Other", "percent": 5 }
      ],
      "source": "USGS Platinum Group Metals Summary, 2024"
    },
    "Rare Earth Elements": {
      "uses": [
        { "name": "Permanent magnets (EVs, wind turbines)", "percent": 38 },
        { "name": "Catalysts", "percent": 20 },
        { "name": "Glass and polishing", "percent": 18 },
        { "name": "Phosphors (lighting, displays)", "percent": 12 },
        { "name": "Other", "percent": 12 }
      ],
      "source": "USGS Rare Earths Statistics, 2024"
    }
  }
  
  
  export default function handler(req, res) {
    const { symbol } = req.query;
    const data = usesData[symbol];
  
    if (!data) {
      return res.status(404).json({ error: 'Commodity not found' });
    }
  
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  }
  