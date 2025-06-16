import React from 'react';
import { 
  Award, 
  Leaf, 
  Star, 
  TrendingUp, 
  MessageSquare, 
  Gift,
  Target,
  Calendar
} from 'lucide-react';
import { Citizen } from '../../types';

interface CitizenPortalProps {
  citizen: Citizen;
  onSubmitReport: () => void;
}

export const CitizenPortal: React.FC<CitizenPortalProps> = ({ citizen, onSubmitReport }) => {
  const nextLevelPoints = (citizen.level + 1) * 500;
  const progressPercentage = (citizen.points % 500) / 500 * 100;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Olá, {citizen.name}! 👋</h2>
            <p className="text-green-100">Você está fazendo a diferença para Maringá!</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{citizen.points}</div>
            <div className="text-green-100">EcoPoints</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Award className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Nível {citizen.level}</h3>
            <p className="text-sm text-gray-500 mb-4">Eco Warrior</p>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progresso</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {nextLevelPoints - citizen.points} pontos para o próximo nível
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Conquistas</h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {citizen.badges.map((badge, index) => (
                  <span 
                    key={index}
                    className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full"
                  >
                    🏆 {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Leaf className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Impacto Ambiental</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm text-green-700 font-medium">CO₂ Reduzido</p>
                <p className="text-2xl font-bold text-green-900">
                  {citizen.environmentalImpact.co2Reduced}kg
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm text-blue-700 font-medium">Resíduos Reduzidos</p>
                <p className="text-2xl font-bold text-blue-900">
                  {citizen.environmentalImpact.wasteReduced}kg
                </p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
            
            <div className="p-3 bg-purple-50 rounded-lg text-center">
              <p className="text-sm text-purple-700 font-medium mb-1">Relatórios Enviados</p>
              <p className="text-2xl font-bold text-purple-900">{citizen.reportsSubmitted}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
          
          <div className="space-y-3">
            <button
              onClick={onSubmitReport}
              className="w-full flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left"
            >
              <MessageSquare className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-900">Relatar Problema</p>
                <p className="text-sm text-blue-600">+50 EcoPoints</p>
              </div>
            </button>
            
            <button className="w-full flex items-center space-x-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left">
              <Calendar className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-900">Agendar Coleta</p>
                <p className="text-sm text-green-600">+25 EcoPoints</p>
              </div>
            </button>
            
            <button className="w-full flex items-center space-x-3 p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors text-left">
              <Gift className="h-5 w-5 text-orange-600" />
              <div>
                <p className="font-medium text-orange-900">Resgatar Recompensas</p>
                <p className="text-sm text-orange-600">{citizen.points} pontos disponíveis</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividade Recente</h3>
        
        <div className="space-y-4">
          {[
            { 
              action: 'Relatório enviado: Lixeira transbordando na Av. Brasil', 
              points: '+50', 
              time: '2 horas atrás',
              icon: MessageSquare,
              color: 'blue'
            },
            { 
              action: 'Conquista desbloqueada: Eco Champion', 
              points: '+100', 
              time: '1 dia atrás',
              icon: Award,
              color: 'yellow'
            },
            { 
              action: 'Descarte correto confirmado', 
              points: '+25', 
              time: '2 dias atrás',
              icon: Leaf,
              color: 'green'
            }
          ].map((activity, index) => (
            <div key={index} className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className={`p-2 rounded-lg ${
                activity.color === 'blue' ? 'bg-blue-100' :
                activity.color === 'yellow' ? 'bg-yellow-100' :
                'bg-green-100'
              }`}>
                <activity.icon className={`h-4 w-4 ${
                  activity.color === 'blue' ? 'text-blue-600' :
                  activity.color === 'yellow' ? 'text-yellow-600' :
                  'text-green-600'
                }`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
              <span className="text-sm font-medium text-green-600">{activity.points}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};