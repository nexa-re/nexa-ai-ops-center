import { prisma } from '@nexa/db';

type ProjectItem = {
  id: string;
  projectName: string;
  status: string;
  budget: number | null;
  propertyAddress?: string;
};

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  let projects: ProjectItem[] = [];

  try {
    const rawProjects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
      include: { property: { select: { address: true } } }
    });
    
    projects = rawProjects.map((p: any) => ({
      id: p.id,
      projectName: p.projectName,
      status: p.status,
      budget: p.budget,
      propertyAddress: p.property?.address
    }));
  } catch (error) {
    console.error('Failed to fetch projects', error);
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-gray-900/40 backdrop-blur-md border border-gray-800 p-6 rounded-2xl shadow-xl">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-200 bg-clip-text text-transparent">
            Project Tracking
          </h1>
          <p className="text-gray-400 mt-1">Monitor development lifecycles, budgets, and milestones.</p>
        </div>
        <button className="px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white font-medium rounded-lg shadow-lg shadow-green-500/20 transition-all border border-green-400/30">
          + Start Project
        </button>
      </div>

      {/* Table Card */}
      <div className="glass-card rounded-2xl overflow-hidden border border-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-gray-800/50 text-xs uppercase text-gray-400 border-b border-gray-700">
              <tr>
                <th className="px-6 py-4 font-medium">Project Name</th>
                <th className="px-6 py-4 font-medium">Property</th>
                <th className="px-6 py-4 font-medium">Budget</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No active projects found. Click "Start Project" to begin.
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-200">{project.projectName}</td>
                    <td className="px-6 py-4">{project.propertyAddress || <span className="text-gray-500 italic">Unassigned</span>}</td>
                    <td className="px-6 py-4">
                      {project.budget ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(project.budget) : '--'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                        project.status === 'Active' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                        project.status === 'Planning' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                        'bg-gray-500/10 text-gray-400 border-gray-500/20'
                      }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-green-400 hover:text-green-300 transition-colors">Manage</button>
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
