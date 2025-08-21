const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files
app.use(express.static(__dirname));

// Serve images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Serve blog
app.use('/blog', express.static(path.join(__dirname, 'blog')));

// Serve legal
app.use('/legal', express.static(path.join(__dirname, 'legal')));

// Serve founder
app.use('/founder', express.static(path.join(__dirname, 'founder')));

// Default route - serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Catch all route - try to serve HTML file with CLEAN URLs (no .html extension)
// Example: /pricing instead of /pricing.html
app.get('*', (req, res) => {
    let filePath = req.path;
    
    // Remove leading slash
    if (filePath.startsWith('/')) {
        filePath = filePath.substring(1);
    }
    
    // CLEAN URL FEATURE: If someone visits /page.html, redirect to /page
    if (filePath.endsWith('.html')) {
        const cleanUrl = '/' + filePath.slice(0, -5);
        return res.redirect(301, cleanUrl);
    }
    
    // Try to find HTML file
    let fullPath = path.join(__dirname, filePath + '.html');
    
    // Check if file exists
    if (fs.existsSync(fullPath)) {
        res.sendFile(fullPath);
    } else {
        // Check if it's a directory with index.html
        fullPath = path.join(__dirname, filePath, 'index.html');
        if (fs.existsSync(fullPath)) {
            res.sendFile(fullPath);
        } else {
            // 404 - redirect to home
            res.redirect('/');
        }
    }
});

app.listen(PORT, () => {
    console.log(`Broker Lead Engine server running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to view the site`);
    console.log(`Clean URLs enabled - no .html extensions needed`);
});