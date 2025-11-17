<template>
  <div class="container">
    <header class="header">
      <div class="container">
        <h1 class="header__title">Choose Your Plan</h1>
        <p class="header__subtitle">Unlock unlimited features and supercharge your workflow with our flexible pricing options.</p>
      </div>
    </header>

    <main class="pricing-section">
      <div class="container pricing-cards-container">
        <!-- PRO Card -->
        <div class="pricing-card">
          <div>
            <h2 class="pricing-card__label" style="color: rgb(229, 57, 53);">PRO</h2>
            <p class="pricing-card__price">$29 <span>/ Month</span></p>
            <ul class="pricing-card__features">
              <li>Unlimited UI generation request</li>
              <li>Unlimited screenshot conversion</li>
              <li>Pro AI model</li>
              <li>Unlimited storage</li>
              <li>Priority support</li>
            </ul>
          </div>
          <button class="btn btn--primary" @click="openModal" style="background-color: rgb(229, 57, 53);">Contact Sales</button>
        </div>

        <!-- Lifetime Deals Card (Highlighted "Best Value") -->
        <div class="pricing-card pricing-card--best-value">
          <div>
            <h2 class="pricing-card__label" style="color: rgb(229, 57, 53);">Lifetime Deals</h2>
            <p class="pricing-card__price">$79 <span>/ Lifetime</span></p>
            <ul class="pricing-card__features">
              <li>Unlimited UI generation request</li>
              <li>Unlimited screenshot conversion</li>
              <li>Unlimited prompt limitation</li>
              <li>Pro AI model</li>
              <li>Unlimited storage</li>
              <li>Priority support</li>
              <li><strong>Dedicated account manager</strong></li>
            </ul>
          </div>
          <button class="btn btn--primary" @click="openModal" style="background-color: rgb(229, 57, 53);">Contact Sales</button>
        </div>
      </div>
    </main>

    <!-- <footer class="footer">
      <div class="container">
        &copy; 2023 Your Company. All rights reserved.
      </div>
    </footer> -->

    <!-- Contact Sales Modal -->
    <div id="contactModal" class="modal" :class="{ 'is-open': isModalOpen }" role="dialog" aria-modal="true" aria-labelledby="modalTitle" @click.self="closeModal">
      <div class="modal-content">
        <button type="button" class="modal-close" aria-label="Close contact form" @click="closeModal">×</button>
        <h3 id="modalTitle">Contact Our Sales Team</h3>
        <form class="modal-form" @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required="" aria-required="true">
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required="" aria-required="true">
          </div>
          <div class="form-group">
            <label for="message">Message:</label>
            <textarea id="message" name="message" rows="5" required="" aria-required="true"></textarea>
          </div>
          <button type="submit" class="btn btn--primary">Send Message</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PricingPlans',
  data() {
    return {
      isModalOpen: false,
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    },
    closeModal() {
      this.isModalOpen = false;
      document.body.style.overflow = ''; // Restore scrolling
    },
    handleKeydown(event) {
      if (event.key === 'Escape' && this.isModalOpen) {
        this.closeModal();
      }
    },
    submitForm() {
      // Placeholder for form submission logic
      alert('Form submitted! (In a real application, this would send data)');
      // Optionally clear form or close modal after submission
      this.closeModal();
    },
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeydown);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeydown);
    // Ensure body scrolling is restored if component is destroyed while modal is open
    document.body.style.overflow = '';
  },
};
</script>

<style scoped>
/* Google Fonts Import (from original <style> block) */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@700&family=Roboto+Mono:wght@700&display=swap');
@import 'https://uigenius.top/static/editor/libs/builder/../../css/uigenius-page.css';


/* Base Styles & Global Resets */
*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

