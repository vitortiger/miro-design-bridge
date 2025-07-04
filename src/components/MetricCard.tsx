
import { Card } from '@/components/ui/card';

interface MetricCardProps {
  title: string;
  value: string | number;
  className?: string;
  dark?: boolean;
}

export default function MetricCard({ title, value, className = '', dark = false }: MetricCardProps) {
  return (
    <Card className={`p-6 bg-white ${className}`}>
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-600">
          {title}
        </p>
        <p className="text-3xl font-bold text-blue-600">
          {value}
        </p>
      </div>
    </Card>
  );
}
