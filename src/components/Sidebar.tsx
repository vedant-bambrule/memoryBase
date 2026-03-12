import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Users, MessageSquare, BrainCircuit, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
    onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
    const navItems = [
        { name: 'Dashboard', path: '/', icon: LayoutDashboard },
        { name: 'Documents', path: '/documents', icon: FileText },
        { name: 'Employees', path: '/employees', icon: Users },
        { name: 'AI Assistant', path: '/assistant', icon: MessageSquare },
    ];

    return (
        <div className="flex h-screen w-72 flex-col bg-navy-900 text-white font-inter">
            {/* Logo */}
            <div className="flex h-[72px] items-center gap-3 px-7 border-b border-white/[0.08]">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/20">
                    <BrainCircuit className="h-5 w-5 text-accent" />
                </div>
                <div>
                    <span className="text-lg font-bold tracking-tight">MemoryBase</span>
                    <span className="block text-[10px] font-medium text-navy-300 tracking-widest uppercase">AI Platform</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-1 custom-scrollbar overflow-y-auto">
                <p className="px-3 mb-3 text-[10px] font-semibold text-navy-400 uppercase tracking-widest">Menu</p>
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/'}
                        onClick={onClose}
                        className={({ isActive }) =>
                            cn(
                                "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-accent/15 text-accent shadow-sm"
                                    : "text-navy-300 hover:bg-white/[0.06] hover:text-white"
                            )
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <item.icon className={cn("h-[18px] w-[18px]", isActive ? "text-accent" : "")} />
                                {item.name}
                                {isActive && (
                                    <div className="ml-auto h-1.5 w-1.5 rounded-full bg-accent" />
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* User Section */}
            <div className="p-4 border-t border-white/[0.08]">
                <div className="flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-white/[0.04] transition-colors cursor-pointer">
                    <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 to-accent flex items-center justify-center text-sm font-bold text-navy-900">
                        JD
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">John Doe</p>
                        <p className="text-[11px] text-navy-400 font-medium">Admin</p>
                    </div>
                    <button className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-navy-400 hover:text-white">
                        <LogOut className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
