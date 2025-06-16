import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Recycle } from 'lucide-react';
import { Analytics } from '../../types';

interface AnalyticsDashboardProps {
  analytics: Analytics;
}

const collectionData = [
  { name: 'Jan', collections: 1200, efficiency: 88 },
  { name: 'Fev', collections: 1350, efficiency: 92 },
  { name: 'Mar', collections: 1150, efficiency: 85 },
  { name: 'Abr', collections: 1400, efficiency: 94 },
  { name: 'Mai', collections: 1500, efficiency: 96 },
  { name: 'Jun', collections: 1420, efficiency: 93 }
];

const wasteTypeData = [
  { name: 'Orgânico', value: 45, color: '#22c55e' },
  { name: 'Reciclável', value: 30, color: '#3b82f6' },
  { name: 'Comum', value: 25, color: '#f97316' }
];

const neighborhoodData = [
  { name: 'Centro', bins: 25, efficiency: 95 },
  { name: 'Zona 01', bins: 18, efficiency: 88 },
  { name: 'Zona 02', bins: 22, efficiency: 92 },
  { name: 'Zona 03', bins: 20, efficiency: 90 },
  { name: 'Zona 04', bins: 15, efficiency: 85 },
  { name: 'Zona 05', bins: 17, efficiency: 87 }
];

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ analytics }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Eficiência da Coleta</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.collectionEfficiency}%</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                +2.5% este mês
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Recycle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">CO₂ Reduzido</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.co2Reduction}kg</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                +15% este mês
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Economia Gerada</p>
              <p className="text-2xl font-bold text-gray-900">R$ {analytics.costSaved.toLocaleString()}</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                +8% este mês
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Lixeiras Ativas</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.activeBins}/{analytics.totalBins}</p>
              <p className="text-sm text-red-600 flex items-center mt-1">
                <TrendingDown className="h-4 w-4 mr-1" />
                3 offline
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Recycle className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Tendência de Coletas</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={collectionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="collections" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Distribuição de Resíduos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={wasteTypeData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {wasteTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Eficiência por Bairro</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={neighborhoodData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="efficiency" fill="#22c55e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Insights Preditivos</h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">🔮 Previsão para Próxima Semana</h4>
              <p className="text-sm text-blue-700">
                Espera-se aumento de 15% no volume de resíduos devido ao feriado prolongado.
                Recomenda-se programar coletas extras nos dias 23 e 24.
              </p>
            </div>
            
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h4 className="font-medium text-orange-900 mb-2">⚠️ Alerta de Manutenção</h4>
              <p className="text-sm text-orange-700">
                Lixeira BIN-015 apresenta padrão irregular de enchimento.
                Verificar sensor ultrassônico na próxima manutenção.
              </p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-2">✨ Oportunidade de Otimização</h4>
              <p className="text-sm text-green-700">
                Rota Norte pode ser otimizada em 12% reorganizando a sequência de coleta.
                Economia estimada: R$ 450/mês em combustível.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Relatórios Detalhados</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <h4 className="font-medium text-gray-900 mb-2">Relatório Mensal</h4>
            <p className="text-sm text-gray-600">Performance geral do sistema</p>
            <p className="text-xs text-blue-600 mt-2">📊 Baixar PDF</p>
          </button>
          
          <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <h4 className="font-medium text-gray-900 mb-2">Análise de Custos</h4>
            <p className="text-sm text-gray-600">Breakdown de gastos operacionais</p>
            <p className="text-xs text-green-600 mt-2">💰 Baixar Excel</p>
          </button>
          
          <button className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <h4 className="font-medium text-gray-900 mb-2">Impacto Ambiental</h4>
            <p className="text-sm text-gray-600">Métricas de sustentabilidade</p>
            <p className="text-xs text-green-600 mt-2">🌱 Baixar PDF</p>
          </button>
        </div>
      </div>
    </div>
  );
};