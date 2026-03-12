import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Users, FileText, MessageSquare, Sparkles, FolderOpen, ArrowRight } from 'lucide-react';
import { StatCard } from '../components/dashboard/StatCard';
import { getDashboardStats, getDocuments, getChatHistory } from '../services/mockService';
import { type DashboardStats, type Document, type ChatMessage } from '../types';

export function Dashboard() {
    const navigate = useNavigate();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [recentDocs, setRecentDocs] = useState<Document[]>([]);
    const [recentQuestions, setRecentQuestions] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            const [statsData, docsData, questionsData] = await Promise.all([
                getDashboardStats(),
                getDocuments(),
                getChatHistory(),
            ]);

            setStats(statsData);
            setRecentDocs(docsData.slice(0, 3));
            setRecentQuestions(questionsData.slice(0, 3));
        } catch (error) {
            console.error('Failed to load dashboard data', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-surface-300 border-t-indigo-500" />
                    <p className="text-sm text-navy-400 font-medium">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <p className="text-sm font-semibold text-indigo-500 mb-1">Welcome back 👋</p>
                    <h1 className="text-3xl font-bold text-navy-900 tracking-tight">Dashboard</h1>
                    <p className="mt-1 text-sm text-navy-400 font-medium">
                        Your AI-powered knowledge base at a glance
                    </p>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                    <button
                        onClick={() => navigate('/documents')}
                        className="btn-accent flex-1 sm:flex-none whitespace-nowrap"
                    >
                        <Upload className="h-4 w-4" />
                        Upload
                    </button>
                    <button
                        onClick={() => navigate('/assistant')}
                        className="btn-primary flex-1 sm:flex-none whitespace-nowrap"
                    >
                        <MessageSquare className="h-4 w-4" />
                        Ask AI
                    </button>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Documents"
                    value={stats?.totalDocuments || 0}
                    subtitle={`${stats?.publishedDocuments || 0} published, ${stats?.draftDocuments || 0} drafts`}
                    icon={FileText}
                    iconColor="text-indigo-500"
                    iconBgColor="bg-indigo-50"
                />
                <StatCard
                    title="Categories"
                    value={stats?.totalCategories || 0}
                    subtitle="Document categories"
                    icon={FolderOpen}
                    iconColor="text-violet-500"
                    iconBgColor="bg-violet-50"
                />
                <StatCard
                    title="Employees"
                    value={stats?.totalEmployees || 0}
                    subtitle="Team members"
                    icon={Users}
                    iconColor="text-emerald-500"
                    iconBgColor="bg-emerald-50"
                />
                <StatCard
                    title="Q&A Entries"
                    value={stats?.totalQAEntries || 0}
                    subtitle={`${stats?.qaAnsweredByAI || 0} answered by AI`}
                    icon={Sparkles}
                    iconColor="text-amber-500"
                    iconBgColor="bg-amber-50"
                />
            </div>

            {/* Recent Documents and Questions */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Recent Documents */}
                <div className="card overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-5 border-b border-surface-200">
                        <div className="flex items-center gap-2.5">
                            <div className="p-2 rounded-xl bg-indigo-50">
                                <FileText className="h-4 w-4 text-indigo-500" />
                            </div>
                            <h2 className="text-sm font-bold text-navy-900 uppercase tracking-wide">Recent Documents</h2>
                        </div>
                        <button
                            onClick={() => navigate('/documents')}
                            className="btn-ghost text-xs"
                        >
                            View all
                            <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                    </div>
                    <div className="p-4">
                        {recentDocs.length === 0 ? (
                            <div className="text-center py-8 text-navy-400">
                                <FileText className="h-10 w-10 mx-auto mb-2 opacity-40" />
                                <p className="text-sm font-medium">No documents yet</p>
                                <p className="text-xs mt-1">Upload your first document to get started</p>
                            </div>
                        ) : (
                            <div className="space-y-1">
                                {recentDocs.map((doc) => (
                                    <div
                                        key={doc.id}
                                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-50 transition-colors cursor-pointer group"
                                        onClick={() => navigate('/documents')}
                                    >
                                        <div className="flex-shrink-0">
                                            <div className="p-2 rounded-lg bg-surface-100 group-hover:bg-indigo-50 transition-colors">
                                                <FileText className="h-4 w-4 text-navy-400 group-hover:text-indigo-500 transition-colors" />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm font-semibold text-navy-800 truncate">
                                                    {doc.title}
                                                </p>
                                                {doc.status === 'Draft' && (
                                                    <span className="badge-warning text-[10px]">
                                                        Draft
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-navy-400 mt-0.5">
                                                {formatDate(doc.lastUpdated)}
                                            </p>
                                        </div>
                                        <ArrowRight className="h-4 w-4 text-navy-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Questions */}
                <div className="card overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-5 border-b border-surface-200">
                        <div className="flex items-center gap-2.5">
                            <div className="p-2 rounded-xl bg-violet-50">
                                <MessageSquare className="h-4 w-4 text-violet-500" />
                            </div>
                            <h2 className="text-sm font-bold text-navy-900 uppercase tracking-wide">Recent Questions</h2>
                        </div>
                        <button
                            onClick={() => navigate('/assistant')}
                            className="btn-ghost text-xs"
                        >
                            View all
                            <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                    </div>
                    <div className="p-4">
                        {recentQuestions.length === 0 ? (
                            <div className="text-center py-8 text-navy-400">
                                <MessageSquare className="h-10 w-10 mx-auto mb-2 opacity-40" />
                                <p className="text-sm font-medium">No questions yet</p>
                                <p className="text-xs mt-1">Start asking AI questions to build your history</p>
                            </div>
                        ) : (
                            <div className="space-y-1">
                                {recentQuestions.map((question) => (
                                    <div
                                        key={question.id}
                                        className="p-3 rounded-xl hover:bg-surface-50 transition-colors cursor-pointer group"
                                        onClick={() => navigate('/assistant')}
                                    >
                                        <p className="text-sm font-semibold text-navy-800">
                                            {question.question}
                                        </p>
                                        <p className="text-xs text-navy-400 mt-1">
                                            {formatDate(question.timestamp)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
