
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface CreateBotDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateBotDialog = ({ open, onOpenChange }: CreateBotDialogProps) => {
  const [formData, setFormData] = useState({
    bot_token: '',
    chat_id: '',
    chat_name: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.bot_token || !formData.chat_id) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Bot do Telegram criado com sucesso!');
      setFormData({ bot_token: '', chat_id: '', chat_name: '', description: '' });
      setIsSubmitting(false);
      onOpenChange(false);
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Novo Bot do Telegram</DialogTitle>
          <DialogDescription>
            Configure um novo bot do Telegram para receber notificações de leads.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bot_token">Token do Bot *</Label>
            <Input
              id="bot_token"
              type="password"
              value={formData.bot_token}
              onChange={(e) => handleInputChange('bot_token', e.target.value)}
              placeholder="1234567890:ABC-DEF1234567890abcdef..."
              required
            />
            <p className="text-xs text-gray-500">
              Obtenha o token do @BotFather no Telegram
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="chat_id">ID do Chat *</Label>
            <Input
              id="chat_id"
              value={formData.chat_id}
              onChange={(e) => handleInputChange('chat_id', e.target.value)}
              placeholder="-1001234567890 ou 123456789"
              required
            />
            <p className="text-xs text-gray-500">
              ID do canal, grupo ou chat privado
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="chat_name">Nome do Chat</Label>
            <Input
              id="chat_name"
              value={formData.chat_name}
              onChange={(e) => handleInputChange('chat_name', e.target.value)}
              placeholder="Nome descritivo do chat"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Descrição opcional do bot..."
              rows={3}
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Criando...' : 'Criar Bot'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBotDialog;
