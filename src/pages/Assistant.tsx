import { useParams, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
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
            // Load the document details
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
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">AI Assistant</h1>
                <p className="mt-1 text-sm text-gray-500">
                    {selectedDocument
                        ? `Ask questions about "${selectedDocument.title}"`
                        : 'Ask questions about your documents and get AI-powered answers'}
                </p>
            </div>

            {selectedDocument && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                            <span className="text-2xl">📄</span>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-blue-900">
                                Chatting about: {selectedDocument.title}
                            </p>
                            <p className="text-xs text-blue-700">
                                {selectedDocument.category} • {selectedDocument.description}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={clearSelection}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-100 rounded-md transition-colors"
                    >
                        <X className="h-4 w-4" />
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
