import React from 'react';
export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
        <p className="text-sm text-slate-500 mt-1">Deep dive traffic data and metrics.</p>
      </header>
      <div className="p-16 text-center border-2 border-dashed border-slate-200 rounded-xl text-slate-500 text-sm">
         Analytics dashboard will be available once sufficient data is collected.
      </div>
    </div>
  );
}
