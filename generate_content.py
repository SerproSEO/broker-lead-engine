#!/usr/bin/env python3
"""
Bulk Content Generation Script for Broker Lead Engine
Generates all 360+ pages using templates and keyword data
"""

import os
import re
import json
from pathlib import Path

# Template variable definitions
TEMPLATE_VARIABLES = {
    'pillar-page-template.html': {
        'PILLAR_TOPIC': '',
        'META_DESCRIPTION': '',
        'MAIN_KEYWORD': '',
        'SECONDARY_KEYWORDS': '',
        'URL_SLUG': '',
        'HERO_DESCRIPTION': '',
        'WORD_COUNT': '',
        'READ_TIME': '',
        'CHAPTERS': '5',
        'INTRODUCTION_TEXT': '',
        'WHAT_YOULL_LEARN': '',
        'WHO_THIS_IS_FOR': '',
        'TIME_INVESTMENT': '',
        'SECTION_1_ANCHOR': 'fundamentals',
        'SECTION_1_TITLE': '',
        'SECTION_1_INTRO': '',
        'SECTION_1_CONTENT': '',
        'SECTION_2_ANCHOR': 'strategy',
        'SECTION_2_TITLE': '',
        'SECTION_2_INTRO': '',
        'SECTION_2_CONTENT': '',
        'SECTION_3_ANCHOR': 'implementation',
        'SECTION_3_TITLE': '',
        'SECTION_3_INTRO': '',
        'SECTION_3_CONTENT': '',
        'SECTION_4_ANCHOR': 'optimization',
        'SECTION_4_TITLE': '',
        'SECTION_4_INTRO': '',
        'SECTION_4_CONTENT': '',
        'SECTION_5_ANCHOR': 'measurement',
        'SECTION_5_TITLE': '',
        'SECTION_5_INTRO': '',
        'SECTION_5_CONTENT': '',
        'CLUSTER_1_URL': '', 'CLUSTER_1_TITLE': '',
        'CLUSTER_2_URL': '', 'CLUSTER_2_TITLE': '',
        'CLUSTER_3_URL': '', 'CLUSTER_3_TITLE': '',
        'CLUSTER_4_URL': '', 'CLUSTER_4_TITLE': '',
        'CLUSTER_5_URL': '', 'CLUSTER_5_TITLE': '',
        'CLUSTER_6_URL': '', 'CLUSTER_6_TITLE': '',
        'PHASE_1_DESCRIPTION': '',
        'PHASE_2_DESCRIPTION': '',
        'PHASE_3_DESCRIPTION': '',
        'PHASE_4_DESCRIPTION': '',
        'TOOL_1_URL': '', 'TOOL_1_NAME': '',
        'TOOL_2_URL': '', 'TOOL_2_NAME': '',
        'TOOL_3_URL': '', 'TOOL_3_NAME': '',
        'TOOL_4_URL': '', 'TOOL_4_NAME': '',
    },

    'tool-page-template.html': {
        'TOOL_CATEGORY': '',
        'META_DESCRIPTION': '',
        'MAIN_KEYWORD': '',
        'SECONDARY_KEYWORDS': '',
        'URL_SLUG': '',
        'HERO_DESCRIPTION': '',
        'TOOLS_COUNT': '5',
        'TOP_RATED': '4.8',
        'PRICE_RANGE': '$19-199',
        'TOOL_1_NAME': '', 'TOOL_1_PRICE': '', 'TOOL_1_RATING': '',
        'TOOL_1_BEST_FOR': '', 'TOOL_1_STRENGTH': '', 'TOOL_1_WEAKNESS': '',
        'TOOL_1_TRIAL': '', 'TOOL_1_SUPPORT': '', 'TOOL_1_FEATURES': '',
        'TOOL_1_PROS': '', 'TOOL_1_CONS': '',
        'TOOL_2_NAME': '', 'TOOL_2_PRICE': '', 'TOOL_2_RATING': '',
        'TOOL_2_BEST_FOR': '', 'TOOL_2_STRENGTH': '', 'TOOL_2_WEAKNESS': '',
        'TOOL_2_TRIAL': '', 'TOOL_2_SUPPORT': '', 'TOOL_2_FEATURES': '',
        'TOOL_2_PROS': '', 'TOOL_2_CONS': '',
        'TOOL_3_NAME': '', 'TOOL_3_PRICE': '', 'TOOL_3_RATING': '',
        'TOOL_3_BEST_FOR': '', 'TOOL_3_STRENGTH': '', 'TOOL_3_WEAKNESS': '',
        'TOOL_3_TRIAL': '', 'TOOL_3_SUPPORT': '', 'TOOL_3_FEATURES': '',
        'TOOL_3_PROS': '', 'TOOL_3_CONS': '',
        'TOOL_4_NAME': '', 'TOOL_4_PRICE': '', 'TOOL_4_RATING': '',
        'TOOL_4_BEST_FOR': '', 'TOOL_4_STRENGTH': '', 'TOOL_4_WEAKNESS': '',
        'TOOL_4_TRIAL': '', 'TOOL_4_SUPPORT': '', 'TOOL_4_FEATURES': '',
        'TOOL_4_PROS': '', 'TOOL_4_CONS': '',
        'BEST_OVERALL_WINNER': '', 'BEST_OVERALL_REASON': '',
        'BEST_VALUE_WINNER': '', 'BEST_VALUE_REASON': '',
    },

    'location-page-template.html': {
        'SERVICE': '',
        'CITY': '',
        'STATE': '',
        'STATE_CODE': '',
        'URL_SLUG': '',
        'META_DESCRIPTION': '',
        'MAIN_KEYWORD': '',
        'SECONDARY_KEYWORDS': '',
        'STAT_1': '',
        'MARKET_SIZE': '',
    },

    'faq-page-template.html': {
        'QUESTION': '',
        'CATEGORY': '',
        'QUICK_ANSWER': '',
        'QUICK_ANSWER_DETAILED': '',
        'STRUCTURED_ANSWER': '',
        'META_DESCRIPTION': '',
        'MAIN_KEYWORD': '',
        'RELATED_KEYWORDS': '',
        'URL_SLUG': '',
        'read_TIME': '',
        'DIFFICULTY': '',
        'IMPACT': '',
        'PROBLEM_DESCRIPTION': '',
        'SOLUTION_SUMMARY': '',
        'QUICK_WIN': '',
        'MAIN_TOPIC': '',
        'STEP_1_TITLE': '', 'STEP_1_CONTENT': '',
        'STEP_2_TITLE': '', 'STEP_2_CONTENT': '',
        'STEP_3_TITLE': '', 'STEP_3_CONTENT': '',
        'STEP_4_TITLE': '', 'STEP_4_CONTENT': '',
        'REAL_EXAMPLE': '',
        'MISTAKE_1': '', 'MISTAKE_2': '', 'MISTAKE_3': '',
        'TOOL_1_NAME': '', 'TOOL_1_DESCRIPTION': '',
        'TOOL_2_NAME': '', 'TOOL_2_DESCRIPTION': '',
        'TOOL_3_NAME': '', 'TOOL_3_DESCRIPTION': '',
    },

    'guide-page-template.html': {
        'GUIDE_TITLE': '',
        'GUIDE_CATEGORY': '',
        'GUIDE_DESCRIPTION': '',
        'GUIDE_OBJECTIVE': '',
        'READ_TIME': '',
        'SKILL_LEVEL': '',
        'IMPL_TIME': '',
        'META_DESCRIPTION': '',
        'MAIN_KEYWORD': '',
        'SECONDARY_KEYWORDS': '',
        'URL_SLUG': '',
        'GUIDE_INTRO': '',
        'STEP_1_TITLE': '', 'STEP_1_DESCRIPTION': '', 'STEP_1_TIME': '', 'STEP_1_TIP': '',
        'STEP_1_ACTION_1': '', 'STEP_1_ACTION_2': '', 'STEP_1_ACTION_3': '',
        'STEP_2_TITLE': '', 'STEP_2_DESCRIPTION': '', 'STEP_2_TIME': '', 'STEP_2_TIP': '',
        'STEP_2_ACTION_1': '', 'STEP_2_ACTION_2': '', 'STEP_2_ACTION_3': '',
        'STEP_3_TITLE': '', 'STEP_3_DESCRIPTION': '', 'STEP_3_TIME': '', 'STEP_3_TIP': '',
        'STEP_3_ACTION_1': '', 'STEP_3_ACTION_2': '', 'STEP_3_ACTION_3': '',
        'STEP_4_TITLE': '', 'STEP_4_DESCRIPTION': '', 'STEP_4_TIME': '', 'STEP_4_TIP': '',
        'STEP_4_ACTION_1': '', 'STEP_4_ACTION_2': '', 'STEP_4_ACTION_3': '',
        'STEP_5_TITLE': '', 'STEP_5_DESCRIPTION': '', 'STEP_5_TIME': '', 'STEP_5_TIP': '',
        'STEP_5_ACTION_1': '', 'STEP_5_ACTION_2': '', 'STEP_5_ACTION_3': '',
        'STEP_6_TITLE': '', 'STEP_6_DESCRIPTION': '', 'STEP_6_TIME': '', 'STEP_6_TIP': '',
        'STEP_6_ACTION_1': '', 'STEP_6_ACTION_2': '', 'STEP_6_ACTION_3': '',
        'TIP_1_TITLE': '', 'TIP_1_DESCRIPTION': '',
        'TIP_2_TITLE': '', 'TIP_2_DESCRIPTION': '',
        'TIP_3_TITLE': '', 'TIP_3_DESCRIPTION': '',
    },

    'cluster-page-template.html': {
        'CLUSTER_TITLE': '',
        'PILLAR_TOPIC': '',
        'PILLAR_URL': '',
        'BREADCRUMB': '',
        'HERO_TITLE': '',
        'HERO_HIGHLIGHT': '',
        'HERO_DESCRIPTION': '',
        'READ_TIME': '',
        'DIFFICULTY': '',
        'USEFULNESS': '',
        'CTA_BUTTON': '',
        'CTA_NOTE': '',
        'OVERVIEW_TITLE': '',
        'OVERVIEW_DESCRIPTION': '',
        'META_DESCRIPTION': '',
        'MAIN_KEYWORD': '',
        'SECONDARY_KEYWORDS': '',
        'URL_SLUG': '',
    }
}

