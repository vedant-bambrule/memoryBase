import { type DifyFileUploadResponse, type ChatMessage } from '../types';

const DIFY_API_KEY = import.meta.env.VITE_DIFY_API_KEY;
const DIFY_API_URL = import.meta.env.VITE_DIFY_API_URL;
const USE_PROXY = import.meta.env.VITE_USE_PROXY === 'true';
const PROXY_URL = import.meta.env.VITE_PROXY_URL || 'http://localhost:3001';

if (!DIFY_API_KEY || !DIFY_API_URL) {
    console.error('Dify API credentials not found in environment variables');
}

/**
 * Send a message to Dify.ai Chat app
 * Uses proxy server if USE_PROXY is enabled to bypass CORS
 */
export async function sendMessageToDify(
    query: string,
    conversationId?: string
): Promise<ChatMessage> {
    try {
        const requestBody = {
            inputs: {},
            query: query,
            response_mode: 'blocking',
            conversation_id: conversationId || '',
            user: 'user-' + Date.now(),
        };

        let url: string;
        let headers: Record<string, string>;

        if (USE_PROXY) {
            // Use proxy server to bypass CORS
            url = `${PROXY_URL}/api/chat`;
            headers = {
                'Content-Type': 'application/json',
            };
            console.log('Using proxy server:', url);
        } else {
            // Direct API call (may have CORS issues)
            let apiUrl = DIFY_API_URL;
            if (!apiUrl.endsWith('/v1')) {
                apiUrl = apiUrl.replace(/\/$/, '') + '/v1';
            }
            url = `${apiUrl}/chat-messages`;
            headers = {
                'Authorization': `Bearer ${DIFY_API_KEY}`,
                'Content-Type': 'application/json',
            };
            console.log('Direct API call:', url);
        }

        console.log('Sending request to Dify:', {
            url,
            body: requestBody
        });

        const response = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorText = await response.text();
            let errorMessage = `Dify API error: ${response.status}`;
            try {
                const errorData = JSON.parse(errorText);
                errorMessage += ` - ${errorData.message || errorData.error || response.statusText}`;
            } catch {
                errorMessage += ` - ${errorText || response.statusText}`;
            }
            throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log('Dify response:', data);

        // Handle chat response format
        const answer = data.answer || 'No response from AI';

        return {
            id: data.message_id || data.id || Math.random().toString(36).substr(2, 9),
            question: query,
            aiResponse: answer,
            difyConversationId: data.conversation_id || conversationId || '',
            status: 'Success',
            timestamp: new Date().toISOString(),
            sources: [],
        };
    } catch (error) {
        console.error('Error sending message to Dify:', error);

        // Provide more helpful error messages
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            const helpMessage = USE_PROXY
                ? 'Network error: Unable to connect to proxy server. Make sure the proxy is running on port 3001.'
                : 'Network error: CORS blocked. Enable proxy mode by setting VITE_USE_PROXY=true in .env and running the proxy server.';
            throw new Error(helpMessage);
        }

        throw error;
    }
}

/**
 * Upload a document to Dify.ai knowledge base
 */
export async function uploadDocumentToDify(
    file: File,
    onProgress?: (progress: number) => void
): Promise<DifyFileUploadResponse> {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const xhr = new XMLHttpRequest();

        return new Promise((resolve, reject) => {
            xhr.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable && onProgress) {
                    const progress = (e.loaded / e.total) * 100;
                    onProgress(progress);
                }
            });

            xhr.addEventListener('load', () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        const data = JSON.parse(xhr.responseText);
                        resolve(data);
                    } catch (e) {
                        reject(new Error('Failed to parse response'));
                    }
                } else {
                    reject(new Error(`Upload failed: ${xhr.status} ${xhr.statusText}`));
                }
            });

            xhr.addEventListener('error', () => {
                reject(new Error('Network error during upload'));
            });

            let apiUrl = DIFY_API_URL;
            if (!apiUrl.endsWith('/v1')) {
                apiUrl = apiUrl.replace(/\/$/, '') + '/v1';
            }

            xhr.open('POST', `${apiUrl}/files/upload`);
            xhr.setRequestHeader('Authorization', `Bearer ${DIFY_API_KEY}`);
            xhr.send(formData);
        });
    } catch (error) {
        console.error('Error uploading document to Dify:', error);
        throw error;
    }
}

/**
 * Get conversation history from Dify
 */
export async function getDifyConversationHistory(
    conversationId: string
): Promise<ChatMessage[]> {
    try {
        let apiUrl = DIFY_API_URL;
        if (!apiUrl.endsWith('/v1')) {
            apiUrl = apiUrl.replace(/\/$/, '') + '/v1';
        }

        const response = await fetch(
            `${apiUrl}/messages?conversation_id=${conversationId}&limit=20`,
            {
                headers: {
                    'Authorization': `Bearer ${DIFY_API_KEY}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch conversation history: ${response.statusText}`);
        }

        const data = await response.json();

        // Transform Dify messages to our ChatMessage format
        return data.data.map((msg: any) => ({
            id: msg.id,
            question: msg.query,
            aiResponse: msg.answer,
            difyConversationId: conversationId,
            status: 'Success' as const,
            timestamp: new Date(msg.created_at * 1000).toISOString(),
        }));
    } catch (error) {
        console.error('Error fetching conversation history:', error);
        return [];
    }
}

/**
 * Create a new conversation
 */
export async function createDifyConversation(): Promise<string> {
    // Dify creates conversations automatically on first message
    // Return empty string to indicate new conversation
    return '';
}

/**
 * Check if Dify API is configured
 */
export function isDifyConfigured(): boolean {
    return !!(DIFY_API_KEY && DIFY_API_URL);
}
