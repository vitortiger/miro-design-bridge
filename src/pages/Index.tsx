
import { Bell, Download, RefreshCw } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useDashboardOverview, useDashboardAnalytics } from '@/hooks/useDashboard';
import Sidebar from '@/components/Sidebar';
import MetricCard from '@/components/MetricCard';
import AnalyticsChart from '@/components/AnalyticsChart';
import RecentLinksTable from '@/components/RecentLinksTable';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const { data: overview, isLoading: overviewLoading, refetch: refetchOverview } = useDashboardOverview();
  const { data: analytics, isLoading: analyticsLoading } = useDashboardAnalytics();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading || !isAuthenticated) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  const handleRefresh = () => {
    refetchOverview();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 lg:ml-64">
        <header className="bg-white shadow-sm border-b border-gray-200 lg:pl-0 pl-16">
          <div className="px-4 lg:px-6 py-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <h1 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">
                Bem-vindo, {user?.name || 'Usuário'}
              </h1>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={handleRefresh}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-6 space-y-6">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Período</label>
                <Select defaultValue="last-30-days">
                  <SelectTrigger className="w-full sm:w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last-7-days">Últimos 7 dias</SelectItem>
                    <SelectItem value="last-30-days">Últimos 30 dias</SelectItem>
                    <SelectItem value="last-90-days">Últimos 90 dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Comparar Campanhas</label>
                <Select>
                  <SelectTrigger className="w-full sm:w-64">
                    <SelectValue placeholder="Selecionar Campanha" />
                  </SelectTrigger>
                  <SelectContent>
                    {overview?.top_campaigns?.map((campaign) => (
                      <SelectItem key={campaign.id} value={campaign.id}>
                        {campaign.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button variant="outline" className="w-full sm:w-auto">
              <Download className="h-4 w-4 mr-2" />
              Exportar Dados
            </Button>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Total de Campanhas"
              value={overviewLoading ? "..." : overview?.total_campaigns || 0}
              dark={true}
            />
            <MetricCard
              title="Campanhas Ativas"
              value={overviewLoading ? "..." : overview?.active_campaigns || 0}
              dark={true}
            />
            <MetricCard
              title="Total de Leads"
              value={overviewLoading ? "..." : overview?.total_leads || 0}
              dark={true}
            />
            <MetricCard
              title="Bots Telegram"
              value={overviewLoading ? "..." : overview?.total_bots || 0}
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnalyticsChart type="single" />
            <AnalyticsChart type="multi" />
          </div>

          {/* Recent Activity */}
          {overview?.recent_activity && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Atividade Recente</h3>
              <div className="space-y-3">
                {overview.recent_activity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{new Date(activity.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Links Table */}
          <RecentLinksTable />
        </main>
      </div>
    </div>
  );
};

export default Index;
