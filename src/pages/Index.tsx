
import { Bell, Download, Calendar, RefreshCw } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import MetricCard from '@/components/MetricCard';
import AnalyticsChart from '@/components/AnalyticsChart';
import RecentLinksTable from '@/components/RecentLinksTable';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Index = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Welcome, Vitor</h1>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 space-y-6">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Date Range</label>
                <Select defaultValue="jan-jul-2023">
                  <SelectTrigger className="w-64">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jan-jul-2023">Jan 1, 2023 -- Jul 1, 2023</SelectItem>
                    <SelectItem value="last-30-days">Last 30 days</SelectItem>
                    <SelectItem value="last-90-days">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Compare Campaigns</label>
                <Select>
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Compare Campaigns" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="campaign-1">Campaign 1</SelectItem>
                    <SelectItem value="campaign-2">Campaign 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button variant="outline">
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
              title="Clickseof Users"
              value="105"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnalyticsChart type="single" />
            <AnalyticsChart type="multi" />
          </div>

          {/* Recent Links Table */}
          <RecentLinksTable />
        </main>
      </div>
    </div>
  );
};

export default Index;
