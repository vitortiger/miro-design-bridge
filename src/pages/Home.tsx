
import { Bell, Download, RefreshCw, Calendar as CalendarIcon } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useDashboardOverview, useDashboardAnalytics } from '@/hooks/useDashboard';
import Sidebar from '@/components/Sidebar';
import MetricCard from '@/components/MetricCard';
import AnalyticsChart from '@/components/AnalyticsChart';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, subDays, startOfMonth, startOfYear, subYears } from 'date-fns';
import { cn } from '@/lib/utils';

const Home = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [selectedQuickFilter, setSelectedQuickFilter] = useState<string>("");
  
  const { data: overview, isLoading: overviewLoading, refetch: refetchOverview } = useDashboardOverview();
  const { data: analytics, isLoading: analyticsLoading } = useDashboardAnalytics();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleQuickFilter = (days: number | string) => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    
    switch (days) {
      case 'today':
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        setDateFrom(todayStart);
        setDateTo(today);
        setSelectedQuickFilter('today');
        break;
      case 'yesterday':
        const yesterday = subDays(today, 1);
        const yesterdayStart = new Date(yesterday);
        yesterdayStart.setHours(0, 0, 0, 0);
        yesterday.setHours(23, 59, 59, 999);
        setDateFrom(yesterdayStart);
        setDateTo(yesterday);
        setSelectedQuickFilter('yesterday');
        break;
      case 'thisMonth':
        setDateFrom(startOfMonth(today));
        setDateTo(today);
        setSelectedQuickFilter('thisMonth');
        break;
      case 'thisYear':
        setDateFrom(startOfYear(today));
        setDateTo(today);
        setSelectedQuickFilter('thisYear');
        break;
      case 365:
        setDateFrom(subYears(today, 1));
        setDateTo(today);
        setSelectedQuickFilter('365');
        break;
      default:
        if (typeof days === 'number') {
          setDateFrom(subDays(today, days - 1));
          setDateTo(today);
          setSelectedQuickFilter(days.toString());
        }
        break;
    }
  };

  const clearQuickFilter = () => {
    setSelectedQuickFilter("");
  };

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
                  Bem-vindo, {user?.name || 'Usuário'}
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
              {/* Quick Filters Dropdown */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Filtros Rápidos</label>
                <Select value={selectedQuickFilter} onValueChange={handleQuickFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecionar período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Hoje</SelectItem>
                    <SelectItem value="yesterday">Ontem</SelectItem>
                    <SelectItem value="7">Últimos 7 dias</SelectItem>
                    <SelectItem value="30">Últimos 30 dias</SelectItem>
                    <SelectItem value="thisMonth">Este mês</SelectItem>
                    <SelectItem value="thisYear">Este ano</SelectItem>
                    <SelectItem value="365">Últimos 365 dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date Range Picker */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Período Personalizado</label>
                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-[140px] justify-start text-left font-normal",
                          !dateFrom && "text-muted-foreground"
                        )}
                        onClick={clearQuickFilter}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateFrom ? format(dateFrom, "dd/MM/yyyy") : "Data inicial"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dateFrom}
                        onSelect={(date) => {
                          setDateFrom(date);
                          clearQuickFilter();
                        }}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-[140px] justify-start text-left font-normal",
                          !dateTo && "text-muted-foreground"
                        )}
                        onClick={clearQuickFilter}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateTo ? format(dateTo, "dd/MM/yyyy") : "Data final"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dateTo}
                        onSelect={(date) => {
                          setDateTo(date);
                          clearQuickFilter();
                        }}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
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
            />
            <MetricCard
              title="Saídas do Grupo"
              value="1285"
            />
            <MetricCard
              title="Cliques no Link"
              value="105"
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
              dateRange="Quantidade Total de Usuários no Grupo"
            />
            <AnalyticsChart 
              type="multi" 
              dateRange="Grupo - Entradas e Saídas"
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
