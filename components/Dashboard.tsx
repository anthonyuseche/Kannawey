import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { MOCK_ANALYTICS } from '../constants';

const COLORS = ['#db2777', '#00E0FF', '#FFD700', '#32CD32'];

const ChartCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-surface p-6 rounded-xl shadow-lg border border-white/10 animate-slide-in-up">
        <h3 className="text-lg font-bold text-white font-title mb-4">{title}</h3>
        <div className="h-72 w-full">
            {children}
        </div>
    </div>
);

const Dashboard: React.FC = () => {
    // Add a simple trick to re-trigger animation on component mount
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 md:p-8">
      <ChartCard title="Crecimiento de Seguidores">
        <ResponsiveContainer>
          <LineChart data={MOCK_ANALYTICS.followerGrowth} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="#A0AEC0" />
            <YAxis stroke="#A0AEC0" />
            <Tooltip contentStyle={{ backgroundColor: '#1A1442', border: '1px solid #db2777' }} />
            <Legend />
            <Line type="monotone" dataKey="Kannawey" stroke="#00E0FF" strokeWidth={2} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Engagement por Plataforma">
        <ResponsiveContainer>
          <BarChart data={MOCK_ANALYTICS.engagementByPlatform}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="#A0AEC0" />
            <YAxis stroke="#A0AEC0" />
            <Tooltip contentStyle={{ backgroundColor: '#1A1442', border: '1px solid #db2777' }} />
            <Legend />
            <Bar dataKey="engagement" fill="#db2777" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="lg:col-span-2">
        <ChartCard title="Distribución de Tipos de Contenido">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={MOCK_ANALYTICS.contentTypeDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                // FIX: The `percent` prop from recharts can be undefined, causing a TypeScript error. Defaulting to 0 prevents this.
                label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
              >
                {MOCK_ANALYTICS.contentTypeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1A1442', border: '1px solid #db2777' }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};

export default Dashboard;