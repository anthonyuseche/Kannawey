import React from 'react';
import { MOCK_FAN_REQUESTS } from '../constants';
import { FanRequest, FanRequestStatus } from '../types';

const getStatusColor = (status: FanRequestStatus) => {
    switch (status) {
        case FanRequestStatus.Completed:
            return 'bg-green-500/20 text-green-400';
        case FanRequestStatus.InProgress:
            return 'bg-yellow-500/20 text-yellow-400';
        case FanRequestStatus.Pending:
        default:
            return 'bg-gray-500/20 text-gray-400';
    }
}

const FanRequests: React.FC = () => {
    return (
        <div className="p-4 md:p-8 animate-fade-in">
            <h2 className="text-3xl font-black font-title mb-6 text-center">Base de Datos de Peticiones</h2>
            <div className="max-w-5xl mx-auto bg-surface rounded-xl shadow-lg border border-white/10 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5">
                        <tr>
                            <th className="p-4 font-semibold font-title text-secondary">Petición</th>
                            <th className="p-4 font-semibold font-title text-secondary">Fan</th>
                            <th className="p-4 font-semibold font-title text-secondary">Plataforma</th>
                            <th className="p-4 font-semibold font-title text-secondary">Fecha</th>
                            <th className="p-4 font-semibold font-title text-secondary">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MOCK_FAN_REQUESTS.map((req, index) => (
                            <tr key={req.id} className={`border-t border-white/10 ${index % 2 === 0 ? 'bg-transparent' : 'bg-white/5'} animate-slide-in-up`} style={{ animationDelay: `${index * 50}ms`}}>
                                <td className="p-4 font-medium text-white">{req.request}</td>
                                <td className="p-4 text-muted">{req.fanName}</td>
                                <td className="p-4 text-muted">{req.platform}</td>
                                <td className="p-4 text-muted">{req.date.toLocaleDateString()}</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(req.status)}`}>
                                        {req.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FanRequests;