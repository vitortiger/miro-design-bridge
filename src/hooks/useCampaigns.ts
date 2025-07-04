
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Campaign {
  id: string;
  user_id: string;
  telegram_bot_id: string;
  name: string;
  description: string;
  is_active: boolean;
  tracking_script_url: string;
  capture_webhook_url: string;
  member_webhook_url: string;
  created_at: string;
  updated_at: string;
  lead_count: number;
  telegram_bot?: {
    bot_username: string;
    chat_name: string;
  };
}

interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    per_page: number;
    total: number;
    pages: number;
  };
}

// Mock data
const mockCampaigns: Campaign[] = [
  {
    id: '1',
    user_id: '1',
    telegram_bot_id: '1',
    name: 'Black Friday 2024',
    description: 'Campanha especial da Black Friday',
    is_active: true,
    tracking_script_url: 'https://api.exemplo.com/script/1.js',
    capture_webhook_url: 'https://api.exemplo.com/webhook/capture/1',
    member_webhook_url: 'https://api.exemplo.com/webhook/member/1',
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-20T15:45:00Z',
    lead_count: 89,
    telegram_bot: {
      bot_username: '@marketing_bot',
      chat_name: 'Canal Marketing'
    }
  },
  {
    id: '2',
    user_id: '1',
    telegram_bot_id: '2',
    name: 'Natal Premium',
    description: 'Promoções natalinas para clientes premium',
    is_active: true,
    tracking_script_url: 'https://api.exemplo.com/script/2.js',
    capture_webhook_url: 'https://api.exemplo.com/webhook/capture/2',
    member_webhook_url: 'https://api.exemplo.com/webhook/member/2',
    created_at: '2024-01-10T08:20:00Z',
    updated_at: '2024-01-18T12:30:00Z',
    lead_count: 67,
    telegram_bot: {
      bot_username: '@leads_bot',
      chat_name: 'Grupo Leads'
    }
  },
  {
    id: '3',
    user_id: '1',
    telegram_bot_id: '1',
    name: 'Ano Novo VIP',
    description: 'Ofertas exclusivas para o ano novo',
    is_active: false,
    tracking_script_url: 'https://api.exemplo.com/script/3.js',
    capture_webhook_url: 'https://api.exemplo.com/webhook/capture/3',
    member_webhook_url: 'https://api.exemplo.com/webhook/member/3',
    created_at: '2024-01-05T14:15:00Z',
    updated_at: '2024-01-15T09:20:00Z',
    lead_count: 45,
    telegram_bot: {
      bot_username: '@marketing_bot',
      chat_name: 'Canal Marketing'
    }
  }
];

export function useCampaigns(page: number, per_page: number, search?: string) {
  return useQuery<PaginatedResponse<Campaign>>({
    queryKey: ['campaigns', page, per_page, search],
    queryFn: () => {
      let filteredCampaigns = mockCampaigns;
      
      if (search) {
        filteredCampaigns = mockCampaigns.filter(campaign =>
          campaign.name.toLowerCase().includes(search.toLowerCase()) ||
          campaign.description.toLowerCase().includes(search.toLowerCase())
        );
      }
      
      const startIndex = (page - 1) * per_page;
      const endIndex = startIndex + per_page;
      const paginatedData = filteredCampaigns.slice(startIndex, endIndex);
      
      return Promise.resolve({
        data: paginatedData,
        pagination: {
          page,
          per_page,
          total: filteredCampaigns.length,
          pages: Math.ceil(filteredCampaigns.length / per_page)
        }
      });
    },
  });
}

export function useCampaign(id: string) {
  return useQuery<Campaign>({
    queryKey: ['campaign', id],
    queryFn: () => {
      const campaign = mockCampaigns.find(c => c.id === id);
      return Promise.resolve(campaign || mockCampaigns[0]);
    },
  });
}

export function useCreateCampaign() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) => {
      // Simulate API call
      return new Promise(resolve => setTimeout(resolve, 1000));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },
  });
}

export function useUpdateCampaign() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => {
      // Simulate API call
      return new Promise(resolve => setTimeout(resolve, 1000));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },
  });
}

export function useDeleteCampaign() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => {
      // Simulate API call
      return new Promise(resolve => setTimeout(resolve, 1000));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['campaigns'] });
    },
  });
}
