const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files (HTML, CSS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Set Content Security Policy headers
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "font-src 'self' data:;"); // Allow loading fonts from 'self' and 'data:'
    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/fetchProducts', async (req, res) => {
    // Your fetchProducts endpoint logic
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});