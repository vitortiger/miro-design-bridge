
import { useState } from 'react';
import { useCreateCampaign } from '@/hooks/useCampaigns';
import { TelegramBot } from '@/types/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface CreateCampaignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  telegramBots: TelegramBot[];
}

const CreateCampaignDialog = ({ open, onOpenChange, telegramBots }: CreateCampaignDialogProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [telegramBotId, setTelegramBotId] = useState('');
  
  const createCampaignMutation = useCreateCampaign();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !telegramBotId) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    try {
      await createCampaignMutation.mutateAsync({
        name,
        description: description || undefined,
        telegram_bot_id: telegramBotId,
      });
      
      toast.success('Campanha criada com sucesso!');
      onOpenChange(false);
      
      // Reset form
      setName('');
      setDescription('');
      setTelegramBotId('');
    } catch (error) {
      console.error('Create campaign error:', error);
      toast.error(error instanceof Error ? error.message : 'Erro ao criar campanha');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nova Campanha</DialogTitle>
          <DialogDescription>
            Crie uma nova campanha de rastreamento UTM
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Campanha *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Campanha Black Friday"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição opcional da campanha"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="telegram-bot">Bot Telegram *</Label>
            <Select value={telegramBotId} onValueChange={setTelegramBotId} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um bot" />
              </SelectTrigger>
              <SelectContent>
                {telegramBots.map((bot) => (
                  <SelectItem key={bot.id} value={bot.id}>
                    {bot.bot_username} - {bot.chat_name || bot.chat_id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={createCampaignMutation.isPending}
            >
              {createCampaignMutation.isPending ? 'Criando...' : 'Criar Campanha'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCampaignDialog;
