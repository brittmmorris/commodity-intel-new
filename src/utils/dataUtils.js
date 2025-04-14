// utils/dataUtils.js
export const fetchCommodityData = async (commodity, year = '2024') => {
  const res = await fetch(`/api/commodity-data?symbol=${commodity}&year=${year}`);
  return await res.json();
};

  
export const fetchLocationData = async (location, year = '2024') => {
  const res = await fetch(`/api/location-data?location=${location}&year=${year}`);
  return await res.json();
};
  
  export const fetchMiningSites = async () => {
    const res = await fetch('/miningSites.json');
    return await res.json();
  };
  
  export const fetchCommodityPrice = async (commodity, range = '5d') => {
    if (!commodity) return 'N/A';
  
    try {
      const res = await fetch(`/api/price?symbol=${commodity}&range=${range}`);
      const data = await res.json();
      return data?.price
        ? {
            current: `$${data.price} ${data.unit}`,
            previous: `$${data.previous} ${data.unit}`,
            change: `${data.change >= 0 ? '+' : ''}$${data.change} (${data.changePct}%)`,
            isPositive: data.change >= 0,
            history: data.history || []
          }
        : 'N/A';
    } catch (err) {
      console.error('Error fetching price:', err);
      return 'N/A';
    }
  };
  
  export const fetchCommodityUses = async (commodity) => {
    const res = await fetch(`/api/commodity-uses?symbol=${commodity}`);
    const data = await res.json();
    return data;
  };

  export const fetchCommodityNews = async (commodity) => {
    const res = await fetch(`/api/commodity-news?symbol=${commodity}`);
    const data = await res.json();
    return data;
  };
  
  export const fetchLocationSummary = async (location) => {
    const res = await fetch(`/api/location-summary?location=${location}`);
    const data = await res.json();
    return data;
  };
  
  export const fetchCommodityFacts = async (commodity) => {
    const res = await fetch(`/api/commodity-facts?symbol=${commodity}`);
    const data = await res.json();
    return data;
  };
  
  export const fetchCommodityHistory = async (commodity) => {
    const res = await fetch(`/api/commodity-history?symbol=${commodity}`);
    return await res.json();
  };
  
  export async function fetchLocationHistory(location) {
    const res = await fetch(`/api/location-history?location=${location}`);
    if (!res.ok) throw new Error('Failed to fetch location trend data');
    return res.json();
  }

  export async function fetchLocationNews(location) {
    const res = await fetch(`/api/location-news?location=${location}`);
    if (!res.ok) throw new Error('Failed to fetch location news');
    return res.json();
  }
  
  