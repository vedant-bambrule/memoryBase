import { ChatInterface } from '../components/chat/ChatInterface';
import { ChatHistory } from '../components/chat/ChatHistory';

export function Chat() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Q&A Assistant</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Ask questions and get AI-powered answers from your knowledge base.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChatInterface />
                <ChatHistory />
            </div>
        </div>
    );
}
