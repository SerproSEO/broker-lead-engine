const fs = require('fs');
const path = require('path');

// Create public directory
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

// Copy all HTML files to public directory
const htmlFiles = fs.readdirSync(__dirname)
    .filter(file => file.endsWith('.html'));

htmlFiles.forEach(file => {
    fs.copyFileSync(
        path.join(__dirname, file),
        path.join(publicDir, file)
    );
    console.log(`Copied ${file} to public/`);
});

// Copy images folder
const imagesSource = path.join(__dirname, 'images');
const imagesDest = path.join(publicDir, 'images');
if (fs.existsSync(imagesSource)) {
    if (!fs.existsSync(imagesDest)) {
        fs.mkdirSync(imagesDest, { recursive: true });
    }
    
    fs.readdirSync(imagesSource).forEach(file => {
        fs.copyFileSync(
            path.join(imagesSource, file),
            path.join(imagesDest, file)
        );
    });
    console.log('Copied images folder to public/');
}

// Copy blog folder
const blogSource = path.join(__dirname, 'blog');
const blogDest = path.join(publicDir, 'blog');
if (fs.existsSync(blogSource)) {
    if (!fs.existsSync(blogDest)) {
        fs.mkdirSync(blogDest, { recursive: true });
    }
    
    fs.readdirSync(blogSource)
        .filter(file => file.endsWith('.html'))
        .forEach(file => {
            fs.copyFileSync(
                path.join(blogSource, file),
                path.join(blogDest, file)
            );
        });
    console.log('Copied blog folder to public/');
}

// Copy legal folder
const legalSource = path.join(__dirname, 'legal');
const legalDest = path.join(publicDir, 'legal');
if (fs.existsSync(legalSource)) {
    if (!fs.existsSync(legalDest)) {
        fs.mkdirSync(legalDest, { recursive: true });
    }
    
    fs.readdirSync(legalSource)
        .filter(file => file.endsWith('.html'))
        .forEach(file => {
            fs.copyFileSync(
                path.join(legalSource, file),
                path.join(legalDest, file)
            );
        });
    console.log('Copied legal folder to public/');
}

// Copy founder folder
const founderSource = path.join(__dirname, 'founder');
const founderDest = path.join(publicDir, 'founder');
if (fs.existsSync(founderSource)) {
    if (!fs.existsSync(founderDest)) {
        fs.mkdirSync(founderDest, { recursive: true });
    }
    
    fs.readdirSync(founderSource)
        .filter(file => file.endsWith('.html'))
        .forEach(file => {
            fs.copyFileSync(
                path.join(founderSource, file),
                path.join(founderDest, file)
            );
        });
    console.log('Copied founder folder to public/');
}

// Copy favicon
if (fs.existsSync('favicon.ico')) {
    fs.copyFileSync('favicon.ico', path.join(publicDir, 'favicon.ico'));
    console.log('Copied favicon.ico to public/');
}

// Copy logo
if (fs.existsSync('logo.png')) {
    fs.copyFileSync('logo.png', path.join(publicDir, 'logo.png'));
    console.log('Copied logo.png to public/');
}

// Create robots.txt
const robotsTxt = `User-agent: *
Allow: /
Sitemap: https://brokerleadengine.com/sitemap.xml`;
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);
console.log('Created robots.txt');

// Create simple sitemap.xml
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://brokerleadengine.com/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://brokerleadengine.com/services.html</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://brokerleadengine.com/pricing.html</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://brokerleadengine.com/contact.html</loc>
    <priority>0.8</priority>
  </url>
</urlset>`;
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
console.log('Created sitemap.xml');

console.log('\n✅ Build complete! Static files copied to public/ directory');