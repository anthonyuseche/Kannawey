import React, { useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ContentPlanner from './components/ContentPlanner';
import IdeaGenerator from './components/IdeaGenerator';
import FanRequests from './components/FanRequests';
import KanbanBoard from './components/KanbanBoard';
import PillarsGenerator from './components/PillarsGenerator';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState('dashboard');

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'planner':
        return <ContentPlanner />;
      case 'generator':
        return <IdeaGenerator />;
      case 'requests':
        return <FanRequests />;
      case 'kanban':
        return <KanbanBoard />;
      case 'pillars':
        return <PillarsGenerator />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background font-body text-white p-4 relative overflow-hidden">
       <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10 -z-10"></div>
      <div className="relative z-10 container mx-auto">
        <Header activeView={activeView} setActiveView={setActiveView} />
        <main className="mt-8">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
};

export default App;