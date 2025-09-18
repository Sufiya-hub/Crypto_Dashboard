// Utility to fetch data from CoinGecko API
export async function fetchCryptoData(endpoint) {
  const res = await fetch(`https://api.coingecko.com/api/v3/${endpoint}`);
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}
