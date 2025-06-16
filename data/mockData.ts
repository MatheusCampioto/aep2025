import { WasteBin, CollectionRoute, Citizen, Alert, Analytics } from '../types';

export const mockWasteBins: WasteBin[] = [
  {
    id: 'bin-001',
    location: {
      lat: -23.4205,
      lng: -51.9331,
      address: 'Av. Brasil, 1200',
      neighborhood: 'Centro'
    },
    fillLevel: 85,
    status: 'high',
    lastCollection: new Date('2024-01-20T06:30:00'),
    nextScheduled: new Date('2024-01-21T07:00:00'),
    sensorHealth: 'online',
    binType: 'regular',
    capacity: 240
  },
  {
    id: 'bin-002',
    location: {
      lat: -23.4180,
      lng: -51.9350,
      address: 'Rua João Cândido, 450',
      neighborhood: 'Zona 01'
    },
    fillLevel: 45,
    status: 'medium',
    lastCollection: new Date('2024-01-19T08:15:00'),
    nextScheduled: new Date('2024-01-22T08:00:00'),
    sensorHealth: 'online',
    binType: 'recycling',
    capacity: 240
  },
  {
    id: 'bin-003',
    location: {
      lat: -23.4225,
      lng: -51.9310,
      address: 'Praça Raposo Tavares, s/n',
      neighborhood: 'Centro'
    },
    fillLevel: 95,
    status: 'full',
    lastCollection: new Date('2024-01-18T07:45:00'),
    nextScheduled: new Date('2024-01-21T06:30:00'),
    sensorHealth: 'online',
    binType: 'regular',
    capacity: 240
  },
  {
    id: 'bin-004',
    location: {
      lat: -23.4150,
      lng: -51.9280,
      address: 'Av. Colombo, 2800',
      neighborhood: 'Jardim Universitário'
    },
    fillLevel: 20,
    status: 'low',
    lastCollection: new Date('2024-01-20T09:00:00'),
    nextScheduled: new Date('2024-01-23T09:30:00'),
    sensorHealth: 'online',
    binType: 'organic',
    capacity: 180
  },
  {
    id: 'bin-005',
    location: {
      lat: -23.4300,
      lng: -51.9400,
      address: 'Rua Pioneiro Afonso Pena, 1800',
      neighborhood: 'Zona 07'
    },
    fillLevel: 78,
    status: 'high',
    lastCollection: new Date('2024-01-19T10:30:00'),
    nextScheduled: new Date('2024-01-21T10:00:00'),
    sensorHealth: 'online',
    binType: 'regular',
    capacity: 240
  }
];

export const mockRoutes: CollectionRoute[] = [
  {
    id: 'route-001',
    name: 'Rota Centro',
    truckId: 'truck-001',
    driver: 'João Silva',
    bins: ['bin-001', 'bin-003'],
    estimatedDuration: 90,
    distance: 12.5,
    status: 'pending',
    co2Saved: 4.2
  },
  {
    id: 'route-002',
    name: 'Rota Norte',
    truckId: 'truck-002',
    driver: 'Maria Santos',
    bins: ['bin-002', 'bin-004'],
    estimatedDuration: 120,
    distance: 18.3,
    status: 'in-progress',
    startTime: new Date('2024-01-21T08:00:00'),
    co2Saved: 6.1
  },
  {
    id: 'route-003',
    name: 'Rota Sul',
    truckId: 'truck-003',
    driver: 'Carlos Oliveira',
    bins: ['bin-005'],
    estimatedDuration: 60,
    distance: 8.7,
    status: 'completed',
    startTime: new Date('2024-01-20T07:00:00'),
    endTime: new Date('2024-01-20T08:15:00'),
    co2Saved: 2.9
  }
];

export const mockCitizen: Citizen = {
  id: 'user-001',
  name: 'Ana Paula',
  email: 'ana.paula@email.com',
  points: 1250,
  level: 3,
  badges: ['Eco Warrior', 'Report Master', 'Green Champion'],
  reportsSubmitted: 12,
  environmentalImpact: {
    co2Reduced: 45.3,
    wasteReduced: 128.7
  }
};

export const mockAlerts: Alert[] = [
  {
    id: 'alert-001',
    type: 'overflow',
    severity: 'high',
    binId: 'bin-003',
    message: 'Lixeira na Praça Raposo Tavares está transbordando',
    timestamp: new Date('2024-01-21T09:15:00'),
    resolved: false
  },
  {
    id: 'alert-002',
    type: 'sensor_offline',
    severity: 'medium',
    binId: 'bin-007',
    message: 'Sensor da lixeira na Av. Herval perdeu conexão',
    timestamp: new Date('2024-01-21T08:30:00'),
    resolved: false
  },
  {
    id: 'alert-003',
    type: 'route_delay',
    severity: 'low',
    routeId: 'route-002',
    message: 'Rota Norte com atraso de 15 minutos devido ao trânsito',
    timestamp: new Date('2024-01-21T08:45:00'),
    resolved: true
  }
];

export const mockAnalytics: Analytics = {
  totalBins: 150,
  activeBins: 147,
  collectionEfficiency: 92.5,
  co2Reduction: 2340,
  costSaved: 18750,
  citizenReports: 89,
  averageFillTime: 72
};