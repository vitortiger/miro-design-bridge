
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Users, MousePointer, Eye, Download, BarChart3, CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { format, subDays, startOfMonth, endOfMonth, startOfYear, endOfYear, startOfDay, endOfDay, subMonths, subYears } from 'date-fns';
import { cn } from '@/lib/utils';

// Mock data for charts
const monthlyData = [
  { name: 'Jan', leads: 120, clicks: 980, views: 1540 },
  { name: 'Fev', leads: 150, clicks: 1200, views: 1890 },
  { name: 'Mar', leads: 180, clicks: 1400, views: 2100 },
  { name: 'Abr', leads: 220, clicks: 1680, views: 2450 },
  { name: 'Mai', leads: 190, clicks: 1520, views: 2200 },
  { name: 'Jun', leads: 250, clicks: 1900, views: 2800 },
];

// UTM Data converted to table format with clicks data
const utmSourceData = [
  { name: 'Google', leads: 145, clicks: 890, percentage: '39.2%', conversionRate: '16.3%' },
  { name: 'Facebook', leads: 89, clicks: 650, percentage: '24.1%', conversionRate: '13.7%' },
  { name: 'Instagram', leads: 67, clicks: 520, percentage: '18.1%', conversionRate: '12.9%' },
  { name: 'YouTube', leads: 42, clicks: 380, percentage: '11.4%', conversionRate: '11.1%' },
  { name: 'Email', leads: 28, clicks: 180, percentage: '7.6%', conversionRate: '15.6%' },
];

const utmCampaignData = [
  { name: 'Black Friday', leads: 120, clicks: 780, percentage: '34.4%', conversionRate: '15.4%' },
  { name: 'Natal Premium', leads: 89, clicks: 620, percentage: '25.5%', conversionRate: '14.4%' },
  { name: 'Ano Novo VIP', leads: 67, clicks: 490, percentage: '19.2%', conversionRate: '13.7%' },
  { name: 'Verão 2024', leads: 45, clicks: 350, percentage: '12.9%', conversionRate: '12.9%' },
  { name: 'Promoção Especial', leads: 32, clicks: 280, percentage: '9.2%', conversionRate: '11.4%' },
];

const utmMediumData = [
  { name: 'CPC', leads: 156, clicks: 1200, percentage: '43.5%', conversionRate: '13.0%' },
  { name: 'Social', leads: 89, clicks: 720, percentage: '24.9%', conversionRate: '12.4%' },
  { name: 'Email', leads: 67, clicks: 380, percentage: '18.7%', conversionRate: '17.6%' },
  { name: 'Organic', leads: 45, clicks: 320, percentage: '12.6%', conversionRate: '14.1%' },
];

const utmContentData = [
  { name: 'Banner Principal', leads: 78, clicks: 580, percentage: '28.5%', conversionRate: '13.4%' },
  { name: 'Texto Promocional', leads: 65, clicks: 520, percentage: '23.7%', conversionRate: '12.5%' },
  { name: 'Vídeo Demonstrativo', leads: 52, clicks: 380, percentage: '19.0%', conversionRate: '13.7%' },
  { name: 'Carousel de Imagens', leads: 43, clicks: 340, percentage: '15.7%', conversionRate: '12.6%' },
  { name: 'Story Interativo', leads: 35, clicks: 290, percentage: '12.8%', conversionRate: '12.1%' },
];

const utmTermData = [
  { name: 'Comprar Online', leads: 45, clicks: 320, percentage: '26.8%', conversionRate: '14.1%' },
  { name: 'Melhor Preço', leads: 38, clicks: 290, percentage: '22.6%', conversionRate: '13.1%' },
  { name: 'Desconto Especial', leads: 32, clicks: 250, percentage: '19.0%', conversionRate: '12.8%' },
  { name: 'Oferta Limitada', leads: 28, clicks: 230, percentage: '16.7%', conversionRate: '12.2%' },
  { name: 'Grátis Hoje', leads: 25, clicks: 200, percentage: '14.9%', conversionRate: '12.5%' },
];

