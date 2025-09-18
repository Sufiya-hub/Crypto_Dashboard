'use client';
import React, { useEffect, useState } from 'react';
import { FaFireAlt } from 'react-icons/fa';
import { PiAsteriskFill } from 'react-icons/pi';

const BASE_URL = process.env.NEXT_PUBLIC_COINGECKO_BASE_URL;
const API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;

const Trend = () => {
  const [trending, setTrending] = useState([]);
  const [gainers, setGainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // 1. Get Bitcoin price (for BTC → USD conversion)
        const btcRes = await fetch(
          `${BASE_URL}/simple/price?ids=bitcoin&vs_currencies=usd&x_cg_demo_api_key=${API_KEY}`
        );
        const btcData = await btcRes.json();
        const btcPrice = btcData.bitcoin.usd;

        // 2. Trending coins
        const trendingRes = await fetch(
          `${BASE_URL}/search/trending?x_cg_demo_api_key=${API_KEY}`
        );
        const trendingData = await trendingRes.json();
        const trendingCoins = trendingData.coins.map((c) => ({
          id: c.item.id,
          name: c.item.name,
          symbol: c.item.symbol,
          price_usd: c.item.price_btc ? c.item.price_btc * btcPrice : null,
          market_cap_rank: c.item.market_cap_rank,
          score: c.item.score,
        }));
        setTrending(trendingCoins.slice(0, 3)); // show top 5

        // 3. Top gainers (from markets endpoint)
        const gainersRes = await fetch(
          `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&x_cg_demo_api_key=${API_KEY}`
        );
        const gainersData = await gainersRes.json();
        const sorted = gainersData.sort(
          (a, b) =>
            b.price_change_percentage_24h - a.price_change_percentage_24h
        );
        setGainers(sorted.slice(0, 3)); // show top 5
      } catch (e) {
        console.error('Error fetching data:', e);
        setTrending([]);
        setGainers([]);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      {/* Trending */}
      <div className="border-2 rounded-2xl p-4 flex-1 overflow-x-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <FaFireAlt className="text-orange-500" />
            <span className="font-semibold">Trending</span>
          </div>
          <a
            href="https://www.coingecko.com/en/trending"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:underline"
          >
            View more →
          </a>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">#</th>
                <th className="text-left p-2">Coin</th>
                <th className="text-left p-2">Price (USD)</th>
                <th className="text-left p-2">Rank</th>
              </tr>
            </thead>
            <tbody>
              {trending.map((coin, idx) => (
                <tr key={coin.id} className="border-b">
                  <td className="p-2">{idx + 1}</td>
                  <td className="p-2">
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </td>
                  <td className="p-2">
                    {coin.price_usd ? `$${coin.price_usd.toFixed(4)}` : 'N/A'}
                  </td>
                  <td className="p-2">{coin.market_cap_rank ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Top Gainers */}
      <div className="border-2 rounded-2xl p-4 flex-1 overflow-x-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <PiAsteriskFill className="text-pink-500" />
            <span className="font-semibold">Top Gainers</span>
          </div>
          <a
            href="https://www.coingecko.com/en/gainers-losers"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:underline"
          >
            View more →
          </a>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">#</th>
                <th className="text-left p-2">Coin</th>
                <th className="text-left p-2">Price (USD)</th>
                <th className="text-left p-2">24h Change</th>
              </tr>
            </thead>
            <tbody>
              {gainers.map((coin, idx) => (
                <tr key={coin.id} className="border-b">
                  <td className="p-2">{idx + 1}</td>
                  <td className="p-2">
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </td>
                  <td className="p-2">
                    ${coin.current_price.toLocaleString()}
                  </td>
                  <td className="p-2 text-green-600 font-semibold">
                    +{coin.price_change_percentage_24h.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Trend;
