'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { FaRegStar } from 'react-icons/fa';

// Shadcn UI table components
import {
  Table as ShadcnTable,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [total, setTotal] = useState(0);
  const perPage = 10;

  // ✅ fetch coins with pagination
  const fetchCoins = useCallback(async (pageNum) => {
    setLoading(true);
    setError('');
    try {
      const baseUrl = 'https://api.coingecko.com/api/v3';
      const url = `${baseUrl}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${pageNum}&sparkline=true&price_change_percentage=24h,7d`;

      const res = await fetch(url);
      if (!res.ok) {
        setError(`API error ${res.status}: ${res.statusText}`);
        setCoins([]);
        setLoading(false);
        return;
      }

      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) {
        setError('No more coins available');
        setCoins([]);
        setLoading(false);
        return;
      }

      setCoins(data);
    } catch (err) {
      setError('Error fetching coins: ' + err.message);
      setCoins([]);
    }
    setLoading(false);
  }, []);

  // ✅ Fetch coins when page changes
  useEffect(() => {
    fetchCoins(page);
  }, [page, fetchCoins]);

  // ✅ Fetch total number of coins (dynamic count)
  useEffect(() => {
    async function fetchTotalCoins() {
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/coins/list');
        const data = await res.json();
        if (Array.isArray(data)) {
          setTotal(data.length);
        } else {
          setTotal(2500); // fallback
        }
      } catch (err) {
        console.error('Failed to fetch total coins:', err);
        setTotal(2500); // safe fallback
      }
    }
    fetchTotalCoins();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-2 sm:p-4 mt-6 max-w-full overflow-x-auto">
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
          {error}
        </div>
      )}

      {/* Pagination Header */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-500">
          Page {page} of {total > 0 ? Math.ceil(total / perPage) : '...'}
        </span>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 rounded border text-xs disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1 || loading}
          >
            Prev
          </button>
          <button
            className="px-3 py-1 rounded border text-xs disabled:opacity-50"
            onClick={() => setPage((p) => p + 1)}
            disabled={coins.length < perPage || loading}
          >
            Next
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <ShadcnTable className="min-w-[700px] md:min-w-[1100px] w-full table-fixed text-sm md:text-base">
          <TableCaption className="text-sm text-gray-400 pb-2">
            Live market data powered by CoinGecko
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8 text-center"></TableHead>
              <TableHead className="w-8 text-center">#</TableHead>
              <TableHead className="w-32 md:w-[25%]">Coin</TableHead>
              <TableHead className="text-right w-20 md:w-[10%]">
                Price
              </TableHead>
              <TableHead className="text-right w-14 md:w-[7%]">24h</TableHead>
              <TableHead className="text-right w-14 md:w-[7%]">7d</TableHead>
              <TableHead className="text-right w-24 md:w-[12%]">
                24h Vol
              </TableHead>
              <TableHead className="text-right w-32 md:w-[15%]">
                Market Cap
              </TableHead>
              <TableHead className="text-center w-32 md:w-[20%]">
                Last 7 Days
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {coins.map((coin, idx) => {
              const arr = coin.sparkline_in_7d?.price || [];
              let points = '';
              if (arr.length > 1) {
                const min = Math.min(...arr);
                const max = Math.max(...arr);
                points = arr
                  .map((p, i) => {
                    const x = (i / (arr.length - 1)) * 100;
                    const y = 32 - ((p - min) / (max - min || 1)) * 28 - 2;
                    return `${x.toFixed(2)},${y.toFixed(2)}`;
                  })
                  .join(' ');
              }
              const chartColor =
                coin.price_change_percentage_7d_in_currency > 0
                  ? '#22c55e'
                  : '#ef4444';

              return (
                <TableRow
                  key={`${coin.id}-${idx}`}
                  className="h-16 hover:bg-gray-50 transition text-sm"
                >
                  <TableCell className="text-center align-middle">
                    <FaRegStar className="mx-auto text-gray-400 hover:text-yellow-400 cursor-pointer" />
                  </TableCell>
                  <TableCell className="text-center align-middle font-medium text-gray-700">
                    {(page - 1) * perPage + idx + 1}
                  </TableCell>
                  <TableCell className="align-middle">
                    <div className="flex flex-wrap items-center gap-2 md:gap-3">
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="w-6 h-6 rounded-full border"
                      />
                      <div className="flex gap-1 md:gap-2 items-center">
                        <span className="font-semibold text-gray-900 leading-tight text-xs md:text-sm">
                          {coin.name}
                        </span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-wide">
                          {coin.symbol}
                        </span>
                      </div>
                      <div className="ml-auto">
                        <button className="px-2 md:px-3 py-1 bg-green-50 text-green-700 rounded font-medium text-xs border border-green-100 hover:bg-green-100 transition">
                          Buy
                        </button>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right align-middle font-mono text-gray-900 text-sm">
                    ${coin.current_price?.toLocaleString() || '-'}
                  </TableCell>
                  <TableCell
                    className={`text-right align-middle font-semibold text-sm ${
                      coin.price_change_percentage_24h > 0
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {coin.price_change_percentage_24h?.toFixed(2) ?? '0.00'}%
                  </TableCell>
                  <TableCell
                    className={`text-right align-middle font-semibold text-sm ${
                      coin.price_change_percentage_7d_in_currency > 0
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {coin.price_change_percentage_7d_in_currency?.toFixed(2) ??
                      '0.00'}
                    %
                  </TableCell>
                  <TableCell className="text-right align-middle font-mono text-gray-700 text-sm">
                    ${coin.total_volume?.toLocaleString() || '-'}
                  </TableCell>
                  <TableCell className="text-right align-middle font-mono text-gray-700 text-sm">
                    ${coin.market_cap?.toLocaleString() || '-'}
                  </TableCell>
                  <TableCell className="flex ">
                    {points ? (
                      <div className="flex items-center ml-14">
                        <svg width="100" height="32" viewBox="0 0 100 32">
                          <polyline
                            fill="none"
                            stroke={chartColor}
                            strokeWidth="2"
                            points={points}
                          />
                        </svg>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-[11px]">-</span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
            {loading && (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-4 text-sm">
                  Loading coins...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </ShadcnTable>
      </div>
    </div>
  );
};

export default CoinsTable;
