# PRD: Careers Page

## Overview
The Careers page showcases Uigenius's job openings, company culture, and employee benefits to attract talented individuals to join the team.

## Page Structure

### 1. Navigation Bar
- Logo and brand name
- Navigation menu: HOME, ABOUT US, CAREERS, CONTACT
- "Try Free" circular button

### 2. Hero Section
- Main title: "Join Our Team"
- Subtitle: "Help us shape the future of AI-powered design"
- Red gradient background

### 3. Intro Section
- Title: "Build the Future of Design with Us"
- Two paragraphs introducing job opportunities and team culture

### 4. Positions Section (Job Listings)
- Title: "Open Positions"
- 6 job cards:
  1. **Senior Frontend Developer** (Engineering)
     - Location: Remote / San Francisco
     - Type: Full-time
     - Requirements: 5+ years Vue.js/React experience, etc.
  
  2. **AI/ML Engineer** (AI & Research)
     - Location: Remote / New York
     - Type: Full-time
     - Requirements: MS/PhD, TensorFlow/PyTorch experience, etc.
  
  3. **Product Designer** (Design)
     - Location: Remote / London
     - Type: Full-time
     - Requirements: 4+ years product design experience, etc.
  
  4. **Customer Success Manager** (Customer Success)
     - Location: Remote
     - Type: Full-time
     - Requirements: 3+ years customer success experience, etc.
  
  5. **Backend Engineer** (Engineering)
     - Location: Remote / Seattle
     - Type: Full-time
     - Requirements: 5+ years backend development experience, etc.
  
  6. **Marketing Manager** (Marketing)
     - Location: Remote / Austin
     - Type: Full-time
     - Requirements: 4+ years marketing experience, etc.

### 5. Benefits Section
- Title: "Why Work With Us?"
- 6 benefit cards:
  - Remote First
  - Health & Wellness
  - Unlimited PTO
  - Learning Budget
  - Competitive Salary
  - Amazing Team

### 6. Culture Section
- Title: "Our Culture"
- 4 culture highlights:
  - Innovation First
  - Collaboration
  - Work-Life Balance
  - Diversity & Inclusion

### 7. CTA Section (Call to Action)
- Title: "Don't See the Right Position?"
- Description text
- "Send General Application" button

### 8. Footer
- Same footer structure as About page

### 9. Scroll to Top Button
- Fixed at bottom right corner
- Shows when scrolled past 300px

## Features

### Navigation Functions
- `goToHome()`: Navigate to homepage
- `goToAbout()`: Navigate to about us page
- `goToCareers()`: Scroll to page top
- `goToContact()`: Navigate to homepage contact section
- `goToLogin()`: Navigate to login page

### Application Functions
- `applyForJob(position)`: Opens email client with pre-filled job application email
  - Recipient: careers@uigenius.top
  - Subject: "Application for [Position Name] position"
  - Body: Application template with position name

- `contactHR()`: Sends general application email
  - Recipient: careers@uigenius.top
  - Subject: "General Application - Uigenius"
  - Body: General application template

### Interaction Features
- Position card hover effects
- Benefit card hover effects
- Scroll listener to show/hide scroll-to-top button
- Smooth scroll animations

## Position Card Design

Each position card includes:
- Job title and department badge
- Location and employment type
- Job description
- Requirements list
- "Apply Now" button

## Style Design

### Color Theme
- Primary color: #ef4444 (red)
- Dark text: #333
- Light text: #666
- Background white: #fff
- Light gray background: #f8f8f8

### Department Badge Colors
- Unified red theme with transparent background

### Responsive Design
- Desktop: 2-3 column layout
- Tablet (< 992px): Hide navigation menu, single column layout
- Mobile (< 768px): Adjust font sizes, single column layout
- Small screen (< 480px): Further optimize spacing and fonts

## Technical Implementation
- Vue.js Single File Component
- Scoped CSS
- Font Awesome icons
- Google Fonts (Poppins)
- Responsive Grid layout
- Flexbox layout

## Route Configuration
- Path: `/pages/careers/careers`
- Page name: CareersPage

## Email Configuration
- Careers email: careers@uigenius.top
- Email templates include URL encoding to ensure special characters display correctly
