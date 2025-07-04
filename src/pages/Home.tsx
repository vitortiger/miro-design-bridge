import { Bell, Download, RefreshCw, Calendar as CalendarIcon, User, LogOut, Settings as SettingsIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useDashboardOverview, useDashboardAnalytics } from '@/hooks/useDashboard';
import Sidebar from '@/components/Sidebar';
import MetricCard from '@/components/MetricCard';
import AnalyticsChart from '@/components/AnalyticsChart';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useState } from 'react';
import { format, subDays, startOfMonth, startOfYear, subYears } from 'date-fns';
import { cn } from '@/lib/utils';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const Home = () => {
  const {
    user,
    profile,
    isAuthenticated,
    isLoading
  } = useAuth();
  const navigate = useNavigate();
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [selectedQuickFilter, setSelectedQuickFilter] = useState<string>("");
  const {
    data: overview,
    isLoading: overviewLoading,
    refetch: refetchOverview
  } = useDashboardOverview();
  const {
    data: analytics,
    isLoading: analyticsLoading
  } = useDashboardAnalytics();

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

  const handleRefresh = () => {
    refetchOverview();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const getUserInitials = () => {
    if (profile?.name) {
      return profile.name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return 'U';
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="flex w-full">
          <Sidebar />
          
          <div className="flex-1 w-full lg:ml-0">
            <header className="bg-white shadow-sm border-b border-gray-200">
              <div className="px-4 lg:px-6 py-6">
                <div className="flex flex-col xl:flex-row gap-4 ml-12 lg:ml-0 min-w-0 relative">
                  {/* User Profile Dropdown - Top Right */}
                  <div className="absolute top-0 right-0">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0 hover:bg-gray-100">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="" alt="Profile" />
                            <AvatarFallback className="bg-blue-100 text-blue-600 text-sm font-medium">
                              {getUserInitials()}
                            </AvatarFallback>
                          </Avatar>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 bg-white border border-gray-200 shadow-lg" align="end" forceMount>
                        <div className="flex items-center justify-start gap-2 p-2">
                          <div className="flex flex-col space-y-1 leading-none">
                            {profile?.name && (
                              <p className="font-medium text-sm text-gray-900">{profile.name}</p>
                            )}
                            {user?.email && (
                              <p className="w-[200px] truncate text-xs text-gray-500">{user.email}</p>
                            )}
                          </div>
                        </div>
                        <DropdownMenuSeparator className="bg-gray-200" />
                        <DropdownMenuItem className="cursor-pointer hover:bg-gray-50" onClick={() => navigate('/settings')}>
                          <User className="mr-2 h-4 w-4 text-gray-500" />
                          <span className="text-gray-700">Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer hover:bg-gray-50" onClick={() => navigate('/settings')}>
                          <SettingsIcon className="mr-2 h-4 w-4 text-gray-500" />
                          <span className="text-gray-700">Billing</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-gray-200" />
                        <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 text-red-600" onClick={handleLogout}>
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Log out</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Date Filters Row */}
                  <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center flex-1">
                    {/* Preset Filters */}
                    <div className="w-full sm:w-auto">
                      <Select value={selectedQuickFilter} onValueChange={handleQuickFilter}>
                        <SelectTrigger className="w-full sm:w-[180px] bg-white border-gray-300 hover:border-gray-400 transition-colors">
                          <SelectValue placeholder="Selecionar período" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 shadow-lg">
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

                    {/* Date Range Pickers */}
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button 
                            variant="outline" 
                            className={cn(
                              "flex-1 sm:w-[140px] justify-start text-left font-normal bg-white border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors", 
                              !dateFrom && "text-muted-foreground"
                            )} 
                            onClick={clearQuickFilter}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                            {dateFrom ? format(dateFrom, "dd/MM/yyyy") : "Data inicial"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-white border border-gray-200 shadow-lg" align="start">
                          <Calendar mode="single" selected={dateFrom} onSelect={date => {
                            setDateFrom(date);
                            clearQuickFilter();
                          }} initialFocus className={cn("p-3 pointer-events-auto")} />
                        </PopoverContent>
                      </Popover>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button 
                            variant="outline" 
                            className={cn(
                              "flex-1 sm:w-[140px] justify-start text-left font-normal bg-white border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors", 
                              !dateTo && "text-muted-foreground"
                            )} 
                            onClick={clearQuickFilter}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                            {dateTo ? format(dateTo, "dd/MM/yyyy") : "Data final"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-white border border-gray-200 shadow-lg" align="start">
                          <Calendar mode="single" selected={dateTo} onSelect={date => {
                            setDateTo(date);
                            clearQuickFilter();
                          }} initialFocus className={cn("p-3 pointer-events-auto")} />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleRefresh}
                      className="bg-white border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors"
                    >
                      <RefreshCw className="h-4 w-4 text-gray-600" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-white border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors"
                    >
                      <Bell className="h-4 w-4 text-gray-600" />
                    </Button>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors w-full sm:w-auto"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Exportar Dados
                    </Button>
                  </div>
                </div>
              </div>
            </header>

            <main className="p-4 lg:p-6">
              {/* Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
                <MetricCard title="Entradas no Grupo" value="1285" />
                <MetricCard title="Saídas do Grupo" value="1285" />
                <MetricCard title="Cliques no Link" value="105" />
                <MetricCard title="Número de canais ativos" value="105" />
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                <AnalyticsChart type="single" dateRange="Quantidade Total de Usuários no Grupo" />
                <AnalyticsChart type="multi" dateRange="Grupo - Entradas e Saídas" />
              </div>
            </main>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Home;
