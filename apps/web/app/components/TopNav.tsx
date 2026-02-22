export default function TopNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 glass-card border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">N</span>
            </div>
            <div>
              <h1 className="text-xl font-bold glow-text">Nexa AI Ops Center</h1>
              <p className="text-xs text-gray-400">Intelligent Real Estate Operations</p>
            </div>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Dashboard</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Properties</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Deals</a>
            <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">Projects</a>
          </div>
        </div>
      </div>
    </nav>
  );
}
