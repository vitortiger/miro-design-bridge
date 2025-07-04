
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Search, Download, Webhook, Filter, Calendar as CalendarIcon, Users, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import { format, subDays, startOfMonth, endOfMonth, startOfYear, endOfYear, startOfDay, endOfDay } from 'date-fns';
import { cn } from '@/lib/utils';

// Mock data
const mockLeads = [
  {
    id: '1',
    user_id: 'lead_001',
    entry_date: '2024-01-20T10:30:00Z',
    utm_source: 'google',
    utm_campaign: 'marketing_digital',
    utm_medium: 'cpc',
    utm_content: 'banner_promo',
    utm_term: 'leads telegram'
  },
  {
    id: '2',
    user_id: 'lead_002',
    entry_date: '2024-01-19T15:45:00Z',
    utm_source: 'facebook',
    utm_campaign: 'social_media',
    utm_medium: 'social',
    utm_content: 'post_organico',
    utm_term: 'telegram bot'
  },
  {
    id: '3',
    user_id: 'lead_003',
    entry_date: '2024-01-18T09:15:00Z',
    utm_source: 'instagram',
    utm_campaign: 'influencer',
    utm_medium: 'social',
    utm_content: 'stories',
    utm_term: 'automacao'
  },
  {
    id: '4',
    user_id: 'lead_004',
    entry_date: '2024-01-17T14:20:00Z',
    utm_source: 'email',
    utm_campaign: 'newsletter',
    utm_medium: 'email',
    utm_content: 'header_link',
    utm_term: 'utm tracking'
  },
  {
    id: '5',
    user_id: 'lead_005',
    entry_date: '2024-01-16T11:50:00Z',
    utm_source: 'youtube',
    utm_campaign: 'video_tutorial',
    utm_medium: 'video',
    utm_content: 'descricao',
    utm_term: 'marketing digital'
  },
  {
    id: '6',
    user_id: 'lead_006',
    entry_date: '2024-01-15T16:30:00Z',
    utm_source: 'google',
    utm_campaign: 'search_ads',
    utm_medium: 'cpc',
    utm_content: 'text_ad',
    utm_term: 'crm telegram'
  },
  {
    id: '7',
    user_id: 'lead_007',
    entry_date: '2024-01-14T08:45:00Z',
    utm_source: 'linkedin',
    utm_campaign: 'professional',
    utm_medium: 'social',
    utm_content: 'article_link',
    utm_term: 'business automation'
  },
  {
    id: '8',
    user_id: 'lead_008',
    entry_date: '2024-01-13T12:15:00Z',
    utm_source: 'twitter',
    utm_campaign: 'viral_tweet',
    utm_medium: 'social',
    utm_content: 'thread',
    utm_term: 'lead generation'
  },
];

