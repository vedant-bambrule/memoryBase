import { Outlet } from 'react-router-dom';
import { Search, Bell, Menu, X } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { useState } from 'react';

export function Layout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-surface font-inter flex-col md:flex-row">
            {/* Mobile Header */}
            <header className="md:hidden bg-white border-b border-surface-200 px-4 py-3 flex items-center justify-between z-20">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 rounded-xl hover:bg-surface-100 transition-colors"
                    >
                        {isSidebarOpen ? <X className="h-5 w-5 text-navy-600" /> : <Menu className="h-5 w-5 text-navy-600" />}
                    </button>
                    <h1 className="text-lg font-bold text-navy-900 tracking-tight">MemoryBase</h1>
                </div>
                <button className="p-2 rounded-xl hover:bg-surface-100 transition-colors relative">
                    <Bell className="h-5 w-5 text-navy-500" />
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent border-2 border-white" />
                </button>
            </header>

            {/* Sidebar */}
            <div className={`
                fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <Sidebar onClose={() => setIsSidebarOpen(false)} />
            </div>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-navy-900/60 backdrop-blur-sm z-20 md:hidden transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <div className="flex-1 flex flex-col overflow-hidden w-full">
                {/* Desktop Header */}
                <header className="hidden md:flex bg-white/80 backdrop-blur-md border-b border-surface-200 px-8 py-4 items-center justify-between sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-navy-300" />
                            <input
                                type="text"
                                placeholder="Search documents, employees..."
                                className="w-72 rounded-xl bg-surface-100 border border-surface-200 pl-10 pr-4 py-2 text-sm text-navy-800 placeholder:text-navy-300 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-2.5 rounded-xl hover:bg-surface-100 transition-colors relative">
                            <Bell className="h-5 w-5 text-navy-500" />
                            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-accent border-2 border-white" />
                        </button>
                        <div className="h-6 w-px bg-surface-200" />
                        <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-surface-100 transition-colors cursor-pointer">
                            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500 to-accent flex items-center justify-center text-xs font-bold text-navy-900">
                                JD
                            </div>
                            <span className="text-sm font-semibold text-navy-700">John Doe</span>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
                    <div className="max-w-7xl mx-auto animate-fade-in">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
