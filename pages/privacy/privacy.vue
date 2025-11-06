<template>
  <div class="privacy-page-root">
    <header class="header">
      <div class="container">
        <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
          <a @click.prevent="goToHome" class="logo" style="margin-right: 15px; cursor: pointer;">
            <img src="https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/static/Icon paint brush.png" alt="Uigenius Logo">
            Uigenius
          </a>
          <nav class="nav-menu">
            <ul>
              <li><a @click.prevent="goToHome">HOME</a></li>
              <li><a @click.prevent="goToAbout">ABOUT US</a></li>
              <li><a @click.prevent="goToCareers">CAREERS</a></li>
              <li><a @click.prevent="goToContact">CONTACT</a></li>
            </ul>
            <div class="try-free" @click="goToLogin">
              <span>Try</span>
              <span>Free</span>
            </div>
          </nav>
        </div>
      </div>
    </header>

    <main>
      <section class="hero-section">
        <div class="container">
          <h1>Privacy Policy</h1>
          <p class="hero-subtitle">How we collect, use, store, and protect your information across the Uigenius platform</p>
          <p class="last-updated">Last updated: November 5, 2025</p>
        </div>
      </section>

      <section class="intro-section">
        <div class="container">
          <div class="intro-content">
            <h2>Your Privacy Matters</h2>
            <p>This Privacy Policy explains what data we collect, why we collect it, and how we keep it safe. By accessing or using Uigenius, you consent to the practices described in this policy.</p>
            <p>We are committed to being transparent and giving you control over your personal information. If you have questions, please contact us at any time.</p>
          </div>
        </div>
      </section>

      <section class="data-section">
        <div class="container">
          <h2 class="section-title text-center">Information We Collect</h2>
          <div class="data-grid">
            <div class="data-card">
              <h3>Account Details</h3>
              <p>When you create an account we collect your name, email, organization, and authentication details to provide secure access.</p>
            </div>
            <div class="data-card">
              <h3>Usage Insights</h3>
              <p>We track interactions with our features, templates, and generated designs to improve performance and personalize your experience.</p>
            </div>
            <div class="data-card">
              <h3>Support Communications</h3>
              <p>Messages sent to our support team, including attachments and contact preferences, are stored to resolve issues and enhance service quality.</p>
            </div>
            <div class="data-card">
              <h3>Device & Technical Data</h3>
              <p>We automatically collect IP addresses, device attributes, browser information, and diagnostic logs to maintain platform security and reliability.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="usage-section">
        <div class="container">
          <div class="content-wrapper">
            <div class="text-content">
              <h2>How We Use Your Data</h2>
              <p>Your information helps us deliver, maintain, and improve Uigenius. We use your data to authenticate access, personalize content, analyze usage trends, and communicate important updates.</p>
              <p>Data may also be used to enforce our Terms of Service, prevent fraud, and comply with legal obligations. We never sell personal data to third parties.</p>
            </div>
            <div class="list-content">
              <h3>Examples of Use</h3>
              <ul>
                <li>Generating tailored design recommendations.</li>
                <li>Sending onboarding tips and product announcements.</li>
                <li>Monitoring system performance and debugging issues.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="sharing-section">
        <div class="container">
          <h2 class="section-title text-center">Sharing & Disclosure</h2>
          <div class="sharing-grid">
            <div class="sharing-card">
              <h3>Service Providers</h3>
              <p>We share data with trusted vendors who support hosting, analytics, customer communications, and payment processing under strict confidentiality agreements.</p>
            </div>
            <div class="sharing-card">
              <h3>Legal Compliance</h3>
              <p>We may disclose information if required by law or to respond to valid legal requests, protect users, or defend our rights and property.</p>
            </div>
            <div class="sharing-card">
              <h3>Business Transfers</h3>
              <p>In the event of a merger, acquisition, or restructuring, your information may be transferred as part of the transaction with protection agreements in place.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="controls-section">
        <div class="container">
          <div class="controls-wrapper">
            <div class="controls-card">
              <h2>Your Choices & Rights</h2>
              <p>You can update your account details, download your data, or delete your account by contacting our support team. Depending on your location, you may have additional rights such as data portability or objections to processing.</p>
              <p>We respond to all data requests promptly and in accordance with applicable regulations.</p>
            </div>
            <div class="controls-card">
              <h2>Security & Retention</h2>
              <p>We implement technical and organizational safeguards to protect your information, including encryption, access controls, and continuous monitoring.</p>
              <p>Data is retained only as long as necessary to fulfill the purposes described, unless longer retention is required by law.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="cookies-section">
        <div class="container">
          <div class="cookies-content">
            <h2>Cookies & Tracking Technologies</h2>
            <p>We use cookies and similar technologies to remember preferences, keep you signed in, and measure interactions with our platform. You can control cookies through your browser settings; disabling cookies may impact some features.</p>
            <p>Where required, we obtain consent before setting non-essential cookies.</p>
          </div>
        </div>
      </section>

      <section class="children-section">
        <div class="container">
          <div class="children-wrapper">
            <div class="children-text">
              <h2>Children's Privacy</h2>
              <p>Uigenius is not directed to individuals under 16. We do not knowingly collect personal information from children. If we learn that a child has provided us with personal data, we will take steps to delete it promptly.</p>
            </div>
            <div class="children-highlight">
              <h3>International Users</h3>
              <p>Your information may be processed in countries where we or our providers operate. We ensure appropriate safeguards are in place for cross-border data transfers in line with legal requirements.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="cta-section">
        <div class="container">
          <h2>Staying Informed</h2>
          <p>We may update this policy from time to time. We will notify you of material changes and post the latest version here.</p>
          <div class="cta-actions">
            <button class="btn btn-primary" @click="goToTerms">Review Terms of Service</button>
            <button class="btn btn-outline-primary" @click="contactPrivacy">Contact Privacy Team</button>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="container footer-grid">
        <div class="footer-about">
          <a @click.prevent="goToHome" class="logo" style="cursor: pointer;">
            <img src="https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/static/Icon paint brush.png" alt="Uigenius Logo">
            Uigenius
          </a>
          <p>AI-powered UX/UI design tool that quickly generates prototypes for apps and websites from simple text descriptions.</p>
        </div>
        <div class="footer-links">
          <h4>Product</h4>
          <ul>
            <li><a @click.prevent="goToFeatures">Features</a></li>
            <li><a @click.prevent="goToPricing">Pricing</a></li>
          </ul>
        </div>
        <div class="footer-links">
          <h4>Company</h4>
          <ul>
            <li><a @click.prevent="goToAbout">About Us</a></li>
            <li><a @click.prevent="goToCareers">Careers</a></li>
            <li><a @click.prevent="goToContact">Contact</a></li>
          </ul>
        </div>
        <div class="footer-links">
          <h4>Connect with us</h4>
          <div class="social-icons">
            <a href="https://x.com/Uigenius13952" target="_blank" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
          </div>
        </div>
        <div class="footer-links">
          <h4>Customer Support</h4>
          <div class="support-email">
            <a href="mailto:support@uigenius.top"><i class="fas fa-envelope"></i> support@uigenius.top</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="container">
          <p>© 2025 Uigenius. All rights reserved.</p>
          <div class="footer-legal-links">
            <a @click.prevent="goToTerms">Terms of Service</a>
            <span class="separator">|</span>
            <a @click.prevent="goToPrivacy">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>

    <div class="scroll-to-top" @click="scrollToTop" v-show="showScrollTop">
      <i class="fas fa-chevron-up"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrivacyPage',
  data() {
    return {
      showScrollTop: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.showScrollTop = window.scrollY > 300;
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    goToHome() {
      uni.switchTab({
        url: '/pages/intro/intro'
      });
    },
    goToAbout() {
      uni.navigateTo({ url: '/pages/about/about' });
    },
    goToCareers() {
      uni.navigateTo({ url: '/pages/careers/careers' });
    },
    goToFeatures() {
      uni.switchTab({
        url: '/pages/intro/intro',
        success: () => {
          uni.setStorageSync('scrollToSection', 'features');
        }
      });
    },
    goToPricing() {
      uni.switchTab({
        url: '/pages/intro/intro',
        success: () => {
          uni.setStorageSync('scrollToSection', 'pricing');
        }
      });
    },
    goToContact() {
      uni.switchTab({
        url: '/pages/intro/intro',
        success: () => {
          uni.setStorageSync('scrollToSection', 'contact');
        }
      });
    },
    goToLogin() {
      uni.switchTab({
        url: '/pages/login/login',
        fail: () => {
          uni.navigateTo({ url: '/pages/login/login' });
        }
      });
    },
    goToTerms() {
      uni.navigateTo({ url: '/pages/terms/terms' });
    },
    goToPrivacy() {
      this.scrollToTop();
    },
    contactPrivacy() {
      const subject = encodeURIComponent('Privacy Inquiry - Uigenius');
      const body = encodeURIComponent('Hello Uigenius Privacy Team,\n\nI have a question regarding your privacy practices.\n\nBest regards');
      window.location.href = `mailto:privacy@uigenius.top?subject=${subject}&body=${body}`;
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

.privacy-page-root {
  --primary-red: #ef4444;
  --dark-text: #333;
  --light-text: #666;
  --lighter-text: #999;
  --background-white: #fff;
  --light-gray-bg: #f8f8f8;
  --border-color: #eee;
  --button-hover: #dc2626;
  --accent-green: #047857;

  font-family: 'Poppins', sans-serif;
  line-height: 1.6;
  color: var(--dark-text);
  background-color: var(--background-white);
  width: 100%;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

a {
  text-decoration: none;
  color: inherit;
}

ul {
  list-style: none;
}

.text-center {
  text-align: center;
}

.btn {
  display: inline-block;
  padding: 14px 32px;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  text-align: center;
  border: none;
  font-size: 16px;
}

.btn-primary {
  background-color: var(--primary-red);
  color: var(--background-white);
}

.btn-secondary {
  background-color: rgba(4, 120, 87, 0.1);
  color: var(--accent-green);
}

.btn-primary:hover,
.btn-secondary:hover,
.btn-outline-primary:hover,
.btn-outline-primary:focus {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.btn-outline-primary {
  background-color: var(--background-white);
  color: var(--primary-red);
  border: 2px solid var(--primary-red);
}

.btn-outline-primary:hover,
.btn-outline-primary:focus {
  background-color: var(--primary-red);
  color: var(--background-white);
}

.header {
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  background-color: var(--background-white);
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.logo {
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: 700;
  color: var(--dark-text);
}

.logo img {
  height: 30px;
  margin-right: 8px;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-menu ul {
  display: flex;
  gap: 30px;
}

.nav-menu a {
  font-weight: 500;
  color: var(--light-text);
  transition: color 0.3s ease;
  cursor: pointer;
}

.nav-menu a:hover {
  color: var(--primary-red);
}

.try-free {
  font-weight: 600;
  color: var(--primary-red);
  border: 2px solid var(--primary-red);
  border-radius: 50%;
  width: 70px;
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.2;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.try-free:hover {
  background-color: var(--primary-red);
  color: var(--background-white);
}

.hero-section {
  padding: 100px 0 80px;
  background: linear-gradient(135deg, #f8f8f8 0%, #fff 100%);
  text-align: center;
}

.hero-section h1 {
  font-size: 56px;
  font-weight: 700;
  margin-bottom: 20px;
  color: var(--dark-text);
}

.hero-subtitle {
  font-size: 22px;
  color: var(--light-text);
  max-width: 650px;
  margin: 0 auto 15px;
}

.last-updated {
  font-size: 14px;
  color: var(--lighter-text);
}

.intro-section {
  padding: 80px 0;
  background-color: var(--background-white);
}

.intro-content {
  max-width: 880px;
  margin: 0 auto;
  text-align: center;
}

.intro-content h2 {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 25px;
}

.intro-content p {
  font-size: 18px;
  line-height: 1.9;
  color: var(--light-text);
  margin-bottom: 20px;
}

.data-section {
  padding: 100px 0;
  background-color: var(--light-gray-bg);
}

.section-title {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 60px;
  color: var(--dark-text);
}

.data-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
}

.data-card {
  background-color: var(--background-white);
  padding: 40px 35px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.data-card h3 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 18px;
}

.data-card p {
  font-size: 16px;
  color: var(--light-text);
  line-height: 1.8;
}

.usage-section {
  padding: 100px 0;
  background-color: var(--background-white);
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 60px;
  align-items: start;
}

.text-content h2 {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 25px;
}

.text-content p {
  font-size: 18px;
  color: var(--light-text);
  margin-bottom: 18px;
  line-height: 1.8;
}

.list-content {
  background: linear-gradient(135deg, rgba(4, 120, 87, 0.05) 0%, rgba(4, 120, 87, 0.15) 100%);
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 12px 30px rgba(4, 120, 87, 0.15);
}

.list-content h3 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
}

.list-content ul li {
  font-size: 16px;
  color: var(--light-text);
  margin-bottom: 14px;
  position: relative;
  padding-left: 20px;
}

.list-content ul li::before {
  content: '\2022';
  position: absolute;
  left: 0;
  color: var(--accent-green);
  font-size: 20px;
  line-height: 1;
}

.sharing-section {
  padding: 100px 0;
  background-color: var(--light-gray-bg);
}

.sharing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.sharing-card {
  background-color: var(--background-white);
  padding: 35px;
  border-radius: 15px;
  border: 1px solid rgba(229, 231, 235, 0.8);
  transition: all 0.3s ease;
}

.sharing-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 35px rgba(0, 0, 0, 0.08);
}

.sharing-card h3 {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 15px;
}

.sharing-card p {
  font-size: 16px;
  color: var(--light-text);
  line-height: 1.7;
}

.controls-section {
  padding: 100px 0;
  background-color: var(--background-white);
}

.controls-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
}

.controls-card {
  border-radius: 16px;
  padding: 45px;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(239, 68, 68, 0.12) 100%);
  border: 1px solid rgba(239, 68, 68, 0.2);
  box-shadow: 0 12px 40px rgba(239, 68, 68, 0.12);
}

.controls-card h2 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
}

.controls-card p {
  font-size: 17px;
  color: var(--light-text);
  margin-bottom: 18px;
  line-height: 1.8;
}

.cookies-section {
  padding: 80px 0;
  background-color: var(--light-gray-bg);
}

.cookies-content {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

.cookies-content h2 {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 20px;
}

.cookies-content p {
  font-size: 18px;
  color: var(--light-text);
  margin-bottom: 18px;
  line-height: 1.8;
}

.children-section {
  padding: 100px 0;
  background-color: var(--background-white);
}

.children-wrapper {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 50px;
  align-items: stretch;
}

.children-text h2 {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 18px;
}

.children-text p {
  font-size: 18px;
  color: var(--light-text);
  line-height: 1.8;
}

.children-highlight {
  background-color: var(--light-gray-bg);
  border-radius: 16px;
  padding: 40px;
  border: 1px solid rgba(229, 231, 235, 0.8);
}

.children-highlight h3 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 15px;
}

.children-highlight p {
  font-size: 16px;
  color: var(--light-text);
  line-height: 1.7;
}

.cta-section {
  padding: 100px 0;
  background: linear-gradient(135deg, var(--primary-red) 0%, #dc2626 100%);
  text-align: center;
  color: var(--background-white);
}

.cta-section h2 {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 20px;
}

.cta-section p {
  font-size: 20px;
  margin-bottom: 40px;
  opacity: 0.95;
}

.cta-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.footer {
  background-color: var(--light-gray-bg);
  padding: 80px 0 40px;
  color: var(--light-text);
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  gap: 50px;
}

.footer-about {
  padding-right: 20px;
}

.footer-about .logo {
  margin-bottom: 20px;
  color: var(--dark-text);
}

.footer-about p {
  font-size: 14px;
  line-height: 1.8;
  max-width: 320px;
}

.footer-links h4 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 25px;
  color: var(--dark-text);
}

.footer-links ul li {
  margin-bottom: 12px;
}

.footer-links a {
  font-size: 15px;
  transition: color 0.3s ease;
  cursor: pointer;
}

.footer-links a:hover {
  color: var(--primary-red);
}

.social-icons a {
  font-size: 24px;
  color: var(--light-text);
  transition: color 0.3s ease;
}

.social-icons a:hover {
  color: var(--primary-red);
}

.support-email a {
  font-size: 15px;
  color: var(--light-text);
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.3s ease;
}

.support-email a:hover {
  color: var(--primary-red);
}

.footer-bottom {
  border-top: 1px solid var(--border-color);
  padding-top: 30px;
  margin-top: 60px;
  text-align: center;
  font-size: 14px;
  color: var(--lighter-text);
}

.footer-legal-links {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.footer-legal-links a {
  color: var(--lighter-text);
  font-size: 14px;
  transition: color 0.3s ease;
}

.footer-legal-links a:hover {
  color: var(--primary-red);
}

.footer-legal-links .separator {
  color: var(--border-color);
}

.scroll-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: var(--primary-red);
  color: var(--background-white);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1000;
}

.scroll-to-top:hover {
  background-color: var(--button-hover);
  transform: translateY(-3px);
}

@media (max-width: 992px) {
  .nav-menu ul {
    display: none;
  }

  .data-grid,
  .sharing-grid,
  .controls-wrapper,
  .children-wrapper {
    grid-template-columns: 1fr;
  }

  .content-wrapper {
    grid-template-columns: 1fr;
  }

  .footer-grid {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 35px;
  }
}

@media (max-width: 768px) {
  .hero-section h1 {
    font-size: 42px;
  }

  .hero-subtitle {
    font-size: 18px;
  }

  .section-title {
    font-size: 32px;
  }

  .intro-content h2,
  .text-content h2,
  .controls-card h2,
  .children-text h2 {
    font-size: 32px;
  }

  .intro-content p,
  .text-content p,
  .controls-card p,
  .cookies-content p,
  .children-text p {
    font-size: 16px;
  }

  .btn {
    width: 100%;
  }

  .cta-actions {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .hero-section h1 {
    font-size: 34px;
  }

  .intro-content h2 {
    font-size: 28px;
  }

  .section-title {
    font-size: 28px;
  }

  .data-card,
  .sharing-card,
  .controls-card,
  .children-highlight {
    padding: 28px;
  }

  .footer-grid {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
</style>

