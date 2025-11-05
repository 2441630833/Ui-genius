<template>
  <div class="about-page-root">
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
          <h1>About Uigenius</h1>
          <p class="hero-subtitle">Transforming Ideas into Beautiful Designs with AI</p>
        </div>
      </section>

      <section class="mission-section">
        <div class="container">
          <div class="content-wrapper">
            <div class="text-content">
              <h2>Our Mission</h2>
              <p>At Uigenius, we're on a mission to democratize design and make professional UI/UX creation accessible to everyone. We believe that great design shouldn't require years of training or expensive tools.</p>
              <p>Our AI-powered platform empowers creators, entrepreneurs, and teams to bring their ideas to life faster and more efficiently than ever before.</p>
            </div>
            <div class="image-content">
              <div class="placeholder-image">
                <i class="fas fa-bullseye"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="story-section">
        <div class="container">
          <div class="content-wrapper reverse">
            <div class="image-content">
              <div class="placeholder-image">
                <i class="fas fa-users"></i>
              </div>
            </div>
            <div class="text-content">
              <h2>Who We Are</h2>
              <p>We're a team of passionate designers, developers, and AI enthusiasts who came together to solve a common problem: the time-consuming nature of traditional design processes.</p>
              <p>Our diverse team brings together expertise in artificial intelligence, user experience design, and software development to create a tool that bridges the gap between imagination and implementation.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="vision-section">
        <div class="container">
          <div class="content-wrapper">
            <div class="text-content">
              <h2>Our Vision</h2>
              <p>We envision a world where anyone with an idea can transform it into a beautiful, functional design within minutes. By leveraging the power of AI, we're breaking down barriers and empowering creators worldwide.</p>
              <p>Our goal is to become the go-to platform for rapid prototyping, helping teams focus on what matters most: innovation and user experience.</p>
            </div>
            <div class="image-content">
              <div class="placeholder-image">
                <i class="fas fa-lightbulb"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="stats-section">
        <div class="container">
          <h2 class="section-title text-center">Our Impact</h2>
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-number">10,000+</div>
              <div class="stat-label">Active Users</div>
              <p>Designers and creators worldwide</p>
            </div>
            <div class="stat-item">
              <div class="stat-number">50,000+</div>
              <div class="stat-label">Designs Created</div>
              <p>Beautiful interfaces generated</p>
            </div>
            <div class="stat-item">
              <div class="stat-number">95%</div>
              <div class="stat-label">Customer Satisfaction</div>
              <p>Users love our platform</p>
            </div>
            <div class="stat-item">
              <div class="stat-number">24/7</div>
              <div class="stat-label">Support Available</div>
              <p>We're always here to help</p>
            </div>
          </div>
        </div>
      </section>

      <section class="values-section">
        <div class="container">
          <h2 class="section-title text-center">Our Values</h2>
          <div class="values-grid">
            <div class="value-item">
              <div class="icon">
                <i class="fas fa-heart"></i>
              </div>
              <h3>User-Centric</h3>
              <p>Every decision we make is guided by what's best for our users. We listen, learn, and evolve based on your feedback.</p>
            </div>
            <div class="value-item">
              <div class="icon">
                <i class="fas fa-rocket"></i>
              </div>
              <h3>Innovation</h3>
              <p>We're constantly pushing boundaries and exploring new ways to make design more accessible and efficient.</p>
            </div>
            <div class="value-item">
              <div class="icon">
                <i class="fas fa-handshake"></i>
              </div>
              <h3>Collaboration</h3>
              <p>Great things happen when people work together. We build tools that enable seamless teamwork.</p>
            </div>
            <div class="value-item">
              <div class="icon">
                <i class="fas fa-shield-alt"></i>
              </div>
              <h3>Trust & Security</h3>
              <p>Your data and privacy are our top priorities. We maintain the highest standards of security.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="cta-section">
        <div class="container">
          <h2>Ready to Transform Your Design Process?</h2>
          <p>Join thousands of creators who are already using Uigenius to bring their ideas to life.</p>
          <button class="btn btn-primary" @click="goToLogin">Get Started Free</button>
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
            <a href="#terms">Terms of Service</a>
            <span class="separator">|</span>
            <a href="#privacy">Privacy Policy</a>
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
  name: 'AboutPage',
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
      this.scrollToTop();
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
      // Navigate to intro page and scroll to contact section
      // First, navigate to the page
      uni.switchTab({
        url: '/pages/intro/intro',
        success: () => {
          // Use event bus or global method to scroll to contact section
          // Since we can't pass parameters with switchTab, we'll use a different approach
          // Store the target section in storage
          uni.setStorageSync('scrollToSection', 'contact');
        }
      });
    },
    goToLogin() {
      uni.switchTab({
        url: '/pages/login/login',
        fail: () => {
          uni.navigateTo({ url: '/pages/login/login' })
        }
      })
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

.about-page-root {
  --primary-red: #ef4444;
  --dark-text: #333;
  --light-text: #666;
  --lighter-text: #999;
  --background-white: #fff;
  --light-gray-bg: #f8f8f8;
  --border-color: #eee;
  --button-hover: #dc2626;

  font-family: 'Poppins', sans-serif;
  line-height: 1.6;
  color: var(--dark-text);
  background-color: var(--background-white);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
  border-radius: 5px;
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

.btn-primary:hover {
  background-color: var(--button-hover);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

/* Header */
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

/* Hero Section */
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
  max-width: 600px;
  margin: 0 auto;
}

/* Content Sections */
.mission-section,
.story-section,
.vision-section {
  padding: 100px 0;
}

.mission-section {
  background-color: var(--background-white);
}

.story-section {
  background-color: var(--light-gray-bg);
}

.vision-section {
  background-color: var(--background-white);
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.content-wrapper.reverse {
  grid-template-columns: 1fr 1fr;
}

.text-content h2 {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 25px;
  color: var(--dark-text);
}

.text-content p {
  font-size: 18px;
  line-height: 1.8;
  color: var(--light-text);
  margin-bottom: 20px;
}

.placeholder-image {
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, var(--light-gray-bg) 0%, #e0e0e0 100%);
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.placeholder-image i {
  font-size: 80px;
  color: var(--primary-red);
  opacity: 0.3;
}

/* Stats Section */
.stats-section {
  padding: 100px 0;
  background-color: var(--light-gray-bg);
}

.section-title {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 60px;
  color: var(--dark-text);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  margin-top: 40px;
}

.stat-item {
  text-align: center;
  padding: 40px 20px;
  background-color: var(--background-white);
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.stat-number {
  font-size: 48px;
  font-weight: 700;
  color: var(--primary-red);
  margin-bottom: 10px;
}

.stat-label {
  font-size: 16px;
  color: var(--dark-text);
  font-weight: 600;
  margin-bottom: 10px;
}

.stat-item p {
  font-size: 14px;
  color: var(--light-text);
}

/* Values Section */
.values-section {
  padding: 100px 0;
  background-color: var(--background-white);
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
}

.value-item {
  text-align: center;
  padding: 40px 30px;
  background-color: var(--light-gray-bg);
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.value-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  background-color: var(--background-white);
}

.value-item .icon {
  font-size: 50px;
  color: var(--primary-red);
  margin-bottom: 25px;
  background-color: rgba(239, 68, 68, 0.1);
  border-radius: 50%;
  width: 100px;
  height: 100px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.value-item h3 {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 15px;
  color: var(--dark-text);
}

.value-item p {
  font-size: 15px;
  line-height: 1.7;
  color: var(--light-text);
}

/* CTA Section */
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

.cta-section .btn-primary {
  background-color: var(--background-white);
  color: var(--primary-red);
  font-size: 18px;
  padding: 16px 40px;
}

.cta-section .btn-primary:hover {
  background-color: var(--light-gray-bg);
  transform: translateY(-3px);
}

/* Footer */
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

/* Scroll to Top */
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

/* Responsive */
@media (max-width: 992px) {
  .nav-menu ul {
    display: none;
  }
  
  .content-wrapper,
  .content-wrapper.reverse {
    grid-template-columns: 1fr;
    gap: 50px;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .values-grid {
    grid-template-columns: repeat(2, 1fr);
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
  
  .text-content h2 {
    font-size: 32px;
  }
  
  .section-title {
    font-size: 32px;
  }
  
  .stats-grid,
  .values-grid {
    grid-template-columns: 1fr;
  }
  
  .cta-section h2 {
    font-size: 32px;
  }
  
  .cta-section p {
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .hero-section h1 {
    font-size: 32px;
  }
  
  .text-content h2 {
    font-size: 28px;
  }
  
  .section-title {
    font-size: 28px;
  }
  
  .placeholder-image {
    height: 300px;
  }
  
  .footer-grid {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
</style>

