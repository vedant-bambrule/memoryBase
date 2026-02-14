import { useState } from 'react';
import { Send, AlertCircle, Sparkles } from 'lucide-react';
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
            // Add document context to the query if available
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
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-purple-500" />
                <h2 className="text-lg font-semibold text-gray-900">Ask AI Assistant</h2>
            </div>

            {!isDifyConfigured() && (
                <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-800">
                        Dify.ai is not configured. Please add your API credentials to the .env file.
                    </p>
                </div>
            )}

            {documentTitle && (
                <div className="mb-4 p-3 bg-purple-50 border border-purple-200 rounded-md">
                    <p className="text-sm text-purple-800">
                        <span className="font-semibold">Context:</span> Questions will be about "{documentTitle}"
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
                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        disabled={!isDifyConfigured()}
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading || !isDifyConfigured()}
                    className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Send className="h-4 w-4" />
                    {loading ? 'Thinking...' : 'Send Question'}
                </button>
            </form>

            {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-medium text-red-900">Error</p>
                        <p className="text-sm text-red-700 mt-1">{error}</p>
                    </div>
                </div>
            )}

            {response && (
                <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="h-4 w-4 text-purple-600" />
                        <p className="text-sm font-semibold text-gray-900">AI Response:</p>
                    </div>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{response}</p>
                    {conversationId && (
                        <p className="text-xs text-gray-500 mt-3">
                            Conversation ID: {conversationId.substring(0, 8)}...
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