/* CSS Variables from :root and body styles, applied to the component's outermost wrapper .container */
.container {
    /* Color Palette */
    --primary-accent: #6C63FF; /* Vibrant purple/blue */
    --secondary-accent: #FFC107; /* Subtle orange/yellow for "best value" */
    --background-color: #FFFFFF; /* Light grey */
    --card-background: #FFFFFF; /* Pure white */
    --text-primary: #343A40; /* Dark charcoal */
    --text-secondary: #6C757D; /* Medium grey (muted) */
    --success-color: #28A745; /* Green for feature icons */
    --border-color: #E9ECEF; /* Light border for footer */
    --error-color: #DC3545; /* Red for form validation */

    /* Typography */
    --font-heading: 'Plus Jakarta Sans', 'Inter', sans-serif;
    --font-body: 'Inter', 'Roboto', sans-serif;
    --font-price: 'Roboto Mono', 'Inter', monospace;

    /* Spacing (8px baseline grid) */
    --spacing-xxs: 4px;
    --spacing-xs: 8px;
    --spacing-sm: 16px;
    --spacing-md: 24px;
    --spacing-lg: 32px;
    --spacing-xl: 40px;
    --spacing-xxl: 48px;
    --spacing-xxxl: 64px;
    --spacing-xxxxl: 80px;

    /* Border Radius */
    --border-radius-sm: 8px;
    --border-radius-md: 12px;

    /* Body styles from original HTML, applied to the main wrapper */
    font-family: var(--font-body);
    line-height: 1.6;
    color: var(--text-primary);
    background-color: var(--background-color);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden; /* Prevent horizontal scroll on small screens */

    /* Generic Container for content width (original .container style) */
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 var(--spacing-md); /* Mobile padding */
}

/* Header Section Styling */
.header {
    text-align: center;
    padding: var(--spacing-xxl) var(--spacing-md); /* Vertical & horizontal padding */
}

.header__title {
    font-family: var(--font-heading);
    font-size: 36px; /* Mobile H1 */
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: var(--spacing-sm);
}

.header__subtitle {
    font-size: 18px;
    color: var(--text-secondary);
    max-width: 1400px;
    margin: 0 0 0 0;
}

/* Pricing Cards Section Styling */
.pricing-section {
    padding-bottom: var(--spacing-xxxxl); /* Ample space below cards */
}

.pricing-cards-container {
    display: flex;
    flex-direction: column; /* Stack vertically by default (mobile-first) */
    gap: var(--spacing-lg); /* 32px gap between cards */
    align-items: center; /* Center cards when stacked */
    justify-content: center;
}

/* Individual Pricing Card Styling */
.pricing-card {
    background-color: var(--card-background);
    border-radius: var(--border-radius-md); /* 12px rounded corners */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); /* Subtle box-shadow */
    padding: var(--spacing-xl); /* 40px internal padding */
    text-align: center;
    position: relative;
    overflow: hidden; /* For the "BEST VALUE" tag */
    width: 100%; /* Full width on mobile */
    max-width: none; /* Remove max-width to allow expansion */
    flex: 1; /* Allow cards to grow and fill available space */
    min-width: 350px; /* Minimum width for cards */
    transition: transform 0.3s ease, box-shadow 0.3s ease; /* Smooth hover transition */

    display: flex; /* Flex container for internal content */
    flex-direction: column; /* Stack content vertically */
    justify-content: space-between; /* Push button to bottom */
}

.pricing-card:hover {
    transform: translateY(-8px); /* Slightly lift card */
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15); /* Enhanced shadow */
}

.pricing-card__label {
    font-family: var(--font-heading);
    font-size: 28px; /* Mobile H2 */
    font-weight: 700;
    color: var(--primary-accent);
    margin-bottom: var(--spacing-md);
}

.pricing-card__price {
    font-family: var(--font-price);
    font-size: 48px; /* Mobile price */
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: var(--spacing-sm);
    display: block; /* Ensures span is inline with price but allows block styling */
}

.pricing-card__price span {
    font-family: var(--font-body);
    font-size: 16px; /* Mobile duration text */
    font-weight: 400;
    color: var(--text-secondary);
    margin-left: var(--spacing-xs);
}

