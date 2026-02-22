import { prisma } from '@nexa/db';

type PropertyItem = { id: string; address: string };
type DealItem = { id: string; dealName: string; dealStage: string };
type ProjectItem = { id: string; projectName: string };

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let propertyCount = 0, projectCount = 0, dealCount = 0;
  let recentProperties: PropertyItem[] = [];
  let recentDeals: DealItem[] = [];
  let activeProjects: ProjectItem[] = [];

  try {
    [propertyCount, projectCount, dealCount, recentProperties, recentDeals, activeProjects] = await Promise.all([
      prisma.property.count(),
      prisma.project.count({ where: { status: 'Active' } }),
      prisma.deal.count({ where: { dealStage: { not: 'Closed' } } }),
      prisma.property.findMany({ take: 3, orderBy: { createdAt: 'desc' } }),
      prisma.deal.findMany({ take: 3, orderBy: { createdAt: 'desc' } }),
      prisma.project.findMany({ take: 3, where: { status: 'Active' }, orderBy: { createdAt: 'desc' } })
    ]);
  } catch (error) {
    console.error('Database connection failed during render (using fallback data)', error);
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero / Welcome */}
      <div className="glass-card neon-border rounded-2xl p-8 mb-8">
        <h2 className="text-4xl font-bold mb-4 glow-text">
          Executive Dashboard
        </h2>
        <p className="text-xl text-gray-300 mb-6">
          Welcome to the Nexa AI Ops Center — Your Intelligent Operating System
          for Real Estate Development
        </p>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">{propertyCount}</div>
            <div className="text-sm text-gray-400">Total Properties</div>
          </div>
          <div className="glass-card rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">{projectCount}</div>
            <div className="text-sm text-gray-400">Active Projects</div>
          </div>
          <div className="glass-card rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">{dealCount}</div>
            <div className="text-sm text-gray-400">Deals in Pipeline</div>
          </div>
        </div>
      </div>

      {/* Detail Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Properties */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-2xl font-semibold mb-4 text-blue-300">
            Recent Properties
          </h3>
          {recentProperties.length > 0 ? (
            <ul className="space-y-3">
              {recentProperties.map((p: PropertyItem) => (
                <li key={p.id} className="text-gray-300 border-b border-gray-700/50 pb-2 last:border-0">{p.address}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">
              No properties yet. Add your first property to get started.
            </p>
          )}
        </div>

        {/* Recent Deals */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-2xl font-semibold mb-4 text-purple-300">
            Recent Deals
          </h3>
          {recentDeals.length > 0 ? (
            <ul className="space-y-3">
              {recentDeals.map((d: DealItem) => (
                <li key={d.id} className="text-gray-300 border-b border-gray-700/50 pb-2 last:border-0">{d.dealName} - {d.dealStage}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">
              No deals yet. Create your first deal to begin tracking.
            </p>
          )}
        </div>

        {/* Active Projects */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-2xl font-semibold mb-4 text-green-300">
            Active Projects
          </h3>
          {activeProjects.length > 0 ? (
            <ul className="space-y-3">
              {activeProjects.map((p: ProjectItem) => (
                <li key={p.id} className="text-gray-300 border-b border-gray-700/50 pb-2 last:border-0">{p.projectName}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">
              No active projects. Start a project to manage construction.
            </p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-2xl font-semibold mb-4 text-yellow-300">
            Quick Actions
          </h3>
          <div className="space-y-2">
            <button className="w-full px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50">
              Add Property
            </button>
            <button className="w-full px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-purple-500/50">
              Create Deal
            </button>
            <button className="w-full px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/40 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-green-500/50">
              Start Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
