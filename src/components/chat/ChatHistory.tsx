import { useEffect, useState } from 'react';
import { MessageSquare, RefreshCw } from 'lucide-react';
import { getChatHistory } from '../../services/mockService';
import { type ChatMessage } from '../../types';

interface ChatHistoryProps {
    documentId?: string;
}

export function ChatHistory({ documentId }: ChatHistoryProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadHistory();
    }, [documentId]);

    const loadHistory = async () => {
        setLoading(true);
        try {
            const data = await getChatHistory();
            // Filter by document if documentId is provided
            const filtered = documentId
                ? data.filter(msg => msg.documentId === documentId)
                : data;
            setMessages(filtered);
        } catch (error) {
            console.error('Failed to load chat history', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-gray-600" />
                    <h2 className="text-lg font-semibold text-gray-900">
                        {documentId ? 'Document Conversations' : 'All Conversations'}
                    </h2>
                </div>
                <button
                    onClick={loadHistory}
                    className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
                    title="Refresh history"
                >
                    <RefreshCw className="h-4 w-4 text-gray-600" />
                </button>
            </div>
            {loading ? (
                <div className="flex h-32 items-center justify-center">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-200 border-t-blue-600"></div>
                </div>
            ) : messages.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No conversation history yet</p>
                    <p className="text-xs mt-1">Start asking questions to build your history</p>
                </div>
            ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                    {messages.map((msg) => (
                        <div key={msg.id} className="border-b border-gray-200 pb-4 last:border-0">
                            <p className="text-sm font-medium text-gray-900 mb-1">{msg.question}</p>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{msg.aiResponse}</p>
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${msg.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}>
                                    {msg.status}
                                </span>
                                {msg.documentTitle && (
                                    <span className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">
                                        📄 {msg.documentTitle}
                                    </span>
                                )}
                                <span className="text-xs text-gray-500">
                                    {new Date(msg.timestamp).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
