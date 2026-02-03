<template>
  <div class="careers-page-root">
    <header class="header">
      <div class="container">
        <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
          <a @click.prevent="goToHome" class="logo" style="margin-right: 15px; cursor: pointer;">
            <img src="/static/logo.png" alt="Uigenius Logo">
            Uigenius
          </a>
          <nav class="nav-menu">
            <ul>
              <li><a @click.prevent="goToHome">{{$t('common.nav.home')}}</a></li>
              <li><a @click.prevent="goToAbout">{{$t('common.nav.about')}}</a></li>
              <li><a @click.prevent="goToCareers">{{$t('common.nav.careers')}}</a></li>
              <li><a @click.prevent="goToContact">{{$t('common.nav.contact')}}</a></li>
            </ul>
            <div class="try-free" @click="goToLogin">
              <span>{{$t('common.try')}}</span>
              <span>{{$t('common.free')}}</span>
            </div>
            <div class="language-selector" @click.stop>
              <div class="language-dropdown" @click.stop="toggleLanguageDropdown($event)">
                <i class="fas fa-globe"></i>
                <span>{{ currentLanguageName }}</span>
                <i class="fas fa-chevron-down" :class="{ 'rotate': showLanguageDropdown }"></i>
              </div>
              <ul class="language-dropdown-menu" v-if="showLanguageDropdown" @click.stop>
                <li v-for="lang in availableLanguages" :key="lang.code" 
                    @click.stop="selectLanguage(lang.code)"
                    :class="{ 'active': currentLocale === lang.code }">
                  {{ lang.name }}
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>

    <main>
      <section class="hero-section">
        <div class="container">
          <h1>{{$t('careers.hero.title')}}</h1>
          <p class="hero-subtitle">{{$t('careers.hero.subtitle')}}</p>
        </div>
      </section>

      <section class="intro-section">
        <div class="container">
          <div class="intro-content">
            <h2>{{$t('careers.intro.title')}}</h2>
            <p>{{$t('careers.intro.p1')}}</p>
            <p>{{$t('careers.intro.p2')}}</p>
          </div>
        </div>
      </section>

      <section class="positions-section">
        <div class="container">
          <h2 class="section-title text-center">{{$t('careers.positions.title')}}</h2>
          <div class="positions-grid">
            <div class="position-card">
              <div class="position-header">
                <h3>Senior Frontend Developer</h3>
                <span class="position-badge">{{$t('careers.positions.engineering')}}</span>
              </div>
              <div class="position-meta">
                <span class="position-location"><i class="fas fa-map-marker-alt"></i> {{$t('careers.positions.remote')}} / San Francisco</span>
                <span class="position-type"><i class="fas fa-clock"></i> {{$t('careers.positions.fullTime')}}</span>
              </div>
              <p>We're looking for an experienced frontend developer to help build and scale our AI-powered design platform. You'll work on cutting-edge web technologies and create beautiful, performant user interfaces.</p>
              <div class="position-requirements">
                <h4>{{$t('careers.positions.requirements')}}</h4>
                <ul>
                  <li>5+ years of experience with Vue.js, React, or similar frameworks</li>
                  <li>Strong knowledge of HTML, CSS, and JavaScript</li>
                  <li>Experience with responsive design and cross-browser compatibility</li>
                  <li>Understanding of web performance optimization</li>
                </ul>
              </div>
              <button class="btn btn-primary" @click="applyForJob('Senior Frontend Developer')">{{$t('careers.positions.apply')}}</button>
            </div>

            <div class="position-card">
              <div class="position-header">
                <h3>AI/ML Engineer</h3>
                <span class="position-badge">{{$t('careers.positions.ai')}}</span>
              </div>
              <div class="position-meta">
                <span class="position-location"><i class="fas fa-map-marker-alt"></i> {{$t('careers.positions.remote')}} / New York</span>
                <span class="position-type"><i class="fas fa-clock"></i> {{$t('careers.positions.fullTime')}}</span>
              </div>
              <p>Join our AI team to develop and improve our machine learning models for design generation and recognition. You'll work on innovative projects that push the boundaries of what's possible with AI.</p>
              <div class="position-requirements">
                <h4>{{$t('careers.positions.requirements')}}</h4>
                <ul>
                  <li>MS or PhD in Computer Science, AI, or related field</li>
                  <li>Experience with deep learning frameworks (TensorFlow, PyTorch)</li>
                  <li>Strong background in computer vision or NLP</li>
                  <li>Published research in relevant conferences is a plus</li>
                </ul>
              </div>
              <button class="btn btn-primary" @click="applyForJob('AI/ML Engineer')">{{$t('careers.positions.apply')}}</button>
            </div>

            <div class="position-card">
              <div class="position-header">
                <h3>Product Designer</h3>
                <span class="position-badge">{{$t('careers.positions.design')}}</span>
              </div>
              <div class="position-meta">
                <span class="position-location"><i class="fas fa-map-marker-alt"></i> {{$t('careers.positions.remote')}} / London</span>
                <span class="position-type"><i class="fas fa-clock"></i> {{$t('careers.positions.fullTime')}}</span>
              </div>
              <p>Help us create intuitive and delightful user experiences for designers and non-designers alike. You'll lead design projects from concept to implementation.</p>
              <div class="position-requirements">
                <h4>{{$t('careers.positions.requirements')}}</h4>
                <ul>
                  <li>4+ years of product design experience</li>
                  <li>Strong portfolio showcasing UI/UX design work</li>
                  <li>Proficiency in Figma, Sketch, or similar tools</li>
                  <li>Experience with design systems and user research</li>
                </ul>
              </div>
              <button class="btn btn-primary" @click="applyForJob('Product Designer')">{{$t('careers.positions.apply')}}</button>
            </div>

            <div class="position-card">
              <div class="position-header">
                <h3>Customer Success Manager</h3>
                <span class="position-badge">{{$t('careers.positions.customerSuccess')}}</span>
              </div>
              <div class="position-meta">
                <span class="position-location"><i class="fas fa-map-marker-alt"></i> {{$t('careers.positions.remote')}}</span>
                <span class="position-type"><i class="fas fa-clock"></i> {{$t('careers.positions.fullTime')}}</span>
              </div>
              <p>Be the bridge between our users and our product team, ensuring customer satisfaction and success. You'll help users get the most value from our platform.</p>
              <div class="position-requirements">
                <h4>{{$t('careers.positions.requirements')}}</h4>
                <ul>
                  <li>3+ years in customer success or account management</li>
                  <li>Excellent communication and problem-solving skills</li>
                  <li>Experience with SaaS products</li>
                  <li>Passion for helping users succeed</li>
                </ul>
              </div>
              <button class="btn btn-primary" @click="applyForJob('Customer Success Manager')">{{$t('careers.positions.apply')}}</button>
            </div>

            <div class="position-card">
              <div class="position-header">
                <h3>Backend Engineer</h3>
                <span class="position-badge">{{$t('careers.positions.engineering')}}</span>
              </div>
              <div class="position-meta">
                <span class="position-location"><i class="fas fa-map-marker-alt"></i> {{$t('careers.positions.remote')}} / Seattle</span>
                <span class="position-type"><i class="fas fa-clock"></i> {{$t('careers.positions.fullTime')}}</span>
              </div>
              <p>Build robust and scalable backend systems that power our AI design platform. You'll work on APIs, databases, and cloud infrastructure.</p>
              <div class="position-requirements">
                <h4>{{$t('careers.positions.requirements')}}</h4>
                <ul>
                  <li>5+ years of backend development experience</li>
                  <li>Proficiency in Python, Node.js, or Go</li>
                  <li>Experience with cloud platforms (AWS, GCP, Azure)</li>
                  <li>Knowledge of microservices architecture</li>
                </ul>
              </div>
              <button class="btn btn-primary" @click="applyForJob('Backend Engineer')">{{$t('careers.positions.apply')}}</button>
            </div>

            <div class="position-card">
              <div class="position-header">
                <h3>Marketing Manager</h3>
                <span class="position-badge">{{$t('careers.positions.marketing')}}</span>
              </div>
              <div class="position-meta">
                <span class="position-location"><i class="fas fa-map-marker-alt"></i> {{$t('careers.positions.remote')}} / Austin</span>
                <span class="position-type"><i class="fas fa-clock"></i> {{$t('careers.positions.fullTime')}}</span>
              </div>
              <p>Drive our marketing strategy and help us reach more creators and designers worldwide. You'll lead campaigns, content, and growth initiatives.</p>
              <div class="position-requirements">
                <h4>{{$t('careers.positions.requirements')}}</h4>
                <ul>
                  <li>4+ years of marketing experience in tech/SaaS</li>
                  <li>Strong understanding of digital marketing channels</li>
                  <li>Data-driven approach to decision making</li>
                  <li>Experience with content marketing and SEO</li>
                </ul>
              </div>
              <button class="btn btn-primary" @click="applyForJob('Marketing Manager')">{{$t('careers.positions.apply')}}</button>
            </div>
          </div>
        </div>
      </section>

      <section class="benefits-section">
        <div class="container">
          <h2 class="section-title text-center">{{$t('careers.benefits.title')}}</h2>
          <div class="benefits-grid">
            <div class="benefit-item">
              <div class="icon">
                <i class="fas fa-laptop-house"></i>
              </div>
              <h3>{{$t('careers.benefits.remote.title')}}</h3>
              <p>{{$t('careers.benefits.remote.desc')}}</p>
            </div>
            <div class="benefit-item">
              <div class="icon">
                <i class="fas fa-heart"></i>
              </div>
              <h3>{{$t('careers.benefits.health.title')}}</h3>
              <p>{{$t('careers.benefits.health.desc')}}</p>
            </div>
            <div class="benefit-item">
              <div class="icon">
                <i class="fas fa-umbrella-beach"></i>
              </div>
              <h3>{{$t('careers.benefits.pto.title')}}</h3>
              <p>{{$t('careers.benefits.pto.desc')}}</p>
            </div>
            <div class="benefit-item">
              <div class="icon">
                <i class="fas fa-graduation-cap"></i>
              </div>
              <h3>{{$t('careers.benefits.learning.title')}}</h3>
              <p>{{$t('careers.benefits.learning.desc')}}</p>
            </div>
            <div class="benefit-item">
              <div class="icon">
                <i class="fas fa-dollar-sign"></i>
              </div>
              <h3>{{$t('careers.benefits.salary.title')}}</h3>
              <p>{{$t('careers.benefits.salary.desc')}}</p>
            </div>
            <div class="benefit-item">
              <div class="icon">
                <i class="fas fa-users"></i>
              </div>
              <h3>{{$t('careers.benefits.team.title')}}</h3>
              <p>{{$t('careers.benefits.team.desc')}}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="culture-section">
        <div class="container">
          <h2 class="section-title text-center">{{$t('careers.culture.title')}}</h2>
          <div class="culture-grid">
            <div class="culture-item">
              <h3><i class="fas fa-rocket"></i> {{$t('careers.culture.innovation.title')}}</h3>
              <p>{{$t('careers.culture.innovation.desc')}}</p>
            </div>
            <div class="culture-item">
              <h3><i class="fas fa-handshake"></i> {{$t('careers.culture.collaboration.title')}}</h3>
              <p>{{$t('careers.culture.collaboration.desc')}}</p>
            </div>
            <div class="culture-item">
              <h3><i class="fas fa-balance-scale"></i> {{$t('careers.culture.balance.title')}}</h3>
              <p>{{$t('careers.culture.balance.desc')}}</p>
            </div>
            <div class="culture-item">
              <h3><i class="fas fa-globe"></i> {{$t('careers.culture.diversity.title')}}</h3>
              <p>{{$t('careers.culture.diversity.desc')}}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="cta-section">
        <div class="container">
          <h2>{{$t('careers.cta.title')}}</h2>
          <p>{{$t('careers.cta.description')}}</p>
          <button class="btn btn-primary" @click="contactHR">{{$t('careers.cta.button')}}</button>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="container footer-grid">
        <div class="footer-about">
          <a @click.prevent="goToHome" class="logo" style="cursor: pointer;">
            <img src="/static/logo.png" alt="Uigenius Logo">
            Uigenius
          </a>
          <p>{{$t('common.footer.description')}}</p>
        </div>
        <div class="footer-links">
          <h4>{{$t('common.footer.product')}}</h4>
          <ul>
            <li><a @click.prevent="goToFeatures">{{$t('common.footer.features')}}</a></li>
            <li><a @click.prevent="goToPricing">{{$t('common.footer.pricing')}}</a></li>
          </ul>
        </div>
        <div class="footer-links">
          <h4>{{$t('common.footer.company')}}</h4>
          <ul>
            <li><a @click.prevent="goToAbout">{{$t('common.footer.aboutUs')}}</a></li>
            <li><a @click.prevent="goToCareers">{{$t('common.footer.careers')}}</a></li>
            <li><a @click.prevent="goToContact">{{$t('common.footer.contact')}}</a></li>
          </ul>
        </div>
        <div class="footer-links">
          <h4>{{$t('common.footer.connect')}}</h4>
          <div class="social-icons">
            <a href="https://x.com/Uigenius13952" target="_blank" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
          </div>
        </div>
        <div class="footer-links">
          <h4>{{$t('common.footer.support')}}</h4>
          <div class="support-email">
            <a href="mailto:support@uigenius.top"><i class="fas fa-envelope"></i> support@uigenius.top</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="container">
          <p>{{$t('common.footer.copyright')}}</p>
          <div class="footer-legal-links">
            <a @click.prevent="goToTerms">{{$t('common.footer.terms')}}</a>
            <span class="separator">|</span>
            <a @click.prevent="goToPrivacy">{{$t('common.footer.privacy')}}</a>
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
  name: 'CareersPage',
  data() {
    return {
      showScrollTop: false,
      showLanguageDropdown: false,
      currentLocale: 'en'
    }
  },
  watch: {
    currentLocale() {
      this.showLanguageDropdown = false;
    }
  },
  computed: {
    availableLanguages() {
      return [
        { code: 'en', name: this.$t('locale.en') },
        { code: 'zh-Hans', name: this.$t('locale.zh-hans') },
        { code: 'zh-Hant', name: this.$t('locale.zh-hant') },
        { code: 'ja', name: this.$t('locale.ja') },
        { code: 'ko', name: this.$t('locale.ko') },
        { code: 'ru', name: this.$t('locale.ru') },
        { code: 'es', name: this.$t('locale.es') },
        { code: 'fr', name: this.$t('locale.fr') },
        { code: 'de', name: this.$t('locale.de') },
        { code: 'it', name: this.$t('locale.it') },
        { code: 'pt', name: this.$t('locale.pt') },
        { code: 'ar', name: this.$t('locale.ar') },
        { code: 'hi', name: this.$t('locale.hi') },
        { code: 'th', name: this.$t('locale.th') },
        { code: 'vi', name: this.$t('locale.vi') },
        { code: 'id', name: this.$t('locale.id') },
        { code: 'nl', name: this.$t('locale.nl') },
        { code: 'pl', name: this.$t('locale.pl') },
        { code: 'tr', name: this.$t('locale.tr') },
        { code: 'sv', name: this.$t('locale.sv') },
        { code: 'da', name: this.$t('locale.da') },
        { code: 'fi', name: this.$t('locale.fi') },
        { code: 'no', name: this.$t('locale.no') }
      ]
    },
    currentLanguageName() {
      const lang = this.availableLanguages.find(l => l.code === this.currentLocale)
      return lang ? lang.name : this.$t('locale.en')
    }
  },
  onShow() {
    this.loadSavedLanguage();
  },
  mounted() {
    this.loadSavedLanguage();
    window.addEventListener('scroll', this.handleScroll);
    if (typeof document !== 'undefined') {
      document.addEventListener('click', this.handleClickOutside);
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
    if (typeof document !== 'undefined') {
      document.removeEventListener('click', this.handleClickOutside);
    }
  },
  methods: {
    loadSavedLanguage() {
      try {
        const savedLocale = uni.getStorageSync('appLocale');
        if (savedLocale) {
          this.currentLocale = savedLocale;
          uni.setLocale(savedLocale);
          if (this.$i18n) {
            this.$i18n.locale = savedLocale;
          }
        } else {
          const currentLocale = uni.getLocale();
          if (currentLocale) {
            this.currentLocale = currentLocale;
          }
        }
      } catch (error) {
        console.error('Error loading saved language:', error);
      }
    },
    toggleLanguageDropdown(event) {
      this.showLanguageDropdown = !this.showLanguageDropdown;
    },
    selectLanguage(localeCode) {
      this.showLanguageDropdown = false;
      if (this.currentLocale === localeCode) {
        return;
      }
      setTimeout(() => {
        this.showLanguageDropdown = false;
      }, 0);
      try {
        uni.setLocale(localeCode);
        if (this.$i18n) {
          this.$i18n.locale = localeCode;
        }
        this.currentLocale = localeCode;
        uni.setStorageSync('appLocale', localeCode);
        this.$nextTick(() => {
          this.showLanguageDropdown = false;
          this.$forceUpdate();
        });
      } catch (error) {
        console.error('Error setting language:', error);
        this.showLanguageDropdown = false;
        uni.showToast({
          title: 'Failed to change language',
          icon: 'none',
          duration: 2000
        });
      }
    },
    handleClickOutside(event) {
      if (typeof document === 'undefined') {
        return;
      }
      const languageSelector = this.$el?.querySelector('.language-selector');
      if (languageSelector && !languageSelector.contains(event.target)) {
        this.showLanguageDropdown = false;
      }
    },
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
      this.scrollToTop();
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
    goToTerms() {
      uni.navigateTo({ url: '/pages/terms/terms' });
    },
    goToPrivacy() {
      uni.navigateTo({ url: '/pages/privacy/privacy' });
    },
    goToLogin() {
      uni.switchTab({
        url: '/pages/login/login',
        fail: () => {
          uni.navigateTo({ url: '/pages/login/login' })
        }
      })
    },
    applyForJob(position) {
      const subject = encodeURIComponent(`Application for ${position} position`);
      const body = encodeURIComponent(`Hello Uigenius Team,\n\nI am interested in applying for the ${position} position.\n\nPlease find my resume attached.\n\nBest regards`);
      window.location.href = `mailto:careers@uigenius.top?subject=${subject}&body=${body}`;
    },
    contactHR() {
      const subject = encodeURIComponent('General Application - Uigenius');
      const body = encodeURIComponent(`Hello Uigenius Team,\n\nI am interested in joining your team. I believe my skills and passion align with your mission.\n\nPlease find my resume attached.\n\nBest regards`);
      window.location.href = `mailto:careers@uigenius.top?subject=${subject}&body=${body}`;
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

.careers-page-root {
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

.language-selector {
  position: relative;
  margin-left: 15px;
}

.language-dropdown {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 15px;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: var(--background-white);
  font-size: 14px;
  color: var(--light-text);
}

.language-dropdown:hover {
  border-color: var(--primary-red);
  color: var(--primary-red);
}

.language-dropdown i.fa-globe {
  font-size: 16px;
}

.language-dropdown i.fa-chevron-down {
  font-size: 12px;
  transition: transform 0.3s ease;
}

.language-dropdown i.fa-chevron-down.rotate {
  transform: rotate(180deg);
}

.language-selector .language-dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 5px;
  background-color: var(--background-white);
  border: 1px solid var(--border-color);
  border-radius: 5px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  min-width: 180px;
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1001;
  list-style: none;
  padding: 5px 0;
  display: block !important;
}

.language-selector .language-dropdown-menu li {
  display: block !important;
  width: 100%;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  color: var(--dark-text);
  font-size: 14px;
  white-space: nowrap;
  box-sizing: border-box;
}

.language-dropdown-menu li:hover {
  background-color: var(--light-gray-bg);
}

.language-dropdown-menu li.active {
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--primary-red);
  font-weight: 500;
}

/* Hero Section */
.hero-section {
  padding: 100px 0 80px;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  text-align: center;
  color: var(--background-white);
}

.hero-section h1 {
  font-size: 56px;
  font-weight: 700;
  margin-bottom: 20px;
}

.hero-subtitle {
  font-size: 22px;
  max-width: 600px;
  margin: 0 auto;
  opacity: 0.95;
}

/* Intro Section */
.intro-section {
  padding: 100px 0;
  background-color: var(--background-white);
}

.intro-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.intro-content h2 {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 30px;
  color: var(--dark-text);
}

.intro-content p {
  font-size: 18px;
  line-height: 1.8;
  color: var(--light-text);
  margin-bottom: 20px;
}

/* Positions Section */
.positions-section {
  padding: 100px 0;
  background-color: var(--light-gray-bg);
}

.section-title {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 60px;
  color: var(--dark-text);
}

.positions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.position-card {
  background-color: var(--background-white);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.position-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.position-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.position-header h3 {
  font-size: 24px;
  font-weight: 600;
  color: var(--dark-text);
  flex: 1;
}

.position-badge {
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--primary-red);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  margin-left: 10px;
}

.position-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
}

.position-location,
.position-type {
  font-size: 14px;
  color: var(--light-text);
  display: flex;
  align-items: center;
  gap: 8px;
}

.position-location i,
.position-type i {
  color: var(--primary-red);
  font-size: 14px;
}

.position-card > p {
  font-size: 16px;
  line-height: 1.7;
  color: var(--light-text);
  margin-bottom: 25px;
}

.position-requirements {
  margin-bottom: 30px;
  flex-grow: 1;
}

.position-requirements h4 {
  font-size: 16px;
  font-weight: 600;
  color: var(--dark-text);
  margin-bottom: 15px;
}

.position-requirements ul {
  list-style: none;
  padding-left: 0;
}

.position-requirements ul li {
  font-size: 14px;
  color: var(--light-text);
  margin-bottom: 10px;
  padding-left: 25px;
  position: relative;
  line-height: 1.6;
}

.position-requirements ul li::before {
  content: "\f00c";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  color: var(--primary-red);
  position: absolute;
  left: 0;
  top: 2px;
  font-size: 12px;
}

.position-card .btn {
  width: 100%;
  margin-top: auto;
}

/* Benefits Section */
.benefits-section {
  padding: 100px 0;
  background-color: var(--background-white);
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
}

.benefit-item {
  text-align: center;
  padding: 40px 30px;
  background-color: var(--light-gray-bg);
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.benefit-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  background-color: var(--background-white);
}

.benefit-item .icon {
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

.benefit-item h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 15px;
  color: var(--dark-text);
}

.benefit-item p {
  font-size: 15px;
  line-height: 1.7;
  color: var(--light-text);
}

/* Culture Section */
.culture-section {
  padding: 100px 0;
  background-color: var(--light-gray-bg);
}

.culture-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
}

