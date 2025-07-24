import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { VehicleStatusBadge } from './VehicleStatusBadge';
import { Vehicle } from '@/types/vehicle';
import { Clock, Gauge } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface VehicleCardProps {
  vehicle: Vehicle;
  onViewDetails: (id: number) => void;
}

export function VehicleCard({ vehicle, onViewDetails }: VehicleCardProps) {
  const lastUpdated = formatDistanceToNow(new Date(vehicle.updated_at), { addSuffix: true });

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary/20 hover:border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">
            {vehicle.name}
          </CardTitle>
          <VehicleStatusBadge status={vehicle.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Gauge className="h-4 w-4" />
            <span>Speed:</span>
          </div>
          <span className="font-medium text-foreground">
            {vehicle.speed} km/h
          </span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Updated:</span>
          </div>
          <span className="font-medium text-foreground">
            {lastUpdated}
          </span>
        </div>
        
        <Button 
          onClick={() => onViewDetails(vehicle.id)}
          className="w-full mt-4 bg-primary hover:bg-primary/90"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}