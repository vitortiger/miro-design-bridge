
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Search, Edit, Trash2, TestTube, Bot, Users, MessageCircle, Copy } from 'lucide-react';
import { toast } from 'sonner';
import CreateBotDialog from '@/components/CreateBotDialog';

// Mock data
const mockChannels = [
  {
    id: '1',
    channel_name: 'Canal Marketing',
    channel_title: 'Marketing Digital',
    bot_username: '@marketing_bot',
    bot_token: '1234567890:ABCdefGHIjklMNOpqrSTUvwxYZ123456789',
    channel_id: '-1001234567890',
    is_public: true,
    is_active: true,
    users_count: 1250,
    created_at: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    channel_name: 'Grupo Leads',
    channel_title: 'Captação de Leads',
    bot_username: '@leads_bot',
    bot_token: '9876543210:ZYXwvuTSRqpONMlkjIHgfEDcbA987654321',
    channel_id: '-1001987654321',
    is_public: false,
    is_active: true,
    users_count: 850,
    created_at: '2024-01-10T08:20:00Z',
  },
  {
    id: '3',
    channel_name: 'Chat Privado',
    channel_title: 'Canal Teste',
    bot_username: '@inactive_bot',
    bot_token: '5555555555:TESTtokenFORinactiveBot12345678901234',
    channel_id: '123456789',
    is_public: false,
    is_active: false,
    users_count: 45,
    created_at: '2024-01-05T14:15:00Z',
  }
];

const Channels = () => {
  const [search, setSearch] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [channels] = useState(mockChannels);

  const filteredChannels = channels.filter(channel =>
    channel.channel_name.toLowerCase().includes(search.toLowerCase()) ||
    channel.channel_title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeleteChannel = (id: string, name: string) => {
    if (window.confirm(`Tem certeza que deseja excluir o canal "${name}"?`)) {
      toast.success('Canal excluído com sucesso!');
    }
  };

  const handleTestChannel = (name: string) => {
    toast.success(`Teste realizado com sucesso para ${name}!`);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('btn-telegram');
    toast.success('Código copiado para a área de transferência!');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 lg:ml-64">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="pl-12 lg:pl-0">
                <h1 className="text-2xl font-semibold text-gray-900">Canais Telegram</h1>
              </div>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Novo Canal
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
                placeholder="Buscar canais..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Canais</CardTitle>
                <Bot className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{channels.length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Canais Ativos</CardTitle>
                <Bot className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{channels.filter(c => c.is_active).length}</div>
              </CardContent>
            </Card>
          </div>

          {/* Channels Grid */}
          {filteredChannels.length === 0 ? (
            <div className="text-center py-8">
              <Bot className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">
                {search ? 'Nenhum canal encontrado' : 'Nenhum canal configurado'}
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                Adicionar primeiro canal
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
              {filteredChannels.map((channel) => (
                <Card key={channel.id} className="relative">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2 min-w-0 flex-1">
                        <Bot className="h-5 w-5 text-blue-500 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <CardTitle className="text-base font-semibold truncate">{channel.channel_name}</CardTitle>
                          <div className="flex items-center mt-1 text-sm text-gray-500">
                            <Users className="h-3 w-3 mr-1 flex-shrink-0" />
                            <span className="truncate">{channel.users_count} usuários</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant={channel.is_active ? 'default' : 'secondary'} className="ml-2 flex-shrink-0 text-xs">
                        {channel.is_active ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="border-b pb-2">
                        <h4 className="text-xs font-semibold text-gray-700 mb-2">CREDENCIAIS:</h4>
                      </div>
                      
                      <div>
                        <p className="text-xs font-medium text-gray-600">Nome do bot</p>
                        <p className="text-sm font-mono break-all">{channel.bot_username}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs font-medium text-gray-600">TOKEN BOT</p>
                        <p className="text-xs font-mono bg-gray-100 p-2 rounded break-all">
                          {channel.bot_token}
                        </p>
                        <p className="text-xs text-orange-600 mt-1">
                          ⚠️ BOT TEM QUE ESTAR COMO ADMIN DO CANAL
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-xs font-medium text-gray-600">ID do Canal</p>
                        <p className="text-sm font-mono break-all">{channel.channel_id}</p>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-gray-600">ID do Botão</p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-sm font-mono bg-blue-50 px-2 py-1 rounded border flex-1">
                            btn-telegram
                          </p>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleCopyCode}
                            className="px-2"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-xs text-blue-600 mt-1">
                          💡 Copie este código e cole no botão da sua landing page
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-xs font-medium text-gray-600">Tipo</p>
                        <Badge variant={channel.is_public ? 'default' : 'outline'} className="text-xs">
                          {channel.is_public ? 'Canal Público' : 'Canal Privado'}
                        </Badge>
                      </div>
                      
                      <div>
                        <p className="text-xs font-medium text-gray-600">Criado em</p>
                        <p className="text-sm">{new Date(channel.created_at).toLocaleDateString()}</p>
                      </div>
                      
                      <div className="flex items-center gap-2 pt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleTestChannel(channel.channel_name)}
                          className="flex-1 text-xs"
                        >
                          <TestTube className="h-3 w-3 mr-1" />
                          Testar
                        </Button>
                        
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteChannel(channel.id, channel.channel_name)}
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
        </main>
      </div>

      <CreateBotDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
};

export default Channels;
