import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const CryptoTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllCoins() {
      setLoading(true);
      let allCoins = [];
      let page = 1;
      const perPage = 250; // API limit

      try {
        while (true) {
          const res = await fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false`
          );

          if (!res.ok) {
            console.error(
              `API error on page ${page}:`,
              res.status,
              res.statusText
            );
            break;
          }

          const data = await res.json();
          if (data.length === 0) break; // no more pages
          allCoins = [...allCoins, ...data];
          page++;
        }
        setCoins(allCoins);
      } catch (e) {
        console.error('Fetch failed:', e);
      }
      setLoading(false);
    }

    fetchAllCoins();
  }, []);

  return (
    <div className="rounded-lg border p-4">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Coin</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Market Cap</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coins.map((coin, idx) => (
              <TableRow key={coin.id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <img src={coin.image} alt={coin.name} className="w-5 h-5" />
                  {coin.name} ({coin.symbol.toUpperCase()})
                </TableCell>
                <TableCell className="text-right">
                  ${coin.current_price.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  ${coin.market_cap.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default CryptoTable;
