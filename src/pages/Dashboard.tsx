import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Users, FileText, MessageSquare, Sparkles, FolderOpen } from 'lucide-react';
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
            <div className="flex h-screen items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Welcome to KnowledgeHub - Your AI-powered knowledge base
                    </p>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                    <button
                        onClick={() => navigate('/documents')}
                        className="flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex-1 sm:flex-none justify-center whitespace-nowrap"
                    >
                        <Upload className="h-4 w-4" />
                        Upload
                    </button>
                    <button
                        onClick={() => navigate('/documents')}
                        className="flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex-1 sm:flex-none justify-center whitespace-nowrap"
                    >
                        <Upload className="h-4 w-4" />
                        Bulk Upload
                    </button>
                    <button
                        onClick={() => navigate('/assistant')}
                        className="flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex-1 sm:flex-none justify-center whitespace-nowrap"
                    >
                        <MessageSquare className="h-4 w-4" />
                        Ask Question
                    </button>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Documents"
                    value={stats?.totalDocuments || 0}
                    subtitle={`${stats?.publishedDocuments || 0} published, ${stats?.draftDocuments || 0} drafts`}
                    icon={FileText}
                    iconColor="text-blue-600"
                    iconBgColor="bg-blue-50"
                />
                <StatCard
                    title="Categories"
                    value={stats?.totalCategories || 0}
                    subtitle="Document categories"
                    icon={FolderOpen}
                    iconColor="text-purple-600"
                    iconBgColor="bg-purple-50"
                />
                <StatCard
                    title="Employees"
                    value={stats?.totalEmployees || 0}
                    subtitle="Team members"
                    icon={Users}
                    iconColor="text-green-600"
                    iconBgColor="bg-green-50"
                />
                <StatCard
                    title="Q&A Entries"
                    value={stats?.totalQAEntries || 0}
                    subtitle={`${stats?.qaAnsweredByAI || 0} questions answered by AI`}
                    icon={Sparkles}
                    iconColor="text-amber-600"
                    iconBgColor="bg-amber-50"
                />
            </div>

            {/* Recent Documents and Questions */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Recent Documents */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-gray-600" />
                            <h2 className="text-lg font-semibold text-gray-900">Recent Documents</h2>
                        </div>
                        <button
                            onClick={() => navigate('/documents')}
                            className="text-sm font-medium text-blue-600 hover:text-blue-700"
                        >
                            View all
                        </button>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {recentDocs.map((doc) => (
                                <div
                                    key={doc.id}
                                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                                    onClick={() => navigate('/documents')}
                                >
                                    <div className="flex-shrink-0 mt-1">
                                        <FileText className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                {doc.title}
                                            </p>
                                            {doc.status === 'Draft' && (
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                                                    <Sparkles className="h-3 w-3" />
                                                    Draft
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs text-gray-500">
                                                📅 {formatDate(doc.lastUpdated)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Questions */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                            <MessageSquare className="h-5 w-5 text-gray-600" />
                            <h2 className="text-lg font-semibold text-gray-900">Recent Questions</h2>
                        </div>
                        <button
                            onClick={() => navigate('/chat')}
                            className="text-sm font-medium text-blue-600 hover:text-blue-700"
                        >
                            View all
                        </button>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {recentQuestions.map((question) => (
                                <div
                                    key={question.id}
                                    className="p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                                    onClick={() => navigate('/chat')}
                                >
                                    <p className="text-sm font-medium text-gray-900">
                                        {question.question}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {formatDate(question.timestamp)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
