import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Download, Folder, FolderOpen, ChevronRight, ChevronDown, Sparkles, MessageSquare } from 'lucide-react';
import { type Document } from '../../types';

interface DocumentTableProps {
    documents: Document[];
}

export function DocumentTable({ documents }: DocumentTableProps) {
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
    const navigate = useNavigate();

    // Group documents by category
    const groupedDocuments = useMemo(() => {
        const groups: Record<string, Document[]> = {};
        documents.forEach(doc => {
            if (!groups[doc.category]) {
                groups[doc.category] = [];
            }
            groups[doc.category].push(doc);
        });

        return Object.entries(groups).map(([category, docs]) => ({
            category,
            documents: docs.sort((a, b) =>
                new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
            ),
        }));
    }, [documents]);

    const toggleCategory = (category: string) => {
        setExpandedCategories(prev => {
            const newSet = new Set(prev);
            if (newSet.has(category)) {
                newSet.delete(category);
            } else {
                newSet.add(category);
            }
            return newSet;
        });
    };

    const handleAIClick = (documentId: string, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent row/folder click
        navigate(`/assistant/${documentId}`);
    };

    // Show empty state if no documents
    if (documents.length === 0) {
        return (
            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="flex flex-col items-center justify-center py-12 px-6">
                    <FileText className="h-16 w-16 text-gray-300 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No documents yet</h3>
                    <p className="text-sm text-gray-500 text-center max-w-sm">
                        Get started by uploading your first document using the "Upload Document" button above.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="divide-y divide-gray-200">
                {groupedDocuments.map(({ category, documents: categoryDocs }) => {
                    const isExpanded = expandedCategories.has(category);

                    return (
                        <div key={category}>
                            {/* Folder Header */}
                            <div className="flex items-center gap-3 px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                                <div
                                    onClick={() => toggleCategory(category)}
                                    className="flex items-center gap-2 flex-1 cursor-pointer"
                                >
                                    {isExpanded ? (
                                        <ChevronDown className="h-4 w-4 text-gray-600" />
                                    ) : (
                                        <ChevronRight className="h-4 w-4 text-gray-600" />
                                    )}
                                    {isExpanded ? (
                                        <FolderOpen className="h-5 w-5 text-blue-500" />
                                    ) : (
                                        <Folder className="h-5 w-5 text-blue-500" />
                                    )}
                                    <span className="text-sm font-semibold text-gray-900">{category}</span>
                                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                        {categoryDocs.length} {categoryDocs.length === 1 ? 'document' : 'documents'}
                                    </span>
                                </div>
                                {/* AI Chat Icon for Folder */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // Navigate to assistant with first document in category
                                        if (categoryDocs.length > 0) {
                                            navigate(`/assistant/${categoryDocs[0].id}`);
                                        }
                                    }}
                                    className="p-2 hover:bg-blue-100 rounded-md transition-colors group"
                                    title="Chat about this folder"
                                >
                                    <MessageSquare className="h-5 w-5 text-purple-600 group-hover:text-purple-700" />
                                </button>
                            </div>

                            {/* Documents List */}
                            {isExpanded && (
                                <div className="bg-white">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Title
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Description
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Status
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                    Last Updated
                                                </th>
                                                <th scope="col" className="relative px-6 py-3">
                                                    <span className="sr-only">Actions</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {categoryDocs.map((doc) => (
                                                <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex-shrink-0 pl-6">
                                                                <FileText className="h-5 w-5 text-gray-400" />
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <div className="text-sm font-medium text-gray-900">{doc.title}</div>
                                                                <div title="AI Search Enabled">
                                                                    <Sparkles className="h-4 w-4 text-purple-500" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-500 truncate max-w-xs">{doc.description}</div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4">
                                                        {doc.status === 'Draft' ? (
                                                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                                                                Draft
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                                                Published
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                        {new Date(doc.lastUpdated).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric'
                                                        })}
                                                    </td>
                                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                        <div className="flex items-center justify-end gap-2">
                                                            {/* AI Chat Icon for Document */}
                                                            <button
                                                                onClick={(e) => handleAIClick(doc.id, e)}
                                                                className="p-1.5 hover:bg-purple-100 rounded-md transition-colors group"
                                                                title="Chat about this document"
                                                            >
                                                                <MessageSquare className="h-5 w-5 text-purple-600 group-hover:text-purple-700" />
                                                            </button>
                                                            {/* Download Icon */}
                                                            <a
                                                                href={doc.fileUrl}
                                                                className="p-1.5 hover:bg-blue-100 rounded-md transition-colors inline-flex items-center"
                                                                title="Download"
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                <Download className="h-5 w-5 text-blue-600" />
                                                            </a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
