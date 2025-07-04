
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

const Home = () => {
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
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 w-full lg:pl-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="pl-12 lg:pl-0">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  Dashboard - Bem-vindo, {user?.name || 'Usuário'}
                </h1>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
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

        {/* Main Content */}
        <main className="p-4 sm:p-6 space-y-6">
          {/* Controls */}
          <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:gap-4">
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
            </div>
            
            <Button variant="outline" className="w-full sm:w-auto">
              <Download className="h-4 w-4 mr-2" />
              Exportar Dados
            </Button>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <MetricCard
              title="Entradas no Grupo"
              value="1285"
              dark={true}
            />
            <MetricCard
              title="Saídas do Grupo"
              value="1285"
              dark={true}
            />
            <MetricCard
              title="Cliques no Link"
              value="105"
              dark={true}
            />
            <MetricCard
              title="Número de canais ativos"
              value="105"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <AnalyticsChart 
              type="single" 
              dateRange="15 Jan, 2023 -- 1 Jul, 2023"
            />
            <AnalyticsChart 
              type="multi" 
              dateRange="15 Jan, 2023 -- 1 Jul, 2023"
            />
          </div>

          {/* Recent Links Table */}
          <RecentLinksTable />
        </main>
      </div>
    </div>
  );
};

export default Home;
