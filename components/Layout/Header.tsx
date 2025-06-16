import React from 'react';
import { Recycle, Bell, User, Settings } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-600 rounded-lg">
                <Recycle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">EcoMaringá</h1>
                <p className="text-xs text-gray-500">Sistema Inteligente de Resíduos</p>
              </div>
            </div>
          </div>

          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => onViewChange('dashboard')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'dashboard'
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => onViewChange('routes')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'routes'
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Rotas
            </button>
            <button
              onClick={() => onViewChange('citizen')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'citizen'
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Portal Cidadão
            </button>
            <button
              onClick={() => onViewChange('analytics')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'analytics'
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Análise
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-500 transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-500 transition-colors">
              <Settings className="h-5 w-5" />
            </button>
            <button className="flex items-center space-x-2 p-2 text-gray-400 hover:text-gray-500 transition-colors">
              <User className="h-5 w-5" />
              <span className="text-sm font-medium">Admin</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};