
import { useQuery } from '@tanstack/react-query';

interface DashboardOverview {
  total_campaigns: number;
  total_bots: number;
  total_leads: number;
  active_campaigns: number;
  top_campaigns: Array<{
    id: string;
    name: string;
    lead_count: number;
  }>;
  recent_activity: Array<{
    message: string;
    timestamp: string;
  }>;
}

interface DashboardAnalytics {
  daily_leads: Array<{
    date: string;
    count: number;
  }>;
  utm_breakdown: {
    source: Record<string, number>;
    medium: Record<string, number>;
    campaign: Record<string, number>;
  };
}

// Mock data
const mockOverview: DashboardOverview = {
  total_campaigns: 8,
  total_bots: 3,
  total_leads: 245,
  active_campaigns: 5,
  top_campaigns: [
    { id: '1', name: 'Black Friday 2024', lead_count: 89 },
    { id: '2', name: 'Natal Premium', lead_count: 67 },
    { id: '3', name: 'Ano Novo VIP', lead_count: 45 }
  ],
  recent_activity: [
    { message: 'Nova campanha "Black Friday 2024" criada', timestamp: '2024-01-20T10:30:00Z' },
    { message: '15 novos leads capturados', timestamp: '2024-01-20T09:15:00Z' },
    { message: 'Bot @marketing_bot configurado', timestamp: '2024-01-19T16:45:00Z' }
  ]
};

const mockAnalytics: DashboardAnalytics = {
  daily_leads: [
    { date: '2024-01-15', count: 12 },
    { date: '2024-01-16', count: 18 },
    { date: '2024-01-17', count: 25 },
    { date: '2024-01-18', count: 32 },
    { date: '2024-01-19', count: 28 },
    { date: '2024-01-20', count: 35 }
  ],
  utm_breakdown: {
    source: { 'google': 120, 'facebook': 89, 'instagram': 36 },
    medium: { 'cpc': 156, 'social': 89 },
    campaign: { 'black-friday': 89, 'natal': 67, 'ano-novo': 45 }
  }
};

export function useDashboardOverview() {
  return useQuery<DashboardOverview>({
    queryKey: ['dashboard', 'overview'],
    queryFn: () => Promise.resolve(mockOverview),
    refetchInterval: 30000,
  });
}

export function useDashboardAnalytics(period?: string, campaignId?: string) {
  return useQuery<DashboardAnalytics>({
    queryKey: ['dashboard', 'analytics', period, campaignId],
    queryFn: () => Promise.resolve(mockAnalytics),
    refetchInterval: 60000,
  });
}
