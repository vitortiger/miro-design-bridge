
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Download, Webhook, Filter, Calendar, Users, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

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
  {
    id: '9',
    user_id: 'lead_009',
    entry_date: '2024-01-12T19:30:00Z',
    utm_source: 'pinterest',
    utm_campaign: 'visual_content',
    utm_medium: 'social',
    utm_content: 'pin_image',
    utm_term: 'marketing tools'
  },
  {
    id: '10',
    user_id: 'lead_010',
    entry_date: '2024-01-11T13:45:00Z',
    utm_source: 'whatsapp',
    utm_campaign: 'direct_message',
    utm_medium: 'messaging',
    utm_content: 'broadcast',
    utm_term: 'telegram integration'
  }
];

const Leads = () => {
  const [search, setSearch] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [campaignFilter, setCampaignFilter] = useState('');
  const [mediumFilter, setMediumFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [leads] = useState(mockLeads);

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
    setDateFilter('');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 lg:ml-64">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-semibold text-gray-900">Leads</h1>
          </div>
        </header>

        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                <div className="text-2xl font-bold">
                  {leads.filter(lead => 
                    new Date(lead.entry_date).toDateString() === new Date().toDateString()
                  ).length}
                </div>
              </CardContent>
            </Card>
            
            <Card>
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
              <CardTitle className="text-lg">Filtros e Exportação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar leads..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={sourceFilter} onValueChange={setSourceFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por fonte" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas as fontes</SelectItem>
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
                    <SelectItem value="">Todas as campanhas</SelectItem>
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
                    <SelectItem value="">Todos os mediums</SelectItem>
                    {uniqueMediums.map(medium => (
                      <SelectItem key={medium} value={medium}>{medium}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={clearFilters}>
                  <Filter className="h-4 w-4 mr-2" />
                  Limpar Filtros
                </Button>
                <Button onClick={handleExportSpreadsheet}>
                  <Download className="h-4 w-4 mr-2" />
                  Exportar Planilha
                </Button>
                <Button variant="outline" onClick={handleExportWebhook}>
                  <Webhook className="h-4 w-4 mr-2" />
                  Exportar via Webhook
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Leads Table */}
          <Card>
            <CardHeader>
              <CardTitle>Tabela de Leads ({filteredLeads.length})</CardTitle>
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
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User ID Lead</TableHead>
                        <TableHead>Data de Entrada</TableHead>
                        <TableHead>UTM Source</TableHead>
                        <TableHead>UTM Campaign</TableHead>
                        <TableHead>UTM Medium</TableHead>
                        <TableHead>UTM Content</TableHead>
                        <TableHead>UTM Term</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLeads.map((lead) => (
                        <TableRow key={lead.id}>
                          <TableCell className="font-mono text-sm">{lead.user_id}</TableCell>
                          <TableCell>
                            {new Date(lead.entry_date).toLocaleDateString('pt-BR')} {' '}
                            {new Date(lead.entry_date).toLocaleTimeString('pt-BR', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{lead.utm_source}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{lead.utm_campaign}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="default">{lead.utm_medium}</Badge>
                          </TableCell>
                          <TableCell className="text-sm text-gray-600">
                            {lead.utm_content}
                          </TableCell>
                          <TableCell className="text-sm text-gray-600">
                            {lead.utm_term}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Leads;
