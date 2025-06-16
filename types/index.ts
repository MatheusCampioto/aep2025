export interface WasteBin {
  id: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    neighborhood: string;
  };
  fillLevel: number; 
  status: 'empty' | 'low' | 'medium' | 'high' | 'full' | 'overflow';
  lastCollection: Date;
  nextScheduled: Date;
  sensorHealth: 'online' | 'offline' | 'maintenance';
  binType: 'regular' | 'recycling' | 'organic';
  capacity: number; 
}

export interface CollectionRoute {
  id: string;
  name: string;
  truckId: string;
  driver: string;
  bins: string[];
  estimatedDuration: number; 
  distance: number; 
  status: 'pending' | 'in-progress' | 'completed';
  startTime?: Date;
  endTime?: Date;
  co2Saved: number;
}

export interface Citizen {
  id: string;
  name: string;
  email: string;
  points: number;
  level: number;
  badges: string[];
  reportsSubmitted: number;
  environmentalImpact: {
    co2Reduced: number;
    wasteReduced: number;
  };
}

export interface Alert {
  id: string;
  type: 'overflow' | 'maintenance' | 'route_delay' | 'sensor_offline';
  severity: 'low' | 'medium' | 'high' | 'critical';
  binId?: string;
  routeId?: string;
  message: string;
  timestamp: Date;
  resolved: boolean;
}

export interface Analytics {
  totalBins: number;
  activeBins: number;
  collectionEfficiency: number;
  co2Reduction: number;
  costSaved: number;
  citizenReports: number;
  averageFillTime: number;
}