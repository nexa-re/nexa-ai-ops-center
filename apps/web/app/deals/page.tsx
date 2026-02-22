import { prisma } from '@nexa/db';

type DealItem = {
  id: string;
  dealName: string;
  dealStage: string;
  purchasePrice: number | null;
  projectedIRR: number | null;
  propertyAddress?: string;
};

export const dynamic = 'force-dynamic';

export default async function DealsPage() {
  let deals: DealItem[] = [];

  try {
    const rawDeals = await prisma.deal.findMany({
      orderBy: { createdAt: 'desc' },
      include: { property: { select: { address: true } } }
    });
    
    deals = rawDeals.map((d: any) => ({
      id: d.id,
      dealName: d.dealName,
      dealStage: d.dealStage,
      purchasePrice: d.purchasePrice,
      projectedIRR: d.projectedIRR,
      propertyAddress: d.property?.address
    }));
  } catch (error) {
    console.error('Failed to fetch deals', error);
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-gray-900/40 backdrop-blur-md border border-gray-800 p-6 rounded-2xl shadow-xl">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent">
            Deal Underwriting
          </h1>
          <p className="text-gray-400 mt-1">Track acquisition pipeline and financial projections.</p>
        </div>
        <button className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-lg shadow-lg shadow-purple-500/20 transition-all border border-purple-400/30">
          + Create Deal
        </button>
      </div>

      {/* Table Card */}
      <div className="glass-card rounded-2xl overflow-hidden border border-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-gray-800/50 text-xs uppercase text-gray-400 border-b border-gray-700">
              <tr>
                <th className="px-6 py-4 font-medium">Deal Name</th>
                <th className="px-6 py-4 font-medium">Property Target</th>
                <th className="px-6 py-4 font-medium">Purchase Price</th>
                <th className="px-6 py-4 font-medium">Proj. IRR</th>
                <th className="px-6 py-4 font-medium">Stage</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {deals.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    Your pipeline is empty. Click "Create Deal" to underwrite an asset.
                  </td>
                </tr>
              ) : (
                deals.map((deal) => (
                  <tr key={deal.id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-200">{deal.dealName}</td>
                    <td className="px-6 py-4">{deal.propertyAddress || <span className="text-gray-500 italic">TBD</span>}</td>
                    <td className="px-6 py-4">
                      {deal.purchasePrice ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(deal.purchasePrice) : 'TBD'}
                    </td>
                    <td className="px-6 py-4">
                      {deal.projectedIRR ? `${deal.projectedIRR}%` : '--'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                        deal.dealStage === 'Analysis' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                        deal.dealStage === 'Offer' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                        deal.dealStage === 'Under Contract' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                        deal.dealStage === 'Closed' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                        'bg-gray-500/10 text-gray-400 border-gray-500/20'
                      }`}>
                        {deal.dealStage}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-purple-400 hover:text-purple-300 transition-colors">Review</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
