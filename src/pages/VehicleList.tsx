import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVehicleStore } from '@/store/vehicleStore';
import { VehicleCard } from '@/components/VehicleCard';
import { VehicleCardSkeleton } from '@/components/VehicleCardSkeleton';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Car, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function VehicleList() {
  const navigate = useNavigate();
  const { vehicles, loading, error, fetchVehicles, clearError } = useVehicleStore();

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const handleViewDetails = (id: number) => {
    navigate(`/vehicles/${id}`);
  };

  const handleRetry = () => {
    clearError();
    fetchVehicles();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Car className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Vehicle Tracker</h1>
                <p className="text-muted-foreground">Monitor your fleet in real-time</p>
              </div>
            </div>
            <Button
              onClick={handleRetry}
              variant="outline"
              size="sm"
              disabled={loading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Content */}
        {error ? (
          <div className="flex justify-center py-12">
            <ErrorMessage message={error} onRetry={handleRetry} />
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Vehicles</p>
                    <p className="text-2xl font-bold text-foreground">
                      {loading ? '...' : vehicles.length}
                    </p>
                  </div>
                  <Car className="h-8 w-8 text-primary/60" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active</p>
                    <p className="text-2xl font-bold text-green-600">
                      {loading ? '...' : vehicles.filter(v => v.status === 'ACTIVE').length}
                    </p>
                  </div>
                  <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Inactive</p>
                    <p className="text-2xl font-bold text-gray-600">
                      {loading ? '...' : vehicles.filter(v => v.status === 'INACTIVE').length}
                    </p>
                  </div>
                  <div className="h-3 w-3 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Vehicle Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {loading
                ? Array.from({ length: 8 }).map((_, index) => (
                    <VehicleCardSkeleton key={index} />
                  ))
                : vehicles.map((vehicle) => (
                    <VehicleCard
                      key={vehicle.id}
                      vehicle={vehicle}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
            </div>

            {!loading && vehicles.length === 0 && (
              <div className="text-center py-12">
                <Car className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No vehicles found</h3>
                <p className="text-muted-foreground">Try refreshing the page or check back later.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}