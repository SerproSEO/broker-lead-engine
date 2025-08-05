const fs = require('fs');
const path = require('path');

console.log('🔧 Implementing new hamburger menu for index.html...');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. First, let's find and replace the hamburger menu CSS
const newHamburgerCSS = `
        /* Hamburger Menu - Clean Implementation */
        .hamburger-menu {
            display: none;
            width: 30px;
            height: 24px;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0;
            position: relative;
            z-index: 10001;
        }

        .hamburger-menu span {
            display: block;
            width: 100%;
            height: 3px;
            background: white;
            position: absolute;
            left: 0;
            transition: all 0.3s ease;
        }

        .hamburger-menu span:nth-child(1) {
            top: 0;
        }

        .hamburger-menu span:nth-child(2) {
            top: 50%;
            transform: translateY(-50%);
        }

        .hamburger-menu span:nth-child(3) {
            bottom: 0;
        }

        .hamburger-menu.active span:nth-child(1) {
            transform: rotate(45deg);
            top: 50%;
            transform-origin: center;
        }

        .hamburger-menu.active span:nth-child(2) {
            opacity: 0;
        }

        .hamburger-menu.active span:nth-child(3) {
            transform: rotate(-45deg);
            bottom: 50%;
            transform-origin: center;
        }

        /* Mobile Menu Overlay - Clean Implementation */
        .mobile-menu-overlay {
            position: fixed;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100vh;
            background: rgba(26, 32, 44, 0.98);
            z-index: 10000;
            transition: left 0.3s ease;
            overflow-y: auto;
        }

        .mobile-menu-overlay.active {
            left: 0;
        }`;

// Replace old hamburger CSS with new one
content = content.replace(/\/\* Hamburger Menu \*\/[\s\S]*?\.mobile-menu-overlay\.active\s*\{[^}]*\}/g, newHamburgerCSS);

// 2. Replace the hamburger button HTML
const oldHamburgerHTML = /<button class="hamburger-menu"[^>]*>[\s\S]*?<\/button>/g;
const newHamburgerHTML = `<button class="hamburger-menu" id="hamburger-menu" aria-label="Toggle navigation menu">
                <span></span>
                <span></span>
                <span></span>
            </button>`;

content = content.replace(oldHamburgerHTML, newHamburgerHTML);

// 3. Replace the mobile menu JavaScript with a clean implementation
const newMobileMenuJS = `        // Mobile Menu Toggle - Clean Implementation
        (function() {
            const hamburger = document.getElementById('hamburger-menu');
            const mobileMenu = document.getElementById('mobile-menu-overlay');
            const closeBtn = document.getElementById('close-menu');
            const mobileLinks = document.querySelectorAll('.mobile-nav-link');

            function toggleMobileMenu() {
                hamburger.classList.toggle('active');
                mobileMenu.classList.toggle('active');
                document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
            }

            function closeMobileMenu() {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }

            // Hamburger click
            hamburger.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleMobileMenu();
            });

            // Close button click
            if (closeBtn) {
                closeBtn.addEventListener('click', closeMobileMenu);
            }

            // Click outside menu
            document.addEventListener('click', function(e) {
                if (mobileMenu.classList.contains('active') && !mobileMenu.contains(e.target) && e.target !== hamburger) {
                    closeMobileMenu();
                }
            });

            // Mobile nav links
            mobileLinks.forEach(link => {
                link.addEventListener('click', function() {
                    if (this.getAttribute('href').startsWith('#')) {
                        closeMobileMenu();
                    }
                });
            });
        })();`;

// Replace old mobile menu JS
content = content.replace(/\/\/ Mobile Menu Toggle[\s\S]*?}\);[\s\S]*?}\);/g, newMobileMenuJS);

// 4. Also ensure mobile styles show the hamburger
const mobileStylesRegex = /@media \(max-width: 768px\)[\s\S]*?\.hamburger-menu\s*\{[^}]*\}/g;
if (!content.match(/\.hamburger-menu\s*\{\s*display:\s*block\s*!important/)) {
    content = content.replace(/(@media \(max-width: 768px\)[^{]*\{[^}]*)(\.hamburger-menu\s*\{[^}]*display:\s*flex\s*!important[^}]*\})/g, 
        '$1.hamburger-menu {\n                display: block !important;\n            }');
}

// Write the updated content
fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ New hamburger menu implementation complete!');
console.log('💾 index.html updated with clean hamburger menu code');