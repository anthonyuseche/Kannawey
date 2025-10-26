import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { MOCK_ANALYTICS } from '../constants';

const COLORS = ['#db2777', '#00E0FF', '#FFD700', '#32CD32'];

const ChartCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-surface p-6 rounded-xl shadow-lg border border-white/10 animate-slide-in-up">
        <h3 className="text-lg font-bold text-white font-title mb-4">{title}</h3>
        {children} // Forzar actualización
    </div>
);

const Dashboard: React.FC = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [followerData, setFollowerData] = useState(MOCK_ANALYTICS.followerGrowth);
    const [engagementData, setEngagementData] = useState(MOCK_ANALYTICS.engagementByPlatform);
    const [distributionData, setDistributionData] = useState(MOCK_ANALYTICS.contentTypeDistribution);
    
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleFollowerChange = (index: number, value: string) => {
        const newValue = parseInt(value, 10);
        if (isNaN(newValue)) return;
        const newData = [...followerData];
        newData[index] = { ...newData[index], Kannawey: newValue };
        setFollowerData(newData);
    };

    const handleEngagementChange = (index: number, value: string) => {
        const newValue = parseInt(value, 10);
        if (isNaN(newValue)) return;
        const newData = [...engagementData];
        newData[index] = { ...newData[index], engagement: newValue };
        setEngagementData(newData);
    };

    const handleDistributionChange = (index: number, value: string) => {
        const newValue = parseInt(value, 10);
        if (isNaN(newValue)) return;
        const newData = [...distributionData];
        newData[index] = { ...newData[index], value: newValue };
        setDistributionData(newData);
    };


    if(!isMounted) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 md:p-8">
      <ChartCard title="Crecimiento de Seguidores">
        <div className="h-72 w-full">
            <ResponsiveContainer>
              <LineChart data={followerData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="#A0AEC0" />
                <YAxis stroke="#A0AEC0" />
                <Tooltip contentStyle={{ backgroundColor: '#1A1442', border: '1px solid #db2777' }} />
                <Legend />
                <Line type="monotone" dataKey="Kannawey" stroke="#00E0FF" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
        </div>
        <div className="mt-6">
            <h4 className="font-semibold text-sm text-secondary mb-2">Editar Datos</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {followerData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center gap-2 bg-background/50 p-2 rounded">
                        <label htmlFor={`follower-${index}`} className="text-xs text-muted flex-1">{entry.name}</label>
                        <input
                            type="number"
                            id={`follower-${index}`}
                            value={entry.Kannawey}
                            onChange={(e) => handleFollowerChange(index, e.target.value)}
                            className="w-20 bg-background border border-pink-500/50 rounded px-2 py-1 text-sm text-white focus:ring-1 focus:ring-secondary focus:outline-none"
                        />
                    </div>
                ))}
            </div>
        </div>
      </ChartCard>

      <ChartCard title="Engagement por Plataforma">
        <div className="h-72 w-full">
            <ResponsiveContainer>
              <BarChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="#A0AEC0" />
                <YAxis stroke="#A0AEC0" />
                <Tooltip contentStyle={{ backgroundColor: '#1A1442', border: '1px solid #db2777' }} />
                <Legend />
                <Bar dataKey="engagement" fill="#db2777" />
              </BarChart>
            </ResponsiveContainer>
        </div>
        <div className="mt-6">
            <h4 className="font-semibold text-sm text-secondary mb-2">Editar Datos</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {engagementData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center gap-2 bg-background/50 p-2 rounded">
                        <label htmlFor={`engagement-${index}`} className="text-xs text-muted flex-1">{entry.name}</label>
                        <input
                            type="number"
                            id={`engagement-${index}`}
                            value={entry.engagement}
                            onChange={(e) => handleEngagementChange(index, e.target.value)}
                            className="w-24 bg-background border border-pink-500/50 rounded px-2 py-1 text-sm text-white focus:ring-1 focus:ring-secondary focus:outline-none"
                        />
                    </div>
                ))}
            </div>
        </div>
      </ChartCard>

      <div className="lg:col-span-2">
        <ChartCard title="Distribución de Tipos de Contenido">
            <div className="h-72 w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${((Number(percent) || 0) * 100).toFixed(0)}%`}
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1A1442', border: '1px solid #db2777' }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
             <div className="mt-6">
                <h4 className="font-semibold text-sm text-secondary mb-2">Editar Datos (%)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                    {distributionData.map((entry, index) => (
                        <div key={entry.name} className="flex items-center gap-2 bg-background/50 p-2 rounded">
                            <label htmlFor={`dist-${index}`} className="text-xs text-muted flex-1">{entry.name}</label>
                            <input
                                type="number"
                                id={`dist-${index}`}
                                value={entry.value}
                                onChange={(e) => handleDistributionChange(index, e.target.value)}
                                className="w-20 bg-background border border-pink-500/50 rounded px-2 py-1 text-sm text-white focus:ring-1 focus:ring-secondary focus:outline-none"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </ChartCard>
      </div>
    </div>
  );
};

export default Dashboard;