// utils/dataUtils.js
export const fetchCommodityData = async (commodity) => {
    const res = await fetch(`/${commodity.toLowerCase()}Data.json`);
    const data = await res.json();
    return {
      summary: `In ${data.year}, global ${data.commodity.toLowerCase()} production was ${data.globalProductionTotal}. Top producers: ${data.topProducers.map(p => `${p.country} (${p.production})`).join(', ')}.`
    };
  };
  
  export const fetchLocationData = async (location) => {
    const res = await fetch('/locationsData.json');
    const data = await res.json();
    return {
      summary: `${location} has the following known commodities: ${data[location].join(', ')}`
    };
  };
  
  export const fetchMiningSites = async () => {
    const res = await fetch('/miningSites.json');
    return await res.json();
  };
  
  export const fetchCommodityPrice = async (symbol) => {
    if (!symbol) return 'N/A';
  
    try {
      const res = await fetch(`https://commodity-intel.vercel.app/api/price?symbol=${symbol}`);
      const data = await res.json();
      return data?.price ? `$${data.price} ${data.unit}` : 'N/A';
    } catch (err) {
      console.error('Error fetching price:', err);
      return 'N/A';
    }
  };
  