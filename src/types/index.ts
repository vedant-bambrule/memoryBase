// Dify.ai API Types
export interface DifyMessage {
    role: 'user' | 'assistant';
    content: string;
    conversation_id?: string;
}

export interface DifyConversation {
    id: string;
    created_at: string;
    updated_at: string;
}

export interface DifyResponse {
    answer: string;
    conversation_id: string;
    message_id: string;
    created_at: number;
    metadata?: {
        usage?: {
            prompt_tokens: number;
            completion_tokens: number;
            total_tokens: number;
        };
    };
}

export interface DifyFileUploadResponse {
    id: string;
    name: string;
    size: number;
    extension: string;
    mime_type: string;
    created_at: number;
}

export interface DocumentUploadStatus {
    status: 'uploading' | 'indexing' | 'indexed' | 'failed';
    progress?: number;
    error?: string;
}

// Existing types
export interface Document {
    id: string;
    title: string;
    description: string;
    category: string;
    fileUrl: string;
    lastUpdated: string;
    status?: 'Draft' | 'Published';
    difyDocumentId?: string;
    uploadStatus?: DocumentUploadStatus;
}

export interface Employee {
    id: string;
    name: string;
    role: string;
    department: string;
    avatarUrl?: string;
}

export type ChatStatus = 'Pending' | 'Success' | 'Error';

export interface ChatMessage {
    id: string;
    question: string;
    aiResponse: string;
    difyConversationId: string;
    status: ChatStatus;
    timestamp: string;
    sources?: string[];
    documentId?: string;
    documentTitle?: string;
}

export interface Category {
    id: string;
    name: string;
    count: number;
}

export interface DashboardStats {
    totalDocuments: number;
    publishedDocuments: number;
    draftDocuments: number;
    totalCategories: number;
    totalEmployees: number;
    totalQAEntries: number;
    qaAnsweredByAI: number;
}
