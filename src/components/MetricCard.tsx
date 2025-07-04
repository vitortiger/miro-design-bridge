
import { Card } from '@/components/ui/card';

interface MetricCardProps {
  title: string;
  value: string | number;
  className?: string;
  dark?: boolean;
}

export default function MetricCard({ title, value, className = '', dark = false }: MetricCardProps) {
  return (
    <Card className={`p-6 ${dark ? 'bg-gray-800 text-white' : 'bg-white'} ${className}`}>
      <div className="space-y-2">
        <p className={`text-sm font-medium ${dark ? 'text-gray-300' : 'text-gray-600'}`}>
          {title}
        </p>
        <p className={`text-3xl font-bold ${dark ? 'text-blue-400' : 'text-blue-600'}`}>
          {value}
        </p>
      </div>
    </Card>
  );
}
