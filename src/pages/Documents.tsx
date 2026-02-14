import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { DocumentTable } from '../components/documents/DocumentTable';
import { UploadModal } from '../components/documents/UploadModal';
import { getDocuments } from '../services/mockService';
import { type Document } from '../types';

const STORAGE_KEY = 'knowledgehub_documents';

export function Documents() {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDocuments();
    }, []);

    const loadDocuments = async () => {
        try {
            // First, try to load from localStorage
            const savedDocs = localStorage.getItem(STORAGE_KEY);
            if (savedDocs) {
                setDocuments(JSON.parse(savedDocs));
            } else {
                // Fallback to mock service if no saved documents
                const data = await getDocuments();
                setDocuments(data);
            }
        } catch (error) {
            console.error('Failed to load documents', error);
        } finally {
            setLoading(false);
        }
    };

    const saveDocuments = (docs: Document[]) => {
        // Save to state
        setDocuments(docs);
        // Save to localStorage for persistence
        localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
    };

    const handleUpload = (newDocData: any) => {
        const newDoc: Document = {
            id: Math.random().toString(36).substr(2, 9),
            ...newDocData,
            fileUrl: '#',
        };
        const updatedDocs = [newDoc, ...documents];
        saveDocuments(updatedDocs);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage standard operating procedures and knowledge base files.
                    </p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    <Plus className="h-4 w-4" />
                    Upload Document
                </button>
            </div>

            {loading ? (
                <div className="flex h-64 items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
                </div>
            ) : (
                <DocumentTable documents={documents} />
            )}

            <UploadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onUpload={handleUpload}
            />
        </div>
    );
}
