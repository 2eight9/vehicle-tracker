import { Vehicle, VehicleTelemetry } from '@/types/vehicle';

const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API URL

class ApiService {
  private async fetchWithErrorHandling<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch data: ${error.message}`);
      }
      throw new Error('An unexpected error occurred');
    }
  }

  async getVehicles(): Promise<Vehicle[]> {
    // For demo purposes, return mock data
    // Replace this with actual API call: return this.fetchWithErrorHandling<Vehicle[]>(`${API_BASE_URL}/vehicles`);
    
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    
    return [
      {
        id: 1,
        name: "Toyota Avanza",
        status: "ACTIVE",
        speed: 60,
        updated_at: "2025-01-23T10:00:00Z"
      },
      {
        id: 2,
        name: "Honda Civic",
        status: "ACTIVE",
        speed: 45,
        updated_at: "2025-01-23T09:45:00Z"
      },
      {
        id: 3,
        name: "Ford Transit",
        status: "INACTIVE",
        speed: 0,
        updated_at: "2025-01-23T08:30:00Z"
      },
      {
        id: 4,
        name: "BMW X5",
        status: "ACTIVE",
        speed: 80,
        updated_at: "2025-01-23T10:15:00Z"
      }
    ];
  }

  async getVehicleDetails(id: number): Promise<VehicleTelemetry> {
    // For demo purposes, return mock data
    // Replace this with actual API call: return this.fetchWithErrorHandling<VehicleTelemetry>(`${API_BASE_URL}/vehicles/${id}`);
    
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
    
    const mockData: Record<number, VehicleTelemetry> = {
      1: {
        vehicleId: 1,
        odometer: 123456.78,
        fuel_level: 70.2,
        timestamp: "2025-01-23T10:00:00Z",
        latitude: -6.12,
        longitude: 106.85,
        speed: 60
      },
      2: {
        vehicleId: 2,
        odometer: 89234.50,
        fuel_level: 45.8,
        timestamp: "2025-01-23T09:45:00Z",
        latitude: -6.15,
        longitude: 106.88,
        speed: 45
      },
      3: {
        vehicleId: 3,
        odometer: 234567.90,
        fuel_level: 25.0,
        timestamp: "2025-01-23T08:30:00Z",
        latitude: -6.18,
        longitude: 106.82,
        speed: 0
      },
      4: {
        vehicleId: 4,
        odometer: 56789.12,
        fuel_level: 85.5,
        timestamp: "2025-01-23T10:15:00Z",
        latitude: -6.10,
        longitude: 106.90,
        speed: 80
      }
    };

    const data = mockData[id];
    if (!data) {
      throw new Error(`Vehicle with ID ${id} not found`);
    }
    
    return data;
  }
}

export const apiService = new ApiService();