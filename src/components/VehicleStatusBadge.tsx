import { Badge } from '@/components/ui/badge';
import { Circle } from 'lucide-react';

interface VehicleStatusBadgeProps {
  status: 'ACTIVE' | 'INACTIVE';
}

export function VehicleStatusBadge({ status }: VehicleStatusBadgeProps) {
  const isActive = status === 'ACTIVE';
  
  return (
    <Badge
      variant={isActive ? 'default' : 'secondary'}
      className={`flex items-center gap-1 ${
        isActive ? 'bg-green-100 text-green-800 border-green-200' : 'bg-gray-100 text-gray-600 border-gray-200'
      }`}
    >
      <Circle className={`h-2 w-2 ${isActive ? 'fill-green-500 text-green-500' : 'fill-gray-400 text-gray-400'}`} />
      {status}
    </Badge>
  );
}