
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface TelegramBot {
  id: string;
  user_id: string;
  bot_token: string;
  bot_username: string;
  chat_id: string;
  chat_name: string;
  chat_type: string;
  is_active: boolean;
  created_at: string;
  last_message_at?: string;
}

// Mock data
const mockBots: TelegramBot[] = [
  {
    id: '1',
    user_id: '1',
    bot_token: 'hidden',
    bot_username: '@marketing_bot',
    chat_id: '-1001234567890',
    chat_name: 'Canal Marketing',
    chat_type: 'channel',
    is_active: true,
    created_at: '2024-01-15T10:30:00Z',
    last_message_at: '2024-01-20T15:45:00Z'
  },
  {
    id: '2',
    user_id: '1',
    bot_token: 'hidden',
    bot_username: '@leads_bot',
    chat_id: '-1001987654321',
    chat_name: 'Grupo Leads',
    chat_type: 'group',
    is_active: true,
    created_at: '2024-01-10T08:20:00Z',
    last_message_at: '2024-01-19T12:30:00Z'
  }
];

export function useTelegramBots() {
  return useQuery<TelegramBot[]>({
    queryKey: ['telegram-bots'],
    queryFn: () => Promise.resolve(mockBots),
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
    }) => {
      // Simulate API call
      return new Promise(resolve => setTimeout(resolve, 1000));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['telegram-bots'] });
    },
  });
}

export function useUpdateTelegramBot() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => {
      // Simulate API call
      return new Promise(resolve => setTimeout(resolve, 1000));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['telegram-bots'] });
    },
  });
}

export function useDeleteTelegramBot() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => {
      // Simulate API call
      return new Promise(resolve => setTimeout(resolve, 1000));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['telegram-bots'] });
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },
  });
}

export function useTestTelegramBot() {
  return useMutation({
    mutationFn: (id: string) => {
      // Simulate API call
      return new Promise(resolve => setTimeout(resolve, 1000));
    },
  });
}
