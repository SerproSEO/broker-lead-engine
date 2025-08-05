const fs = require('fs');
const path = require('path');

// Let's completely rebuild the JavaScript section with proper syntax
const fixedJavaScript = `    <script>
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
        }, observerOptions);

        document.querySelectorAll('.service-card').forEach(el => {
            observer.observe(el);
        });
    </script>`;

function completeRebuildJS(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        console.log(`\nRebuilding JavaScript for ${path.basename(filePath)}:`);
        
        // 1. Remove all broken JavaScript
        content = content.replace(/<script>[\s\S]*?<\/script>/g, '');
        
        // 2. Add the fixed JavaScript before closing </body>
        content = content.replace('</body>', fixedJavaScript + '\n</body>');
        
        // 3. Fix any remaining CSS issues
        content = content.replace(/\}\); when clicking on navigation links/g, '});');
        content = content.replace(/\}\); scrolling/g, '});');
        
        // 4. Ensure mobile menu overlay exists if referenced
        if (content.includes('mobile-menu-overlay') && !content.includes('<div class="mobile-menu-overlay"')) {
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
            
            content = content.replace('</header>', '</header>' + mobileMenuHTML);
            console.log('  ✓ Added mobile menu overlay');
        }
        
        // Write the rebuilt content
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Completely rebuilt JavaScript for ${path.basename(filePath)}`);
        
    } catch (error) {
        console.error(`❌ Error rebuilding ${filePath}:`, error.message);
    }
}

console.log('🔧 Starting COMPLETE JavaScript rebuild...\n');

// Just fix the main files first
const criticalFiles = ['index.html', 'services.html'];

criticalFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        completeRebuildJS(filePath);
    }
});

console.log('\n✨ JavaScript rebuild complete!');
console.log('\n📋 What was rebuilt:');
console.log('   ✓ Completely rebuilt JavaScript with proper syntax');
console.log('   ✓ Fixed loading overlay removal with timeout');
console.log('   ✓ Added proper error checking for DOM elements');
console.log('   ✓ Fixed mobile menu functionality');
console.log('   ✓ Added smooth scrolling and animations');
console.log('\n🔄 Site should now load and function properly!');