
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
    <div className="min-h-screen bg-gray-50">
      <div className="flex w-full">
        <Sidebar />
        
        <div className="flex-1 w-full lg:ml-0">
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="px-4 lg:px-6 py-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 ml-12 lg:ml-0">
                  Welcome, {user?.name || 'Vitor'}
                </h1>
                <div className="flex items-center gap-4 ml-12 lg:ml-0">
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
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Date Range</label>
                  <Select defaultValue="jan-jul-2023">
                    <SelectTrigger className="w-full sm:w-64">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jan-jul-2023">Jan 1, 2023 -- Jul 1, 2023</SelectItem>
                      <SelectItem value="last-30-days">Últimos 30 dias</SelectItem>
                      <SelectItem value="last-90-days">Últimos 90 dias</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Compare Campaigns</label>
                  <Select>
                    <SelectTrigger className="w-full sm:w-64">
                      <SelectValue placeholder="Compare Campaigns" />
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
                Export Data
              </Button>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Entrances in Group"
                value="1285"
                dark={true}
              />
              <MetricCard
                title="Exits from Group"
                value="1285"
                dark={true}
              />
              <MetricCard
                title="Clicks on Link"
                value="105"
                dark={true}
              />
              <MetricCard
                title="Clinkseof Users"
                value="105"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AnalyticsChart 
                type="single" 
                dateRange="Jan 15, 2023 -- Jul 1, 2023"
              />
              <AnalyticsChart 
                type="multi" 
                dateRange="Jan 15, 2023 -- Jul 1, 2023"
              />
            </div>

            {/* Recent Links Table */}
            <RecentLinksTable />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;
