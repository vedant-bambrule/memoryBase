import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Users, MessageSquare, BrainCircuit } from 'lucide-react';
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
        <div className="flex h-screen w-64 flex-col bg-slate-900 text-white shadow-xl md:shadow-none">
            <div className="flex h-16 items-center gap-2 px-6 font-bold text-xl border-b border-slate-800">
                <BrainCircuit className="h-6 w-6 text-blue-400" />
                <span>MemoryBase</span>
            </div>
            <nav className="flex-1 space-y-1 px-3 py-4">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/'}
                        onClick={onClose}
                        className={({ isActive }) =>
                            cn(
                                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-blue-600 text-white"
                                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                            )
                        }
                    >
                        <item.icon className="h-5 w-5" />
                        {item.name}
                    </NavLink>
                ))}
            </nav>
            <div className="p-4 border-t border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center font-bold">
                        JD
                    </div>
                    <div className="text-sm border-r border-transparent">
                        <p className="font-medium">John Doe</p>
                        <p className="text-slate-400 text-xs">Admin</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
