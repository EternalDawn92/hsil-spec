// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { encodeIntent } = require('./service');
const { validateAndRepairHSIL } = require('./hsil');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'HSIL Sandbox Backend Running' });
});

// Encode Intent Endpoint
app.post('/encode-intent', async (req, res) => {
    const { text } = req.body;

    if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid "text" field' });
    }

    try {
        const hsil = await encodeIntent(text);
        res.json({ hsil });
    } catch (error) {
        console.error("Unexpected error in /encode-intent:", error);
        // Even on crash, try to return a fallback so frontend doesn't break
        res.status(500).json({ error: 'Internal Server Error', fallback: true });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    if (!process.env.GROQ_API_KEY) {
        console.warn("WARNING: GROQ_API_KEY not set. Backend will operate in fallback mode.");
    }
});
