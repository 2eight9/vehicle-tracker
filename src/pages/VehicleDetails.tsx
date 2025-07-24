import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useVehicleStore } from '@/store/vehicleStore';
import { ErrorMessage } from '@/components/ErrorMessage';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Fuel, Gauge, MapPin, Clock, Navigation } from 'lucide-react';
import { format } from 'date-fns';

export function VehicleDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentVehicle, loading, error, fetchVehicleDetails, clearError } = useVehicleStore();

  useEffect(() => {
    if (id) {
      fetchVehicleDetails(parseInt(id, 10));
    }
  }, [id, fetchVehicleDetails]);

  const handleRetry = () => {
    if (id) {
      clearError();
      fetchVehicleDetails(parseInt(id, 10));
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading vehicle details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <ErrorMessage message={error} onRetry={handleRetry} />
          <Button onClick={handleBack} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Vehicle List
          </Button>
        </div>
      </div>
    );
  }

  if (!currentVehicle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Vehicle not found</p>
          <Button onClick={handleBack} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Vehicle List
          </Button>
        </div>
      </div>
    );
  }

  const vehicleName = useVehicleStore.getState().vehicles.find(v => v.id === currentVehicle.vehicleId)?.name || 'Unknown Vehicle';
  const formattedTimestamp = format(new Date(currentVehicle.timestamp), 'PPpp');
  const fuelPercentage = Math.round(currentVehicle.fuel_level);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={handleBack}
            variant="ghost"
            className="mb-4 hover:bg-white/50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Vehicle List
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Navigation className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{vehicleName}</h1>
              <p className="text-muted-foreground">Vehicle ID: {currentVehicle.vehicleId}</p>
            </div>
          </div>
        </div>

        {/* Telemetry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Speed */}
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Speed</CardTitle>
              <Gauge className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {currentVehicle.speed} km/h
              </div>
            </CardContent>
          </Card>

          {/* Fuel Level */}
          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fuel Level</CardTitle>
              <Fuel className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {fuelPercentage}%
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${fuelPercentage}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>

          {/* Odometer */}
          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Odometer</CardTitle>
              <Navigation className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {currentVehicle.odometer.toLocaleString()} km
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Location and Timestamp */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-red-500" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Latitude</p>
                  <p className="font-mono text-lg font-semibold">
                    {currentVehicle.latitude.toFixed(6)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Longitude</p>
                  <p className="font-mono text-lg font-semibold">
                    {currentVehicle.longitude.toFixed(6)}
                  </p>
                </div>
              </div>
              <Button
                className="w-full"
                onClick={() => {
                  const url = `https://www.google.com/maps?q=${currentVehicle.latitude},${currentVehicle.longitude}`;
                  window.open(url, '_blank');
                }}
              >
                <MapPin className="h-4 w-4 mr-2" />
                View on Map
              </Button>
            </CardContent>
          </Card>

          {/* Last Update */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-500" />
                Last Update
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-2xl font-bold">
                  {format(new Date(currentVehicle.timestamp), 'HH:mm')}
                </p>
                <p className="text-muted-foreground">
                  {format(new Date(currentVehicle.timestamp), 'EEEE, MMMM do, yyyy')}
                </p>
                <p className="text-sm text-muted-foreground">
                  Full timestamp: {formattedTimestamp}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}