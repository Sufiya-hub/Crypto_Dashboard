'use client';
import React, { useState } from 'react';
import { FaFireAlt } from 'react-icons/fa';
import { PiAsteriskFill } from 'react-icons/pi';
import { MdCategory } from 'react-icons/md';
import { TbApps } from 'react-icons/tb';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
import { GiRollingDices } from 'react-icons/gi';

const tabList = [
  { label: 'All', icon: <span className="text-green-600"></span> },
  { label: 'Highlights', icon: <FaFireAlt className="text-orange-500" /> },
  { label: 'Categories', icon: <MdCategory className="text-blue-500" /> },
  { label: 'Appchains', icon: <TbApps className="text-purple-500" /> },
  {
    label: 'Perpetuals',
    icon: <GiPerspectiveDiceSixFacesRandom className="text-pink-500" />,
  },
  {
    label: 'Derivatives',
    icon: <GiRollingDices className="text-yellow-500" />,
  },
];

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex gap-2 my-4">
      {tabList.map((tab, idx) => (
        <button
          key={tab.label}
          className={`flex items-center gap-1 px-3 py-1 rounded-lg border transition-all text-sm font-medium ${
            activeTab === idx
              ? 'bg-green-100 border-green-500 text-green-700'
              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => setActiveTab(idx)}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
