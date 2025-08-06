const fs = require('fs');
const path = require('path');

// Read the homepage to get the header
const homepagePath = path.join(__dirname, 'index.html');
const homepageContent = fs.readFileSync(homepagePath, 'utf8');

// Extract header HTML from homepage
const headerMatch = homepageContent.match(/<!-- Header -->([\s\S]*?)<!-- Loading Overlay -->/);
const headerHTML = headerMatch ? headerMatch[1].trim() : '';

// Extract header CSS from homepage
const headerCSSMatch = homepageContent.match(/\/\* Header Styles \*\/([\s\S]*?)\/\* Loading Overlay \*\//);
const headerCSS = headerCSSMatch ? `/* Header Styles */` + headerCSSMatch[1] : '';

// Page configurations for 10 new programmatic SEO pages
const pages = [
    {
        filename: 'homeowners-insurance-marketing-suburban-ohio.html',
        title: 'Homeowners Insurance Marketing Suburban Ohio Counties',
        h1: 'Dominate Homeowners Insurance Marketing in Suburban Ohio',
        metaDescription: 'Specialized homeowners insurance lead generation for suburban Ohio markets. Generate 50+ qualified leads weekly in Franklin, Cuyahoga, and Hamilton counties.',
        heroStats: {
            stat1: { value: '3.2M', label: 'Ohio Homeowners' },
            stat2: { value: '$892', label: 'Avg Annual Premium' },
            stat3: { value: '67%', label: 'Shop Online First' }
        },
        location: 'suburban Ohio counties',
        insuranceType: 'homeowners insurance',
        specialties: ['First-time buyer programs', 'Bundle opportunities', 'Suburban family coverage', 'High-value home insurance'],
        competitors: ['State Farm dominance', 'Nationwide headquarters advantage', 'Progressive online presence'],
        strategies: ['County-specific landing pages', 'School district targeting', 'New development marketing', 'Bundle campaign optimization']
    },
    {
        filename: 'pet-insurance-marketing-rural-north-carolina.html',
        title: 'Pet Insurance Marketing Rural North Carolina',
        h1: 'Capture the Growing Pet Insurance Market in Rural North Carolina',
        metaDescription: 'Target rural North Carolina pet owners with specialized insurance marketing. Tap into 68% pet ownership rate with proven digital strategies.',
        heroStats: {
            stat1: { value: '68%', label: 'NC Pet Ownership' },
            stat2: { value: '$600', label: 'Annual Pet Premium' },
            stat3: { value: '42%', label: 'Market Growth Rate' }
        },
        location: 'rural North Carolina',
        insuranceType: 'pet insurance',
        specialties: ['Farm animal coverage', 'Veterinary partnerships', 'Rural clinic networks', 'Multi-pet discounts'],
        competitors: ['Limited local competition', 'National brands weak presence', 'Vet clinic partnerships'],
        strategies: ['Rural vet partnerships', 'Farm expo presence', 'County fair marketing', 'Agricultural publication ads']
    },
    {
        filename: 'flood-insurance-marketing-coastal-florida.html',
        title: 'Flood Insurance Marketing Coastal Florida Counties',
        h1: 'Flood Insurance Lead Generation for Coastal Florida Markets',
        metaDescription: 'Specialized flood insurance marketing for Florida coastal communities. Target high-risk zones with 85% conversion strategies.',
        heroStats: {
            stat1: { value: '2.8M', label: 'Flood Zone Properties' },
            stat2: { value: '$2,100', label: 'Avg Annual Premium' },
            stat3: { value: '85%', label: 'Conversion Rate' }
        },
        location: 'coastal Florida',
        insuranceType: 'flood insurance',
        specialties: ['FEMA zone expertise', 'Hurricane season campaigns', 'Elevation certificates', 'Private flood options'],
        competitors: ['NFIP limitations', 'Private market growth', 'Citizens Insurance overflow'],
        strategies: ['Hurricane season urgency', 'Zone-specific targeting', 'Mortgage requirement campaigns', 'Private vs NFIP comparison']
    },
    {
        filename: 'business-insurance-leads-small-town-georgia.html',
        title: 'Business Insurance Leads Small Town Georgia',
        h1: 'Generate Business Insurance Leads in Small Town Georgia',
        metaDescription: 'Target Georgia small businesses with specialized commercial insurance marketing. Access 45,000+ small town businesses ready for coverage.',
        heroStats: {
            stat1: { value: '45K+', label: 'Small Town Businesses' },
            stat2: { value: '$1,800', label: 'Avg BOP Premium' },
            stat3: { value: '73%', label: 'Under-Insured' }
        },
        location: 'small town Georgia',
        insuranceType: 'business insurance',
        specialties: ['Main street businesses', 'Agricultural operations', 'Small manufacturers', 'Service businesses'],
        competitors: ['Limited local agents', 'Direct carrier weak spots', 'Chamber partnerships available'],
        strategies: ['Chamber of Commerce partnerships', 'Main street campaigns', 'Industry-specific targeting', 'BOP bundle promotions']
    },
    {
        filename: 'renters-insurance-marketing-college-towns-virginia.html',
        title: 'Renters Insurance Marketing College Towns Virginia',
        h1: 'Dominate Renters Insurance in Virginia College Markets',
        metaDescription: 'Target 200,000+ college students and young professionals in Virginia college towns. Proven strategies for renters insurance lead generation.',
        heroStats: {
            stat1: { value: '200K+', label: 'College Students' },
            stat2: { value: '$180', label: 'Annual Premium' },
            stat3: { value: '92%', label: 'Uninsured Renters' }
        },
        location: 'Virginia college towns',
        insuranceType: 'renters insurance',
        specialties: ['Student housing coverage', 'Parent co-sign programs', 'Semester billing options', 'Roommate policies'],
        competitors: ['Low market penetration', 'University partnerships open', 'Property manager referrals'],
        strategies: ['Move-in season campaigns', 'Parent targeting', 'Student housing partnerships', 'Digital-first approach']
    },
    {
        filename: 'disability-insurance-marketing-rural-pennsylvania.html',
        title: 'Disability Insurance Marketing Rural Pennsylvania',
        h1: 'Disability Insurance Lead Generation for Rural Pennsylvania',
        metaDescription: 'Target rural Pennsylvania workers with disability insurance marketing. Focus on blue-collar and agricultural workers needing income protection.',
        heroStats: {
            stat1: { value: '1.2M', label: 'Rural Workers' },
            stat2: { value: '$1,400', label: 'Annual DI Premium' },
            stat3: { value: '78%', label: 'Without Coverage' }
        },
        location: 'rural Pennsylvania',
        insuranceType: 'disability insurance',
        specialties: ['Blue-collar focus', 'Agricultural workers', 'Self-employed coverage', 'Short-term options'],
        competitors: ['Employer plans limited', 'Direct sales opportunity', 'Union partnership potential'],
        strategies: ['Employer group marketing', 'Union partnerships', 'Farm bureau connections', 'Trade association outreach']
    },
    {
        filename: 'umbrella-insurance-marketing-suburban-illinois.html',
        title: 'Umbrella Insurance Marketing Suburban Illinois',
        h1: 'Umbrella Insurance Sales for Affluent Illinois Suburbs',
        metaDescription: 'Target high-net-worth individuals in Chicago suburbs with umbrella insurance. Focus on asset protection for families with $1M+ net worth.',
        heroStats: {
            stat1: { value: '340K', label: 'HNW Households' },
            stat2: { value: '$380', label: 'Avg Annual Premium' },
            stat3: { value: '65%', label: 'Coverage Gap' }
        },
        location: 'suburban Illinois',
        insuranceType: 'umbrella insurance',
        specialties: ['High-net-worth protection', 'Professional liability', 'Teen driver coverage', 'Asset protection planning'],
        competitors: ['Wealth advisor partnerships', 'Premium market focus', 'Bundle opportunities'],
        strategies: ['Wealth advisor referrals', 'Premium suburb targeting', 'Asset protection seminars', 'Teen driver campaigns']
    },
    {
        filename: 'workers-comp-insurance-leads-construction-arizona.html',
        title: 'Workers Comp Insurance Leads Construction Arizona',
        h1: 'Workers Comp Lead Generation for Arizona Construction',
        metaDescription: 'Specialized workers compensation marketing for Arizona construction companies. Target 15,000+ contractors needing coverage.',
        heroStats: {
            stat1: { value: '15K+', label: 'AZ Contractors' },
            stat2: { value: '$4,800', label: 'Avg Annual Premium' },
            stat3: { value: '94%', label: 'State Required' }
        },
        location: 'Arizona',
        insuranceType: 'workers compensation insurance',
        specialties: ['Construction specialization', 'Subcontractor coverage', 'Safety programs', 'Claims management'],
        competitors: ['State fund competition', 'Payroll service bundles', 'Industry associations'],
        strategies: ['Contractor license lists', 'Building permit data', 'Safety program incentives', 'Payroll integration marketing']
    },
    {
        filename: 'antique-car-insurance-marketing-classic-collectors.html',
        title: 'Antique Car Insurance Marketing Classic Collectors',
        h1: 'Classic & Antique Car Insurance Marketing Nationwide',
        metaDescription: 'Target classic car collectors and enthusiasts with specialized insurance. Access 5M+ collector vehicles needing agreed value coverage.',
        heroStats: {
            stat1: { value: '5M+', label: 'Collector Vehicles' },
            stat2: { value: '$680', label: 'Avg Annual Premium' },
            stat3: { value: '73%', label: 'Improperly Insured' }
        },
        location: 'nationwide',
        insuranceType: 'antique car insurance',
        specialties: ['Agreed value coverage', 'Show car policies', 'Restoration coverage', 'Limited use discounts'],
        competitors: ['Specialty carriers only', 'Car club partnerships', 'Show circuit presence'],
        strategies: ['Car show presence', 'Club partnerships', 'Restoration shop referrals', 'Enthusiast forum marketing']
    },
    {
        filename: 'travel-insurance-marketing-vacation-destinations.html',
        title: 'Travel Insurance Marketing Vacation Destinations',
        h1: 'Travel Insurance Lead Generation for Vacation Markets',
        metaDescription: 'Target travelers with comprehensive travel insurance marketing. Focus on cruise, international, and adventure travel segments.',
        heroStats: {
            stat1: { value: '145M', label: 'Annual US Trips' },
            stat2: { value: '$280', label: 'Avg Trip Premium' },
            stat3: { value: '58%', label: 'Uninsured Travelers' }
        },
        location: 'major vacation destinations',
        insuranceType: 'travel insurance',
        specialties: ['Cruise coverage', 'Adventure travel', 'Medical evacuation', 'Trip cancellation'],
        competitors: ['Credit card coverage', 'Direct carrier sales', 'Travel agent bundles'],
        strategies: ['Travel agent partnerships', 'Cruise line referrals', 'Adventure tour operators', 'Seasonal campaign timing']
    }
];

// Template function for creating pages
function createPage(config) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.title} | Broker Lead Engine</title>
    <meta name="description" content="${config.metaDescription}">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #16a571;
            --primary-dark: #138a5e;
            --secondary: #1a202c;
            --accent: #667eea;
            --gray-50: #f7fafc;
            --gray-100: #edf2f7;
            --gray-200: #e2e8f0;
            --gray-600: #4a5568;
            --gray-700: #2d3748;
            --gradient-primary: linear-gradient(135deg, #16a571 0%, #138a5e 100%);
            --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            --transition-base: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        ${headerCSS}

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            color: var(--gray-700);
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }

        .hero {
            background: var(--gradient-primary);
            color: white;
            padding: 6rem 0 4rem;
            margin-top: 80px;
        }

        .hero h1 {
            font-size: 3rem;
            font-weight: 900;
            margin-bottom: 1.5rem;
            line-height: 1.2;
        }

        .hero-subtext {
            font-size: 1.25rem;
            margin-bottom: 2rem;
            opacity: 0.95;
        }

        .hero-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
            margin-top: 3rem;
        }

        .stat-card {
            background: rgba(255, 255, 255, 0.1);
            padding: 1.5rem;
            border-radius: 12px;
            text-align: center;
        }

        .stat-value {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 0.5rem;
        }

        .stat-label {
            font-size: 1rem;
            opacity: 0.9;
        }

        .section {
            padding: 4rem 0;
        }

        .section-title {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 1rem;
            color: var(--secondary);
        }

        .section-subtitle {
            font-size: 1.25rem;
            color: var(--gray-600);
            margin-bottom: 3rem;
        }

        .strategies-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }

        .strategy-card {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: var(--shadow-lg);
            transition: var(--transition-base);
        }

        .strategy-card:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow-xl);
        }

        .strategy-card h3 {
            color: var(--primary);
            margin-bottom: 1rem;
            font-size: 1.25rem;
        }

        .bullet-list {
            list-style: none;
            padding: 0;
        }

        .bullet-list li {
            padding: 0.75rem 0;
            padding-left: 2rem;
            position: relative;
        }

        .bullet-list li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: var(--primary);
            font-weight: bold;
            font-size: 1.25rem;
        }

        .cta-section {
            background: var(--gradient-primary);
            color: white;
            padding: 4rem 0;
            text-align: center;
            border-radius: 20px;
            margin: 2rem 0;
        }

        .cta-button {
            display: inline-block;
            background: white;
            color: var(--primary);
            padding: 1rem 2.5rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            transition: var(--transition-base);
            margin: 0.5rem;
        }

        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-xl);
        }

        .testimonial {
            background: var(--gray-50);
            padding: 2rem;
            border-radius: 12px;
            margin: 1rem 0;
            border-left: 4px solid var(--primary);
        }

        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2rem;
            }
            
            .hero-stats {
                grid-template-columns: 1fr;
            }
            
            .strategies-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    ${headerHTML}

    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <h1>${config.h1}</h1>
            <p class="hero-subtext">${config.metaDescription}</p>
            
            <div class="hero-stats">
                <div class="stat-card">
                    <div class="stat-value">${config.heroStats.stat1.value}</div>
                    <div class="stat-label">${config.heroStats.stat1.label}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${config.heroStats.stat2.value}</div>
                    <div class="stat-label">${config.heroStats.stat2.label}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value">${config.heroStats.stat3.value}</div>
                    <div class="stat-label">${config.heroStats.stat3.label}</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Market Opportunity -->
    <section class="section">
        <div class="container">
            <h2 class="section-title">Why ${config.insuranceType} in ${config.location}?</h2>
            <p class="section-subtitle">Tap into an underserved market with massive growth potential</p>
            
            <div class="strategies-grid">
                <div class="strategy-card">
                    <h3>Market Specialties</h3>
                    <ul class="bullet-list">
                        ${config.specialties.map(s => `<li>${s}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="strategy-card">
                    <h3>Competitive Landscape</h3>
                    <ul class="bullet-list">
                        ${config.competitors.map(c => `<li>${c}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="strategy-card">
                    <h3>Proven Strategies</h3>
                    <ul class="bullet-list">
                        ${config.strategies.map(s => `<li>${s}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- Our Approach -->
    <section class="section" style="background: #f7fafc;">
        <div class="container">
            <h2 class="section-title">Our Proven ${config.insuranceType} Marketing System</h2>
            <p class="section-subtitle">Generate qualified leads on autopilot with our AI-powered approach</p>
            
            <div class="strategies-grid">
                <div class="strategy-card">
                    <h3>🎯 Laser-Targeted Campaigns</h3>
                    <p>We identify and target the exact demographics most likely to need ${config.insuranceType} in ${config.location}.</p>
                </div>
                
                <div class="strategy-card">
                    <h3>🤖 AI-Powered Automation</h3>
                    <p>Our AI system qualifies leads 24/7, ensuring you only speak with ready-to-buy prospects.</p>
                </div>
                
                <div class="strategy-card">
                    <h3>📊 Data-Driven Optimization</h3>
                    <p>Continuous optimization based on real performance data specific to ${config.location} markets.</p>
                </div>
                
                <div class="strategy-card">
                    <h3>🚀 Rapid Implementation</h3>
                    <p>Launch complete campaigns in 48 hours with immediate lead flow starting week one.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Results -->
    <section class="section">
        <div class="container">
            <h2 class="section-title">Expected Results Timeline</h2>
            
            <div class="strategies-grid">
                <div class="strategy-card">
                    <h3>Week 1-2</h3>
                    <ul class="bullet-list">
                        <li>Campaign launch and optimization</li>
                        <li>First 10-15 qualified leads</li>
                        <li>Market response analysis</li>
                    </ul>
                </div>
                
                <div class="strategy-card">
                    <h3>Month 1</h3>
                    <ul class="bullet-list">
                        <li>50+ qualified leads generated</li>
                        <li>3-5 new policies written</li>
                        <li>ROI tracking established</li>
                    </ul>
                </div>
                
                <div class="strategy-card">
                    <h3>Month 3</h3>
                    <ul class="bullet-list">
                        <li>200+ total leads generated</li>
                        <li>15-20 new policies</li>
                        <li>Full market penetration</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials -->
    <section class="section" style="background: #f5f3ff;">
        <div class="container">
            <h2 class="section-title">What Our Clients Say</h2>
            
            <div class="testimonial">
                <p>"Samuel at Serpro SEO kindly offered his time to answer my questions and give some valuable advice. Your one stop shop for website and marketing services. I'll definitely be a repeat customer."</p>
                <p><strong>- Brian - Southern Stone Tile</strong></p>
            </div>
            
            <div class="testimonial">
                <p>"Support was helpful with the issues i was having with some designs, quality service, was solved in a timely manner."</p>
                <p><strong>- Jason C.</strong></p>
            </div>
            
            <div class="testimonial">
                <p>"Professional and friendly customer service. Thanks again for the assistance!"</p>
                <p><strong>- Elizabeth P.</strong></p>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="section">
        <div class="container">
            <div class="cta-section">
                <h2 style="font-size: 2.5rem; margin-bottom: 1rem;">Ready to Dominate ${config.insuranceType}?</h2>
                <p style="font-size: 1.25rem; margin-bottom: 2rem;">Start generating qualified leads in ${config.location} today</p>
                <a href="contact.html" class="cta-button">Get Your Free Strategy Session</a>
                <a href="pricing.html" class="cta-button">View Pricing</a>
            </div>
        </div>
    </section>

    <script>
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
    </script>
</body>
</html>`;
}

// Create all 10 pages
pages.forEach(config => {
    const content = createPage(config);
    const filePath = path.join(__dirname, config.filename);
    fs.writeFileSync(filePath, content);
    console.log(`✅ Created ${config.filename}`);
});

console.log('\n✨ Successfully created 10 new programmatic SEO pages!');