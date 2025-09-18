'use client';
import React, { useState } from 'react';

import Header from '../components/Header';
import Tabs from '../components/tabs';
import Highlights from '../components/Highlights';
import Table from '../components/Table';

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="py-4 md:px-6 lg:px-8 max-w-screen-xl w-full mx-auto flex flex-col gap-4">
      <Header />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 1 ? <Highlights /> : <Table activeTab={activeTab} />}
    </div>
  );
}
