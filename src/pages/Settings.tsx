
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { User, Shield, Bell, Crown } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const Settings = () => {
  const [settings, setSettings] = useState({
    name: 'João Silva',
    email: 'joao@exemplo.com',
    notifications_email: true,
    notifications_telegram: true
  });

  const handleSave = () => {
    toast.success('Configurações salvas com sucesso!');
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex w-full">
        <Sidebar />
        
        <div className="flex-1 w-full lg:ml-0">
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="px-4 lg:px-6 py-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 ml-12 lg:ml-0">Configurações</h1>
              </div>
            </div>
          </header>

          <main className="p-4 lg:p-6 space-y-6">
            {/* Profile Settings */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <CardTitle>Perfil do Usuário</CardTitle>
                </div>
                <CardDescription>
                  Gerencie suas informações pessoais e preferências de conta.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      value={settings.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={settings.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                </div>
                
                <Button onClick={handleSave}>Salvar Alterações</Button>
              </CardContent>
            </Card>

            {/* Plan Information */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Crown className="h-5 w-5 text-yellow-600" />
                    <CardTitle>Plano Atual</CardTitle>
                  </div>
                  <Badge variant="default" className="bg-yellow-600">Pro</Badge>
                </div>
                <CardDescription>
                  Você está no plano Pro com acesso a todos os recursos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Campanhas</p>
                    <p className="text-2xl font-bold">Ilimitadas</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Bots Telegram</p>
                    <p className="text-2xl font-bold">10</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Leads/mês</p>
                    <p className="text-2xl font-bold">50.000</p>
                  </div>
                </div>
                <Button variant="outline">Gerenciar Plano</Button>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <CardTitle>Notificações</CardTitle>
                </div>
                <CardDescription>
                  Configure como você deseja receber notificações sobre novos leads e atividades.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Notificações por Email</Label>
                    <p className="text-sm text-gray-500">Receba resumos diários por email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={settings.notifications_email}
                    onCheckedChange={(checked) => handleInputChange('notifications_email', checked)}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="telegram-notifications">Notificações no Telegram</Label>
                    <p className="text-sm text-gray-500">Receba alertas instantâneos no Telegram</p>
                  </div>
                  <Switch
                    id="telegram-notifications"
                    checked={settings.notifications_telegram}
                    onCheckedChange={(checked) => handleInputChange('notifications_telegram', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Security */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <CardTitle>Segurança</CardTitle>
                </div>
                <CardDescription>
                  Gerencie suas configurações de segurança e acesso.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline">Alterar Senha</Button>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-2">Sessões Ativas</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Navegador Atual</p>
                        <p className="text-sm text-gray-500">Chrome - São Paulo, Brasil</p>
                      </div>
                      <Badge variant="secondary">Atual</Badge>
                    </div>
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

export default Settings;