.pricing-card__features {
    list-style: none; /* Remove default list bullets */
    text-align: left;
    margin: var(--spacing-lg) 0;
    flex-grow: 1; /* Allow feature list to take available vertical space */
}

.pricing-card__features li {
    font-size: 16px; /* Mobile feature text */
    color: var(--text-primary);
    margin-bottom: var(--spacing-sm);
    padding-left: var(--spacing-md); /* Space for custom checkmark icon */
    position: relative;
}

.pricing-card__features li::before {
    content: '\2713'; /* Unicode checkmark character */
    position: absolute;
    left: 0;
    color: var(--success-color);
    font-weight: 700;
    line-height: inherit; /* Align with text */
}

.pricing-card__features li strong {
    font-weight: 600; /* Bolder text for highlighted feature */
}

/* "BEST VALUE" Card Specifics */
.pricing-card--best-value {
    border: 2px solid var(--secondary-accent); /* Orange border for distinction */
}

.pricing-card--best-value::before {
    content: 'BEST VALUE';
    position: absolute;
    top: 20px; /* Position from top */
    right: -25px; /* Position from right, creating a diagonal cut-off */
    background-color: var(--secondary-accent);
    color: var(--text-primary); /* Dark text on orange for contrast */
    font-size: 12px;
    font-weight: 700;
    padding: var(--spacing-xxs) var(--spacing-xl); /* Padding for ribbon content */
    width: 150px; /* Fixed width for the ribbon */
    transform: rotate(45deg); /* Rotate the ribbon */
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    z-index: 10; /* Ensure ribbon is above card content */
}

/* Call to Action Buttons */
.btn {
    display: inline-block;
    width: 100%; /* Full width button */
    padding: var(--spacing-sm) var(--spacing-md); /* Mobile button padding: 16px 24px */
    font-size: 16px; /* Mobile button text */
    font-weight: 600;
    text-align: center;
    text-decoration: none;
    border-radius: var(--border-radius-sm); /* 8px border-radius */
    cursor: pointer;
    border: none;
    transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
    margin-top: auto; /* Push button to the bottom of the flex container */
}

.btn--primary {
    background-color: var(--primary-accent);
    color: var(--card-background); /* White text */
}

.btn--primary:hover {
    background-color: #5A54D9; /* Slightly darker primary accent */
    transform: translateY(-2px); /* Slight lift on hover */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); /* Subtle shadow on hover */
}

.btn:focus {
    outline: 2px solid var(--primary-accent); /* Accessible focus state */
    outline-offset: 2px;
    box-shadow: 0 0 0 3px rgba(108, 99, 255, 0.2); /* Enhanced focus visual */
}

/* Modal Styles (for Contact Sales) */
.modal {
    display: none; /* Hidden by default */
    position: fixed;
    z-index: 1000; /* High z-index to overlay everything */
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.6); /* Semi-transparent overlay */
    backdrop-filter: blur(5px); /* Modern blur effect for background */
    -webkit-backdrop-filter: blur(5px);
    padding: var(--spacing-md);
    opacity: 0; /* Start hidden for transition */
    visibility: hidden; /* Ensure it's not focusable when hidden */
    transition: opacity 0.3s ease, visibility 0.3s ease;
}

.modal.is-open {
    opacity: 1;
    visibility: visible;
    display: flex; /* Override 'display: none' to center content */
    align-items: center;
    justify-content: center;
}

.modal-content {
    background-color: var(--card-background);
    padding: var(--spacing-xl);
    border-radius: var(--border-radius-md);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    position: relative;
    width: 90%;
    max-width: 500px;
    transform: translateY(-20px); /* Start slightly above center for animation */
    opacity: 0; /* Start hidden for animation */
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease; /* Bouncy entrance */
}
.modal.is-open .modal-content {
    transform: translateY(0);
    opacity: 1;
}