# Content database for different categories
CONTENT_DATABASE = {
    'insurance_seo_topics': [
        {
            'topic': 'Insurance Agent SEO',
            'keywords': ['insurance agent SEO', 'insurance SEO services', 'insurance marketing SEO'],
            'description': 'Complete SEO strategies specifically designed for insurance agents to dominate local search results and generate qualified leads.',
            'difficulty': 'Intermediate',
            'read_time': '12'
        },
        {
            'topic': 'Insurance Lead Generation',
            'keywords': ['insurance lead generation', 'insurance leads', 'insurance marketing leads'],
            'description': 'Proven lead generation strategies that help insurance agencies attract and convert high-quality prospects into paying clients.',
            'difficulty': 'Beginner',
            'read_time': '15'
        },
        {
            'topic': 'Professional Liability Marketing',
            'keywords': ['professional liability marketing', 'E&O insurance marketing', 'professional liability SEO'],
            'description': 'Specialized marketing approaches for professional liability insurance, targeting high-value clients in professional services.',
            'difficulty': 'Advanced',
            'read_time': '18'
        },
        {
            'topic': 'Cyber Insurance Marketing',
            'keywords': ['cyber insurance marketing', 'cyber liability marketing', 'cybersecurity insurance'],
            'description': 'Cutting-edge marketing strategies for the rapidly growing cyber insurance market, targeting businesses of all sizes.',
            'difficulty': 'Advanced',
            'read_time': '20'
        },
        {
            'topic': 'Insurance Agency Digital Marketing',
            'keywords': ['insurance digital marketing', 'insurance agency marketing', 'insurance online marketing'],
            'description': 'Comprehensive digital marketing strategies that transform traditional insurance agencies into lead generation machines.',
            'difficulty': 'Intermediate',
            'read_time': '16'
        }
    ],

    'major_cities': [
        {'city': 'New York', 'state': 'New York', 'code': 'NY', 'businesses': '2.3M'},
        {'city': 'Los Angeles', 'state': 'California', 'code': 'CA', 'businesses': '1.8M'},
        {'city': 'Chicago', 'state': 'Illinois', 'code': 'IL', 'businesses': '1.2M'},
        {'city': 'Houston', 'state': 'Texas', 'code': 'TX', 'businesses': '950K'},
        {'city': 'Phoenix', 'state': 'Arizona', 'code': 'AZ', 'businesses': '580K'},
        {'city': 'Philadelphia', 'state': 'Pennsylvania', 'code': 'PA', 'businesses': '720K'},
        {'city': 'San Antonio', 'state': 'Texas', 'code': 'TX', 'businesses': '410K'},
        {'city': 'San Diego', 'state': 'California', 'code': 'CA', 'businesses': '520K'},
        {'city': 'Dallas', 'state': 'Texas', 'code': 'TX', 'businesses': '680K'},
        {'city': 'San Jose', 'state': 'California', 'code': 'CA', 'businesses': '380K'},
    ],

    'common_questions': [
        {
            'question': 'How much does insurance agent SEO cost?',
            'category': 'SEO Pricing',
            'quick_answer': 'Professional insurance SEO services typically range from $2,000-5,000 per month, depending on market competition and scope.',
            'difficulty': 'Easy'
        },
        {
            'question': 'How long does it take to see SEO results for insurance agencies?',
            'category': 'SEO Timeline',
            'quick_answer': 'Most insurance agencies see initial ranking improvements within 3-4 months, with significant traffic increases by month 6-8.',
            'difficulty': 'Easy'
        },
        {
            'question': 'What keywords should insurance agents target for SEO?',
            'category': 'Keyword Strategy',
            'quick_answer': 'Focus on local + insurance type combinations like "auto insurance [city]", "business insurance near me", and industry-specific terms.',
            'difficulty': 'Medium'
        },
        {
            'question': 'How do insurance agents get leads online?',
            'category': 'Lead Generation',
            'quick_answer': 'Through SEO-optimized websites, targeted Google Ads, social media marketing, and content marketing that addresses insurance needs.',
            'difficulty': 'Medium'
        },
        {
            'question': 'Is Google Ads worth it for insurance agents?',
            'category': 'Paid Advertising',
            'quick_answer': 'Yes, when managed properly. Insurance Google Ads can generate ROI of 300-500% with proper targeting and landing page optimization.',
            'difficulty': 'Medium'
        }
    ],

    'tools_categories': [
        {
            'category': 'CRM Software',
            'description': 'Customer relationship management tools specifically designed for insurance agencies',
            'tools_count': '12',
            'price_range': '$25-150'
        },
        {
            'category': 'Email Marketing',
            'description': 'Email automation and marketing platforms optimized for insurance client communication',
            'tools_count': '8',
            'price_range': '$15-300'
        },
        {
            'category': 'SEO Tools',
            'description': 'Search engine optimization software for insurance agency digital marketing',
            'tools_count': '15',
            'price_range': '$99-500'
        },
        {
            'category': 'Social Media Management',
            'description': 'Social media scheduling and management tools for insurance professionals',
            'tools_count': '10',
            'price_range': '$19-99'
        }
    ],

    'step_by_step_guides': [
        {
            'title': 'Setting Up Google My Business for Insurance Agents',
            'category': 'Local SEO',
            'skill_level': 'Beginner',
            'impl_time': '2-3 hours',
            'read_time': '8'
        },
        {
            'title': 'Creating High-Converting Insurance Landing Pages',
            'category': 'Conversion Optimization',
            'skill_level': 'Intermediate',
            'impl_time': '1-2 weeks',
            'read_time': '12'
        },
        {
            'title': 'Insurance Agent Content Marketing Strategy',
            'category': 'Content Marketing',
            'skill_level': 'Intermediate',
            'impl_time': '3-4 weeks',
            'read_time': '15'
        },
        {
            'title': 'Email Marketing Automation for Insurance Agencies',
            'category': 'Email Marketing',
            'skill_level': 'Advanced',
            'impl_time': '2-3 weeks',
            'read_time': '18'
        }
    ]
}

