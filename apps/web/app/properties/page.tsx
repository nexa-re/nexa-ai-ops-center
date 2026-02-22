import { prisma } from '@nexa/db';

type PropertyItem = {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  propertyType: string;
  status: string;
};

export const dynamic = 'force-dynamic';

export default async function PropertiesPage() {
  let properties: PropertyItem[] = [];

  try {
    const rawProperties = await prisma.property.findMany({
      orderBy: { createdAt: 'desc' }
    });
    // Map to ensure types align and dates are strings or ignored for the simple table
    properties = rawProperties.map((p: any) => ({
      id: p.id,
      address: p.address,
      city: p.city,
      state: p.state,
      zipCode: p.zipCode,
      propertyType: p.propertyType,
      status: p.status
    }));
  } catch (error) {
    console.error('Failed to fetch properties', error);
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-gray-900/40 backdrop-blur-md border border-gray-800 p-6 rounded-2xl shadow-xl">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
            Property Management
          </h1>
          <p className="text-gray-400 mt-1">Manage standard asset details and underlying entity information.</p>
        </div>
        <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg shadow-lg shadow-blue-500/20 transition-all border border-blue-400/30">
          + Add Property
        </button>
      </div>

      {/* Table Card */}
      <div className="glass-card rounded-2xl overflow-hidden border border-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-gray-800/50 text-xs uppercase text-gray-400 border-b border-gray-700">
              <tr>
                <th className="px-6 py-4 font-medium">Address</th>
                <th className="px-6 py-4 font-medium">Location</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {properties.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No properties found. Click "Add Property" to begin.
                  </td>
                </tr>
              ) : (
                properties.map((property) => (
                  <tr key={property.id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-200">{property.address}</td>
                    <td className="px-6 py-4">{property.city}, {property.state} {property.zipCode}</td>
                    <td className="px-6 py-4">{property.propertyType}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                        property.status === 'Active' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                        property.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                        'bg-gray-500/10 text-gray-400 border-gray-500/20'
                      }`}>
                        {property.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-blue-400 hover:text-blue-300 transition-colors">View</button>
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
