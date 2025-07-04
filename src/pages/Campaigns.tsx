
import { useState } from 'react';
import { useCampaigns, useDeleteCampaign } from '@/hooks/useCampaigns';
import { useTelegramBots } from '@/hooks/useTelegramBots';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Search, Edit, Trash2, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import CreateCampaignDialog from '@/components/CreateCampaignDialog';

const Campaigns = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  const { data: campaignsData, isLoading, error } = useCampaigns(page, 10, search);
  const { data: telegramBots } = useTelegramBots();
  const deleteCampaignMutation = useDeleteCampaign();

  const handleDeleteCampaign = async (id: string, name: string) => {
    if (window.confirm(`Tem certeza que deseja excluir a campanha "${name}"?`)) {
      try {
        await deleteCampaignMutation.mutateAsync(id);
        toast.success('Campanha excluída com sucesso!');
      } catch (error) {
        toast.error('Erro ao excluir campanha');
      }
    }
  };

  const handleCopyScript = (url: string) => {
    const script = `<script src="${url}"></script>`;
    navigator.clipboard.writeText(script);
    toast.success('Script copiado para a área de transferência!');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 lg:ml-64">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">Campanhas</h1>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Nova Campanha
              </Button>
            </div>
          </div>
        </header>

        <main className="p-6">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar campanhas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Campaigns Grid */}
          {isLoading ? (
            <div className="text-center py-8">Carregando campanhas...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">Erro ao carregar campanhas</div>
          ) : !campaignsData?.data.length ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Nenhuma campanha encontrada</p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                Criar primeira campanha
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaignsData.data.map((campaign) => (
                <Card key={campaign.id} className="relative">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{campaign.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {campaign.description || 'Sem descrição'}
                        </CardDescription>
                      </div>
                      <Badge variant={campaign.is_active ? 'default' : 'secondary'}>
                        {campaign.is_active ? 'Ativa' : 'Inativa'}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Bot Telegram</p>
                        <p className="text-sm">{campaign.telegram_bot?.bot_username || 'N/A'}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-600">Leads Capturados</p>
                        <p className="text-sm">{campaign.lead_count || 0}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-600">Criada em</p>
                        <p className="text-sm">{new Date(campaign.created_at).toLocaleDateString()}</p>
                      </div>
                      
                      <div className="flex items-center gap-2 pt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCopyScript(campaign.tracking_script_url)}
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Copiar Script
                        </Button>
                        
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteCampaign(campaign.id, campaign.name)}
                          disabled={deleteCampaignMutation.isPending}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          {campaignsData && campaignsData.pagination.pages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: campaignsData.pagination.pages }, (_, i) => (
                <Button
                  key={i + 1}
                  variant={page === i + 1 ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
          )}
        </main>
      </div>

      <CreateCampaignDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        telegramBots={telegramBots || []}
      />
    </div>
  );
};

export default Campaigns;
