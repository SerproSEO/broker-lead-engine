const fs = require('fs');

console.log('🔧 Fixing logo consistency and mobile menu issues...\n');

// Get all HTML files
const htmlFiles = fs.readdirSync('./').filter(file => file.endsWith('.html'));

let fixedLogos = 0;
let fixedMobileMenus = 0;
let errors = 0;

htmlFiles.forEach(file => {
    try {
        console.log(`📄 Processing ${file}...`);
        let content = fs.readFileSync(file, 'utf8');
        let changes = [];
        
        // Fix 1: Make all mobile logo sizes consistent (75px)
        // Fix mobile media query logo sizes (should be 75px, not 150px)
        const mobileMediaLogoRegex = /@media \(max-width: 768px\)[\s\S]*?\.logo img \{[\s\S]*?height: 150px;[\s\S]*?max-width: 150px;[\s\S]*?object-fit: contain;[\s\S]*?\}/g;
        
        if (content.match(mobileMediaLogoRegex)) {
            const fixedMobileLogo = `@media (max-width: 768px) {
            .nav-container {
                padding: 0 1rem;
            }

            .logo img {
                height: 75px;
                max-width: 75px;
                object-fit: contain;
            }

            .header {
                height: 70px;
            }

            .nav-menu {
                display: none;
            }

            .hamburger-menu {
                display: flex !important;
            }

            .header .cta-button {
                display: none;
            }`;
            
            content = content.replace(mobileMediaLogoRegex, fixedMobileLogo);
            changes.push('Fixed mobile logo size');
            fixedLogos++;
        }
        
        // Fix 2: Add missing mobile menu JavaScript for pages that need it
        if (!content.includes('toggleMenu') && content.includes('hamburger-menu')) {
            const mobileMenuScript = `
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
        });`;
            
            // Find the existing script tag and add mobile menu functionality
            if (content.includes('<script>')) {
                content = content.replace('window.addEventListener(\'load\'', `${mobileMenuScript}

        // Remove loading overlay
        window.addEventListener('load'`);
                changes.push('Added mobile menu JavaScript');
                fixedMobileMenus++;
            }
        }
        
        // Fix 3: Add missing mobile menu overlay HTML for pages that need it
        if (!content.includes('mobile-menu-overlay') && content.includes('hamburger-menu') && content.includes('</header>')) {
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
            
            content = content.replace('</header>', `</header>${mobileMenuHTML}`);
            changes.push('Added mobile menu overlay');
        }
        
        // Write changes if any were made
        if (changes.length > 0) {
            fs.writeFileSync(file, content);
            console.log(`   ✓ ${changes.join(', ')}`);
        } else {
            console.log('   ✓ No changes needed');
        }
        
    } catch (error) {
        console.error(`   ❌ Error processing ${file}:`, error.message);
        errors++;
    }
});

console.log(`\n📊 Fix Summary:`);
console.log(`✅ Logo fixes: ${fixedLogos} files`);
console.log(`📱 Mobile menu fixes: ${fixedMobileMenus} files`);
if (errors > 0) {
    console.log(`❌ Errors: ${errors} files`);
}

console.log(`\n🎉 Logo and mobile menu consistency fixes complete!`);
console.log(`📏 All mobile logos should now be 75px`);
console.log(`📱 Mobile menu functionality restored`);