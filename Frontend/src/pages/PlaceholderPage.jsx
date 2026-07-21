import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';

const PlaceholderPage = ({ title }) => {
  return (
    <DashboardLayout>
      <div className="p-8 bg-slate-50 min-h-screen">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">{title}</h1>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-slate-600">This module is currently under development or waiting for full UI implementation.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PlaceholderPage;
