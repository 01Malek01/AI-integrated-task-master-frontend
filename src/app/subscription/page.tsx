'use client';

import React from 'react';
import Prices from '@/app/components/Prices';

export default function SubscriptionPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-light)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[var(--color-text)] sm:text-4xl">
            Choose Your Plan
          </h1>
          <p className="mt-4 text-lg text-[var(--color-text-light)] max-w-2xl mx-auto">
            Select the plan that works best for you and your team
          </p>
        </div>
        <Prices />
      </div>
    </div>
  );
}
