
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Users, MousePointer, Eye, Download } from 'lucide-react';
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

// UTM Data converted to table format
const utmSourceData = [
  { name: 'Google', leads: 145, percentage: '39.2%' },
  { name: 'Facebook', leads: 89, percentage: '24.1%' },
  { name: 'Instagram', leads: 67, percentage: '18.1%' },
  { name: 'YouTube', leads: 42, percentage: '11.4%' },
  { name: 'Email', leads: 28, percentage: '7.6%' },
];

const utmCampaignData = [
  { name: 'Black Friday', leads: 120, percentage: '34.4%' },
  { name: 'Natal Premium', leads: 89, percentage: '25.5%' },
  { name: 'Ano Novo VIP', leads: 67, percentage: '19.2%' },
  { name: 'Verão 2024', leads: 45, percentage: '12.9%' },
  { name: 'Promoção Especial', leads: 32, percentage: '9.2%' },
];

const utmMediumData = [
  { name: 'CPC', leads: 156, percentage: '43.5%' },
  { name: 'Social', leads: 89, percentage: '24.9%' },
  { name: 'Email', leads: 67, percentage: '18.7%' },
  { name: 'Organic', leads: 45, percentage: '12.6%' },
];

const utmContentData = [
  { name: 'Banner Principal', leads: 78, percentage: '28.5%' },
  { name: 'Texto Promocional', leads: 65, percentage: '23.7%' },
  { name: 'Vídeo Demonstrativo', leads: 52, percentage: '19.0%' },
  { name: 'Carousel de Imagens', leads: 43, percentage: '15.7%' },
  { name: 'Story Interativo', leads: 35, percentage: '12.8%' },
];

const utmTermData = [
  { name: 'Comprar Online', leads: 45, percentage: '26.8%' },
  { name: 'Melhor Preço', leads: 38, percentage: '22.6%' },
  { name: 'Desconto Especial', leads: 32, percentage: '19.0%' },
  { name: 'Oferta Limitada', leads: 28, percentage: '16.7%' },
  { name: 'Grátis Hoje', leads: 25, percentage: '14.9%' },
];

const Reports = () => {
  const [periodFilter, setPeriodFilter] = useState('30d');
  const [sourceFilter, setSourceFilter] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex w-full">
        <Sidebar />
        
        <div className="flex-1 w-full lg:ml-0">
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="px-4 lg:px-6 py-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 ml-12 lg:ml-0">Relatórios</h1>
                <div className="flex flex-col sm:flex-row gap-2 ml-12 lg:ml-0">
                  <Select value={periodFilter} onValueChange={setPeriodFilter}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue placeholder="Período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7d">Últimos 7 dias</SelectItem>
                      <SelectItem value="30d">Últimos 30 dias</SelectItem>
                      <SelectItem value="90d">Últimos 90 dias</SelectItem>
                      <SelectItem value="1y">Último ano</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="w-full sm:w-auto">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </div>
            </div>
          </header>

          <main className="p-4 lg:p-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
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

            {/* UTM Analytics Section */}
            <div className="mb-6 lg:mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Análise UTM</h2>
              
              {/* UTM Source and Medium Tables */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base lg:text-lg">Leads por UTM Source</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Fonte</TableHead>
                          <TableHead className="text-right">Leads</TableHead>
                          <TableHead className="text-right">Porcentagem</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {utmSourceData.map((item) => (
                          <TableRow key={item.name}>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell className="text-right">{item.leads}</TableCell>
                            <TableCell className="text-right">{item.percentage}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base lg:text-lg">Leads por UTM Medium</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Mídia</TableHead>
                          <TableHead className="text-right">Leads</TableHead>
                          <TableHead className="text-right">Porcentagem</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {utmMediumData.map((item) => (
                          <TableRow key={item.name}>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell className="text-right">{item.leads}</TableCell>
                            <TableCell className="text-right">{item.percentage}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              {/* UTM Campaign and Content Tables */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base lg:text-lg">Leads por UTM Campaign</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Campanha</TableHead>
                          <TableHead className="text-right">Leads</TableHead>
                          <TableHead className="text-right">Porcentagem</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {utmCampaignData.map((item) => (
                          <TableRow key={item.name}>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell className="text-right">{item.leads}</TableCell>
                            <TableCell className="text-right">{item.percentage}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base lg:text-lg">Leads por UTM Content</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Conteúdo</TableHead>
                          <TableHead className="text-right">Leads</TableHead>
                          <TableHead className="text-right">Porcentagem</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {utmContentData.map((item) => (
                          <TableRow key={item.name}>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell className="text-right">{item.leads}</TableCell>
                            <TableCell className="text-right">{item.percentage}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              {/* UTM Term Table */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-base lg:text-lg">Leads por UTM Term</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Termo</TableHead>
                        <TableHead className="text-right">Leads</TableHead>
                        <TableHead className="text-right">Porcentagem</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {utmTermData.map((item) => (
                        <TableRow key={item.name}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell className="text-right">{item.leads}</TableCell>
                          <TableCell className="text-right">{item.percentage}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            {/* Original Charts Section */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8">
              {/* Monthly Performance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base lg:text-lg">Desempenho Mensal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
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
                  </div>
                </CardContent>
              </Card>

              {/* Traffic Sources Pie Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base lg:text-lg">Fontes de Tráfego</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
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
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Trend Line Chart */}
            <Card className="mb-6 lg:mb-8">
              <CardHeader>
                <CardTitle className="text-base lg:text-lg">Tendência de Leads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
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
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Reports;
