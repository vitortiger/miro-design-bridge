
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { TelegramBot } from '@/types/api';

export function useTelegramBots() {
  return useQuery<TelegramBot[]>({
    queryKey: ['telegram-bots'],
    queryFn: () => apiService.getTelegramBots(),
  });
}

export function useCreateTelegramBot() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: {
      bot_token: string;
      chat_id?: string;
      chat_name?: string;
      chat_type?: string;
    }) => apiService.createTelegramBot(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['telegram-bots'] });
    },
  });
}

export function useUpdateTelegramBot() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      apiService.updateTelegramBot(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['telegram-bots'] });
    },
  });
}

export function useDeleteTelegramBot() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => apiService.deleteTelegramBot(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['telegram-bots'] });
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },
  });
}

export function useTestTelegramBot() {
  return useMutation({
    mutationFn: (id: string) => apiService.testTelegramBot(id),
  });
}
