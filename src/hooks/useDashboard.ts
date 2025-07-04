
import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { DashboardOverview, DashboardAnalytics } from '@/types/api';

export function useDashboardOverview() {
  return useQuery<DashboardOverview>({
    queryKey: ['dashboard', 'overview'],
    queryFn: () => apiService.getDashboardOverview(),
    refetchInterval: 30000, // Refresh every 30 seconds
  });
}

export function useDashboardAnalytics(period?: string, campaignId?: string) {
  return useQuery<DashboardAnalytics>({
    queryKey: ['dashboard', 'analytics', period, campaignId],
    queryFn: () => apiService.getDashboardAnalytics(period, campaignId),
    refetchInterval: 60000, // Refresh every minute
  });
}
