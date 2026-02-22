export default function SideNav() {
    const navItems = [
        { icon: '📊', label: 'Dashboard', href: '/' },
        { icon: '🏠', label: 'Properties', href: '/properties' },
        { icon: '💼', label: 'Deals', href: '/deals' },
        { icon: '🏗️', label: 'Projects', href: '/projects' },
        { icon: '📄', label: 'Documents', href: '/documents' },
        { icon: '👥', label: 'Contacts', href: '/contacts' },
        { icon: '💰', label: 'Financials', href: '/financials' },
        { icon: '⚙️', label: 'Settings', href: '/settings' },
    ];

    return (
        <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 glass-card border-r border-gray-700 overflow-y-auto z-30">
            <nav className="p-4 space-y-2">
                {navItems.map((item) => (
                    <a
                        key={item.href}
                        href={item.href}
                        className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-white/10 transition-all text-gray-300 hover:text-white"
                    >
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-sm font-medium">{item.label}</span>
                    </a>
                ))}
            </nav>
        </aside>
    );
}
