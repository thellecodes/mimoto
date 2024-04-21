import React, { useState } from 'react';
import Dashboard from '../components/Dashboard';
import NumberOverview from '../components/NumberOverview';
import TokenDropdown from '@/components/TokenDropdown';
import TransactionList from '@/components/TransactionList';

export default function HomePage() {
  return (
    <div className="container-fluid">
      <Dashboard title="Dashboard" />
      <NumberOverview />
      <div className="bg-white rounded-2xl my-3 p-6 mt-16">
        <h1 className="text-xl font-semibold mb-4">Recent Transactions</h1>
          <div className="flex space-x-2">
            <TokenDropdown text="Tokens"/>
            <TokenDropdown text="More"/>
          </div>
          <TransactionList />
      </div>
    </div>
  );
}
