const fs = require('fs');

console.log('🔧 Fixing spinning pages (meta-ads, cold-email, about)...\n');

const pagesToFix = ['meta-ads.html', 'cold-email.html', 'about.html'];

pagesToFix.forEach(file => {
    try {
        console.log(`📄 Processing ${file}...`);
        let content = fs.readFileSync(file, 'utf8');
        
        // Fix the broken JavaScript at the end of the file
        // Remove malformed JavaScript and replace with proper script
        const fixedScript = `    <script>
        // Remove loading overlay
        window.addEventListener('load', () => {
            const loadingOverlay = document.getElementById('loadingOverlay');
            if (loadingOverlay) {
                setTimeout(() => {
                    loadingOverlay.classList.add('loaded');
                }, 100);
            }
        });

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
    </script>`;

        // Find and replace the broken script section
        // Look for the script tag that starts with "// Remove loading overlay"
        const scriptRegex = /<script>[\s\S]*?window\.addEventListener\('load'[\s\S]*?<\/script>/g;
        
        if (content.match(scriptRegex)) {
            content = content.replace(scriptRegex, fixedScript);
            console.log(`   ✓ Fixed broken JavaScript`);
        } else {
            // If no script found, add before closing body tag
            content = content.replace('</body>', `\n${fixedScript}\n</body>`);
            console.log(`   ✓ Added missing JavaScript`);
        }
        
        fs.writeFileSync(file, content);
        console.log(`   ✅ Successfully fixed ${file}`);
        
    } catch (error) {
        console.error(`   ❌ Error processing ${file}:`, error.message);
    }
});

console.log(`\n📊 Spinning pages fix complete!`);
console.log(`🔄 Loading overlays should now properly disappear`);
console.log(`📱 Mobile menu functionality restored`);