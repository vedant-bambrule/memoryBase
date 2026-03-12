import { useState } from 'react';
import { Send, AlertCircle, Sparkles, Bot } from 'lucide-react';
import { sendMessageToDify, isDifyConfigured } from '../../services/difyService';

interface ChatInterfaceProps {
    documentId?: string;
    documentTitle?: string;
}

export function ChatInterface({ documentTitle }: ChatInterfaceProps) {
    const [question, setQuestion] = useState('');
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState('');
    const [error, setError] = useState('');
    const [conversationId, setConversationId] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!question.trim()) return;

        if (!isDifyConfigured()) {
            setError('Dify.ai is not configured. Please check your environment variables.');
            return;
        }

        setLoading(true);
        setError('');
        setResponse('');

        try {
            const contextualQuery = documentTitle
                ? `[Document: ${documentTitle}] ${question}`
                : question;

            const result = await sendMessageToDify(contextualQuery, conversationId);
            setResponse(result.aiResponse);
            setConversationId(result.difyConversationId);
            setQuestion('');
        } catch (err) {
            console.error('Failed to send message', err);
            setError(err instanceof Error ? err.message : 'Failed to get AI response. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card p-6">
            <div className="flex items-center gap-2.5 mb-5">
                <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500">
                    <Sparkles className="h-4 w-4 text-white" />
                </div>
                <h2 className="text-sm font-bold text-navy-900 uppercase tracking-wide">Ask AI Assistant</h2>
            </div>

            {!isDifyConfigured() && (
                <div className="mb-5 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-semibold text-amber-800">API Not Configured</p>
                        <p className="text-xs text-amber-600 mt-0.5">
                            Add your Dify.ai API credentials to the .env file to enable AI responses.
                        </p>
                    </div>
                </div>
            )}

            {documentTitle && (
                <div className="mb-5 p-3.5 bg-indigo-50 border border-indigo-100 rounded-xl">
                    <p className="text-sm text-indigo-700">
                        <span className="font-bold">Context:</span> Questions will be about "{documentTitle}"
                    </p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder={documentTitle
                            ? `Ask anything about ${documentTitle}...`
                            : "Ask anything about your documents..."}
                        rows={4}
                        className="input-field resize-none"
                        disabled={!isDifyConfigured()}
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading || !isDifyConfigured()}
                    className="btn-accent disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-soft"
                >
                    <Send className="h-4 w-4" />
                    {loading ? 'Thinking...' : 'Send Question'}
                </button>
            </form>

            {error && (
                <div className="mt-5 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-bold text-red-900">Error</p>
                        <p className="text-sm text-red-600 mt-0.5">{error}</p>
                    </div>
                </div>
            )}

            {response && (
                <div className="mt-6 p-5 bg-gradient-to-br from-surface-50 to-indigo-50/50 rounded-2xl border border-indigo-100">
                    <div className="flex items-center gap-2.5 mb-3">
                        <div className="p-1.5 rounded-lg bg-indigo-100">
                            <Bot className="h-4 w-4 text-indigo-600" />
                        </div>
                        <p className="text-sm font-bold text-navy-900">AI Response</p>
                    </div>
                    <p className="text-sm text-navy-600 whitespace-pre-wrap leading-relaxed">{response}</p>
                    {conversationId && (
                        <p className="text-[10px] text-navy-300 mt-4 font-medium uppercase tracking-wide">
                            Conversation ID: {conversationId.substring(0, 8)}...
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
