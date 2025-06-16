import React from 'react';
import { AlertTriangle, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Alert } from '../../types';

interface AlertPanelProps {
  alerts: Alert[];
  onResolveAlert: (alertId: string) => void;
}

const getSeverityColor = (severity: Alert['severity']) => {
  switch (severity) {
    case 'critical':
      return 'bg-red-50 border-red-200 text-red-800';
    case 'high':
      return 'bg-orange-50 border-orange-200 text-orange-800';
    case 'medium':
      return 'bg-yellow-50 border-yellow-200 text-yellow-800';
    case 'low':
      return 'bg-blue-50 border-blue-200 text-blue-800';
    default:
      return 'bg-gray-50 border-gray-200 text-gray-800';
  }
};

const getSeverityIcon = (severity: Alert['severity']) => {
  switch (severity) {
    case 'critical':
    case 'high':
      return AlertTriangle;
    case 'medium':
      return Clock;
    case 'low':
      return CheckCircle;
    default:
      return XCircle;
  }
};

export const AlertPanel: React.FC<AlertPanelProps> = ({ alerts, onResolveAlert }) => {
  const activeAlerts = alerts.filter(alert => !alert.resolved);
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Alertas Ativos</h3>
        <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
          {activeAlerts.length} ativos
        </span>
      </div>

      <div className="space-y-4">
        {activeAlerts.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
            <p className="text-gray-500">Nenhum alerta ativo</p>
          </div>
        ) : (
          activeAlerts.map((alert) => {
            const SeverityIcon = getSeverityIcon(alert.severity);
            
            return (
              <div
                key={alert.id}
                className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)} transition-all hover:shadow-md`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <SeverityIcon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{alert.message}</p>
                      <p className="text-xs mt-1 opacity-75">
                        {alert.timestamp.toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => onResolveAlert(alert.id)}
                    className="ml-4 bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded text-xs font-medium transition-colors"
                  >
                    Resolver
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {alerts.filter(alert => alert.resolved).length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Alertas Resolvidos Recentemente</h4>
          <div className="space-y-2">
            {alerts.filter(alert => alert.resolved).slice(0, 3).map((alert) => (
              <div key={alert.id} className="flex items-center space-x-3 text-sm text-gray-500">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="flex-1">{alert.message}</span>
                <span className="text-xs">{alert.timestamp.toLocaleDateString('pt-BR')}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};