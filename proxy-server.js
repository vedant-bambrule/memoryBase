const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS for frontend
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());

// Proxy endpoint for Dify chat
app.post('/api/chat', async (req, res) => {
    try {
        const DIFY_API_KEY = process.env.DIFY_API_KEY || 'app-dB0SvdA4SHM6HI7ivUt3psC1';
        const DIFY_API_URL = process.env.DIFY_API_URL || 'https://api.dify.ai/v1';

        console.log('Proxying request to Dify:', {
            url: `${DIFY_API_URL}/chat-messages`,
            query: req.body.query?.substring(0, 50) + '...'
        });

        const response = await fetch(`${DIFY_API_URL}/chat-messages`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${DIFY_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Dify API error:', response.status, errorText);
            return res.status(response.status).json({
                error: `Dify API error: ${response.status}`,
                details: errorText
            });
        }

        const data = await response.json();
        console.log('Dify response received successfully');
        res.json(data);
    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).json({
            error: 'Proxy server error',
            message: error.message
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Dify proxy server is running' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`\n🚀 Dify Proxy Server running on http://localhost:${PORT}`);
    console.log(`   Health check: http://localhost:${PORT}/health`);
    console.log(`   Chat endpoint: http://localhost:${PORT}/api/chat\n`);
});