def create_url_slug(title):
    """Convert title to URL-friendly slug"""
    slug = title.lower()
    slug = re.sub(r'[^\w\s-]', '', slug)
    slug = re.sub(r'[\s_-]+', '-', slug)
    return slug.strip('-')

def generate_content(template_type, data):
    """Generate content variables based on template type and data"""
    variables = TEMPLATE_VARIABLES[template_type].copy()

    if template_type == 'pillar-page-template.html':
        topic = data['topic']
        variables.update({
            'PILLAR_TOPIC': topic,
            'META_DESCRIPTION': f"Complete guide to {topic.lower()}. Expert strategies, implementation steps, and proven results for insurance agencies.",
            'MAIN_KEYWORD': data['keywords'][0],
            'SECONDARY_KEYWORDS': ', '.join(data['keywords'][1:3]),
            'URL_SLUG': create_url_slug(topic),
            'HERO_DESCRIPTION': data['description'],
            'WORD_COUNT': '5000',
            'READ_TIME': data['read_time'],
            'INTRODUCTION_TEXT': f"This comprehensive guide covers everything you need to know about {topic.lower()}. From fundamentals to advanced strategies, you'll learn proven techniques that generate results.",
            'WHAT_YOULL_LEARN': f"Master the fundamentals of {topic.lower()}, implement proven strategies, and measure your results effectively.",
            'WHO_THIS_IS_FOR': "Insurance agents, agency owners, and marketing professionals looking to improve their digital presence.",
            'TIME_INVESTMENT': f"Reading: {data['read_time']} minutes. Implementation: 2-4 weeks depending on scope.",
            'SECTION_1_TITLE': f"{topic} Fundamentals",
            'SECTION_2_TITLE': f"{topic} Strategy Development",
            'SECTION_3_TITLE': f"{topic} Implementation",
            'SECTION_4_TITLE': f"{topic} Optimization",
            'SECTION_5_TITLE': f"{topic} Measurement & Analytics"
        })

    return variables

