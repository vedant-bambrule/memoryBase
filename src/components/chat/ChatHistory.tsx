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
        <div className="card p-6">
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-violet-50">
                        <MessageSquare className="h-4 w-4 text-violet-500" />
                    </div>
                    <h2 className="text-sm font-bold text-navy-900 uppercase tracking-wide">
                        {documentId ? 'Document Conversations' : 'All Conversations'}
                    </h2>
                </div>
                <button
                    onClick={loadHistory}
                    className="p-2 hover:bg-surface-100 rounded-xl transition-colors"
                    title="Refresh history"
                >
                    <RefreshCw className="h-4 w-4 text-navy-400" />
                </button>
            </div>
            {loading ? (
                <div className="flex h-32 items-center justify-center">
                    <div className="h-6 w-6 animate-spin rounded-full border-[2.5px] border-surface-300 border-t-indigo-500" />
                </div>
            ) : messages.length === 0 ? (
                <div className="text-center py-10">
                    <div className="p-4 rounded-2xl bg-surface-100 inline-flex mb-3">
                        <MessageSquare className="h-8 w-8 text-navy-300" />
                    </div>
                    <p className="text-sm font-semibold text-navy-600">No conversation history yet</p>
                    <p className="text-xs text-navy-400 mt-1">Start asking questions to build your history</p>
                </div>
            ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar pr-1">
                    {messages.map((msg) => (
                        <div key={msg.id} className="p-4 rounded-xl bg-surface-50 hover:bg-surface-100 transition-colors">
                            <p className="text-sm font-semibold text-navy-800 mb-1.5">{msg.question}</p>
                            <p className="text-sm text-navy-500 line-clamp-2 leading-relaxed">{msg.aiResponse}</p>
                            <div className="flex items-center gap-2 flex-wrap mt-3">
                                {msg.status === 'Success' ? (
                                    <span className="badge-success text-[10px]">Success</span>
                                ) : (
                                    <span className="badge-warning text-[10px]">{msg.status}</span>
                                )}
                                {msg.documentTitle && (
                                    <span className="badge-info text-[10px]">
                                        📄 {msg.documentTitle}
                                    </span>
                                )}
                                <span className="text-[10px] text-navy-300 font-medium ml-auto">
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
