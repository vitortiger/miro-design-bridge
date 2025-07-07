
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Info, CheckCircle, Menu, X } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const Tracking = () => {
  const { toast } = useToast();
  const [botToken, setBotToken] = useState('');
  const [pixelId, setPixelId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Mock data for saved configurations
  const savedConfig = {
    botToken: '***********4321',
    pixelId: 'FB-1122334455',
    lastConnection: '07/07/2025 às 18:41',
    status: 'Válido'
  };

  const handleSaveConfig = async () => {
    if (!botToken.trim() || !pixelId.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Sucesso",
        description: "Configurações salvas com sucesso!",
      });
      // Clear form after successful save
      setBotToken('');
      setPixelId('');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md border"
      >
        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <div className="lg:pl-64">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Traqueamento</h1>
            <p className="text-gray-600">
              Configure o rastreamento de eventos entre Telegram e seus pixels de marketing.
            </p>
          </div>

          <div className="space-y-6">
            {/* Seção 1 - Formulário de Integração */}
            <Card>
              <CardHeader>
                <CardTitle>Conectar seu Bot ao Pixel</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bot-token">Token da API do Bot Telegram</Label>
                  <Input
                    id="bot-token"
                    type="text"
                    placeholder="Ex: 123456789:AAHbdn8a3kNz..."
                    value={botToken}
                    onChange={(e) => setBotToken(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="pixel-id">ID do Pixel de Rastreamento</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Pode ser ID do pixel do Facebook, TikTok, Google Ads, etc.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    id="pixel-id"
                    type="text"
                    placeholder="Ex: FB-1122334455"
                    value={pixelId}
                    onChange={(e) => setPixelId(e.target.value)}
                  />
                </div>

                <Button 
                  onClick={handleSaveConfig}
                  disabled={isLoading}
                  className="w-full sm:w-auto"
                >
                  {isLoading ? 'Salvando...' : 'Salvar Configurações'}
                </Button>
              </CardContent>
            </Card>

            {/* Seção 2 - Histórico/Validação do Pixel */}
            <Card>
              <CardHeader>
                <CardTitle>Status da Integração</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Token salvo:</span>
                    <span className="text-sm font-mono">{savedConfig.botToken}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Pixel ativo:</span>
                    <span className="text-sm font-mono">{savedConfig.pixelId}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Última conexão:</span>
                    <span className="text-sm">{savedConfig.lastConnection}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Status:</span>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-600 font-medium">{savedConfig.status}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
