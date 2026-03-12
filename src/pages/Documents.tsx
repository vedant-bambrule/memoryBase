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
            const savedDocs = localStorage.getItem(STORAGE_KEY);
            if (savedDocs) {
                setDocuments(JSON.parse(savedDocs));
            } else {
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
        setDocuments(docs);
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
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="page-header mb-0">
                    <h1 className="page-title">Documents</h1>
                    <p className="page-subtitle">
                        Manage SOPs and knowledge base files
                    </p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn-accent w-full sm:w-auto"
                >
                    <Plus className="h-4 w-4" />
                    Upload Document
                </button>
            </div>

            {loading ? (
                <div className="flex h-64 items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                        <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-surface-300 border-t-indigo-500" />
                        <p className="text-sm text-navy-400 font-medium">Loading documents...</p>
                    </div>
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
