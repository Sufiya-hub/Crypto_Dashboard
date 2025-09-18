'use client';
import React, { useState } from 'react';
import { SwitchDemo } from './SwitchDemo';
import Card from './Card';
import Card1 from './Card1';
import Trend from './Trend';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [hide, setHide] = useState(true);
  const [trends, setTrends] = useState(false);

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Top section with title + switch */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4">
        {/* Title + description */}
        <div className="flex flex-col gap-3 max-w-3xl">
          <h1 className="font-bold text-2xl md:text-3xl">
            Cryptocurrency Prices by Market Cap
          </h1>

          <div className="text-gray-700 text-sm md:text-base leading-relaxed">
            <p>
              The global cryptocurrency market cap today is{' '}
              <span className="font-semibold">$4.2 Trillion</span>, a
              <span className="text-green-500 font-medium"> 1.4% </span>
              change in the last 24 hours.{' '}
              <button
                onClick={() => setHide(!hide)}
                className="font-medium underline hover:text-green-600 ml-1 transition"
              >
                {hide ? 'Read more' : 'Hide'}
              </button>
            </p>

            {/* ✅ Smooth animated transition */}
            <AnimatePresence>
              {!hide && (
                <motion.p
                  className="mt-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  Total cryptocurrency trading volume in the last day is at{' '}
                  <span className="font-semibold">$211 Billion</span>. Bitcoin
                  dominance is at <span className="font-semibold">55.6%</span>{' '}
                  and Ethereum dominance is at{' '}
                  <span className="font-semibold">13.2%</span>. CoinGecko is now
                  tracking{' '}
                  <span className="font-semibold">18,813 cryptocurrencies</span>
                  . The largest gainers in the industry right now are{' '}
                  <span className="font-semibold">Appchains</span> and{' '}
                  <span className="font-semibold">XRP Ledger Ecosystem</span>{' '}
                  cryptocurrencies.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right side switch */}
        <div className="flex-shrink-0">
          <SwitchDemo checked={trends} onCheckedChange={setTrends} />
        </div>
      </div>

      {/* ✅ Bottom section visible only when switch is ON */}
      <AnimatePresence>
        {trends && (
          <motion.div
            className="flex flex-col md:flex-row gap-6 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {/* Sidebar cards */}
            <div className="flex flex-col gap-4 w-full md:w-1/4">
              <Card />
              <Card1 />
            </div>

            {/* Trending */}
            <div className="flex-1">
              <Trend />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
