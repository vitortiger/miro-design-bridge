
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

const channelPerformance = [
  {
    id: '1',
    canal: 'Marketing Digital',
    fonte: 'Google',
    tipo: 'CPC',
    leads: 85,
    cliques: 650,
    conversao: '13.1%',
    custo: 'R$ 1.250,00'
  },
  {
    id: '2',
    canal: 'Social Media',
    fonte: 'Facebook',
    tipo: 'Social',
    leads: 62,
    cliques: 480,
    conversao: '12.9%',
    custo: 'R$ 890,00'
  },
  {
    id: '3',
    canal: 'Influencer',
    fonte: 'Instagram',
    tipo: 'Social',
    leads: 45,
    cliques: 320,
    conversao: '14.1%',
    custo: 'R$ 1.500,00'
  },
  {
    id: '4',
    canal: 'Video Tutorial',
    fonte: 'YouTube',
    tipo: 'Video',
    leads: 38,
    cliques: 290,
    conversao: '13.1%',
    custo: 'R$ 750,00'
  },
  {
    id: '5',
    canal: 'Newsletter',
    fonte: 'Email',
    tipo: 'Email',
    leads: 28,
    cliques: 180,
    conversao: '15.6%',
    custo: 'R$ 320,00'
  }
];

// UTM Data
const utmSourceData = [
  { name: 'Google', leads: 145, color: '#4285F4' },
  { name: 'Facebook', leads: 89, color: '#1877F2' },
  { name: 'Instagram', leads: 67, color: '#E4405F' },
  { name: 'YouTube', leads: 42, color: '#FF0000' },
  { name: 'Email', leads: 28, color: '#34A853' },
];

const utmCampaignData = [
  { name: 'Black Friday', leads: 120 },
  { name: 'Natal Premium', leads: 89 },
  { name: 'Ano Novo VIP', leads: 67 },
  { name: 'Verão 2024', leads: 45 },
  { name: 'Promoção Especial', leads: 32 },
];

const utmMediumData = [
  { name: 'CPC', leads: 156, color: '#8B5CF6' },
  { name: 'Social', leads: 89, color: '#10B981' },
  { name: 'Email', leads: 67, color: '#F59E0B' },
  { name: 'Organic', leads: 45, color: '#EF4444' },
];

const utmContentData = [
  { name: 'Banner Principal', leads: 78 },
  { name: 'Texto Promocional', leads: 65 },
  { name: 'Vídeo Demonstrativo', leads: 52 },
  { name: 'Carousel de Imagens', leads: 43 },
  { name: 'Story Interativo', leads: 35 },
];

const utmTermData = [
  { name: 'Comprar Online', leads: 45 },
  { name: 'Melhor Preço', leads: 38 },
  { name: 'Desconto Especial', leads: 32 },
  { name: 'Oferta Limitada', leads: 28 },
  { name: 'Grátis Hoje', leads: 25 },
];

const dailyUtmData = [
  { date: '15/01', google: 12, facebook: 8, instagram: 6, youtube: 4 },
  { date: '16/01', google: 15, facebook: 12, instagram: 9, youtube: 5 },
  { date: '17/01', google: 18, facebook: 14, instagram: 11, youtube: 7 },
  { date: '18/01', google: 22, facebook: 16, instagram: 13, youtube: 8 },
  { date: '19/01', google: 25, facebook: 18, instagram: 15, youtube: 10 },
  { date: '20/01', google: 28, facebook: 20, instagram: 17, youtube: 12 },
  { date: '21/01', google: 32, facebook: 24, instagram: 19, youtube: 14 },
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
              
              {/* Daily UTM Trends */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-base lg:text-lg">Tendência Diária por UTM Source</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={dailyUtmData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="google" stroke="#4285F4" strokeWidth={2} name="Google" />
                        <Line type="monotone" dataKey="facebook" stroke="#1877F2" strokeWidth={2} name="Facebook" />
                        <Line type="monotone" dataKey="instagram" stroke="#E4405F" strokeWidth={2} name="Instagram" />
                        <Line type="monotone" dataKey="youtube" stroke="#FF0000" strokeWidth={2} name="YouTube" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* UTM Source and Medium */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base lg:text-lg">Leads por UTM Source</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={utmSourceData}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="leads"
                            label={({ name, leads }) => `${name}: ${leads}`}
                          >
                            {utmSourceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base lg:text-lg">Leads por UTM Medium</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={utmMediumData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="leads" fill="#8B5CF6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* UTM Campaign and Content */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base lg:text-lg">Leads por UTM Campaign</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={utmCampaignData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="leads" fill="#10B981" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base lg:text-lg">Leads por UTM Content</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={utmContentData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="leads" fill="#F59E0B" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* UTM Term */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="text-base lg:text-lg">Leads por UTM Term</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={utmTermData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="leads" fill="#EF4444" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
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

            {/* Channel Performance Table */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base lg:text-lg">Desempenho por Canal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <div className="min-w-full inline-block align-middle">
                    <Table className="min-w-[700px]">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="min-w-[120px]">Canal</TableHead>
                          <TableHead className="min-w-[100px]">Fonte</TableHead>
                          <TableHead className="min-w-[80px]">Tipo</TableHead>
                          <TableHead className="min-w-[80px]">Leads</TableHead>
                          <TableHead className="min-w-[80px]">Cliques</TableHead>
                          <TableHead className="min-w-[100px]">Conversão</TableHead>
                          <TableHead className="min-w-[120px]">Custo</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {channelPerformance.map((channel) => (
                          <TableRow key={channel.id}>
                            <TableCell className="font-medium">{channel.canal}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="text-xs">{channel.fonte}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary" className="text-xs">{channel.tipo}</Badge>
                            </TableCell>
                            <TableCell className="font-semibold">{channel.leads}</TableCell>
                            <TableCell>{channel.cliques}</TableCell>
                            <TableCell>
                              <Badge 
                                variant={parseFloat(channel.conversao) > 14 ? "default" : "secondary"}
                                className="text-xs"
                              >
                                {channel.conversao}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-green-600 font-medium">{channel.custo}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
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
