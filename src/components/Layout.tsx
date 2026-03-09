import { Outlet } from 'react-router-dom';
import { Sun, Menu, X } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { useState } from 'react';

export function Layout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-50 flex-col md:flex-row">
            {/* Mobile Header */}
            <header className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-20">
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        {isSidebarOpen ? <X className="h-6 w-6 text-gray-600" /> : <Menu className="h-6 w-6 text-gray-600" />}
                    </button>
                    <h1 className="text-xl font-bold text-gray-900">KnowledgeHub</h1>
                </div>
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <Sun className="h-5 w-5 text-gray-600" />
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
                    className="fixed inset-0 bg-black/50 z-20 md:hidden" 
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <div className="flex-1 flex flex-col overflow-hidden w-full">
                <header className="hidden md:flex bg-white border-b border-gray-200 px-8 py-4 items-center justify-between">
                    <div className="flex items-center gap-3">
                        <h1 className="text-xl font-bold text-gray-900">KnowledgeHub</h1>
                        <span className="text-xs text-gray-500">AI-Powered Knowledge Base</span>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <Sun className="h-5 w-5 text-gray-600" />
                    </button>
                </header>
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
