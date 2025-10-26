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
      <span className="hidden md:inline">{label}</span>
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
    <header className="relative overflow-hidden backdrop-blur-lg p-4 rounded-xl shadow-2xl sticky top-4 z-50 animate-fade-in border border-white/10">
      {/* Video Background & Overlay */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-20"
      >
        {/* 
          ============================================================
          === ADD YOUR VIDEO SOURCE HERE (e.g., /video.mp4)        ===
          ============================================================
        */}
        {/* <source src="/your-video.mp4" type="video/mp4" /> */}
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-background/70 -z-10"></div>
      
      {/* Header Content */}
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center relative gap-4 sm:gap-0">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-500 rounded-full"></div>
          <h1 className="text-lg sm:text-xl font-black tracking-wider text-white font-title text-center sm:text-left">KANNAWEY - Sistema de Gestión</h1>
        </div>
        <nav className="flex items-center flex-wrap justify-center gap-1 bg-background/60 p-1 rounded-lg">
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