const LeadsDatabase = () => {
  const [search, setSearch] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [campaignFilter, setCampaignFilter] = useState('');
  const [mediumFilter, setMediumFilter] = useState('');
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [selectedPreset, setSelectedPreset] = useState<string>("");
  const [leads] = useState(mockLeads);

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

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.user_id.toLowerCase().includes(search.toLowerCase()) ||
      lead.utm_source.toLowerCase().includes(search.toLowerCase()) ||
      lead.utm_campaign.toLowerCase().includes(search.toLowerCase());
    
    const matchesSource = !sourceFilter || lead.utm_source === sourceFilter;
    const matchesCampaign = !campaignFilter || lead.utm_campaign === campaignFilter;
    const matchesMedium = !mediumFilter || lead.utm_medium === mediumFilter;
    
    return matchesSearch && matchesSource && matchesCampaign && matchesMedium;
  });

  const uniqueSources = [...new Set(leads.map(lead => lead.utm_source))];
  const uniqueCampaigns = [...new Set(leads.map(lead => lead.utm_campaign))];
  const uniqueMediums = [...new Set(leads.map(lead => lead.utm_medium))];

  const handleExportSpreadsheet = () => {
    toast.success('Planilha exportada com sucesso!');
  };

  const handleExportWebhook = () => {
    toast.success('Dados enviados via webhook!');
  };

  const clearFilters = () => {
    setSearch('');
    setSourceFilter('');
    setCampaignFilter('');
    setMediumFilter('');
    setDateFrom(undefined);
    setDateTo(undefined);
    setSelectedPreset('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex w-full">
        <Sidebar />
        
        <div className="flex-1 w-full lg:ml-0">
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="px-4 lg:px-6 py-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 ml-12 lg:ml-0">Base de Leads</h1>
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
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Leads</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{leads.length}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Leads Hoje</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                </CardContent>
              </Card>
              
              <Card className="sm:col-span-2 lg:col-span-1">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Fontes Ativas</CardTitle>
                  <Filter className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{uniqueSources.length}</div>
                </CardContent>
              </Card>
            </div>

            {/* Filters and Actions */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-base lg:text-lg">Filtros e Exportação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Buscar leads..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Select value={sourceFilter} onValueChange={setSourceFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filtrar por fonte" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas as fontes</SelectItem>
                        {uniqueSources.map(source => (
                          <SelectItem key={source} value={source}>{source}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select value={campaignFilter} onValueChange={setCampaignFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filtrar por campanha" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas as campanhas</SelectItem>
                        {uniqueCampaigns.map(campaign => (
                          <SelectItem key={campaign} value={campaign}>{campaign}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select value={mediumFilter} onValueChange={setMediumFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filtrar por medium" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os mediums</SelectItem>
                        {uniqueMediums.map(medium => (
                          <SelectItem key={medium} value={medium}>{medium}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date Filters */}
                  <div className="flex flex-col sm:flex-row gap-2">
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
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" onClick={clearFilters} className="w-full sm:w-auto">
                    <Filter className="h-4 w-4 mr-2" />
                    Limpar Filtros
                  </Button>
                  <Button onClick={handleExportSpreadsheet} className="w-full sm:w-auto">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar Planilha
                  </Button>
                  <Button variant="outline" onClick={handleExportWebhook} className="w-full sm:w-auto">
                    <Webhook className="h-4 w-4 mr-2" />
                    Exportar via Webhook
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Leads Table */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base lg:text-lg">Base de Leads ({filteredLeads.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {filteredLeads.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                      {search || sourceFilter || campaignFilter || mediumFilter 
                        ? 'Nenhum lead encontrado com os filtros aplicados' 
                        : 'Nenhum lead cadastrado'
                      }
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto -mx-4 sm:mx-0">
                    <div className="min-w-full inline-block align-middle">
                      <Table className="min-w-[800px]">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="min-w-[120px]">User ID Lead</TableHead>
                            <TableHead className="min-w-[140px]">Data de Entrada</TableHead>
                            <TableHead className="min-w-[100px]">UTM Source</TableHead>
                            <TableHead className="min-w-[120px]">UTM Campaign</TableHead>
                            <TableHead className="min-w-[100px]">UTM Medium</TableHead>
                            <TableHead className="min-w-[120px]">UTM Content</TableHead>
                            <TableHead className="min-w-[120px]">UTM Term</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredLeads.map((lead) => (
                            <TableRow key={lead.id}>
                              <TableCell className="font-mono text-sm">{lead.user_id}</TableCell>
                              <TableCell className="text-sm">
                                <div className="flex flex-col">
                                  <span>{new Date(lead.entry_date).toLocaleDateString('pt-BR')}</span>
                                  <span className="text-xs text-gray-500">
                                    {new Date(lead.entry_date).toLocaleTimeString('pt-BR', { 
                                      hour: '2-digit', 
                                      minute: '2-digit' 
                                    })}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className="text-xs">{lead.utm_source}</Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant="secondary" className="text-xs">{lead.utm_campaign}</Badge>
                              </TableCell>
                              <TableCell>
                                <Badge variant="default" className="text-xs">{lead.utm_medium}</Badge>
                              </TableCell>
                              <TableCell className="text-xs text-gray-600 max-w-[120px] truncate">
                                {lead.utm_content}
                              </TableCell>
                              <TableCell className="text-xs text-gray-600 max-w-[120px] truncate">
                                {lead.utm_term}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
};

export default LeadsDatabase;
