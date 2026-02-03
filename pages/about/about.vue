<template>
  <div class="about-page-root">
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
          <h1>{{$t('about.hero.title')}}</h1>
          <p class="hero-subtitle">{{$t('about.hero.subtitle')}}</p>
        </div>
      </section>

      <section class="mission-section">
        <div class="container">
          <div class="content-wrapper">
            <div class="text-content">
              <h2>{{$t('about.mission.title')}}</h2>
              <p>{{$t('about.mission.p1')}}</p>
              <p>{{$t('about.mission.p2')}}</p>
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
              <h2>{{$t('about.story.title')}}</h2>
              <p>{{$t('about.story.p1')}}</p>
              <p>{{$t('about.story.p2')}}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="vision-section">
        <div class="container">
          <div class="content-wrapper">
            <div class="text-content">
              <h2>{{$t('about.vision.title')}}</h2>
              <p>{{$t('about.vision.p1')}}</p>
              <p>{{$t('about.vision.p2')}}</p>
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
          <h2 class="section-title text-center">{{$t('about.stats.title')}}</h2>
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-number">10,000+</div>
              <div class="stat-label">{{$t('about.stats.users')}}</div>
              <p>{{$t('about.stats.usersDesc')}}</p>
            </div>
            <div class="stat-item">
              <div class="stat-number">50,000+</div>
              <div class="stat-label">{{$t('about.stats.designs')}}</div>
              <p>{{$t('about.stats.designsDesc')}}</p>
            </div>
            <div class="stat-item">
              <div class="stat-number">95%</div>
              <div class="stat-label">{{$t('about.stats.satisfaction')}}</div>
              <p>{{$t('about.stats.satisfactionDesc')}}</p>
            </div>
            <div class="stat-item">
              <div class="stat-number">24/7</div>
              <div class="stat-label">{{$t('about.stats.support')}}</div>
              <p>{{$t('about.stats.supportDesc')}}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="values-section">
        <div class="container">
          <h2 class="section-title text-center">{{$t('about.values.title')}}</h2>
          <div class="values-grid">
            <div class="value-item">
              <div class="icon">
                <i class="fas fa-heart"></i>
              </div>
              <h3>{{$t('about.values.userCentric.title')}}</h3>
              <p>{{$t('about.values.userCentric.desc')}}</p>
            </div>
            <div class="value-item">
              <div class="icon">
                <i class="fas fa-rocket"></i>
              </div>
              <h3>{{$t('about.values.innovation.title')}}</h3>
              <p>{{$t('about.values.innovation.desc')}}</p>
            </div>
            <div class="value-item">
              <div class="icon">
                <i class="fas fa-handshake"></i>
              </div>
              <h3>{{$t('about.values.collaboration.title')}}</h3>
              <p>{{$t('about.values.collaboration.desc')}}</p>
            </div>
            <div class="value-item">
              <div class="icon">
                <i class="fas fa-shield-alt"></i>
              </div>
              <h3>{{$t('about.values.trust.title')}}</h3>
              <p>{{$t('about.values.trust.desc')}}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="cta-section">
        <div class="container">
          <h2>{{$t('about.cta.title')}}</h2>
          <p>{{$t('about.cta.description')}}</p>
          <button class="btn btn-primary" @click="goToLogin">{{$t('about.cta.button')}}</button>
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
  name: 'AboutPage',
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
    goToTerms() {
      uni.navigateTo({ url: '/pages/terms/terms' });
    },
    goToPrivacy() {
      uni.navigateTo({ url: '/pages/privacy/privacy' });
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

