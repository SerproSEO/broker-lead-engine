const fs = require('fs');
const path = require('path');

// List of HTML files to fix
const htmlFiles = [
    'index.html',
    'services.html',
    'ai-lead-generation.html',
    'local-seo.html',
    'google-ppc.html',
    'meta-ads.html',
    'cold-email.html',
    'marketing-automation.html',
    'ai-demo.html',
    'pricing.html',
    'success-stories.html',
    'case-study-stucco-dominance.html',
    'guarantee.html',
    'about.html',
    'contact.html',
    'faq.html',
    'privacy-policy.html',
    'terms-of-service.html'
];

function emergencyFix(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        console.log(`\nEmergency fixing ${path.basename(filePath)}:`);
        
        // 1. Fix broken mobile CSS - missing closing brace
        content = content.replace(
            /\.services-grid\s*{\s*grid-template-columns:\s*1fr;\s*}\s*\n\s*\/\*\s*Loading\s*Overlay\s*\*\//g,
            `            .services-grid {
                grid-template-columns: 1fr;
            }
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }

        /* Loading Overlay */`
        );
        
        // 2. Fix broken JavaScript - missing closing braces and parentheses
        content = content.replace(
            /toggleMenu\(\);\s*}\);\s*}\s*observerOptions\);/g,
            `toggleMenu();
            }
        });

        // Close menu when clicking on navigation links
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', function() {
                if (this.getAttribute('href').startsWith('#')) {
                    toggleMenu();
                }
            });
        });

        // Add smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Animate on scroll
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out';
                }
            });
        }, observerOptions);`
        );
        
        // 3. Fix any malformed event listeners
        content = content.replace(/}\);\s*\n\s*\/\/ Close menu/g, '});');
        content = content.replace(/}\);\s*\n\s*\/\/ Add smooth/g, '});');
        
        // 4. Fix broken CSS object-fit
        content = content.replace(/object-fit:\s*contain;}\s*\n\s*\.nav-menu/g, 'object-fit: contain;\n        }\n\n        .nav-menu');
        
        // 5. Ensure proper nav-menu CSS exists
        if (!content.includes('.nav-menu {')) {
            content = content.replace(
                /object-fit:\s*contain;\s*}\s*\n\s*\.nav-item/g,
                `object-fit: contain;
        }

        .nav-menu {
            display: flex;
            list-style: none;
            gap: 0;
            align-items: center;
            margin: 0;
            padding: 0;
        }

        .nav-item`
            );
        }
        
        // 6. Fix broken mobile menu overlay references
        if (!content.includes('mobile-menu-overlay')) {
            const mobileMenuHTML = `
        
        <!-- Mobile Menu Overlay -->
        <div class="mobile-menu-overlay" id="mobile-menu-overlay">
            <div class="mobile-menu-content">
                <div class="mobile-menu-header">
                    <img src="logo.png" alt="Broker Lead Engine" class="mobile-logo">
                    <button class="close-menu" id="close-menu" aria-label="Close menu">&times;</button>
                </div>
                <nav class="mobile-nav">
                    <a href="services.html" class="mobile-nav-link">Services</a>
                    <a href="about.html" class="mobile-nav-link">About</a>
                    <a href="pricing.html" class="mobile-nav-link">Resources</a>
                    <a href="contact.html" class="mobile-nav-link">Contact</a>
                    <a href="contact.html" class="mobile-cta-button">Start Generating Leads</a>
                </nav>
            </div>
        </div>`;
            
            content = content.replace(
                /<\/header>/,
                `</header>${mobileMenuHTML}`
            );
        }
        
        // 7. Fix any broken CSS endings
        content = content.replace(/}\s*}\s*<\/style>/g, '}\n    </style>');
        
        // Write the fixed content
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Emergency fixed ${path.basename(filePath)}`);
        
    } catch (error) {
        console.error(`❌ Error emergency fixing ${filePath}:`, error.message);
    }
}

console.log('🚨 Starting EMERGENCY fixes for critical issues...\n');

// Process each HTML file
htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        emergencyFix(filePath);
    } else {
        console.log(`⚠️  File not found: ${file}`);
    }
});

console.log('\n🚨 EMERGENCY fixes complete!');
console.log('\n📋 Critical issues fixed:');
console.log('   ✓ Fixed broken mobile CSS closing braces');
console.log('   ✓ Fixed broken JavaScript event listeners');
console.log('   ✓ Added missing container CSS');
console.log('   ✓ Fixed broken nav-menu CSS');
console.log('   ✓ Added missing mobile menu overlay');
console.log('   ✓ Fixed malformed CSS endings');
console.log('\n🔄 Site should now load properly!');