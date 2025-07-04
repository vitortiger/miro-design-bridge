
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Users, MousePointer, Eye, Download, Calendar, Filter } from 'lucide-react';
import { useState } from 'react';

// Mock data for charts
const monthlyData = [
  { name: 'Jan', leads: 120, clicks: 980, views: 1540 },
  { name: 'Fev', leads: 150, clicks: 1200, views: 1890 },
  { name: 'Mar', leads: 180, clicks: 1400, views: 2100 },
  { name: 'Abr', leads: 220, clicks: 1680, views: 2450 },
  { name: 'Mai', leads: 190, clicks: 1520, views: 2200 },
  { name: 'Jun', leads: 250, clicks: 1900, views: 2800 },
];

const sourceData = [
  { name: 'Google', value: 35, color: '#4285F4' },
  { name: 'Facebook', value: 25, color: '#1877F2' },
  { name: 'Instagram', value: 20, color: '#E4405F' },
  { name: 'YouTube', value: 12, color: '#FF0000' },
  { name: 'Email', value: 8, color: '#34A853' },
];

const campaignPerformance = [
  {
    id: '1',
    campaign: 'Marketing Digital 2024',
    source: 'Google',
    medium: 'CPC',
    leads: 85,
    clicks: 650,
    conversion: '13.1%',
    cost: 'R$ 1.250,00'
  },
  {
    id: '2',
    campaign: 'Social Media Push',
    source: 'Facebook',
    medium: 'Social',
    leads: 62,
    clicks: 480,
    conversion: '12.9%',
    cost: 'R$ 890,00'
  },
  {
    id: '3',
    campaign: 'Influencer Partnership',
    source: 'Instagram',
    medium: 'Social',
    leads: 45,
    clicks: 320,
    conversion: '14.1%',
    cost: 'R$ 1.500,00'
  },
  {
    id: '4',
    campaign: 'Video Tutorial Series',
    source: 'YouTube',
    medium: 'Video',
    leads: 38,
    clicks: 290,
    conversion: '13.1%',
    cost: 'R$ 750,00'
  },
  {
    id: '5',
    campaign: 'Newsletter Campaign',
    source: 'Email',
    medium: 'Email',
    leads: 28,
    clicks: 180,
    conversion: '15.6%',
    cost: 'R$ 320,00'
  }
];

const Reports = () => {
  const [periodFilter, setPeriodFilter] = useState('30d');
  const [sourceFilter, setSourceFilter] = useState('');

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 lg:ml-64">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Relatórios</h1>
            <div className="flex gap-2">
              <Select value={periodFilter} onValueChange={setPeriodFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Últimos 7 dias</SelectItem>
                  <SelectItem value="30d">Últimos 30 dias</SelectItem>
                  <SelectItem value="90d">Últimos 90 dias</SelectItem>
                  <SelectItem value="1y">Último ano</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </header>

        <main className="p-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12.5% vs mês anterior
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Cliques</CardTitle>
                <MousePointer className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8,945</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +8.2% vs mês anterior
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Visualizações</CardTitle>
                <Eye className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15,678</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +15.3% vs mês anterior
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
                <TrendingUp className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">13.8%</div>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +2.1% vs mês anterior
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Monthly Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Desempenho Mensal</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="leads" fill="#3B82F6" name="Leads" />
                    <Bar dataKey="clicks" fill="#10B981" name="Cliques" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Traffic Sources Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Fontes de Tráfego</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={sourceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {sourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Trend Line Chart */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Tendência de Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="leads" stroke="#3B82F6" strokeWidth={3} />
                  <Line type="monotone" dataKey="clicks" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Campaign Performance Table */}
          <Card>
            <CardHeader>
              <CardTitle>Desempenho por Campanha</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campanha</TableHead>
                      <TableHead>Fonte</TableHead>
                      <TableHead>Medium</TableHead>
                      <TableHead>Leads</TableHead>
                      <TableHead>Cliques</TableHead>
                      <TableHead>Conversão</TableHead>
                      <TableHead>Custo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaignPerformance.map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell className="font-medium">{campaign.campaign}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{campaign.source}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{campaign.medium}</Badge>
                        </TableCell>
                        <TableCell className="font-semibold">{campaign.leads}</TableCell>
                        <TableCell>{campaign.clicks}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={parseFloat(campaign.conversion) > 14 ? "default" : "secondary"}
                          >
                            {campaign.conversion}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-green-600 font-medium">{campaign.cost}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Reports;
