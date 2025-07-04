
import Sidebar from '@/components/Sidebar';

const Reports = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 lg:ml-64">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-semibold text-gray-900">Relatórios</h1>
          </div>
        </header>

        <main className="p-6">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-xl font-medium text-gray-900 mb-2">Relatórios</h2>
            <p className="text-gray-600">Esta seção está em desenvolvimento.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reports;
