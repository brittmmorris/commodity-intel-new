const locationData = {
    "Chile": {
      "commodities": ["Copper", "Gold", "Lithium"],
      "mineCount": 54,
      "topCommodities": [
        { "name": "Copper", "share": "72%" },
        { "name": "Lithium", "share": "18%" },
        { "name": "Gold", "share": "10%" }
      ],
      "summary": "Chile is a top global exporter of copper and lithium. Mining makes up over 10% of its GDP.",
      "didYouKnow": "Chile holds over 50% of the world’s known lithium reserves.",
      "economicImportance": "Mining contributes more than 10% to Chile’s GDP.",
      "source": "USGS & Chilean Mining Council"
    },
    "Ohio": {
      "commodities": ["Coal", "Limestone", "Salt"],
      "mineCount": 29,
      "topCommodities": [
        { "name": "Coal", "share": "60%" },
        { "name": "Limestone", "share": "25%" },
        { "name": "Salt", "share": "15%" }
      ],
      "summary": "Ohio has active extraction of coal and limestone, supporting regional construction and energy.",
      "didYouKnow": "Ohio’s salt mines supply road salt used across the Midwest during winter.",
      "economicImportance": "Mining supports thousands of jobs in the Ohio Valley region.",
      "source": "Ohio Geological Survey"
    },
    "Australia": {
      "commodities": ["Iron Ore", "Bauxite", "Gold"],
      "mineCount": 112,
      "topCommodities": [
        { "name": "Iron Ore", "share": "65%" },
        { "name": "Gold", "share": "20%" },
        { "name": "Bauxite", "share": "15%" }
      ],
      "summary": "Australia is the leading global exporter of iron ore and a top producer of bauxite and gold.",
      "didYouKnow": "The Pilbara region of Western Australia accounts for over 90% of the country's iron ore exports.",
      "economicImportance": "Mining represents around 11% of Australia’s GDP.",
      "source": "Australian Bureau of Statistics"
    },
    "China": {
      "commodities": ["Rare Earth Elements", "Gold", "Zinc"],
      "mineCount": 134,
      "topCommodities": [
        { "name": "Rare Earth Elements", "share": "50%" },
        { "name": "Gold", "share": "30%" },
        { "name": "Zinc", "share": "20%" }
      ],
      "summary": "China dominates the global supply of rare earth elements and is a top gold and zinc producer.",
      "didYouKnow": "Over 80% of the world's rare earth refining capacity is in China.",
      "economicImportance": "Critical to global electronics and green tech supply chains.",
      "source": "USGS & Chinese Ministry of Natural Resources"
    },
    "Russia": {
      "commodities": ["Nickel", "Platinum", "Gold"],
      "mineCount": 78,
      "topCommodities": [
        { "name": "Nickel", "share": "50%" },
        { "name": "Platinum", "share": "30%" },
        { "name": "Gold", "share": "20%" }
      ],
      "summary": "Russia is one of the largest producers of nickel and platinum, with vast gold reserves.",
      "didYouKnow": "The Norilsk-Talnakh area in Siberia hosts the largest nickel reserves in the world.",
      "economicImportance": "Mining plays a strategic role in Russia’s export economy.",
      "source": "USGS & Russian Ministry of Industry"
    },
    "Brazil": {
      "commodities": ["Bauxite", "Iron Ore", "Gold"],
      "mineCount": 67,
      "topCommodities": [
        { "name": "Iron Ore", "share": "60%" },
        { "name": "Bauxite", "share": "25%" },
        { "name": "Gold", "share": "15%" }
      ],
      "summary": "Brazil is a leading exporter of iron ore and bauxite, supporting infrastructure development worldwide.",
      "didYouKnow": "The Carajás Mine in Brazil is the largest iron ore mine in the world.",
      "economicImportance": "Mining is a top contributor to Brazil’s trade surplus.",
      "source": "Brazilian Institute of Geography and Statistics"
    },
    "South Africa": {
      "commodities": ["Platinum", "Gold", "Coal"],
      "mineCount": 95,
      "topCommodities": [
        { "name": "Platinum", "share": "55%" },
        { "name": "Gold", "share": "30%" },
        { "name": "Coal", "share": "15%" }
      ],
      "summary": "South Africa is the world’s largest producer of platinum and has significant gold and coal deposits.",
      "didYouKnow": "South Africa accounts for over 70% of the world’s known platinum reserves.",
      "economicImportance": "Mining remains a key pillar of South Africa’s economy.",
      "source": "South African Department of Mineral Resources"
    },
    "India": {
      "commodities": ["Coal", "Bauxite", "Iron Ore"],
      "mineCount": 102,
      "topCommodities": [
        { "name": "Coal", "share": "70%" },
        { "name": "Iron Ore", "share": "20%" },
        { "name": "Bauxite", "share": "10%" }
      ],
      "summary": "India has abundant coal reserves and is among the top producers of iron ore and bauxite.",
      "didYouKnow": "Jharkhand and Odisha are the most mineral-rich states in India.",
      "economicImportance": "Mining supports steel, energy, and infrastructure industries across India.",
      "source": "Ministry of Mines, Government of India"
    },
    "Canada": {
      "commodities": ["Gold", "Nickel", "Zinc"],
      "mineCount": 84,
      "topCommodities": [
        { "name": "Gold", "share": "50%" },
        { "name": "Nickel", "share": "30%" },
        { "name": "Zinc", "share": "20%" }
      ],
      "summary": "Canada is a top-tier mining nation with robust gold, nickel, and zinc production.",
      "didYouKnow": "The Abitibi Greenstone Belt is one of the richest gold-producing areas in the world.",
      "economicImportance": "Mining contributes significantly to Canada’s GDP and exports.",
      "source": "Natural Resources Canada"
    },
    "Indonesia": {
      "commodities": ["Nickel", "Coal", "Bauxite"],
      "mineCount": 76,
      "topCommodities": [
        { "name": "Nickel", "share": "55%" },
        { "name": "Coal", "share": "25%" },
        { "name": "Bauxite", "share": "20%" }
      ],
      "summary": "Indonesia is the world’s largest producer of nickel and a key exporter of coal and bauxite.",
      "didYouKnow": "Nickel exports are central to Indonesia's electric vehicle battery strategy.",
      "economicImportance": "Mining is one of the largest sources of revenue for the Indonesian government.",
      "source": "Indonesian Ministry of Energy and Mineral Resources"
    }
  }
  

export default function handler(req, res) {
  const { location } = req.query;
  const data = locationData[location];

  if (!data) {
    return res.status(404).json({ error: 'Location not found' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json(data);
}