const ReportsDuplicate = () => {
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [selectedPreset, setSelectedPreset] = useState<string>("");

  const handlePresetFilter = (preset: string) => {
    const today = new Date();
    let from: Date;
    let to: Date = today;

    switch (preset) {
      case 'hoje':
        from = startOfDay(today);
        to = endOfDay(today);
        break;
      case 'ontem':
        from = startOfDay(subDays(today, 1));
        to = endOfDay(subDays(today, 1));
        break;
      case 'ultimos7':
        from = subDays(today, 6);
        to = today;
        break;
      case 'ultimos30':
        from = subDays(today, 29);
        to = today;
        break;
      case 'esseMs':
        from = startOfMonth(today);
        to = endOfMonth(today);
        break;
      case 'esseAno':
        from = startOfYear(today);
        to = endOfYear(today);
        break;
      case 'ultimos365':
        from = subDays(today, 364);
        to = today;
        break;
      default:
        return;
    }

    setDateFrom(from);
    setDateTo(to);
    setSelectedPreset(preset);
  };

  const clearPreset = () => {
    setSelectedPreset("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex w-full">
        <Sidebar />
        
        <div className="flex-1 w-full lg:ml-0">
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="px-4 lg:px-6 py-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 ml-12 lg:ml-0">Relatórios Duplicados</h1>
                <div className="flex flex-col sm:flex-row gap-2 ml-12 lg:ml-0">
                  {/* Preset Filters */}
                  <div className="flex flex-wrap gap-2 mb-2 sm:mb-0">
                    <Select value={selectedPreset} onValueChange={handlePresetFilter}>
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Filtros rápidos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hoje">Hoje</SelectItem>
                        <SelectItem value="ontem">Ontem</SelectItem>
                        <SelectItem value="ultimos7">Últimos 7 dias</SelectItem>
                        <SelectItem value="ultimos30">Últimos 30 dias</SelectItem>
                        <SelectItem value="esseMs">Este mês</SelectItem>
                        <SelectItem value="esseAno">Este ano</SelectItem>
                        <SelectItem value="ultimos365">Últimos 365 dias</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date Range Pickers */}
                  <div className="flex gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-[140px] justify-start text-left font-normal",
                            !dateFrom && "text-muted-foreground"
                          )}
                          onClick={clearPreset}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateFrom ? format(dateFrom, "dd/MM/yyyy") : "Data início"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dateFrom}
                          onSelect={(date) => {
                            setDateFrom(date);
                            clearPreset();
                          }}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-[140px] justify-start text-left font-normal",
                            !dateTo && "text-muted-foreground"
                          )}
                          onClick={clearPreset}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateTo ? format(dateTo, "dd/MM/yyyy") : "Data fim"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dateTo}
                          onSelect={(date) => {
                            setDateTo(date);
                            clearPreset();
                          }}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
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
                  <CardTitle className="text-sm font-medium">Taxa de Cliques/Leads</CardTitle>
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
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Análise UTM</h2>
              </div>
              
              {/* UTM Source and Medium Tables */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
                    <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Leads por UTM Source
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50/50">
                          <TableHead className="font-semibold text-gray-700">Fonte</TableHead>
                          <TableHead className="text-right font-semibold text-gray-700">Cliques</TableHead>
                          <TableHead className="text-right font-semibold text-gray-700">Leads</TableHead>
                          <TableHead className="text-right font-semibold text-gray-700">% Cliques/Leads</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {utmSourceData.map((item, index) => (
                          <TableRow key={item.name} className="hover:bg-blue-50/30 transition-colors">
                            <TableCell className="font-medium text-gray-900 py-3">
                              {item.name}
                            </TableCell>
                            <TableCell className="text-right font-medium text-gray-700 py-3">{item.clicks}</TableCell>
                            <TableCell className="text-right font-semibold text-gray-900 py-3">{item.leads}</TableCell>
                            <TableCell className="text-right py-3">
                              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                                {item.conversionRate}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
                    <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Leads por UTM Medium
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50/50">
                          <TableHead className="font-semibold text-gray-700">Mídia</TableHead>
                          <TableHead className="text-right font-semibold text-gray-700">Cliques</TableHead>
                          <TableHead className="text-right font-semibold text-gray-700">Leads</TableHead>
                          <TableHead className="text-right font-semibold text-gray-700">% Cliques/Leads</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {utmMediumData.map((item, index) => (
                          <TableRow key={item.name} className="hover:bg-green-50/30 transition-colors">
                            <TableCell className="font-medium text-gray-900 py-3">
                              {item.name}
                            </TableCell>
                            <TableCell className="text-right font-medium text-gray-700 py-3">{item.clicks}</TableCell>
                            <TableCell className="text-right font-semibold text-gray-900 py-3">{item.leads}</TableCell>
                            <TableCell className="text-right py-3">
                              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                                {item.conversionRate}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              {/* UTM Campaign and Content Tables */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 border-b">
                    <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      Leads por UTM Campaign
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50/50">
                          <TableHead className="font-semibold text-gray-700">Campanha</TableHead>
                          <TableHead className="text-right font-semibold text-gray-700">Cliques</TableHead>
                          <TableHead className="text-right font-semibold text-gray-700">Leads</TableHead>
                          <TableHead className="text-right font-semibold text-gray-700">% Cliques/Leads</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {utmCampaignData.map((item, index) => (
                          <TableRow key={item.name} className="hover:bg-purple-50/30 transition-colors">
                            <TableCell className="font-medium text-gray-900 py-3">
                              {item.name}
                            </TableCell>
                            <TableCell className="text-right font-medium text-gray-700 py-3">{item.clicks}</TableCell>
                            <TableCell className="text-right font-semibold text-gray-900 py-3">{item.leads}</TableCell>
                            <TableCell className="text-right py-3">
                              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                                {item.conversionRate}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b">
                    <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      Leads por UTM Content
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50/50">
                          <TableHead className="font-semibold text-gray-700">Conteúdo</TableHead>
                          <TableHead className="text-right font-semibold text-gray-700">Cliques</TableHead>
                          <TableHead className="text-right font-semibold text-gray-700">Leads</TableHead>
                          <TableHead className="text-right font-semibold text-gray-700">% Cliques/Leads</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {utmContentData.map((item, index) => (
                          <TableRow key={item.name} className="hover:bg-orange-50/30 transition-colors">
                            <TableCell className="font-medium text-gray-900 py-3">
                              {item.name}
                            </TableCell>
                            <TableCell className="text-right font-medium text-gray-700 py-3">{item.clicks}</TableCell>
                            <TableCell className="text-right font-semibold text-gray-900 py-3">{item.leads}</TableCell>
                            <TableCell className="text-right py-3">
                              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                                {item.conversionRate}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              {/* UTM Term Table */}
              <Card className="mb-6 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 border-b">
                  <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    Leads por UTM Term
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50/50">
                        <TableHead className="font-semibold text-gray-700">Termo</TableHead>
                        <TableHead className="text-right font-semibold text-gray-700">Cliques</TableHead>
                        <TableHead className="text-right font-semibold text-gray-700">Leads</TableHead>
                        <TableHead className="text-right font-semibold text-gray-700">% Cliques/Leads</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {utmTermData.map((item, index) => (
                        <TableRow key={item.name} className="hover:bg-teal-50/30 transition-colors">
                          <TableCell className="font-medium text-gray-900 py-3">
                            {item.name}
                          </TableCell>
                          <TableCell className="text-right font-medium text-gray-700 py-3">{item.clicks}</TableCell>
                          <TableCell className="text-right font-semibold text-gray-900 py-3">{item.leads}</TableCell>
                          <TableCell className="text-right py-3">
                            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                              {item.conversionRate}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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

export default ReportsDuplicate;
