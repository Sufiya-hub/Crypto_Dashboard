import React, { useEffect, useState } from 'react';
import { FaCaretUp } from 'react-icons/fa6';

const Card = () => {
  const [marketCap, setMarketCap] = useState(null);
  const [change, setChange] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/global');
        const data = await res.json();
        setMarketCap(data.data.total_market_cap.usd);
        setChange(data.data.market_cap_change_percentage_24h_usd);
      } catch (e) {
        setMarketCap(null);
        setChange(null);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-2 border-2 rounded-2xl p-4">
      <div className="flex flex-col gap-1.5">
        <h1 className="font-semibold text-xl">
          {marketCap !== null ? `$${marketCap.toLocaleString()}` : 'Loading...'}
        </h1>
        <h1>
          Market Cap{' '}
          <span className={change > 0 ? 'text-green-600' : 'text-red-600'}>
            {change !== null ? `${change.toFixed(2)}%` : ''}
          </span>
        </h1>
      </div>
      <div></div>
    </div>
  );
};

export default Card;