.culture-item {
  padding: 40px;
  background-color: var(--background-white);
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.culture-item h3 {
  font-size: 22px;
  font-weight: 600;
  color: var(--dark-text);
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.culture-item h3 i {
  color: var(--primary-red);
}

.culture-item p {
  font-size: 16px;
  line-height: 1.7;
  color: var(--light-text);
}

/* CTA Section */
.cta-section {
  padding: 100px 0;
  background-color: var(--background-white);
  text-align: center;
}

.cta-section h2 {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 20px;
  color: var(--dark-text);
}

.cta-section p {
  font-size: 18px;
  margin-bottom: 40px;
  color: var(--light-text);
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.cta-section .btn-primary {
  font-size: 18px;
  padding: 16px 40px;
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
  
  .positions-grid {
    grid-template-columns: 1fr;
  }
  
  .benefits-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .culture-grid {
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
  
  .intro-content h2 {
    font-size: 32px;
  }
  
  .section-title {
    font-size: 32px;
  }
  
  .benefits-grid,
  .culture-grid {
    grid-template-columns: 1fr;
  }
  
  .cta-section h2 {
    font-size: 32px;
  }
}

@media (max-width: 480px) {
  .hero-section h1 {
    font-size: 32px;
  }
  
  .intro-content h2 {
    font-size: 28px;
  }
  
  .section-title {
    font-size: 28px;
  }
  
  .positions-grid {
    grid-template-columns: 1fr;
  }
  
  .position-card {
    padding: 30px 20px;
  }
  
  .footer-grid {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
</style>