.modal-content h3 {
    font-family: var(--font-heading);
    font-size: 24px;
    color: var(--text-primary);
    margin-bottom: var(--spacing-lg);
    text-align: center;
}

.modal-close {
    color: var(--text-secondary);
    position: absolute;
    top: var(--spacing-md);
    right: var(--spacing-md);
    font-size: var(--spacing-lg); /* 24px */
    font-weight: 700;
    cursor: pointer;
    transition: color 0.2s ease;
    line-height: 1;
}

.modal-close:hover,
.modal-close:focus {
    color: var(--primary-accent);
    outline: none; /* Remove default focus outline */
    text-decoration: none; /* In case it's a link */
}

.modal-form .form-group {
    margin-bottom: var(--spacing-md);
}

.modal-form label {
    display: block;
    margin-bottom: var(--spacing-xs);
    font-size: 14px;
    color: var(--text-secondary);
    font-weight: 500;
}

.modal-form input[type="text"],
.modal-form input[type="email"],
.modal-form textarea {
    width: 100%;
    padding: var(--spacing-sm);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-sm);
    font-family: var(--font-body);
    font-size: 16px;
    color: var(--text-primary);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.modal-form input[type="text"]:focus,
.modal-form input[type="email"]:focus,
.modal-form textarea:focus {
    border-color: var(--primary-accent);
    box-shadow: 0 0 0 3px rgba(108, 99, 255, 0.2);
    outline: none;
}

.modal-form textarea {
    min-height: 100px;
    resize: vertical; /* Allow vertical resizing */
}

.modal-form .btn {
    margin-top: var(--spacing-sm); /* Adjust button margin within form */
}

/* Form Validation States */
.modal-form input:required:invalid:focus,
.modal-form textarea:required:invalid:focus {
    border-color: var(--error-color); /* Red border for invalid */
    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.2);
}
.modal-form input:required:valid:focus,
.modal-form textarea:required:valid:focus {
    border-color: var(--success-color); /* Green border for valid */
    box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.2);
}

/* Footer Styling */
.footer {
    text-align: center;
    padding: var(--spacing-lg);
    color: var(--text-secondary);
    font-size: 14px;
    border-top: 1px solid var(--border-color);
    margin-top: var(--spacing-xxl);
}

/* Responsive Design - Mobile-First Approach */

/* Tablet Layout (768px and up) */
@media (min-width: 768px) {
    .container {
        padding: 0 var(--spacing-lg); /* Consistent padding */
    }

    .header {
        padding: var(--spacing-xxxl) var(--spacing-lg);
    }

    .header__title {
        font-size: 42px; /* Tablet H1 */
    }

    .header__subtitle {
        font-size: 19px;
    }

    .pricing-cards-container {
        flex-direction: row; /* Layout cards side-by-side */
        flex-wrap: wrap; /* Allow cards to wrap if more than 2 */
        align-items: stretch; /* Make cards stretch to equal height */
    }

    .pricing-card {
        /* On tablet, allow cards to take roughly half the width,
           accounting for gap. clamp() is still good for min/max. */
        width: clamp(300px, 45vw, 400px);
    }

    .btn {
        padding: var(--spacing-sm) var(--spacing-xl); /* Larger button padding: 16px 40px */
    }
}

/* Desktop Layout (1024px and up) */
@media (min-width: 1024px) {
    .header {
        padding: var(--spacing-xxxxl) var(--spacing-lg); /* Larger header padding */
    }

    .header__title {
        font-size: 48px; /* Desktop H1 */
    }

    .pricing-card__label {
        font-size: 32px; /* Desktop H2 (Card Label) */
    }

    .pricing-card__price {
        font-size: 64px; /* Desktop Price */
    }

    .pricing-card__price span {
        font-size: 18px; /* Desktop duration text */
    }

    .pricing-card__features li {
        font-size: 18px; /* Desktop feature list text */
    }

    .btn {
        font-size: 18px; /* Desktop button text */
    }
}
</style>