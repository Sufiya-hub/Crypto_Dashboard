'use client';
import React, { useEffect, useState } from 'react';
import {
  FaFireAlt,
  FaArrowUp,
  FaArrowDown,
  FaStar,
  FaClock,
  FaEye,
} from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';
import { PiAsteriskFill } from 'react-icons/pi';

const Highlights = () => {
  const [unlockTimes, setUnlockTimes] = useState([]);

  // Generate random unlock times on mount
  useEffect(() => {
    const initial = Array.from({ length: 8 }).map(
      () => Math.floor(Math.random() * 864000) // up to 10 days in seconds
    );
    setUnlockTimes(initial);
  }, []);

  // Decrease countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      setUnlockTimes((prev) => prev.map((t) => (t > 0 ? t - 1 : 0)));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format helper
  const formatTime = (secs) => {
    const d = Math.floor(secs / (24 * 3600));
    const h = Math.floor((secs % (24 * 3600)) / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${d}d ${h}h ${m}m ${s}s`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
      {[
        {
          title: 'Trending Coins',
          icon: <FaFireAlt className="text-orange-500" />,
          section: 'trending',
        },
        {
          title: 'Top Gainers',
          icon: <FaArrowUp className="text-green-600" />,
          section: 'gainers',
        },
        {
          title: 'Top Losers',
          icon: <FaArrowDown className="text-red-500" />,
          section: 'losers',
        },
        {
          title: 'New Coins',
          icon: <FaStar className="text-blue-500" />,
          section: 'new',
        },
        {
          title: 'Incoming Token Unlocks',
          icon: <FaClock className="text-purple-500" />,
          section: 'unlocks',
        },
        {
          title: 'Most Viewed',
          icon: <FaEye className="text-yellow-500" />,
          section: 'viewed',
        },
      ].map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col min-h-[260px]"
        >
          <div className="flex items-center gap-2 mb-4">
            {card.icon}
            <span className="font-semibold text-base text-gray-800 tracking-tight">
              {card.title}
            </span>
          </div>
          <ul className="text-sm divide-y divide-gray-100">
            {Array.from({ length: 8 }).map((_, i) => {
              if (card.section === 'unlocks') {
                return (
                  <li
                    className="flex items-center justify-between py-2"
                    key={i}
                  >
                    <span className="flex items-center gap-2 font-medium">
                      <FaClock className="text-purple-500 text-base" /> Unlock{' '}
                      {i + 1}
                    </span>
                    <span className="tabular-nums text-gray-700 font-semibold">
                      {unlockTimes[i] !== undefined
                        ? formatTime(unlockTimes[i])
                        : 'Loading...'}
                    </span>
                  </li>
                );
              }

              // keep your original random mock data for others
              if (card.section === 'trending') {
                return (
                  <li
                    key={i}
                    className="flex items-center justify-between py-2"
                  >
                    <span className="flex items-center gap-2 font-medium">
                      <FaStar className="text-yellow-400 text-base" /> Trending{' '}
                      {i + 1}
                    </span>
                    <span className="tabular-nums text-gray-700 font-semibold">
                      ${(Math.random() * 100).toFixed(4)}
                    </span>
                    <span className="text-green-600 font-semibold">
                      {(Math.random() * 10).toFixed(2)}%
                    </span>
                  </li>
                );
              }
              if (card.section === 'gainers') {
                return (
                  <li
                    key={i}
                    className="flex items-center justify-between py-2"
                  >
                    <span className="flex items-center gap-2 font-medium">
                      <PiAsteriskFill className="text-pink-500 text-base" />{' '}
                      Gainer {i + 1}
                    </span>
                    <span className="tabular-nums text-gray-700 font-semibold">
                      ${(Math.random() * 100).toFixed(4)}
                    </span>
                    <span className="text-green-600 font-semibold">
                      +{(Math.random() * 100).toFixed(2)}%
                    </span>
                  </li>
                );
              }
              if (card.section === 'losers') {
                return (
                  <li
                    key={i}
                    className="flex items-center justify-between py-2"
                  >
                    <span className="flex items-center gap-2 font-medium">
                      <MdCategory className="text-blue-500 text-base" /> Loser{' '}
                      {i + 1}
                    </span>
                    <span className="tabular-nums text-gray-700 font-semibold">
                      ${(Math.random() * 100).toFixed(4)}
                    </span>
                    <span className="text-red-500 font-semibold">
                      -{(Math.random() * 100).toFixed(2)}%
                    </span>
                  </li>
                );
              }
              if (card.section === 'new') {
                const isUp = Math.random() > 0.5;
                return (
                  <li
                    key={i}
                    className="flex items-center justify-between py-2"
                  >
                    <span className="flex items-center gap-2 font-medium">
                      <FaStar className="text-yellow-400 text-base" /> NewCoin{' '}
                      {i + 1}
                    </span>
                    <span className="tabular-nums text-gray-700 font-semibold">
                      ${(Math.random() * 100).toFixed(4)}
                    </span>
                    <span
                      className={
                        isUp
                          ? 'text-green-600 font-semibold'
                          : 'text-red-500 font-semibold'
                      }
                    >
                      {(isUp ? '+' : '-') + (Math.random() * 10).toFixed(2)}%
                    </span>
                  </li>
                );
              }
              if (card.section === 'viewed') {
                const isUp = Math.random() > 0.5;
                return (
                  <li
                    key={i}
                    className="flex items-center justify-between py-2"
                  >
                    <span className="flex items-center gap-2 font-medium">
                      <FaEye className="text-yellow-500 text-base" /> Viewed{' '}
                      {i + 1}
                    </span>
                    <span className="tabular-nums text-gray-700 font-semibold">
                      ${(Math.random() * 100).toFixed(4)}
                    </span>
                    <span
                      className={
                        isUp
                          ? 'text-green-600 font-semibold'
                          : 'text-red-500 font-semibold'
                      }
                    >
                      {(isUp ? '+' : '-') + (Math.random() * 10).toFixed(2)}%
                    </span>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Highlights;
