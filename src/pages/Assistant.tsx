import { useParams, useNavigate } from 'react-router-dom';
import { X, FileText } from 'lucide-react';
import { ChatInterface } from '../components/chat/ChatInterface';
import { ChatHistory } from '../components/chat/ChatHistory';
import { useState, useEffect } from 'react';
import { getDocuments } from '../services/mockService';
import { type Document } from '../types';

export function Assistant() {
    const { documentId } = useParams<{ documentId: string }>();
    const navigate = useNavigate();
    const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

    useEffect(() => {
        if (documentId) {
            loadDocument(documentId);
        } else {
            setSelectedDocument(null);
        }
    }, [documentId]);

    const loadDocument = async (id: string) => {
        try {
            const docs = await getDocuments();
            const doc = docs.find(d => d.id === id);
            if (doc) {
                setSelectedDocument(doc);
            }
        } catch (error) {
            console.error('Failed to load document', error);
        }
    };

    const clearSelection = () => {
        navigate('/assistant');
    };

    return (
        <div className="space-y-8">
            <div className="page-header mb-0">
                <h1 className="page-title">AI Assistant</h1>
                <p className="page-subtitle">
                    {selectedDocument
                        ? `Ask questions about "${selectedDocument.title}"`
                        : 'Get AI-powered answers from your knowledge base'}
                </p>
            </div>

            {selectedDocument && (
                <div className="card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-indigo-50 to-violet-50 border-indigo-100">
                    <div className="flex items-center gap-3 w-full">
                        <div className="hidden sm:flex h-10 w-10 shrink-0 rounded-xl bg-indigo-100 items-center justify-center">
                            <FileText className="h-5 w-5 text-indigo-500" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-bold text-navy-900 truncate">
                                Chatting about: {selectedDocument.title}
                            </p>
                            <p className="text-xs text-navy-400 truncate">
                                {selectedDocument.category} • {selectedDocument.description}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={clearSelection}
                        className="btn-secondary text-xs w-full sm:w-auto"
                    >
                        <X className="h-3.5 w-3.5" />
                        Clear
                    </button>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChatInterface
                    documentId={selectedDocument?.id}
                    documentTitle={selectedDocument?.title}
                />
                <ChatHistory documentId={selectedDocument?.id} />
            </div>
        </div>
    );
}
