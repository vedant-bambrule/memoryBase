import { useState } from 'react';
import { X, Upload, FileText } from 'lucide-react';

interface UploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpload: (data: { title: string; description: string; category: string; lastUpdated: string; status: 'Draft' | 'Published'; file?: File }) => void;
}

export function UploadModal({ isOpen, onClose, onUpload }: UploadModalProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('HR');
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpload({
            title,
            description,
            category,
            lastUpdated: new Date().toISOString(),
            status: 'Published',
            file: file || undefined,
        });
        setTitle('');
        setDescription('');
        setCategory('HR');
        setFile(null);
        onClose();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            if (!title) {
                setTitle(selectedFile.name.replace(/\.[^/.]+$/, ''));
            }
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            setFile(droppedFile);
            if (!title) {
                setTitle(droppedFile.name.replace(/\.[^/.]+$/, ''));
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="fixed inset-0 bg-navy-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />
                <div className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-elevated animate-fade-in">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-navy-900 tracking-tight">Upload Document</h2>
                            <p className="text-sm text-navy-400 mt-0.5">Add a new file to your knowledge base</p>
                        </div>
                        <button onClick={onClose} className="p-2 rounded-xl hover:bg-surface-100 transition-colors text-navy-400 hover:text-navy-600">
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* File Upload Area */}
                        <div>
                            <label className="block text-sm font-semibold text-navy-700 mb-2">
                                Document File
                            </label>
                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 ${isDragging
                                    ? 'border-accent bg-accent-50 scale-[1.01]'
                                    : 'border-surface-300 hover:border-indigo-300 hover:bg-surface-50'
                                    }`}
                            >
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    accept=".pdf,.doc,.docx,.txt,.md"
                                />
                                {file ? (
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="p-3 rounded-xl bg-indigo-50">
                                            <FileText className="h-6 w-6 text-indigo-500" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-sm font-semibold text-navy-900">{file.name}</p>
                                            <p className="text-xs text-navy-400">
                                                {(file.size / 1024).toFixed(2)} KB
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="mx-auto h-14 w-14 rounded-2xl bg-surface-100 flex items-center justify-center mb-3">
                                            <Upload className="h-6 w-6 text-navy-400" />
                                        </div>
                                        <p className="text-sm font-medium text-navy-600">
                                            Drag and drop your file here
                                        </p>
                                        <p className="mt-1 text-xs text-navy-400">
                                            or <span className="text-indigo-500 font-semibold">click to browse</span>
                                        </p>
                                        <p className="mt-2 text-[10px] text-navy-300 uppercase tracking-wide font-medium">
                                            PDF, DOC, DOCX, TXT, MD — up to 10MB
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-navy-700 mb-1.5">
                                Title
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="input-field"
                                placeholder="Document title"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-navy-700 mb-1.5">
                                Description
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                                className="input-field resize-none"
                                placeholder="Brief description of the document"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-navy-700 mb-1.5">
                                Category
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="input-field"
                            >
                                <option value="HR">HR</option>
                                <option value="Finance">Finance</option>
                                <option value="Operations">Operations</option>
                            </select>
                        </div>
                        <div className="flex gap-3 justify-end pt-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="btn-secondary"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn-accent"
                            >
                                <Upload className="h-4 w-4" />
                                Upload
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
