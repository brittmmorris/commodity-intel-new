const newsData = {
    "Copper": {
      "articles": [
        { "title": "Chile Expands ESG Mining Regulations for Copper", "url": "#", "date": "2025-04-09" },
        { "title": "Global Demand for “Green Copper” Surges", "url": "#", "date": "2025-04-06" },
        { "title": "Copper’s Role in Clean Energy Transition", "url": "#", "date": "2025-04-02" }
      ],
      "source": "Green Energy News Network"
    },
    "Gold": {
      "articles": [
        { "title": "Gold Mining Faces New Environmental Oversight in Peru", "url": "#", "date": "2025-04-02" },
        { "title": "Investors Shift to Ethical Gold Funds", "url": "#", "date": "2025-04-02" },
        { "title": "Gold’s ESG Risks Remain High in 2024", "url": "#", "date": "2025-04-02" }
      ],
      "source": "Sustainable Mining Weekly"
    },
    "Lithium": {
      "articles": [
        { "title": "Lithium Mining in South America Under Water Use Scrutiny", "url": "#", "date": "2025-04-08" },
        { "title": "Battery Manufacturers Seek Low-Impact Lithium Sources", "url": "#", "date": "2025-04-03" },
        { "title": "Australia Invests in Responsible Lithium Extraction", "url": "#", "date": "2025-03-30" }
      ],
      "source": "Battery & Sustainability Review"
    },
    "Iron Ore": {
      "articles": [
        { "title": "Carbon-Neutral Steel Sparks Cleaner Iron Ore Mining", "url": "#", "date": "2025-04-05" },
        { "title": "Brazilian Iron Ore Mines Boost Biodiversity Initiatives", "url": "#", "date": "2025-04-04" },
        { "title": "ESG Ratings Impact Iron Ore Market Outlook", "url": "#", "date": "2025-04-01" }
      ],
      "source": "Global Steel & Ore Insights"
    },
    "Coal": {
      "articles": [
        { "title": "Global Coal Miners Face Tighter Emissions Rules", "url": "#", "date": "2025-04-07" },
        { "title": "Coal Phase-Out Plans Accelerate in Europe", "url": "#", "date": "2025-04-03" },
        { "title": "Debate Over 'Clean Coal' Heats Up in Policy Circles", "url": "#", "date": "2025-04-01" }
      ],
      "source": "Energy & Emissions Journal"
    },
    "Bauxite": {
      "articles": [
        { "title": "Guinea Focuses on Sustainable Bauxite Exports", "url": "#", "date": "2025-04-06" },
        { "title": "Aluminum Producers Push for Traceable Bauxite Supply", "url": "#", "date": "2025-04-03" },
        { "title": "Bauxite Mining Linked to Local Deforestation Concerns", "url": "#", "date": "2025-03-31" }
      ],
      "source": "Mining Sustainability Digest"
    },
    "Nickel": {
      "articles": [
        { "title": "Indonesia Nickel Boom Faces ESG Backlash", "url": "#", "date": "2025-04-05" },
        { "title": "Tesla Seeks Cleaner Nickel for Battery Supply Chain", "url": "#", "date": "2025-04-04" },
        { "title": "Nickel Mines Introduce Carbon Offset Programs", "url": "#", "date": "2025-03-30" }
      ],
      "source": "EV Materials Weekly"
    },
    "Zinc": {
      "articles": [
        { "title": "Zinc Refiners Adopt Water Recycling Standards", "url": "#", "date": "2025-04-04" },
        { "title": "Zinc’s Role in Solar Panel Durability Raises Demand", "url": "#", "date": "2025-04-03" },
        { "title": "Environmental Groups Monitor Zinc Runoff Regulations", "url": "#", "date": "2025-04-01" }
      ],
      "source": "Green Metals Report"
    },
    "Platinum": {
      "articles": [
        { "title": "South Africa Tightens ESG Rules on Platinum Miners", "url": "#", "date": "2025-04-02" },
        { "title": "Platinum's Role in Hydrogen Fuel Gains Attention", "url": "#", "date": "2025-03-31" },
        { "title": "Ethical Sourcing of Platinum in High Demand", "url": "#", "date": "2025-03-29" }
      ],
      "source": "Clean Energy Metals Monitor"
    },
    "Rare Earth Elements": {
      "articles": [
        { "title": "US and EU Seek Diversified Rare Earth Supply Chains", "url": "#", "date": "2025-04-06" },
        { "title": "China Enhances ESG Practices in REE Mining", "url": "#", "date": "2025-04-04" },
        { "title": "REE Recycling Projects Gain Momentum", "url": "#", "date": "2025-04-01" }
      ],
      "source": "Critical Minerals Brief"
    }
  }
  

export default function handler(req, res) {
  const { symbol } = req.query;
  const data = newsData[symbol];

  if (!data) {
    return res.status(404).json({ error: 'No ESG news found' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json(data);
}
