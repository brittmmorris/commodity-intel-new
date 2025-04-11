// utils/dataUtils.js
export const fetchCommodityData = async (commodity) => {
  const res = await fetch(`/api/commodity-summary?symbol=${commodity}`);
  const data = await res.json();

  return {
    summary: `In ${data.year}, global ${data.commodity.toLowerCase()} production was ${data.globalProductionTotal}. Top producers: ${data.topProducers.map(p => `${p.country} (${p.production})`).join(', ')}.`,
    source: data.source
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
  
  export const fetchCommodityPrice = async (commodity) => {
    if (!commodity) return 'N/A';
  
    try {
      const res = await fetch(`/api/price?symbol=${commodity}`);
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
  
  