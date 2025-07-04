
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan 15', entrances: 200, exits: 50 },
  { name: 'Feb 15', entrances: 300, exits: 80 },
  { name: 'Mar 21', entrances: 400, exits: 120 },
  { name: 'Apr 21', entrances: 600, exits: 100 },
  { name: 'May 31', entrances: 700, exits: 150 },
  { name: 'Jun 21', entrances: 900, exits: 180 },
  { name: 'Jul 1', entrances: 1000, exits: 200 },
];

const multiLineData = [
  { name: 'Jan 15', line1: 150, line2: 80, line3: 60 },
  { name: 'Feb 15', line1: 200, line2: 100, line3: 50 },
  { name: 'Mar 21', line1: 250, line2: 120, line3: 70 },
  { name: 'Apr 15', line1: 300, line2: 150, line3: 90 },
  { name: 'May 31', line1: 200, line2: 180, line3: 110 },
  { name: 'Jun 15', line1: 250, line2: 200, line3: 130 },
  { name: 'Jul 21', line1: 350, line2: 160, line3: 100 },
  { name: 'Aug 15', line1: 280, line2: 140, line3: 120 },
];

interface AnalyticsChartProps {
  type?: 'single' | 'multi';
  dateRange?: string;
}

export default function AnalyticsChart({ type = 'single', dateRange = 'Jan 15, 2023 -- Jul 1, 2023' }: AnalyticsChartProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{dateRange}</h3>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'single' ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#666' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#666' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="entrances" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          ) : (
            <LineChart data={multiLineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#666' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#666' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="line1" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="line2" 
                stroke="#ef4444" 
                strokeWidth={2}
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="line3" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
      
      {type === 'multi' && (
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Entradas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Saídas</span>
          </div>
        </div>
      )}
    </div>
  );
}
