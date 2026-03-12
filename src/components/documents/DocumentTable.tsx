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
        e.stopPropagation();
        navigate(`/assistant/${documentId}`);
    };

    if (documents.length === 0) {
        return (
            <div className="card">
                <div className="flex flex-col items-center justify-center py-16 px-6">
                    <div className="p-4 rounded-2xl bg-surface-100 mb-4">
                        <FileText className="h-12 w-12 text-navy-300" />
                    </div>
                    <h3 className="text-lg font-bold text-navy-900 mb-1">No documents yet</h3>
                    <p className="text-sm text-navy-400 text-center max-w-sm">
                        Get started by uploading your first document using the "Upload Document" button above.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="card overflow-hidden">
            <div className="divide-y divide-surface-200">
                {groupedDocuments.map(({ category, documents: categoryDocs }) => {
                    const isExpanded = expandedCategories.has(category);

                    return (
                        <div key={category}>
                            {/* Folder Header */}
                            <div className="flex items-center gap-3 px-6 py-4 bg-surface-50 hover:bg-surface-100 transition-colors">
                                <div
                                    onClick={() => toggleCategory(category)}
                                    className="flex items-center gap-2.5 flex-1 cursor-pointer"
                                >
                                    <div className="p-1 rounded-lg transition-transform duration-200" style={{ transform: isExpanded ? 'rotate(0deg)' : 'rotate(0deg)' }}>
                                        {isExpanded ? (
                                            <ChevronDown className="h-4 w-4 text-navy-500" />
                                        ) : (
                                            <ChevronRight className="h-4 w-4 text-navy-400" />
                                        )}
                                    </div>
                                    <div className="p-1.5 rounded-lg bg-indigo-50">
                                        {isExpanded ? (
                                            <FolderOpen className="h-4 w-4 text-indigo-500" />
                                        ) : (
                                            <Folder className="h-4 w-4 text-indigo-500" />
                                        )}
                                    </div>
                                    <span className="text-sm font-bold text-navy-800">{category}</span>
                                    <span className="badge-info text-[10px]">
                                        {categoryDocs.length} {categoryDocs.length === 1 ? 'doc' : 'docs'}
                                    </span>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (categoryDocs.length > 0) {
                                            navigate(`/assistant/${categoryDocs[0].id}`);
                                        }
                                    }}
                                    className="p-2 hover:bg-indigo-50 rounded-xl transition-colors group"
                                    title="Chat about this folder"
                                >
                                    <MessageSquare className="h-4 w-4 text-indigo-400 group-hover:text-indigo-600" />
                                </button>
                            </div>

                            {/* Documents List */}
                            {isExpanded && (
                                <div className="bg-white overflow-x-auto">
                                    <table className="min-w-full divide-y divide-surface-200">
                                        <thead className="bg-surface-50/50">
                                            <tr>
                                                <th scope="col" className="px-4 sm:px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-navy-400">
                                                    Title
                                                </th>
                                                <th scope="col" className="px-4 sm:px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-navy-400 hidden sm:table-cell">
                                                    Description
                                                </th>
                                                <th scope="col" className="px-4 sm:px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-navy-400">
                                                    Status
                                                </th>
                                                <th scope="col" className="px-4 sm:px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-navy-400 hidden md:table-cell">
                                                    Last Updated
                                                </th>
                                                <th scope="col" className="relative px-4 sm:px-6 py-3">
                                                    <span className="sr-only">Actions</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-surface-200 bg-white">
                                            {categoryDocs.map((doc) => (
                                                <tr key={doc.id} className="hover:bg-surface-50 transition-colors group">
                                                    <td className="whitespace-nowrap px-4 sm:px-6 py-4">
                                                        <div className="flex items-center gap-2 sm:gap-3">
                                                            <div className="flex-shrink-0">
                                                                <FileText className="h-4 w-4 text-navy-300 group-hover:text-indigo-500 transition-colors" />
                                                            </div>
                                                            <div className="flex items-center gap-1.5">
                                                                <span className="text-sm font-semibold text-navy-800 truncate max-w-[120px] sm:max-w-[200px]">{doc.title}</span>
                                                                <Sparkles className="h-3 w-3 text-indigo-400" />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 sm:px-6 py-4 hidden sm:table-cell">
                                                        <span className="text-sm text-navy-400 truncate block max-w-xs">{doc.description}</span>
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 sm:px-6 py-4">
                                                        {doc.status === 'Draft' ? (
                                                            <span className="badge-warning text-[10px]">Draft</span>
                                                        ) : (
                                                            <span className="badge-success text-[10px]">Published</span>
                                                        )}
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm text-navy-400 hidden md:table-cell">
                                                        {new Date(doc.lastUpdated).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric'
                                                        })}
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-right">
                                                        <div className="flex items-center justify-end gap-1">
                                                            <button
                                                                onClick={(e) => handleAIClick(doc.id, e)}
                                                                className="p-1.5 hover:bg-indigo-50 rounded-lg transition-colors"
                                                                title="Chat about this document"
                                                            >
                                                                <MessageSquare className="h-4 w-4 text-indigo-400 hover:text-indigo-600" />
                                                            </button>
                                                            <a
                                                                href={doc.fileUrl}
                                                                className="p-1.5 hover:bg-surface-100 rounded-lg transition-colors inline-flex items-center"
                                                                title="Download"
                                                                onClick={(e) => e.stopPropagation()}
                                                            >
                                                                <Download className="h-4 w-4 text-navy-400 hover:text-navy-600" />
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
