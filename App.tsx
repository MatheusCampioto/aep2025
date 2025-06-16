import React, { useState } from 'react';
import { Header } from './components/Layout/Header';
import { StatsCard } from './components/Dashboard/StatsCard';
import { WasteBinMap } from './components/Dashboard/WasteBinMap';
import { AlertPanel } from './components/Dashboard/AlertPanel';
import { RouteOptimizer } from './components/Routes/RouteOptimizer';
import { CitizenPortal } from './components/Citizen/CitizenPortal';
import { AnalyticsDashboard } from './components/Analytics/AnalyticsDashboard';
import {
  mockWasteBins,
  mockRoutes,
  mockCitizen,
  mockAlerts,
  mockAnalytics
} from './data/mockData';
import {
  Trash2,
  TrendingUp,
  Truck,
  Users,
  DollarSign
} from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedBin, setSelectedBin] = useState<string>('');
  const [alerts, setAlerts] = useState(mockAlerts);
  const [routes, setRoutes] = useState(mockRoutes);

  const handleResolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert =>
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ));
  };

  const handleUpdateRoute = (routeId: string, status: any) => {
    setRoutes(prev => prev.map(route =>
      route.id === routeId ? {
        ...route,
        status,
        startTime: status === 'in-progress' && !route.startTime ? new Date() : route.startTime,
        endTime: status === 'completed' ? new Date() : route.endTime
      } : route
    ));
  };

  const handleSubmitReport = () => {
    alert('Relatório enviado com sucesso! +50 EcoPoints adicionados.');
  };

  const handleManualNotification = () => {
    if (!selectedBin) {
      alert('Selecione uma lixeira no mapa para notificar.');
    } else {
      const bin = mockWasteBins.find(b => b.id === selectedBin);
      alert(`Notificação enviada manualmente para a lixeira localizada em: ${bin?.location.address}`);
    }
  };

  const renderMainContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <StatsCard
                title="Lixeiras Ativas"
                value={`${mockAnalytics.activeBins}/${mockAnalytics.totalBins}`}
                change="+2 esta semana"
                trend="up"
                icon={Trash2}
                color="green"
              />
              <StatsCard
                title="Eficiência"
                value={`${mockAnalytics.collectionEfficiency}%`}
                change="+2.5% este mês"
                trend="up"
                icon={TrendingUp}
                color="blue"
              />
              <StatsCard
                title="Rotas Ativas"
                value={routes.filter(r => r.status === 'in-progress').length}
                change="2 em andamento"
                trend="neutral"
                icon={Truck}
                color="orange"
              />
              <StatsCard
                title="Relatórios Cidadãos"
                value={mockAnalytics.citizenReports}
                change="+12 hoje"
                trend="up"
                icon={Users}
                color="purple"
              />
              <StatsCard
                title="Economia Gerada"
                value={`R$ ${(mockAnalytics.costSaved / 1000).toFixed(0)}k`}
                change="+R$ 2.1k este mês"
                trend="up"
                icon={DollarSign}
                color="green"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <WasteBinMap
                  bins={mockWasteBins}
                  selectedBin={selectedBin}
                  onBinSelect={setSelectedBin}
                />
              </div>

              <div className="space-y-4">
                <AlertPanel
                  alerts={alerts}
                  onResolveAlert={handleResolveAlert}
                />

                <button
                  onClick={handleManualNotification}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Notificar Coleta Manual
                </button>
              </div>
            </div>
          </div>
        );

      case 'routes':
        return (
          <RouteOptimizer
            routes={routes}
            onUpdateRoute={handleUpdateRoute}
          />
        );

      case 'citizen':
        return (
          <CitizenPortal
            citizen={mockCitizen}
            onSubmitReport={handleSubmitReport}
          />
        );

      case 'analytics':
        return (
          <AnalyticsDashboard analytics={mockAnalytics} />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderMainContent()}
      </main>
    </div>
  );
}

export default App;