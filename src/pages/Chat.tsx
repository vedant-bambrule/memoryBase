import { ChatInterface } from '../components/chat/ChatInterface';
import { ChatHistory } from '../components/chat/ChatHistory';

export function Chat() {
    return (
        <div className="space-y-8">
            <div className="page-header mb-0">
                <h1 className="page-title">Q&A Assistant</h1>
                <p className="page-subtitle">
                    Ask questions and get AI-powered answers from your knowledge base
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChatInterface />
                <ChatHistory />
            </div>
        </div>
    );
}
