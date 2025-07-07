
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Edit, Trash2, Menu, X } from 'lucide-react';
import { toast } from 'sonner';
import { useTelegramBots } from '@/hooks/useTelegramBots';

// Mock data para pixels
const mockPixels = [
  {
    id: '1',
    nome: 'Pixel Facebook Marketing',
    pixel_id: 'FB-1122334455',
    token: '123456789:AAHbdn8a3kNz...',
    canal_telegram: 'Canal Marketing',
    status: 'ativo'
  },
  {
    id: '2',
    nome: 'Pixel Google Ads',
    pixel_id: 'GA-9988776655',
    token: '987654321:ZZXyxwvuTsR...',
    canal_telegram: 'Grupo Leads',
    status: 'inativo'
  }
];

const Tracking = () => {
  const [pixels, setPixels] = useState(mockPixels);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newPixel, setNewPixel] = useState({
    nome: '',
    pixel_id: '',
    token: '',
    canal_telegram: ''
  });

  const { data: telegramBots = [] } = useTelegramBots();

  const handleCreatePixel = () => {
    if (!newPixel.nome || !newPixel.pixel_id || !newPixel.token || !newPixel.canal_telegram) {
      toast.error('Preencha todos os campos');
      return;
    }

    const pixel = {
      id: Date.now().toString(),
      ...newPixel,
      status: 'ativo'
    };

    setPixels([...pixels, pixel]);
    setNewPixel({ nome: '', pixel_id: '', token: '', canal_telegram: '' });
    setIsCreateDialogOpen(false);
    toast.success('Pixel criado com sucesso!');
  };

  const handleDeletePixel = (id: string, nome: string) => {
    if (window.confirm(`Tem certeza que deseja excluir o pixel "${nome}"?`)) {
      setPixels(pixels.filter(p => p.id !== id));
      toast.success('Pixel excluído com sucesso!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex w-full">
        <Sidebar />
        
        <div className="flex-1 w-full lg:ml-0">
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="px-4 lg:px-6 py-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 ml-12 lg:ml-0">Traqueamento</h1>
                <div className="flex flex-col sm:flex-row gap-2 ml-12 lg:ml-0">
                  <Button onClick={() => setIsCreateDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Pixel
                  </Button>
                </div>
              </div>
            </div>
          </header>

          <main className="p-4 lg:p-6">
            {/* Create Pixel Form */}
            {isCreateDialogOpen && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Adicionar Novo Pixel</CardTitle>
                  <CardDescription>Configure um novo pixel de rastreamento</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nome do Pixel</label>
                    <Input
                      placeholder="Ex: Pixel Facebook Marketing"
                      value={newPixel.nome}
                      onChange={(e) => setNewPixel({ ...newPixel, nome: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">ID do Pixel</label>
                    <Input
                      placeholder="Ex: FB-1122334455"
                      value={newPixel.pixel_id}
                      onChange={(e) => setNewPixel({ ...newPixel, pixel_id: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Token</label>
                    <Input
                      placeholder="Ex: 123456789:AAHbdn8a3kNz..."
                      value={newPixel.token}
                      onChange={(e) => setNewPixel({ ...newPixel, token: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Canal Telegram</label>
                    <Select value={newPixel.canal_telegram} onValueChange={(value) => setNewPixel({ ...newPixel, canal_telegram: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um canal" />
                      </SelectTrigger>
                      <SelectContent>
                        {telegramBots.map((bot) => (
                          <SelectItem key={bot.id} value={bot.chat_name || bot.bot_username}>
                            {bot.chat_name || bot.bot_username}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button onClick={handleCreatePixel}>Criar Pixel</Button>
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancelar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Pixels</CardTitle>
                  <Search className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pixels.length}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pixels Ativos</CardTitle>
                  <Search className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{pixels.filter(p => p.status === 'ativo').length}</div>
                </CardContent>
              </Card>
            </div>

            {/* Pixels Grid */}
            <div className="mb-6 lg:mb-8">
              {pixels.length === 0 ? (
                <div className="text-center py-8">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Nenhum pixel configurado</p>
                  <Button onClick={() => setIsCreateDialogOpen(true)}>
                    Adicionar primeiro pixel
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
                  {pixels.map((pixel) => (
                    <Card key={pixel.id} className="relative">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-2 min-w-0 flex-1">
                            <Search className="h-5 w-5 text-blue-500 flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                              <CardTitle className="text-base font-semibold truncate">{pixel.nome}</CardTitle>
                            </div>
                          </div>
                          <Badge variant={pixel.status === 'ativo' ? 'default' : 'secondary'} className="ml-2 flex-shrink-0 text-xs">
                            {pixel.status === 'ativo' ? 'Conexão Ativa' : 'Desconectado'}
                          </Badge>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          <div>
                            <p className="text-xs font-medium text-gray-600">ID do Pixel</p>
                            <p className="text-sm font-mono break-all">{pixel.pixel_id}</p>
                          </div>
                          
                          <div>
                            <p className="text-xs font-medium text-gray-600">Token</p>
                            <p className="text-xs font-mono bg-gray-100 p-2 rounded break-all">
                              {pixel.token}
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-xs font-medium text-gray-600">Canal Telegram</p>
                            <p className="text-sm">{pixel.canal_telegram}</p>
                          </div>
                          
                          <div className="flex items-center gap-2 pt-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-3 w-3" />
                            </Button>
                            
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeletePixel(pixel.id, pixel.nome)}
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
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
