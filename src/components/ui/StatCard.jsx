import React from 'react';

export default function StatCard({ title, value, icon, className = '' }) {
    return (
        <div className={`bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center ${className}`}>
            {icon && <div className="text-4xl mx-auto mb-2">{icon}</div>}
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{title}</h3>
            <p className="text-4xl font-bold text-gray-900">{value}</p>
        </div>
    );
}
