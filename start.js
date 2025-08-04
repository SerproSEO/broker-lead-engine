#!/usr/bin/env node

// 🚀 BROKER LEAD ENGINE - QUICK START LAUNCHER
// Launch your $100K/month automation system instantly

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 BROKER LEAD ENGINE - QUICK START
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
    console.log('⚠️  No .env file found. Using default configuration...');
} else {
    console.log('✅ Environment configuration loaded');
}

console.log(`
🎯 WHAT THIS SYSTEM WILL DO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔍 LEAD GENERATION:
   • Automatically find high-quality insurance leads 24/7
   • Scrape LinkedIn, Google Maps, and business directories
   • AI-powered lead scoring and qualification
   • Target construction, manufacturing, and healthcare companies

🌐 WEBSITE AUTOMATION:
   • Generate complete client websites in minutes
   • SEO-optimized with lead capture forms
   • Mobile-responsive and conversion-focused
   • Automatic deployment to hosting

🗄️ CRM AUTOMATION:
   • Process leads through automated pipeline
   • AI-powered client onboarding
   • Automated follow-up sequences
   • Client health monitoring and retention

📊 REPORTING & ANALYTICS:
   • Real-time KPI dashboard
   • Automated client reports
   • Revenue tracking and forecasting
   • Path to $100K/month planning

🤖 MCP INTEGRATION:
   • Direct Claude Code connectivity
   • Voice-activated business operations
   • Automated task execution
   • Complete hands-off scaling

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚀 LAUNCHING SYSTEM...
`);

// Start the main system
try {
    const mainProcess = spawn('node', ['index.js'], {
        stdio: 'inherit',
        cwd: __dirname
    });

    mainProcess.on('error', (error) => {
        console.error('❌ Failed to start system:', error.message);
        process.exit(1);
    });

    mainProcess.on('close', (code) => {
        if (code !== 0) {
            console.error(`❌ System exited with code ${code}`);
        } else {
            console.log('✅ System shut down successfully');
        }
        process.exit(code);
    });

    // Handle graceful shutdown
    process.on('SIGINT', () => {
        console.log('\n🛑 Shutting down system...');
        mainProcess.kill('SIGINT');
    });

    process.on('SIGTERM', () => {
        console.log('\n🛑 Shutting down system...');
        mainProcess.kill('SIGTERM');
    });

} catch (error) {
    console.error('❌ System startup failed:', error);
    process.exit(1);
}

console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎉 SYSTEM STARTING UP...

📊 Dashboard: http://localhost:3001
🌐 Main API: http://localhost:3000
🤖 MCP Server: Available for Claude Code connection

💡 NEXT STEPS:
1. Open Claude Code and connect to the MCP server
2. Use the dashboard to monitor your agency performance  
3. Configure your API keys for full functionality
4. Watch your automated marketing agency scale to $100K/month!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);