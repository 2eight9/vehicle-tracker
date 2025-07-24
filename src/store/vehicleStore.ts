import { create } from 'zustand';
import { VehicleStore } from '@/types/vehicle';
import { apiService } from '@/services/api';

export const useVehicleStore = create<VehicleStore>((set, get) => ({
  vehicles: [],
  currentVehicle: null,
  loading: false,
  error: null,

  fetchVehicles: async () => {
    set({ loading: true, error: null });
    try {
      const vehicles = await apiService.getVehicles();
      set({ vehicles, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch vehicles',
        loading: false 
      });
    }
  },

  fetchVehicleDetails: async (id: number) => {
    set({ loading: true, error: null, currentVehicle: null });
    try {
      const vehicleDetails = await apiService.getVehicleDetails(id);
      set({ currentVehicle: vehicleDetails, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch vehicle details',
        loading: false 
      });
    }
  },

  clearError: () => set({ error: null })
}));