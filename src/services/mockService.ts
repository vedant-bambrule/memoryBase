import { type Document, type Employee, type ChatMessage, type DashboardStats, type Category } from '../types';

// Mock Data - Start with empty documents array
// Documents will be added when users upload them
export const mockDocuments: Document[] = [];

export const mockEmployees: Employee[] = [
    {
        id: '1',
        name: 'Alice Johnson',
        role: 'HR Manager',
        department: 'Human Resources',
    },
    {
        id: '2',
        name: 'Bob Smith',
        role: 'Senior Developer',
        department: 'Engineering',
    },
    {
        id: '3',
        name: 'Charlie Brown',
        role: 'Accountant',
        department: 'Finance',
    },
];

// Chat history will be populated from Dify.ai conversations
export const mockChatHistory: ChatMessage[] = [];

const mockCategories: Category[] = [
    { id: '1', name: 'HR', count: 0 },
    { id: '2', name: 'Finance', count: 0 },
    { id: '3', name: 'Operations', count: 0 },
];

// Mock Services
export const getDocuments = async (): Promise<Document[]> => {
    return new Promise((resolve) => setTimeout(() => resolve([...mockDocuments]), 500));
};

export const getEmployees = async (): Promise<Employee[]> => {
    return new Promise((resolve) => setTimeout(() => resolve([...mockEmployees]), 500));
};

export const getChatHistory = async (): Promise<ChatMessage[]> => {
    return new Promise((resolve) => setTimeout(() => resolve([...mockChatHistory]), 500));
};

export const getCategories = async (): Promise<Category[]> => {
    return new Promise((resolve) => setTimeout(() => resolve([...mockCategories]), 500));
};

export const getDashboardStats = async (): Promise<DashboardStats> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const publishedDocs = mockDocuments.filter(d => d.status === 'Published').length;
            const draftDocs = mockDocuments.filter(d => d.status === 'Draft').length;
            const qaAnswered = mockChatHistory.filter(m => m.status === 'Success').length;

            resolve({
                totalDocuments: mockDocuments.length,
                publishedDocuments: publishedDocs,
                draftDocuments: draftDocs,
                totalCategories: mockCategories.length,
                totalEmployees: mockEmployees.length,
                totalQAEntries: mockChatHistory.length,
                qaAnsweredByAI: qaAnswered,
            });
        }, 500);
    });
};

export const sendChatMessage = async (question: string): Promise<ChatMessage> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: Math.random().toString(36).substr(2, 9),
                question,
                aiResponse: `This is a simulated response for: "${question}"`,
                difyConversationId: `conv_${Math.random().toString(36).substr(2, 9)}`,
                status: 'Success',
                timestamp: new Date().toISOString(),
            });
        }, 2000); // Simulate API delay
    });
};
