const fs = require('fs');
const path = require('path');

// List of ALL HTML files that might have loading issues
const htmlFiles = [
    'index.html',
    'services.html', 
    'pricing.html',
    'about.html',
    'contact.html',
    'ai-demo.html',
    'local-seo.html',
    'google-ppc.html',
    'meta-ads.html',
    'cold-email.html',
    'marketing-automation.html',
    'ai-lead-generation.html',
    'faq.html',
    'guarantee.html',
    'success-stories.html',
    'case-study-stucco-dominance.html',
    'privacy-policy.html',
    'terms-of-service.html'
];

// Clean, consistent JavaScript template
const cleanJavaScript = `
    <script>
        // Clean JavaScript - Page Loading and Menu
        document.addEventListener('DOMContentLoaded', function() {
            // Remove loading overlay immediately
            const loadingOverlay = document.getElementById('loadingOverlay');
            if (loadingOverlay) {
                setTimeout(() => {
                    loadingOverlay.classList.add('loaded');
                }, 100);
            }

            // Mobile Menu Toggle
            const hamburgerMenu = document.getElementById('hamburger-menu');
            const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
            const closeMenu = document.getElementById('close-menu');

            function toggleMenu() {
                if (hamburgerMenu && mobileMenuOverlay) {
                    hamburgerMenu.classList.toggle('active');
                    mobileMenuOverlay.classList.toggle('active');
                    document.body.style.overflow = mobileMenuOverlay.classList.contains('active') ? 'hidden' : '';
                }
            }

            // Event listeners
            if (hamburgerMenu) hamburgerMenu.addEventListener('click', toggleMenu);
            if (closeMenu) closeMenu.addEventListener('click', toggleMenu);

            // Close menu when clicking outside
            if (mobileMenuOverlay) {
                mobileMenuOverlay.addEventListener('click', function(e) {
                    if (e.target === mobileMenuOverlay) {
                        toggleMenu();
                    }
                });
            }

            // Close menu when clicking on navigation links
            document.querySelectorAll('.mobile-nav-link, .mobile-cta-button').forEach(link => {
                link.addEventListener('click', function() {
                    toggleMenu();
                });
            });

            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });

            // Animate elements on scroll (if elements exist)
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '0';
                        entry.target.style.transform = 'translateY(30px)';
                        setTimeout(() => {
                            entry.target.style.transition = 'all 0.6s ease-out';
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, 100);
                    }
                });
            }, observerOptions);

            // Observe animated elements if they exist
            document.querySelectorAll('.stat-card, .feature-card, .service-card, .pricing-card, .workflow-card, .integration-card, .sequence-card, .targeting-card, .campaign-card').forEach(el => {
                observer.observe(el);
            });
        });
    </script>`;

// Function to clean up JavaScript in each file
function cleanupJavaScript(filename) {
    const filePath = path.join(__dirname, filename);
    
    if (!fs.existsSync(filePath)) {
        console.log(`❌ File ${filename} does not exist, skipping...`);
        return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove all existing script tags and replace with clean version
    const scriptRegex = /<script>[\s\S]*?<\/script>/g;
    const matches = content.match(scriptRegex);
    
    if (matches && matches.length > 0) {
        // Replace all script tags with our clean version
        content = content.replace(scriptRegex, '');
        
        // Add clean script before closing body tag
        content = content.replace('</body>', `${cleanJavaScript}
</body>`);
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Cleaned JavaScript in ${filename}`);
    } else {
        console.log(`ℹ️  No script tags found in ${filename}`);
    }
}

// Clean all files
console.log('🧹 Comprehensive JavaScript cleanup starting...\n');
htmlFiles.forEach(cleanupJavaScript);
console.log('\n✅ JavaScript cleanup complete! All loading overlays should now work properly.');