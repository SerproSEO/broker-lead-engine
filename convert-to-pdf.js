const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');
const { marked } = require('marked');

async function convertMarkdownToPDF() {
    try {
        // Read the markdown file
        const markdownContent = await fs.readFile('youtube-script-referral-networks-dead.md', 'utf8');
        
        // Convert markdown to HTML with better styling
        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 60px;
            color: #333;
        }
        h1 {
            color: #2c3e50;
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
            margin-bottom: 30px;
            font-size: 28px;
        }
        h2 {
            color: #34495e;
            margin-top: 30px;
            margin-bottom: 15px;
            font-size: 20px;
            background: #f0f0f0;
            padding: 10px 15px;
            border-left: 4px solid #3498db;
        }
        h3 {
            color: #555;
            margin-top: 20px;
            margin-bottom: 10px;
            font-size: 16px;
            font-weight: 600;
        }
        ul {
            margin: 10px 0;
            padding-left: 25px;
        }
        li {
            margin: 8px 0;
            line-height: 1.5;
        }
        strong {
            color: #2c3e50;
            font-weight: 600;
        }
        ul li ul {
            margin-top: 5px;
            margin-bottom: 5px;
        }
        ul li ul li {
            font-size: 14px;
            color: #666;
            margin: 4px 0;
        }
        hr {
            border: none;
            border-top: 2px solid #e0e0e0;
            margin: 30px 0;
        }
        /* Special styling for time stamps */
        h2 {
            page-break-before: auto;
            page-break-inside: avoid;
        }
        h3 {
            page-break-inside: avoid;
        }
        ul {
            page-break-inside: avoid;
        }
        @media print {
            body {
                padding: 20px 40px;
            }
        }
    </style>
</head>
<body>
    ${marked(markdownContent)}
</body>
</html>`;

        // Write temporary HTML file
        await fs.writeFile('temp-youtube-script.html', htmlContent);
        
        // Launch Puppeteer and create PDF
        const browser = await puppeteer.launch({ 
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        
        // Load the HTML file
        await page.goto(`file://${path.resolve('temp-youtube-script.html')}`, {
            waitUntil: 'networkidle0'
        });
        
        // Generate PDF with good formatting
        await page.pdf({
            path: 'youtube-script-referral-networks-dead.pdf',
            format: 'Letter',
            printBackground: true,
            margin: {
                top: '0.75in',
                right: '0.75in',
                bottom: '0.75in',
                left: '0.75in'
            }
        });
        
        await browser.close();
        
        // Clean up temp file
        await fs.unlink('temp-youtube-script.html');
        
        console.log('✅ PDF created successfully: youtube-script-referral-networks-dead.pdf');
        
    } catch (error) {
        console.error('Error creating PDF:', error);
    }
}

convertMarkdownToPDF();