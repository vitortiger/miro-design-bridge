
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Search, Edit, Trash2, TestTube, Bot } from 'lucide-react';
import { toast } from 'sonner';
import CreateBotDialog from '@/components/CreateBotDialog';

// Mock data
const mockBots = [
  {
    id: '1',
    bot_username: '@marketing_bot',
    bot_token: 'hidden',
    chat_id: '-1001234567890',
    chat_name: 'Canal Marketing',
    chat_type: 'channel',
    is_active: true,
    created_at: '2024-01-15T10:30:00Z',
    last_message_at: '2024-01-20T15:45:00Z'
  },
  {
    id: '2',
    bot_username: '@leads_bot',
    bot_token: 'hidden',
    chat_id: '-1001987654321',
    chat_name: 'Grupo Leads',
    chat_type: 'group',
    is_active: true,
    created_at: '2024-01-10T08:20:00Z',
    last_message_at: '2024-01-19T12:30:00Z'
  },
  {
    id: '3',
    bot_username: '@inactive_bot',
    bot_token: 'hidden',
    chat_id: '123456789',
    chat_name: 'Chat Privado',
    chat_type: 'private',
    is_active: false,
    created_at: '2024-01-05T14:15:00Z',
    last_message_at: null
  }
];

const TelegramBots = () => {
  const [search, setSearch] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [bots] = useState(mockBots);

  const filteredBots = bots.filter(bot =>
    bot.bot_username.toLowerCase().includes(search.toLowerCase()) ||
    bot.chat_name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeleteBot = (id: string, username: string) => {
    if (window.confirm(`Tem certeza que deseja excluir o bot "${username}"?`)) {
      toast.success('Bot excluído com sucesso!');
    }
  };

  const handleTestBot = (username: string) => {
    toast.success(`Teste realizado com sucesso para ${username}!`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 lg:ml-64">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">Bots Telegram</h1>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Novo Bot
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
                placeholder="Buscar bots..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Bots</CardTitle>
                <Bot className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{bots.length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bots Ativos</CardTitle>
                <Bot className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{bots.filter(b => b.is_active).length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Canais</CardTitle>
                <Bot className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{bots.filter(b => b.chat_type === 'channel').length}</div>
              </CardContent>
            </Card>
          </div>

          {/* Bots Grid */}
          {filteredBots.length === 0 ? (
            <div className="text-center py-8">
              <Bot className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">
                {search ? 'Nenhum bot encontrado' : 'Nenhum bot configurado'}
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                Adicionar primeiro bot
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBots.map((bot) => (
                <Card key={bot.id} className="relative">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-5 w-5 text-blue-500" />
                        <div>
                          <CardTitle className="text-lg">{bot.bot_username}</CardTitle>
                          <CardDescription className="mt-1">
                            {bot.chat_name}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge variant={bot.is_active ? 'default' : 'secondary'}>
                        {bot.is_active ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Tipo de Chat</p>
                        <p className="text-sm capitalize">
                          {bot.chat_type === 'channel' ? 'Canal' : 
                           bot.chat_type === 'group' ? 'Grupo' : 'Privado'}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-600">ID do Chat</p>
                        <p className="text-sm font-mono">{bot.chat_id}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-600">Última Mensagem</p>
                        <p className="text-sm">
                          {bot.last_message_at 
                            ? new Date(bot.last_message_at).toLocaleString()
                            : 'Nunca'
                          }
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-600">Criado em</p>
                        <p className="text-sm">{new Date(bot.created_at).toLocaleDateString()}</p>
                      </div>
                      
                      <div className="flex items-center gap-2 pt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleTestBot(bot.bot_username)}
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
                          onClick={() => handleDeleteBot(bot.id, bot.bot_username)}
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

export default TelegramBots;
