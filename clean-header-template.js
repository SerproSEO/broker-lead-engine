const fs = require('fs');
const path = require('path');

// Read index.html to extract ONLY what we need
const indexContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// Extract just the header CSS styles
const headerStyles = `
        /* Header Styles */
        .header {
            background: var(--secondary);
            color: white;
            padding: 1rem 0;
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 9999;
            box-shadow: var(--shadow-lg);
            backdrop-filter: blur(10px);
            background: rgba(26, 32, 44, 0.98);
            height: 80px;
            display: flex;
            align-items: center;
        }

        .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 2rem;
            width: 100%;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .logo img {
            height: 175px;
            width: auto;
            max-width: 175px;
            object-fit: contain;
        }

        .nav-menu {
            display: flex;
            list-style: none;
            gap: 0;
            align-items: center;
            margin: 0;
            padding: 0;
        }

        .nav-item {
            position: relative;
        }

        .nav-item > a {
            color: white;
            text-decoration: none;
            padding: 1rem 1.5rem;
            font-weight: 500;
            transition: var(--transition-base);
            display: block;
        }

        .nav-item > a:hover {
            color: var(--primary);
        }

        /* Dropdown Menu */
        .dropdown {
            position: absolute;
            top: 100%;
            left: 0;
            background: white;
            min-width: 280px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
            border-radius: 8px;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.2s ease;
            z-index: 1000;
            border: 1px solid #e2e8f0;
            max-height: 400px;
            overflow-y: auto;
        }

        .nav-item:hover .dropdown {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        .dropdown a {
            color: #1a202c;
            text-decoration: none;
            padding: 1rem 1.5rem;
            display: block;
            transition: var(--transition-base);
            border-bottom: 1px solid #f1f5f9;
            font-weight: 500;
        }

        .dropdown a:last-child {
            border-bottom: none;
        }

        .dropdown a:hover {
            background: #f8fafc;
            color: var(--primary);
            padding-left: 2rem;
        }

        /* CTA Button */
        .cta-button {
            background: var(--gradient-primary);
            color: white;
            padding: 0.75rem 2rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            transition: var(--transition-base);
            display: inline-block;
            position: relative;
            overflow: hidden;
            border: 2px solid transparent;
        }

        .cta-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
        }

        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-xl);
        }

        .cta-button:hover::before {
            left: 100%;
        }

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
        }

        .mobile-menu-content {
            height: 100%;
            display: flex;
            flex-direction: column;
            padding: 2rem;
        }

        .mobile-menu-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 3rem;
        }

        .mobile-logo {
            height: 75px;
            width: auto;
        }

        .close-menu {
            background: none;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            padding: 0;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .mobile-nav {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .mobile-nav-link {
            color: white;
            text-decoration: none;
            padding: 1rem;
            font-size: 1.1rem;
            font-weight: 500;
            transition: var(--transition-base);
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .mobile-nav-link:hover {
            color: var(--primary);
            padding-left: 1.5rem;
        }

        .mobile-cta-button {
            background: var(--gradient-primary);
            color: white;
            padding: 1rem 2rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            margin-top: 2rem;
            text-align: center;
            transition: all 0.3s;
        }

        .mobile-cta-button:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
            .nav-container {
                padding: 0 1rem;
            }

            .logo img {
                height: 70px;
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
                display: block !important;
            }

            .header .cta-button {
                display: none;
            }
        }

        /* Desktop - Hide Mobile Menu */
        @media (min-width: 769px) {
            .mobile-menu-overlay {
                display: none !important;
            }
        }`;

