import { Outlet } from 'react-router-dom';
import { Sun } from 'lucide-react';
import { Sidebar } from './Sidebar';

export function Layout() {
    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <h1 className="text-xl font-bold text-gray-900">KnowledgeHub</h1>
                        <span className="text-xs text-gray-500">AI-Powered Knowledge Base</span>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <Sun className="h-5 w-5 text-gray-600" />
                    </button>
                </header>
                <main className="flex-1 overflow-y-auto p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
