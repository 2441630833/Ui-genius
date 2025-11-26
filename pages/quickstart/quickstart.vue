<template>
  <div class="quickstart-page-root">
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
              <li><a @click.prevent="goToQuickStart">QUICK START</a></li>
              <li><a @click.prevent="goToAbout">ABOUT US</a></li>
              <li><a @click.prevent="goToPricing">PRICING</a></li>
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
          <h1>Quick Start Guide</h1>
          <p class="hero-subtitle">Learn how to go from idea to generated UI in a few simple steps.</p>
          <button class="btn btn-primary" @click="goToLogin">Start Designing Now</button>
        </div>
      </section>

      <section class="steps-section">
        <div class="container">
          <h2 class="section-title text-center">1. Sign in and open the Dashboard</h2>
          <div class="content-wrapper">
            <div class="text-content">
              <p>
                After you log in, you will land on the <strong>Dashboard</strong>. Here you can see your existing
                projects or start a new one.
              </p>
              <ul class="steps-list">
                <li><strong>Create Project</strong> button in the left sidebar opens the project creation dialog.</li>
                <li><strong>Dashboard</strong> shows all your projects as cards with title and description.</li>
                <li>Click any project card to continue designing it in the Design page.</li>
              </ul>
            </div>
            <div class="image-content">
              <img src="https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/quick_start/dashboard.png" alt="Dashboard overview" class="quickstart-image">
            </div>
          </div>
        </div>
      </section>

      <section class="steps-section alt">
        <div class="container">
          <h2 class="section-title text-center">2. Create a new project</h2>
          <div class="content-wrapper reverse">
            <div class="image-content">
              <div class="placeholder-image">
                <img src="https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/quick_start/createPage.png" alt="Create project overview" class="quickstart-image">
              </div>
            </div>
            <div class="text-content">
              <ul class="steps-list">
                <li>Click <strong>Create Project</strong> in the Dashboard sidebar.</li>
                <li>Choose the target device: <strong>Mobile</strong> or <strong>Desktop</strong>.</li>
                <li>Select an <strong>AI Model</strong> based on speed and quality requirements.</li>
                <li>Describe your project in plain English in the description box.</li>
                <li>You can click <strong>Try example</strong> or <strong>Improve with AI</strong> to optimize the prompt.</li>
                <li>Click <strong>Continue</strong> to generate your first version of the UI.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="steps-section">
        <div class="container">
          <h2 class="section-title text-center">3. Work in the Design page</h2>
          <div class="content-wrapper">
            <div class="text-content">
              <p>
                The <strong>Design</strong> page is your main AI design workspace. It uses your project description
                or uploaded assets to generate UI layouts.
              </p>
              <ul class="steps-list">
                <li>Use text prompts, screenshots, or sketches to generate designs.</li>
                <li>Adjust <strong>colors</strong>, <strong>layout</strong>, and <strong>components</strong> as needed.</li>
                <li>Preview different pages and sections of the generated UI.</li>
                <li>When you are satisfied, you can <strong>export</strong> the design to code.</li>
              </ul>
            </div>
            <div class="image-content">
              <div class="placeholder-image">
                 <img src="https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/quick_start/design.png" alt="Design overview" class="quickstart-image">
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="steps-section">
        <div class="container">
          <h2 class="section-title text-center">4. Use the Editor to Refine Your Design</h2>
          <div class="content-wrapper">
            <div class="text-content">
              <p>
                The <strong>Editor</strong> is where you can manually refine the AI-generated UI. It provides a rich set of tools to modify the design to your exact specifications.
              </p>
              <ul class="steps-list">
                <li><strong>Real-time Preview:</strong> See your changes live as you make them.</li>
                <li><strong>Component Palette:</strong> Drag and drop new elements like buttons, forms, and containers.</li>
                <li><strong>Style Editor:</strong> Adjust colors, fonts, spacing, and other CSS properties.</li>
                <li><strong>Save Page:</strong> When you're happy with the design, you can save it to update your project.</li>
              </ul>
            </div>
            <div class="image-content">
              <div class="placeholder-image">
                  <img src="https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/quick_start/editor.png" alt="Editor overview" class="quickstart-image">
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="steps-section alt">
        <div class="container">
          <h2 class="section-title text-center">5. Manage and iterate on projects</h2>
          <div class="content-wrapper reverse">
            <div class="image-content">
              <div class="placeholder-image">
                <img src="https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/quick_start/manage.png" alt="Manage projects overview" class="quickstart-image">
              </div>
            </div>
            <div class="text-content">
              <ul class="steps-list">
                <li>All generated designs are saved as <strong>projects</strong> in the Dashboard.</li>
                <li>You can reopen any project from the Dashboard project cards.</li>
                <li>Use <strong>Delete Projects</strong> in the sidebar if you need to clean up old work.</li>
                <li>Visit <strong>Membership</strong> to upgrade and unlock more generation capacity and models.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="tips-section">
        <div class="container">
          <h2 class="section-title text-center">Tips for better results</h2>
          <div class="tips-grid">
            <div class="tip-item">
              <h3>Be specific in your prompt</h3>
              <p>Describe layout, target audience, style (e.g. "SaaS dashboard, dark theme, 2-column layout").</p>
            </div>
            <div class="tip-item">
              <h3>Start simple</h3>
              <p>Generate a basic version first, then iterate with more detailed prompts.</p>
            </div>
            <div class="tip-item">
              <h3>Use examples</h3>
              <p>Reference known products ("similar to Apple Store page") to guide the AI faster.</p>
            </div>
            <div class="tip-item">
              <h3>Refine and export</h3>
              <p>Use the Design page to tweak details, then export code when you are happy with the result.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="cta-section">
        <div class="container">
          <h2>Ready to build your first UI?</h2>
          <p>Log in, create a project on the Dashboard, and generate your first design in minutes.</p>
          <button class="btn btn-primary" @click="goToLogin">Go to App</button>
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
            <li><a @click.prevent="goToHome">Overview</a></li>
            <li><a @click.prevent="goToQuickStart">Quick Start</a></li>
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
  name: 'QuickStartPage',
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
    goToQuickStart() {
      this.scrollToTop();
    },
    goToAbout() {
      uni.navigateTo({ url: '/pages/about/about' });
    },
    goToCareers() {
      uni.navigateTo({ url: '/pages/careers/careers' });
    },
    goToContact() {
      uni.navigateTo({ url: '/pages/about/about',
        success: () => {
          // contact section is on about/intro pages; this keeps navigation consistent
        }
      });
    },
    goToPricing() {
      uni.switchTab({
        url: '/pages/intro/intro',
        success: () => {
          try {
            uni.setStorageSync('scrollToSection', 'pricing');
          } catch (e) {}
        }
      });
    },
    goToLogin() {
      uni.navigateTo({ url: '/pages/login/login' });
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

.quickstart-page-root {
  --primary-red: #ef4444;
  --dark-text: #333;
  --light-text: #666;
  --lighter-text: #999;
  --background-white: #fff;
  --light-gray-bg: #f8f8f8;
  --border-color: #eee;
  --button-hover: #dc2626;

  font-family: 'Poppins', sans-serif;
  color: var(--dark-text);
  background-color: var(--background-white);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

ul {
  list-style: none;
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
  font-size: 20px;
  color: var(--light-text);
  max-width: 600px;
  margin: 0 auto 30px;
}

.btn {
  display: inline-block;
  padding: 12px 32px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
}

.btn-primary {
  background-color: var(--primary-red);
  color: #fff;
}

.btn-primary:hover {
  background-color: var(--button-hover);
  transform: translateY(-2px);
}

.steps-section {
  padding: 80px 0;
  background-color: var(--background-white);
}

.steps-section.alt {
  background-color: var(--light-gray-bg);
}

.section-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 40px;
  color: var(--dark-text);
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 56px;
  align-items: center;
}

.content-wrapper.reverse {
  grid-template-columns: 1fr 1.4fr;
}

.text-content p {
  font-size: 16px;
  line-height: 1.8;
  color: var(--light-text);
  margin-bottom: 16px;
}

.steps-list {
  list-style: disc;
  margin-left: 20px;
  color: var(--light-text);
}

.steps-list li {
  margin-bottom: 10px;
}

.image-content {
  display: flex;
  justify-content: center;
}

.placeholder-image {
  width: 100%;
  max-width: 420px;
  height: 260px;
  background: linear-gradient(135deg, var(--light-gray-bg) 0%, #e0e0e0 100%);
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.placeholder-text {
  font-size: 16px;
  color: var(--lighter-text);
}

.quickstart-image {
  width: 100%;
  max-width: 420px;
  height: auto;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  object-fit: cover;
}

.tips-section {
  padding: 80px 0;
  background-color: var(--background-white);
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  margin-top: 32px;
}

.tip-item {
  background-color: var(--light-gray-bg);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
}

.tip-item h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--dark-text);
}

.tip-item p {
  font-size: 14px;
  color: var(--light-text);
}

.cta-section {
  padding: 80px 0;
  background: linear-gradient(135deg, var(--primary-red) 0%, #dc2626 100%);
  text-align: center;
  color: var(--background-white);
}

.cta-section h2 {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 16px;
}

.cta-section p {
  font-size: 18px;
  margin-bottom: 32px;
}

.footer {
  background-color: var(--light-gray-bg);
  padding: 80px 0 40px;
  color: var(--light-text);
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  gap: 40px;
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
  margin-bottom: 20px;
  color: var(--dark-text);
}

.footer-links ul {
  padding-left: 0;
}

.footer-links ul li {
  margin-bottom: 10px;
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
  margin-top: 40px;
  text-align: center;
  font-size: 14px;
  color: var(--lighter-text);
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

  .content-wrapper,
  .content-wrapper.reverse {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .tips-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .footer-grid {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
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
    font-size: 26px;
  }

  .tips-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .hero-section h1 {
    font-size: 32px;
  }

  .placeholder-image {
    height: 220px;
  }
}
</style>