// Header HTML
const headerHTML = `    <!-- Header -->
    <header class="header">
        <nav class="nav-container">
            <div class="logo">
                <a href="index.html">
                    <img src="logo.png" alt="Broker Lead Engine Logo">
                </a>
            </div>
            <ul class="nav-menu">
                <li class="nav-item">
                    <a href="services.html">Services</a>
                    <div class="dropdown">
                        <a href="ai-lead-generation.html">🤖 AI Lead Generation</a>
                        <a href="local-seo.html">📍 Local SEO</a>
                        <a href="google-ppc.html">🎯 Google PPC</a>
                        <a href="meta-ads.html">📱 Meta Ads</a>
                        <a href="cold-email.html">📧 Cold Email</a>
                        <a href="marketing-automation.html">⚙️ Marketing Automation</a>
                    </div>
                </li>
                <li class="nav-item">
                    <a href="about.html">About</a>
                    <div class="dropdown">
                        <a href="about.html">🏢 About Us</a>
                        <a href="success-stories.html">🏆 Success Stories</a>
                        <a href="case-study-stucco-dominance.html">📈 Case Studies</a>
                        <a href="guarantee.html">🛡️ Our Guarantee</a>
                    </div>
                </li>
                <li class="nav-item">
                    <a href="pricing.html">Resources</a>
                    <div class="dropdown">
                        <a href="pricing.html">💰 Pricing</a>
                        <a href="ai-demo.html">🤖 AI Demo</a>
                        <a href="faq.html">❓ FAQ</a>
                        <a href="privacy-policy.html">🔒 Privacy Policy</a>
                        <a href="terms-of-service.html">📄 Terms of Service</a>
                    </div>
                </li>
                <li class="nav-item"><a href="contact.html">Contact</a></li>
            </ul>
            <a href="contact.html" class="cta-button">Start Generating Leads</a>
            
            <!-- Hamburger Menu Button -->
            <button class="hamburger-menu" id="hamburger-menu" aria-label="Toggle navigation menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </nav>
    </header>
        
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

// Mobile menu JavaScript
const mobileMenuJS = `
        // Mobile Menu Toggle - Clean Implementation
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

// Function to apply clean header
function applyCleanHeader(filename) {
    const filePath = path.join(__dirname, filename);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find where styles end
    const styleEndIndex = content.indexOf('</style>');
    
    // Find where body starts
    const bodyStartIndex = content.indexOf('<body>');
    
    // Extract existing styles before </style>
    const existingStyles = content.substring(0, styleEndIndex);
    
    // Remove any existing header styles
    let cleanedStyles = existingStyles;
    cleanedStyles = cleanedStyles.replace(/\/\* Header[\s\S]*?(?=\/\*|<\/style>)/g, '');
    cleanedStyles = cleanedStyles.replace(/\/\* Hamburger[\s\S]*?(?=\/\*|<\/style>)/g, '');
    cleanedStyles = cleanedStyles.replace(/\/\* Mobile Menu[\s\S]*?(?=\/\*|<\/style>)/g, '');
    cleanedStyles = cleanedStyles.replace(/\/\* Desktop[\s\S]*?@media[^}]*\{[^}]*\.mobile-menu[^}]*\}[^}]*\}/g, '');
    
    // Find main content (after header/mobile menu)
    let mainContentMatch = content.match(/(<section class="hero|<main|<div class="main-content|<!-- Main Content -->)([\s\S]*)/);
    let mainContent = mainContentMatch ? mainContentMatch[0] : '';
    
    // Find existing script content
    let scriptMatch = content.match(/<script>([\s\S]*?)<\/script>/);
    let existingScript = scriptMatch ? scriptMatch[1] : '';
    
    // Remove any mobile menu related JS
    existingScript = existingScript.replace(/\/\/ Mobile Menu Toggle[\s\S]*?\}\)\(\);/g, '');
    
    // Construct new content
    let newContent = cleanedStyles + headerStyles + '\n    </style>\n</head>\n<body>\n' + headerHTML + '\n\n    ' + mainContent;
    
    // Fix script section
    newContent = newContent.replace(/<script>([\s\S]*?)<\/script>/, '<script>' + existingScript + mobileMenuJS + '\n    </script>');
    
    // Write file
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`✅ ${filename} - Clean header applied!`);
}

// Export
module.exports = { applyCleanHeader };

// If run directly
if (require.main === module) {
    const page = process.argv[2];
    if (page) {
        applyCleanHeader(page);
    }
}