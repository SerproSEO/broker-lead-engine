#!/usr/bin/env python3
"""
Generate Professional Liability Pages for Target States
Focuses on CT, NJ, PA, FL, NV, AZ - Broker Lead Engine's expansion markets
"""

import os
import re
from pathlib import Path

# Import base functionality
exec(open('generate_content.py').read())

# Target states for Broker Lead Engine expansion
TARGET_STATES = [
    {'state': 'Connecticut', 'code': 'CT', 'major_cities': [
        {'city': 'Hartford', 'businesses': '180K'},
        {'city': 'New Haven', 'businesses': '95K'},
        {'city': 'Stamford', 'businesses': '120K'},
        {'city': 'Bridgeport', 'businesses': '85K'},
        {'city': 'Waterbury', 'businesses': '65K'}
    ]},
    {'state': 'New Jersey', 'code': 'NJ', 'major_cities': [
        {'city': 'Newark', 'businesses': '220K'},
        {'city': 'Jersey City', 'businesses': '180K'},
        {'city': 'Paterson', 'businesses': '95K'},
        {'city': 'Elizabeth', 'businesses': '75K'},
        {'city': 'Trenton', 'businesses': '60K'}
    ]},
    {'state': 'Pennsylvania', 'code': 'PA', 'major_cities': [
        {'city': 'Philadelphia', 'businesses': '720K'},
        {'city': 'Pittsburgh', 'businesses': '380K'},
        {'city': 'Allentown', 'businesses': '85K'},
        {'city': 'Erie', 'businesses': '55K'},
        {'city': 'Reading', 'businesses': '45K'}
    ]},
    {'state': 'Florida', 'code': 'FL', 'major_cities': [
        {'city': 'Miami', 'businesses': '650K'},
        {'city': 'Tampa', 'businesses': '420K'},
        {'city': 'Orlando', 'businesses': '380K'},
        {'city': 'Jacksonville', 'businesses': '290K'},
        {'city': 'Fort Lauderdale', 'businesses': '280K'}
    ]},
    {'state': 'Nevada', 'code': 'NV', 'major_cities': [
        {'city': 'Las Vegas', 'businesses': '380K'},
        {'city': 'Reno', 'businesses': '85K'},
        {'city': 'Henderson', 'businesses': '120K'},
        {'city': 'North Las Vegas', 'businesses': '75K'},
        {'city': 'Sparks', 'businesses': '35K'}
    ]},
    {'state': 'Arizona', 'code': 'AZ', 'major_cities': [
        {'city': 'Phoenix', 'businesses': '580K'},
        {'city': 'Tucson', 'businesses': '180K'},
        {'city': 'Mesa', 'businesses': '220K'},
        {'city': 'Chandler', 'businesses': '150K'},
        {'city': 'Scottsdale', 'businesses': '140K'}
    ]}
]

# Professional liability focused services
PROFESSIONAL_LIABILITY_SERVICES = [
    'Professional Liability Insurance SEO',
    'E&O Insurance Marketing',
    'Legal Malpractice Insurance SEO',
    'Medical Malpractice Insurance Marketing',
    'Architects & Engineers Insurance SEO',
    'Technology E&O Insurance Marketing'
]

def generate_target_state_pages():
    """Generate professional liability pages for target expansion states"""
    print("Generating Professional Liability Pages for Target States...")
    print("Focus: CT, NJ, PA, FL, NV, AZ expansion markets")

    output_dir = Path('target_state_pages')
    output_dir.mkdir(exist_ok=True)

    total_generated = 0

    # Generate location pages for each target state and city
    for state_data in TARGET_STATES:
        print(f"\nGenerating pages for {state_data['state']} ({state_data['code']})...")

        for service in PROFESSIONAL_LIABILITY_SERVICES:
            for city_data in state_data['major_cities']:
                variables = TEMPLATE_VARIABLES['location-page-template.html'].copy()
                variables.update({
                    'SERVICE': service,
                    'CITY': city_data['city'],
                    'STATE': state_data['state'],
                    'STATE_CODE': state_data['code'],
                    'URL_SLUG': create_url_slug(f"{service}-{city_data['city']}-{state_data['state']}"),
                    'META_DESCRIPTION': f"Expert {service.lower()} services in {city_data['city']}, {state_data['state']}. Help {city_data['city']} insurance agencies generate 50+ qualified professional liability leads monthly with our proven SEO system.",
                    'MAIN_KEYWORD': f"{service.lower()} {city_data['city']}",
                    'SECONDARY_KEYWORDS': f"{city_data['city']} professional liability marketing, {service.lower()} {state_data['state']}, E&O insurance SEO {city_data['city']}",
                    'STAT_1': city_data['businesses'],
                    'MARKET_SIZE': city_data['businesses']
                })

                content = process_template('location-page-template.html', variables)
                filename = f"{create_url_slug(service)}-{create_url_slug(city_data['city'])}-{state_data['code'].lower()}.html"

                with open(output_dir / filename, 'w', encoding='utf-8') as f:
                    f.write(content)

                total_generated += 1
                if total_generated % 10 == 0:
                    print(f"  Progress: {total_generated} pages generated...")

    # Generate state-level pages
    print(f"\nGenerating state-level overview pages...")
    for state_data in TARGET_STATES:
        for service in PROFESSIONAL_LIABILITY_SERVICES[:3]:  # Top 3 services
            variables = TEMPLATE_VARIABLES['location-page-template.html'].copy()
            variables.update({
                'SERVICE': service,
                'CITY': state_data['state'],
                'STATE': state_data['state'],
                'STATE_CODE': state_data['code'],
                'URL_SLUG': create_url_slug(f"{service}-{state_data['state']}"),
                'META_DESCRIPTION': f"Leading {service.lower()} services across {state_data['state']}. Proven results for insurance agencies statewide with our 6-month guarantee program.",
                'MAIN_KEYWORD': f"{service.lower()} {state_data['state']}",
                'SECONDARY_KEYWORDS': f"{state_data['state']} professional liability marketing, {service.lower()} agencies, insurance SEO {state_data['state']}",
                'STAT_1': sum(int(city['businesses'].replace('K', '000').replace('.', '')) for city in state_data['major_cities']),
                'MARKET_SIZE': f"{sum(int(city['businesses'].replace('K', '').replace('.', '')) for city in state_data['major_cities'])}K+"
            })

            content = process_template('location-page-template.html', variables)
            filename = f"{create_url_slug(service)}-{state_data['code'].lower()}.html"

            with open(output_dir / filename, 'w', encoding='utf-8') as f:
                f.write(content)

            print(f"  Generated: {filename}")
            total_generated += 1

    print(f"\n=== TARGET STATE GENERATION COMPLETE! ===")
    print(f"Total pages generated: {total_generated}")
    print(f"Files saved to: {output_dir.absolute()}")
    print(f"\nBreakdown by state:")
    for state_data in TARGET_STATES:
        state_pages = len(PROFESSIONAL_LIABILITY_SERVICES) * len(state_data['major_cities']) + 3
        print(f"- {state_data['state']} ({state_data['code']}): {state_pages} pages")

    return total_generated

if __name__ == "__main__":
    generate_target_state_pages()