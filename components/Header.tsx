import React from 'react';
import { DashboardIcon, CalendarIcon, LightbulbIcon, UsersIcon, KanbanIcon, PillarsIcon } from './IconComponents';

interface HeaderProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const NavItem: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 text-sm font-medium ${
        isActive
          ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white shadow-lg'
          : 'text-muted hover:bg-surface hover:text-white'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ activeView, setActiveView }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon className="h-5 w-5" /> },
    { id: 'planner', label: 'Planificador', icon: <CalendarIcon className="h-5 w-5" /> },
    { id: 'kanban', label: 'Tareas', icon: <KanbanIcon className="h-5 w-5" /> },
    { id: 'pillars', label: 'Pilares', icon: <PillarsIcon className="h-5 w-5" /> },
    { id: 'generator', label: 'Generador IA', icon: <LightbulbIcon className="h-5 w-5" /> },
    { id: 'requests', label: 'Peticiones Fans', icon: <UsersIcon className="h-5 w-5" /> },
  ];

  return (
    <header className="bg-surface/50 backdrop-blur-lg p-4 rounded-xl shadow-2xl sticky top-4 z-50 animate-fade-in border border-white/10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-500 rounded-full"></div>
          <h1 className="text-xl font-black tracking-wider text-white font-title">KANNAWEY - Sistema de Gestión</h1>
        </div>
        <nav className="flex items-center space-x-1 bg-background/60 p-1 rounded-lg">
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              label={item.label}
              icon={item.icon}
              isActive={activeView === item.id}
              onClick={() => setActiveView(item.id)}
            />
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;