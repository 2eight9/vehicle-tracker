export interface Vehicle {
  id: number;
  name: string;
  status: 'ACTIVE' | 'INACTIVE';
  speed: number;
  updated_at: string;
}

export interface VehicleTelemetry {
  vehicleId: number;
  odometer: number;
  fuel_level: number;
  timestamp: string;
  latitude: number;
  longitude: number;
  speed: number;
}

export interface VehicleStore {
  vehicles: Vehicle[];
  currentVehicle: VehicleTelemetry | null;
  loading: boolean;
  error: string | null;
  fetchVehicles: () => Promise<void>;
  fetchVehicleDetails: (id: number) => Promise<void>;
  clearError: () => void;
}