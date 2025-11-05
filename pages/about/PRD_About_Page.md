# PRD: About Us Page

## Overview
The About Us page showcases Uigenius's mission, vision, team, and values, helping users better understand the company and the story behind the product.

## Page Structure

### 1. Navigation Bar
- Logo and brand name
- Navigation menu: HOME, ABOUT US, CAREERS, CONTACT
- "Try Free" circular button

### 2. Hero Section
- Main title: "About Uigenius"
- Subtitle: "Transforming Ideas into Beautiful Designs with AI"
- Gradient background

### 3. Mission Section
- Title: "Our Mission"
- Description of Uigenius's mission and vision
- Placeholder image

### 4. Story Section
- Title: "Who We Are"
- Introduction to team background and expertise
- Reverse layout (image on left, text on right)

### 5. Vision Section
- Title: "Our Vision"
- Description of future development direction and goals
- Placeholder image

### 6. Stats Section
- Title: "Our Impact"
- 4 statistics cards:
  - 10,000+ Active Users
  - 50,000+ Designs Created
  - 95% Customer Satisfaction
  - 24/7 Support Available

### 7. Values Section
- Title: "Our Values"
- 4 value cards:
  - User-Centric
  - Innovation
  - Collaboration
  - Trust & Security

### 8. CTA Section (Call to Action)
- Title: "Ready to Transform Your Design Process?"
- Description text
- "Get Started Free" button, redirects to login page

### 9. Footer
- Company information
- Product links
- Company links
- Social media links
- Customer support email
- Copyright information

### 10. Scroll to Top Button
- Fixed at bottom right corner
- Shows when scrolled past 300px

## Features

### Navigation Functions
- `goToHome()`: Navigate to homepage
- `goToAbout()`: Scroll to page top
- `goToCareers()`: Navigate to careers page
- `goToContact()`: Navigate to homepage contact section
- `goToLogin()`: Navigate to login page

### Interaction Features
- Stats card hover effects
- Values card hover effects
- Scroll listener to show/hide scroll-to-top button
- Smooth scroll animations

## Style Design

### Color Theme
- Primary color: #ef4444 (red)
- Dark text: #333
- Light text: #666
- Background white: #fff
- Light gray background: #f8f8f8

### Responsive Design
- Desktop: Full layout
- Tablet (< 992px): Hide navigation menu, single column layout
- Mobile (< 768px): Adjust font sizes, single column layout
- Small screen (< 480px): Further optimize spacing and fonts

## Technical Implementation
- Vue.js Single File Component
- Scoped CSS
- Font Awesome icons
- Google Fonts (Poppins)
- Responsive Grid layout

## Route Configuration
- Path: `/pages/about/about`
- Page name: AboutPage
