#!/usr/bin/env node

/**
 * Claude Memory Update Hook
 * Automatically updates CLAUDE.md when certain events occur
 * 
 * To use this as a Claude hook, add to your settings:
 * {
 *   "hooks": {
 *     "after_conversation": "node C:\\Users\\b\\Documents\\GitHub\\broker-lead-engine\\claude-memory-hook.js"
 *   }
 * }
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_DIR = 'C:\\Users\\b\\Documents\\GitHub\\broker-lead-engine';
const CLAUDE_MD = path.join(PROJECT_DIR, 'CLAUDE.md');
const MEMORY_MD = path.join(PROJECT_DIR, 'Memory.md');

function updateTimestamp(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const timestamp = new Date().toISOString().split('T')[0];
        
        // Update the last updated line
        content = content.replace(/Last updated: .*/g, `Last updated: ${timestamp}`);
        
        fs.writeFileSync(filePath, content);
        console.log(`✓ Updated timestamp in ${path.basename(filePath)}`);
    } catch (error) {
        console.error(`✗ Error updating ${path.basename(filePath)}:`, error.message);
    }
}

function gitCommit() {
    try {
        process.chdir(PROJECT_DIR);
        
        // Check if there are changes
        const status = execSync('git status --porcelain').toString();
        if (!status.trim()) {
            console.log('✓ No changes to commit');
            return;
        }
        
        // Add and commit changes
        execSync('git add CLAUDE.md Memory.md *.log');
        const timestamp = new Date().toISOString().replace('T', ' ').substr(0, 19);
        execSync(`git commit -m "Auto-update memory - ${timestamp}"`);
        
        console.log('✓ Changes committed to git');
        
        // Optional: Auto-push (uncomment if desired)
        // execSync('git push origin main');
        // console.log('✓ Changes pushed to GitHub');
        
    } catch (error) {
        console.error('✗ Git error:', error.message);
    }
}

function main() {
    console.log('========================================');
    console.log('Claude Memory Update Hook');
    console.log('========================================\n');
    
    // Update timestamps
    updateTimestamp(CLAUDE_MD);
    updateTimestamp(MEMORY_MD);
    
    // Commit changes
    gitCommit();
    
    console.log('\n✓ Memory update complete!');
}

// Run the update
main();