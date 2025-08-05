# 🎯 Typeform Setup Guide for Broker Lead Engine

## Overview
This guide will help you set up high-converting Typeform forms for your insurance marketing agency.

---

## 📋 Forms to Create

### 1. **Free PPC Audit Form** (Priority #1)
**Purpose**: Capture leads from the PPC audit landing page
**Expected Conversion**: 35-45% (vs 15-25% with basic forms)

#### **Typeform Flow:**
```
Welcome Screen:
"Let's audit your Google Ads and find the money you're losing 💰"
"Takes 2 minutes - Results in 24 hours"

Question 1: What's your name?
[Short text field]

Question 2: What's your business email?
[Email field with validation]

Question 3: What's your insurance agency called?
[Short text field]

Question 4: What's your monthly Google Ads budget?
[Multiple choice]
• Under $1,000
• $1,000 - $2,500 
• $2,500 - $5,000
• $5,000 - $10,000
• $10,000 - $25,000
• $25,000+

Question 5: What's your biggest Google Ads challenge?
[Multiple choice]
• Clicks are too expensive
• Not getting enough leads
• Leads aren't converting to sales
• Can't track ROI properly
• Competitors are dominating
• Don't have time to manage campaigns

Question 6: What's your annual revenue goal?
[Multiple choice]
• Under $1M
• $1M - $2M
• $2M - $5M
• $5M - $10M
• $10M+

Question 7: Best phone number to reach you?
[Phone number field]

Thank You Screen:
"🎉 Perfect! Your audit is on the way!"
"Check your email in the next 24 hours for your detailed Google Ads audit."
"Want faster results? Book a 15-minute call: [CALENDLY LINK]"
```

---

### 2. **Consultation Booking Form** (Priority #2)
**Purpose**: Qualify high-intent prospects for sales calls
**Expected Conversion**: 40-55%

#### **Typeform Flow:**
```
Welcome Screen:
"Let's see if we're a good fit to grow your insurance agency 🚀"

Question 1: What's your name?
[Short text field]

Question 2: What's your role at the agency?
[Multiple choice]
• Owner/Partner
• Marketing Manager
• Sales Manager
• Other

Question 3: What's your agency's annual revenue?
[Multiple choice with logic jumps]
• Under $500K (→ Not a fit message)
• $500K - $1M (→ Continue with basic package)
• $1M - $2M (→ Continue with standard package)
• $2M - $5M (→ Continue with premium package)
• $5M+ (→ Continue with enterprise package)

Question 4: What's your biggest marketing challenge?
[Multiple choice]
• Not enough leads
• Leads are low quality
• Marketing costs too high
• Can't compete with big agencies
• Don't have time for marketing
• Current agency isn't delivering

Question 5: How much are you spending on marketing monthly?
[Multiple choice]
• Under $1,000
• $1,000 - $3,000
• $3,000 - $7,000
• $7,000 - $15,000
• $15,000+

Question 6: Email address?
[Email field]

Question 7: Phone number?
[Phone field]

Question 8: When works best for a 15-minute call?
[Multiple choice]
• This week
• Next week
• Within 2-3 weeks
• Just send info for now

Thank You Screen:
"Thanks! Here's your calendar link: [CALENDLY LINK]"
"We'll also email you our Insurance Marketing Playbook in 5 minutes."
```

---

### 3. **Contact Form Replacement** (Priority #3)
**Purpose**: Replace basic contact form with engaging experience

#### **Typeform Flow:**
```
Welcome Screen:
"Hi there! 👋 How can we help grow your insurance agency?"

Question 1: What's your name?
[Short text field]

Question 2: Which service interests you most?
[Multiple choice with images]
• 🤖 AI Lead Generation ($2,997/month)
• 📍 Local SEO ($1,997/month)
• 🎯 Google PPC ($1,497/month)
• 📱 Social Media Ads ($1,297/month)
• 📧 Cold Email ($997/month)
• ⚙️ Marketing Automation ($1,497/month)
• 💬 Just have a question

Question 3: What's your agency's annual revenue?
[Multiple choice - same as above]

Question 4: Email address?
[Email field]

Question 5: Best way to contact you?
[Multiple choice]
• Email me information
• Call me today
• Schedule a consultation
• Send me case studies first

Thank You Screen:
"Perfect! We'll be in touch within 2 hours with exactly what you requested."
```

---

## 🚀 Setup Instructions

