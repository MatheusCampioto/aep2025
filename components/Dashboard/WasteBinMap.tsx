import React from 'react';
import { MapPin, Trash2, Recycle, Leaf } from 'lucide-react';
import { WasteBin } from '../../types';

interface WasteBinMapProps {
  bins: WasteBin[];
  selectedBin?: string;
  onBinSelect: (binId: string) => void;
}

const getBinStatusColor = (status: WasteBin['status']) => {
  switch (status) {
    case 'empty':
    case 'low':
      return 'text-green-600 bg-green-100';
    case 'medium':
      return 'text-yellow-600 bg-yellow-100';
    case 'high':
      return 'text-orange-600 bg-orange-100';
    case 'full':
    case 'overflow':
      return 'text-red-600 bg-red-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

const getBinIcon = (binType: WasteBin['binType']) => {
  switch (binType) {
    case 'recycling':
      return Recycle;
    case 'organic':
      return Leaf;
    default:
      return Trash2;
  }
};

export const WasteBinMap: React.FC<WasteBinMapProps> = ({
  bins,
  selectedBin,
  onBinSelect
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Mapa de Lixeiras</h3>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span>Normal</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <span>Médio</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
            <span>Alto</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <span>Cheio</span>
          </div>
        </div>
      </div>


      <div className="relative bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-8 min-h-[400px] border-2 border-dashed border-gray-200">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          <div className="text-center">
            <MapPin className="h-12 w-12 mx-auto mb-2" />
            <p className="text-sm">Mapa Interativo de Maringá</p>
            <p className="text-xs mt-1">Integração com Google Maps / OpenStreetMap</p>
          </div>
        </div>
        <div className="relative grid grid-cols-4 gap-4 h-full">
          {bins.map((bin, index) => {
            const BinIcon = getBinIcon(bin.binType);
            return (
              <div
                key={bin.id}
                className={`absolute cursor-pointer transform transition-all hover:scale-110 ${
                  selectedBin === bin.id ? 'scale-110 z-10' : ''
                }`}
                style={{
                  left: `${20 + (index * 15)}%`,
                  top: `${30 + ((index % 3) * 20)}%`
                }}
                onClick={() => onBinSelect(bin.id)}
              >
                <div className={`p-2 rounded-full ${getBinStatusColor(bin.status)} shadow-lg border-2 border-white`}>
                  <BinIcon className="h-4 w-4" />
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs whitespace-nowrap">
                  {bin.fillLevel}%
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedBin && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          {(() => {
            const bin = bins.find(b => b.id === selectedBin);
            if (!bin) return null;
            
            return (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Detalhes da Lixeira</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Endereço:</p>
                    <p className="font-medium">{bin.location.address}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Bairro:</p>
                    <p className="font-medium">{bin.location.neighborhood}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Nível de Enchimento:</p>
                    <p className="font-medium">{bin.fillLevel}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Última Coleta:</p>
                    <p className="font-medium">{bin.lastCollection.toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};