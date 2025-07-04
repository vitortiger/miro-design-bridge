
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ExternalLink, Copy, MoreHorizontal } from 'lucide-react';

const recentLinks = [
  {
    name: 'campaign-1',
    code: 'jan 1223',
    date: 'Jan 16',
    clicks: 105,
    entrances: 105,
  },
  {
    name: 'spring-sale',
    code: 'mar. 18, abc',
    date: 'Jun 31',
    clicks: 23,
    entrances: 125,
  },
  {
    name: 'promo-widget',
    code: 'promo-widget',
    date: 'Jun 23',
    clicks: 105,
    entrances: 105,
  },
  {
    name: 'product-launch',
    code: 'product-launch',
    date: 'Jul 23',
    clicks: 26,
    entrances: 105,
  },
];

export default function RecentLinksTable() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Links</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Date</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Clicks</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Entrances</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Details</th>
            </tr>
          </thead>
          <tbody>
            {recentLinks.map((link, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-2">
                  <div>
                    <div className="font-medium text-gray-900">{link.name}</div>
                    <div className="text-sm text-gray-500">{link.code}</div>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <span className="text-gray-900">{link.date}</span>
                </td>
                <td className="py-4 px-2">
                  <span className="text-gray-900">{link.clicks}</span>
                </td>
                <td className="py-4 px-2">
                  <span className="text-gray-900">{link.entrances}</span>
                </td>
                <td className="py-4 px-2">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="text-sm">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
