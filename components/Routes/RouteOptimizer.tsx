import React from 'react';
import { Truck, Clock, MapPin, Fuel, CheckCircle, Play, Pause } from 'lucide-react';
import { CollectionRoute } from '../../types';

interface RouteOptimizerProps {
  routes: CollectionRoute[];
  onUpdateRoute: (routeId: string, status: CollectionRoute['status']) => void;
}

const getStatusColor = (status: CollectionRoute['status']) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'in-progress':
      return 'bg-blue-100 text-blue-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: CollectionRoute['status']) => {
  switch (status) {
    case 'completed':
      return CheckCircle;
    case 'in-progress':
      return Pause;
    case 'pending':
      return Play;
    default:
      return Clock;
  }
};

export const RouteOptimizer: React.FC<RouteOptimizerProps> = ({ routes, onUpdateRoute }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Otimizador de Rotas</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Truck className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-600 font-medium">Total de Rotas</p>
                <p className="text-2xl font-bold text-blue-900">{routes.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-green-600 font-medium">Concluídas</p>
                <p className="text-2xl font-bold text-green-900">
                  {routes.filter(r => r.status === 'completed').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-500 rounded-lg">
                <Fuel className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-orange-600 font-medium">CO₂ Economizado</p>
                <p className="text-2xl font-bold text-orange-900">
                  {routes.reduce((acc, route) => acc + route.co2Saved, 0).toFixed(1)}kg
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {routes.map((route) => {
          const StatusIcon = getStatusIcon(route.status);
          
          return (
            <div key={route.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h4 className="text-lg font-semibold text-gray-900">{route.name}</h4>
                    <span className={`px-2.5 py-0.5 rounded-full text-sm font-medium ${getStatusColor(route.status)}`}>
                      {route.status === 'completed' ? 'Concluída' : 
                       route.status === 'in-progress' ? 'Em Andamento' : 'Pendente'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Truck className="h-4 w-4" />
                      <span>{route.driver}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{route.estimatedDuration} min</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{route.distance} km</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Fuel className="h-4 w-4" />
                      <span>{route.co2Saved}kg CO₂</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>Lixeiras: {route.bins.length}</span>
                    <span>•</span>
                    <span>Caminhão: {route.truckId}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  {route.status === 'pending' && (
                    <button
                      onClick={() => onUpdateRoute(route.id, 'in-progress')}
                      className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <Play className="h-4 w-4" />
                      <span>Iniciar</span>
                    </button>
                  )}
                  {route.status === 'in-progress' && (
                    <button
                      onClick={() => onUpdateRoute(route.id, 'completed')}
                      className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>Finalizar</span>
                    </button>
                  )}
                  <StatusIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              {(route.startTime || route.endTime) && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    {route.startTime && (
                      <div>
                        <span className="font-medium">Início: </span>
                        <span>{route.startTime.toLocaleString('pt-BR')}</span>
                      </div>
                    )}
                    {route.endTime && (
                      <div>
                        <span className="font-medium">Fim: </span>
                        <span>{route.endTime.toLocaleString('pt-BR')}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};