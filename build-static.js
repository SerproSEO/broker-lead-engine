#!/usr/bin/env node

/**
 * Build Static Site for DigitalOcean Deployment
 * 
 * This script creates a static site build by organizing all HTML files
 * and assets into a proper directory structure for deployment.
 */

const fs = require('fs');
const path = require('path');

// Build configuration
const BUILD_DIR = 'dist';
const SOURCE_DIR = '.';

// Files to copy to build directory
const HTML_FILES = [
    'index.html',
    'ai-demo.html',
    'ai-lead-generation.html',
    'about.html',
    'case-study-stucco-dominance.html',
    'cold-email.html',
    'contact.html',
    'faq.html',
    'google-ppc.html',
    'guarantee.html',
    'local-seo.html',
    'marketing-automation.html',
    'meta-ads.html',
    'ppc-audit-landing.html',
    'pricing.html',
    'privacy-policy.html',
    'services.html',
    'success-stories.html',
    'terms-of-service.html',
    'thank-you.html'
];

const ASSET_FILES = [
    'logo.png',
    'favicon.ico'
];

const JS_FILES = [
    'typeform-advanced-integrations.js'
];

function createBuildDirectory() {
    console.log('🏗️  Creating build directory...');
    
    // Remove existing build directory
    if (fs.existsSync(BUILD_DIR)) {
        fs.rmSync(BUILD_DIR, { recursive: true, force: true });
    }
    
    // Create new build directory
    fs.mkdirSync(BUILD_DIR, { recursive: true });
    console.log('✅ Build directory created');
}

function copyFiles() {
    console.log('📄 Copying HTML files...');
    
    // Copy HTML files
    HTML_FILES.forEach(file => {
        const sourcePath = path.join(SOURCE_DIR, file);
        const destPath = path.join(BUILD_DIR, file);
        
        if (fs.existsSync(sourcePath)) {
            fs.copyFileSync(sourcePath, destPath);
            console.log(`   ✓ ${file}`);
        } else {
            console.log(`   ⚠️  ${file} not found, skipping...`);
        }
    });
    
    console.log('🖼️  Copying asset files...');
    
    // Copy asset files
    ASSET_FILES.forEach(file => {
        const sourcePath = path.join(SOURCE_DIR, file);
        const destPath = path.join(BUILD_DIR, file);
        
        if (fs.existsSync(sourcePath)) {
            fs.copyFileSync(sourcePath, destPath);
            console.log(`   ✓ ${file}`);
        } else {
            console.log(`   ⚠️  ${file} not found, skipping...`);
        }
    });
    
    console.log('📜 Copying JavaScript files...');
    
    // Copy JavaScript files
    JS_FILES.forEach(file => {
        const sourcePath = path.join(SOURCE_DIR, file);
        const destPath = path.join(BUILD_DIR, file);
        
        if (fs.existsSync(sourcePath)) {
            fs.copyFileSync(sourcePath, destPath);
            console.log(`   ✓ ${file}`);
        } else {
            console.log(`   ⚠️  ${file} not found, skipping...`);
        }
    });
}

function createNetlifyConfig() {
    console.log('🔧 Creating deployment configuration...');
    
    // Create _redirects file for SPA routing (if needed)
    const redirectsContent = `# Redirects for Broker Lead Engine
/audit /ppc-audit-landing.html 200
/free-audit /ppc-audit-landing.html 200
/consultation /contact.html 200
/get-started /contact.html 200

# Handle missing trailing slash
/services /services.html 200
/pricing /pricing.html 200
/about /about.html 200
/contact /contact.html 200

# 404 fallback
/* /index.html 404`;

    fs.writeFileSync(path.join(BUILD_DIR, '_redirects'), redirectsContent);
    console.log('   ✓ _redirects file created');
    
    // Create robots.txt
    const robotsContent = `User-agent: *
Allow: /

Sitemap: https://seal-app-he5wy.ondigitalocean.app/sitemap.xml`;

    fs.writeFileSync(path.join(BUILD_DIR, 'robots.txt'), robotsContent);
    console.log('   ✓ robots.txt created');
}

function generateSitemap() {
    console.log('🗺️  Generating sitemap...');
    
    const baseUrl = 'https://seal-app-he5wy.ondigitalocean.app';
    const currentDate = new Date().toISOString().split('T')[0];
    
    let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Add each HTML page to sitemap
    HTML_FILES.forEach(file => {
        if (file !== 'thank-you.html') { // Don't index thank you pages
            const url = file === 'index.html' ? baseUrl : `${baseUrl}/${file}`;
            const priority = file === 'index.html' ? '1.0' : 
                           file === 'services.html' || file === 'pricing.html' ? '0.9' :
                           file === 'ppc-audit-landing.html' ? '0.8' : '0.7';
            
            sitemapContent += `
    <url>
        <loc>${url}</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>${priority}</priority>
    </url>`;
        }
    });
    
    sitemapContent += `
</urlset>`;

    fs.writeFileSync(path.join(BUILD_DIR, 'sitemap.xml'), sitemapContent);
    console.log('   ✓ sitemap.xml created');
}

function validateBuild() {
    console.log('🔍 Validating build...');
    
    const requiredFiles = ['index.html', 'services.html', 'pricing.html', 'contact.html'];
    let allValid = true;
    
    requiredFiles.forEach(file => {
        const filePath = path.join(BUILD_DIR, file);
        if (fs.existsSync(filePath)) {
            console.log(`   ✓ ${file} exists`);
        } else {
            console.log(`   ❌ ${file} missing`);
            allValid = false;
        }
    });
    
    return allValid;
}

function generateBuildInfo() {
    console.log('📊 Generating build info...');
    
    const buildInfo = {
        buildTime: new Date().toISOString(),
        nodeVersion: process.version,
        platform: process.platform,
        files: fs.readdirSync(BUILD_DIR),
        totalFiles: fs.readdirSync(BUILD_DIR).length
    };
    
    fs.writeFileSync(
        path.join(BUILD_DIR, 'build-info.json'), 
        JSON.stringify(buildInfo, null, 2)
    );
    
    console.log('   ✓ build-info.json created');
    return buildInfo;
}

// Main build process
function build() {
    console.log('🚀 Starting static site build for DigitalOcean...\n');
    
    try {
        createBuildDirectory();
        copyFiles();
        createNetlifyConfig();
        generateSitemap();
        
        const buildInfo = generateBuildInfo();
        
        if (validateBuild()) {
            console.log('\n✅ Build completed successfully!');
            console.log(`📁 Built ${buildInfo.totalFiles} files to /${BUILD_DIR}`);
            console.log(`🕐 Build time: ${buildInfo.buildTime}`);
            console.log(`🌐 Ready for deployment to: https://seal-app-he5wy.ondigitalocean.app`);
        } else {
            console.log('\n❌ Build validation failed!');
            process.exit(1);
        }
        
    } catch (error) {
        console.error('\n❌ Build failed:', error.message);
        process.exit(1);
    }
}

// Run build if called directly
if (require.main === module) {
    build();
}

module.exports = { build };