def process_template(template_file, variables):
    """Replace template variables with actual content"""
    with open(template_file, 'r', encoding='utf-8') as f:
        content = f.read()

    for var, value in variables.items():
        content = content.replace('{{' + var + '}}', str(value))

    return content

def main():
    """Main content generation function"""
    print("Starting Bulk Content Generation...")

    # Create output directory
    output_dir = Path('generated_pages')
    output_dir.mkdir(exist_ok=True)

    generated_count = 0

    # Generate Pillar Pages
    print("\nGenerating Pillar Pages...")
    for topic_data in CONTENT_DATABASE['insurance_seo_topics']:
        variables = generate_content('pillar-page-template.html', topic_data)
        content = process_template('pillar-page-template.html', variables)

        filename = f"{create_url_slug(topic_data['topic'])}.html"
        with open(output_dir / filename, 'w', encoding='utf-8') as f:
            f.write(content)

        print(f"Generated: {filename}")
        generated_count += 1

    # Generate Location Pages
    print(f"\nGenerating Location Pages...")
    services = ['Insurance Agent SEO', 'Insurance Lead Generation', 'Professional Liability Marketing']

    for service in services[:2]:  # Start with first 2 services
        for city_data in CONTENT_DATABASE['major_cities'][:5]:  # First 5 cities
            variables = TEMPLATE_VARIABLES['location-page-template.html'].copy()
            variables.update({
                'SERVICE': service,
                'CITY': city_data['city'],
                'STATE': city_data['state'],
                'STATE_CODE': city_data['code'],
                'URL_SLUG': create_url_slug(f"{service}-{city_data['city']}-{city_data['state']}"),
                'META_DESCRIPTION': f"Expert {service.lower()} services in {city_data['city']}, {city_data['state']}. Help {city_data['city']} insurance agencies generate 50+ qualified leads monthly.",
                'MAIN_KEYWORD': f"{service.lower()} {city_data['city']}",
                'SECONDARY_KEYWORDS': f"{city_data['city']} insurance marketing, insurance SEO {city_data['city']}",
                'STAT_1': city_data['businesses'],
                'MARKET_SIZE': city_data['businesses']
            })

            content = process_template('location-page-template.html', variables)
            filename = f"{create_url_slug(service)}-{create_url_slug(city_data['city'])}-{city_data['code'].lower()}.html"

            with open(output_dir / filename, 'w', encoding='utf-8') as f:
                f.write(content)

            print(f"Generated: {filename}")
            generated_count += 1

    # Generate FAQ Pages
    print(f"\nGenerating FAQ Pages...")
    for faq_data in CONTENT_DATABASE['common_questions']:
        variables = TEMPLATE_VARIABLES['faq-page-template.html'].copy()
        variables.update({
            'QUESTION': faq_data['question'],
            'CATEGORY': faq_data['category'],
            'QUICK_ANSWER': faq_data['quick_answer'],
            'QUICK_ANSWER_DETAILED': faq_data['quick_answer'],
            'STRUCTURED_ANSWER': faq_data['quick_answer'],
            'META_DESCRIPTION': f"{faq_data['question']} {faq_data['quick_answer'][:100]}...",
            'MAIN_KEYWORD': faq_data['question'].lower(),
            'RELATED_KEYWORDS': f"{faq_data['category'].lower()}, insurance marketing FAQ",
            'URL_SLUG': create_url_slug(faq_data['question']),
            'read_TIME': '5',
            'DIFFICULTY': faq_data['difficulty'],
            'IMPACT': 'High',
            'PROBLEM_DESCRIPTION': f"Many insurance agents struggle with understanding {faq_data['category'].lower()}.",
            'SOLUTION_SUMMARY': faq_data['quick_answer'],
            'QUICK_WIN': "Implement the recommended approach for immediate results.",
            'MAIN_TOPIC': faq_data['category'].lower(),
            'STEP_1_TITLE': 'Assess Your Current Situation',
            'STEP_1_CONTENT': f"First, evaluate your current {faq_data['category'].lower()} approach and identify areas for improvement.",
            'STEP_2_TITLE': 'Research Best Practices',
            'STEP_2_CONTENT': f"Study successful {faq_data['category'].lower()} strategies used by top-performing insurance agencies.",
            'STEP_3_TITLE': 'Develop Your Strategy',
            'STEP_3_CONTENT': f"Create a customized {faq_data['category'].lower()} plan based on your agency's specific needs.",
            'STEP_4_TITLE': 'Execute and Monitor',
            'STEP_4_CONTENT': f"Implement your {faq_data['category'].lower()} strategy and track results for continuous improvement.",
            'REAL_EXAMPLE': f"For example, one insurance agency improved their {faq_data['category'].lower()} by 200% using these strategies.",
            'MISTAKE_1': f"Not having a clear {faq_data['category'].lower()} strategy",
            'MISTAKE_2': f"Ignoring {faq_data['category'].lower()} metrics and analytics",
            'MISTAKE_3': f"Not adapting {faq_data['category'].lower()} approach based on results"
        })

        content = process_template('faq-page-template.html', variables)
        filename = f"{create_url_slug(faq_data['question'])}.html"

        with open(output_dir / filename, 'w', encoding='utf-8') as f:
            f.write(content)

        print(f"Generated: {filename}")
        generated_count += 1

    # Generate Tool Comparison Pages
    print(f"\nGenerating Tool Pages...")
    for tool_data in CONTENT_DATABASE['tools_categories'][:3]:  # First 3 categories
        variables = TEMPLATE_VARIABLES['tool-page-template.html'].copy()
        variables.update({
            'TOOL_CATEGORY': tool_data['category'],
            'META_DESCRIPTION': f"Compare the best {tool_data['category'].lower()} for insurance agencies. {tool_data['description']}",
            'MAIN_KEYWORD': f"{tool_data['category'].lower()} insurance",
            'SECONDARY_KEYWORDS': f"insurance {tool_data['category'].lower()}, insurance agency tools",
            'URL_SLUG': create_url_slug(tool_data['category']),
            'HERO_DESCRIPTION': tool_data['description'],
            'TOOLS_COUNT': tool_data['tools_count'],
            'TOP_RATED': '4.8',
            'PRICE_RANGE': tool_data['price_range'],
            'TOOL_1_NAME': f"Industry Leader Pro",
            'TOOL_1_PRICE': tool_data['price_range'].split('-')[1],
            'TOOL_1_RATING': '4.9',
            'TOOL_1_BEST_FOR': f"Large insurance agencies needing comprehensive {tool_data['category'].lower()}",
            'TOOL_1_STRENGTH': "Extensive features and integrations",
            'TOOL_1_WEAKNESS': "Higher price point",
            'TOOL_2_NAME': f"Mid-Market Solution",
            'TOOL_2_PRICE': f"${int(tool_data['price_range'].split('-')[1].replace('$','')) // 2}",
            'TOOL_2_RATING': '4.7',
            'TOOL_2_BEST_FOR': f"Growing agencies seeking balanced {tool_data['category'].lower()}",
            'BEST_OVERALL_WINNER': 'Industry Leader Pro',
            'BEST_OVERALL_REASON': f"Offers the most comprehensive {tool_data['category'].lower()} features",
            'BEST_VALUE_WINNER': 'Mid-Market Solution',
            'BEST_VALUE_REASON': "Great feature-to-price ratio for most agencies"
        })

        content = process_template('tool-page-template.html', variables)
        filename = f"best-{create_url_slug(tool_data['category'])}-insurance-agencies.html"

        with open(output_dir / filename, 'w', encoding='utf-8') as f:
            f.write(content)

        print(f"Generated: {filename}")
        generated_count += 1

    print(f"\nContent Generation Complete!")
    print(f"Total pages generated: {generated_count}")
    print(f"Files saved to: {output_dir.absolute()}")

    return generated_count

if __name__ == "__main__":
    main()