const fs = require('fs');
const path = require('path');

// Read the current ai-demo.html
let content = fs.readFileSync(path.join(__dirname, 'ai-demo.html'), 'utf8');

// Remove the duplicate CSS sections
// There should only be one set of header styles, mobile styles, etc.

// Find where the first style section ends (around line 394)
const firstStyleEnd = content.indexOf('/* Desktop - Hide Mobile Menu */');
const secondStyleStart = content.indexOf('/* Header Styles */', firstStyleEnd);

if (secondStyleStart > -1) {
    // Find the end of the duplicate styles (where </style> is)
    const styleEndTag = content.indexOf('</style>', secondStyleStart);
    
    // Remove everything from the second "Header Styles" to just before </style>
    const beforeDuplicate = content.substring(0, secondStyleStart).trimEnd();
    const afterDuplicate = content.substring(styleEndTag);
    
    content = beforeDuplicate + '\n    ' + afterDuplicate;
}

// Write the fixed content
fs.writeFileSync(path.join(__dirname, 'ai-demo.html'), content, 'utf8');

console.log('✅ Removed duplicate CSS from ai-demo.html');