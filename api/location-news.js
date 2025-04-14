const locationNews = {
        "Chile": {
          "articles": [
            {
              "title": "Chile Expands Lithium Production in Atacama",
              "link": "https://example.com/chile-lithium",
              "date": "2024-03-15"
            },
            {
              "title": "Copper Mining in Chile Sees Record Output",
              "link": "https://example.com/chile-copper",
              "date": "2024-01-10"
            }
          ],
          "source": "Mining Journal 2024"
        },
        "Ohio": {
          "articles": [
            {
              "title": "Ohio Coal Plants Undergo Safety Audits",
              "link": "https://example.com/ohio-coal",
              "date": "2024-02-18"
            },
            {
              "title": "Salt Mining in Lake Erie Gets Tech Upgrade",
              "link": "https://example.com/ohio-salt",
              "date": "2024-01-05"
            }
          ],
          "source": "Ohio Mining Review"
        },
        "Australia": {
          "articles": [
            {
              "title": "Australia Doubles Down on Iron Ore Exports",
              "link": "https://example.com/aus-iron",
              "date": "2024-02-22"
            },
            {
              "title": "Bauxite Mining Expands in Northern Territory",
              "link": "https://example.com/aus-bauxite",
              "date": "2024-01-30"
            }
          ],
          "source": "Australian Resources News"
        },
        "China": {
          "articles": [
            {
              "title": "China Pushes for Rare Earth Supply Chain Control",
              "link": "https://example.com/china-rare-earth",
              "date": "2024-03-01"
            },
            {
              "title": "Gold Production Sees Modest Growth in 2024",
              "link": "https://example.com/china-gold",
              "date": "2024-02-12"
            }
          ],
          "source": "China Mining Update"
        },
        "Russia": {
          "articles": [
            {
              "title": "Russia Eyes Expansion in Platinum Mining",
              "link": "https://example.com/russia-platinum",
              "date": "2024-03-03"
            },
            {
              "title": "Nickel Output Climbs Amid Western Sanctions",
              "link": "https://example.com/russia-nickel",
              "date": "2024-01-28"
            }
          ],
          "source": "Russia Metals & Mining"
        },
        "Peru": {
          "articles": [
            {
              "title": "Peru Strengthens Environmental Rules for Copper",
              "link": "https://example.com/peru-copper-esg",
              "date": "2024-03-08"
            },
            {
              "title": "Community Tensions Rise Near New Zinc Projects",
              "link": "https://example.com/peru-zinc",
              "date": "2024-01-18"
            }
          ],
          "source": "Peruvian Mining News"
        },
        "Canada": {
          "articles": [
            {
              "title": "Canada Funds Research in Sustainable Nickel Mining",
              "link": "https://example.com/canada-nickel",
              "date": "2024-02-14"
            },
            {
              "title": "New ESG Guidelines for Gold Miners in Ontario",
              "link": "https://example.com/canada-gold-esg",
              "date": "2024-01-20"
            }
          ],
          "source": "Canadian Mining Chronicle"
        },
        "South Africa": {
          "articles": [
            {
              "title": "Labor Disputes Impact Platinum Mines",
              "link": "https://example.com/sa-platinum-labor",
              "date": "2024-02-07"
            },
            {
              "title": "South Africa Boosts Mining Safety Protocols",
              "link": "https://example.com/sa-mining-safety",
              "date": "2024-01-14"
            }
          ],
          "source": "SA Mining Weekly"
        },
        "Brazil": {
          "articles": [
            {
              "title": "Brazil Bauxite Output Hits New High",
              "link": "https://example.com/brazil-bauxite",
              "date": "2024-03-05"
            },
            {
              "title": "Mining Regulation Reforms in Brazil Underway",
              "link": "https://example.com/brazil-reforms",
              "date": "2024-01-12"
            }
          ],
          "source": "Brazil Mining Observer"
        },
        "India": {
          "articles": [
            {
              "title": "India Increases Coal Production to Meet Energy Demand",
              "link": "https://example.com/india-coal",
              "date": "2024-02-25"
            },
            {
              "title": "Zinc Industry in Rajasthan Gets Government Boost",
              "link": "https://example.com/india-zinc",
              "date": "2024-01-17"
            }
          ],
          "source": "India Mining Times"
        }
      }
      
  
  export default function handler(req, res) {
    const { location } = req.query;
    const data = locationNews[location];
  
    if (!data) {
      return res.status(404).json({ error: 'News not found for this location' });
    }
  
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(data);
  }
  