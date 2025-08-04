// Test MCP Server Connection
console.log('Testing MCP Server Connection...\n');

// Test environment variables
console.log('Environment Variables:');
console.log('- FIRECRAWL_API_KEY:', process.env.FIRECRAWL_API_KEY ? '✓ Set' : '✗ Missing');
console.log('- DATAFORSEO_LOGIN:', process.env.DATAFORSEO_LOGIN ? '✓ Set' : '✗ Missing');
console.log('- DATAFORSEO_PASSWORD:', process.env.DATAFORSEO_PASSWORD ? '✓ Set' : '✗ Missing');
console.log('- PERPLEXITY_API_KEY:', process.env.PERPLEXITY_API_KEY ? '✓ Set' : '✗ Missing');

// Load .env file
require('dotenv').config();

console.log('\nAfter loading .env:');
console.log('- FIRECRAWL_API_KEY:', process.env.FIRECRAWL_API_KEY ? '✓ Set' : '✗ Missing');
console.log('- DATAFORSEO_LOGIN:', process.env.DATAFORSEO_LOGIN ? '✓ Set' : '✗ Missing');
console.log('- DATAFORSEO_PASSWORD:', process.env.DATAFORSEO_PASSWORD ? '✓ Set' : '✗ Missing');
console.log('- PERPLEXITY_API_KEY:', process.env.PERPLEXITY_API_KEY ? '✓ Set' : '✗ Missing');

// Test MCP SDK
try {
    const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
    console.log('\n✓ MCP SDK loaded successfully');
} catch (error) {
    console.log('\n✗ Failed to load MCP SDK:', error.message);
}

// Test Firecrawl
try {
    const { FirecrawlApp } = require('@mendable/firecrawl-js');
    console.log('✓ Firecrawl SDK loaded successfully');
} catch (error) {
    console.log('✗ Failed to load Firecrawl SDK:', error.message);
}

console.log('\nMCP server files:');
const fs = require('fs');
if (fs.existsSync('./mcp-server.js')) {
    console.log('✓ mcp-server.js exists');
}
if (fs.existsSync('./enhanced-mcp-server.js')) {
    console.log('✓ enhanced-mcp-server.js exists');
}

console.log('\nTest complete!');