### Step 1: Create Typeform Account
1. Go to [typeform.com](https://typeform.com)
2. Sign up for **Professional Plan** ($35/month) - you need logic jumps
3. Use this link for 14-day free trial: [typeform.com/help](https://typeform.com/help)

### Step 2: Create Your First Form (PPC Audit)
1. Click "Create a typeform"
2. Choose "Start from scratch"
3. Add questions exactly as shown in the flow above
4. **Important Settings:**
   - Enable "Collect responses when people type"
   - Turn on "Progress bar"
   - Set notifications to your email
   - Enable Google Analytics tracking

### Step 3: Design Settings
- **Brand Colors**: 
  - Primary: #16a571 (your green)
  - Secondary: #1a202c (your dark blue)
- **Font**: Inter (matches your website)
- **Background**: White or light gradient

### Step 4: Get Embed Codes
1. Click "Share" → "Embed"
2. Choose "Standard embed" 
3. Copy the code
4. Replace `YOUR_TYPEFORM_ID` in your website files

### Step 5: Integration & Automation
**Connect to your tools:**
- **Email**: Integrate with your email service (ConvertKit, Mailchimp, etc.)
- **CRM**: Connect to your CRM (HubSpot, Salesforce, etc.)
- **Calendar**: Link Calendly for instant booking
- **Slack**: Get notifications in Slack

---

## 📊 Analytics & Optimization

### Track These Metrics:
- **Completion Rate**: Target 60%+ (Typeform average is 40%)
- **Time to Complete**: Target under 3 minutes
- **Drop-off Points**: Fix questions where people quit

### A/B Testing Ideas:
- Test different welcome screens
- Try different question orders
- Test with/without images
- Different thank you messages

---

## 🔗 Integration Code Examples

### For PPC Landing Page:
Replace `YOUR_TYPEFORM_ID` with your actual form ID:
```html
<div data-tf-widget="YOUR_TYPEFORM_ID" data-tf-opacity="100" style="width:100%;height:600px;"></div>
<script src="//embed.typeform.com/next/embed.js"></script>
```

### For Contact Page:
```html
<div data-tf-widget="YOUR_CONTACT_FORM_ID" data-tf-opacity="100" style="width:100%;height:500px;"></div>
<script src="//embed.typeform.com/next/embed.js"></script>
```

### Pop-up Trigger (Exit Intent):
```html
<script>
(function() { 
  var qs,js,q,s,d=document, gi=d.getElementById, ce=d.createElement, gt=d.getElementsByTagName, id="typef_orm_share", b="https://embed.typeform.com/";
  if(!gi.call(d,id)){ 
    js=ce.call(d,"script"); js.id=id; js.src=b+"embed.js";
    q=gt.call(d,"script")[0]; q.parentNode.insertBefore(js,q)
  }
})()
</script>
```

---

## 💡 Pro Tips for Higher Conversions

### 1. **Question Flow Optimization**
- Start with easy questions (name, email)
- Put qualifying questions in the middle
- End with contact info

### 2. **Psychological Triggers**
- Use "you" language throughout
- Add urgency ("limited spots available")
- Show social proof ("Join 247+ agencies")

### 3. **Mobile Optimization**
- Test on mobile devices
- Keep questions short
- Use large buttons

### 4. **Follow-up Automation**
Set up these automatic emails:
- **Immediate**: Form confirmation + thank you
- **5 minutes**: Bonus content (case study/playbook)  
- **24 hours**: Personal follow-up from you
- **3 days**: Additional resources if no response
- **7 days**: Special offer or consultation

---

## 🎯 Expected Results

**Before Typeform** (Basic HTML forms):
- Conversion Rate: 15-25%
- Completion Rate: 60-70%
- Lead Quality: Medium

**After Typeform** (Professional implementation):
- Conversion Rate: 35-45% 
- Completion Rate: 75-85%
- Lead Quality: High (better qualification)

**ROI Impact**: 
- 2-3x more leads from same traffic
- Higher quality prospects 
- Better user experience = more referrals

---

## 🚨 Next Steps

1. **Set up Typeform account** (15 minutes)
2. **Create PPC Audit form** (30 minutes)
3. **Replace website form code** (5 minutes)
4. **Test and optimize** (ongoing)

**Questions?** Contact [sam@brokerleadengine.com](mailto:sam@brokerleadengine.com)

---

*Last updated: 2025-08-05*