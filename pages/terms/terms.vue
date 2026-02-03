<template>
  <div class="terms-page-root">
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
          <h1>{{$t('terms.hero.title')}}</h1>
          <p class="hero-subtitle">{{$t('terms.hero.subtitle')}}</p>
          <p class="last-updated">{{$t('terms.hero.lastUpdated')}}</p>
        </div>
      </section>

      <section class="intro-section">
        <div class="container">
          <div class="intro-content">
            <h2>{{$t('terms.intro.title')}}</h2>
            <p>{{$t('terms.intro.p1')}}</p>
            <p>{{$t('terms.intro.p2')}}</p>
          </div>
        </div>
      </section>

      <section class="terms-section">
        <div class="container">
          <h2 class="section-title text-center">{{$t('terms.using.title')}}</h2>
          <div class="terms-grid">
            <div class="terms-card">
              <span class="terms-number">01</span>
              <h3>{{$t('terms.using.account.title')}}</h3>
              <p>{{$t('terms.using.account.desc')}}</p>
            </div>
            <div class="terms-card">
              <span class="terms-number">02</span>
              <h3>{{$t('terms.using.acceptable.title')}}</h3>
              <p>{{$t('terms.using.acceptable.desc')}}</p>
            </div>
            <div class="terms-card">
              <span class="terms-number">03</span>
              <h3>{{$t('terms.using.billing.title')}}</h3>
              <p>{{$t('terms.using.billing.desc')}}</p>
            </div>
            <div class="terms-card">
              <span class="terms-number">04</span>
              <h3>{{$t('terms.using.availability.title')}}</h3>
              <p>{{$t('terms.using.availability.desc')}}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="rights-section">
        <div class="container">
          <div class="content-wrapper">
            <div class="text-content">
              <h2>{{$t('terms.rights.title')}}</h2>
              <p>{{$t('terms.rights.p1')}}</p>
              <p>{{$t('terms.rights.p2')}}</p>
            </div>
            <div class="list-content">
              <h3>{{$t('terms.rights.responsibilities')}}</h3>
              <ul>
                <li>{{$t('terms.rights.resp1')}}</li>
                <li>{{$t('terms.rights.resp2')}}</li>
                <li>{{$t('terms.rights.resp3')}}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="compliance-section">
        <div class="container">
          <h2 class="section-title text-center">{{$t('terms.compliance.title')}}</h2>
          <div class="compliance-grid">
            <div class="compliance-card">
              <h3>{{$t('terms.compliance.suspension.title')}}</h3>
              <p>{{$t('terms.compliance.suspension.desc')}}</p>
            </div>
            <div class="compliance-card">
              <h3>{{$t('terms.compliance.thirdParty.title')}}</h3>
              <p>{{$t('terms.compliance.thirdParty.desc')}}</p>
            </div>
            <div class="compliance-card">
              <h3>{{$t('terms.compliance.disclaimer.title')}}</h3>
              <p>{{$t('terms.compliance.disclaimer.desc')}}</p>
            </div>
            <div class="compliance-card">
              <h3>{{$t('terms.compliance.governing.title')}}</h3>
              <p>{{$t('terms.compliance.governing.desc')}}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="support-section">
        <div class="container">
          <div class="support-wrapper">
            <div class="support-text">
              <h2>{{$t('terms.support.title')}}</h2>
              <p>{{$t('terms.support.p1')}}</p>
              <div class="support-actions">
                <button class="btn btn-primary" @click="contactSupport">{{$t('terms.support.button1')}}</button>
                <button class="btn btn-secondary" @click="goToPrivacy">{{$t('terms.support.button2')}}</button>
              </div>
            </div>
            <div class="support-highlight">
              <h3>{{$t('terms.support.takeaways')}}</h3>
              <ul>
                <li>{{$t('terms.support.takeaway1')}}</li>
                <li>{{$t('terms.support.takeaway2')}}</li>
                <li>{{$t('terms.support.takeaway3')}}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="cta-section">
        <div class="container">
          <h2>{{$t('terms.cta.title')}}</h2>
          <p>{{$t('terms.cta.description')}}</p>
          <button class="btn btn-primary" @click="goToLogin">{{$t('terms.cta.button')}}</button>
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
  name: 'TermsPage',
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
      this.scrollToTop();
    },
    goToPrivacy() {
      uni.navigateTo({ url: '/pages/privacy/privacy' });
    },
    contactSupport() {
      const subject = encodeURIComponent('Support Request - Uigenius');
      const body = encodeURIComponent('Hello Uigenius Support Team,\n\nI need assistance with...\n\nBest regards');
      window.location.href = `mailto:support@uigenius.top?subject=${subject}&body=${body}`;
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

.terms-page-root {
  --primary-red: #ef4444;
  --dark-text: #333;
  --light-text: #666;
  --lighter-text: #999;
  --background-white: #fff;
  --light-gray-bg: #f8f8f8;
  --border-color: #eee;
  --button-hover: #dc2626;
  --accent-blue: #1d4ed8;

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
  background-color: rgba(29, 78, 216, 0.1);
  color: var(--accent-blue);
}

.btn-primary:hover,
.btn-secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
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

.terms-section {
  padding: 100px 0;
  background-color: var(--light-gray-bg);
}

.section-title {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 60px;
  color: var(--dark-text);
}

.terms-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
}

.terms-card {
  background-color: var(--background-white);
  padding: 40px 35px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
}

.terms-number {
  position: absolute;
  top: -20px;
  right: 20px;
  font-size: 80px;
  font-weight: 700;
  color: rgba(239, 68, 68, 0.1);
}

.terms-card h3 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 18px;
}

.terms-card p {
  font-size: 16px;
  color: var(--light-text);
  line-height: 1.8;
}

.rights-section {
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
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(239, 68, 68, 0.15) 100%);
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 12px 30px rgba(239, 68, 68, 0.15);
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
  color: var(--primary-red);
  font-size: 20px;
  line-height: 1;
}

.compliance-section {
  padding: 100px 0;
  background-color: var(--light-gray-bg);
}

.compliance-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
}

.compliance-card {
  background-color: var(--background-white);
  padding: 35px;
  border-radius: 15px;
  border: 1px solid rgba(229, 231, 235, 0.8);
  transition: all 0.3s ease;
}

.compliance-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 35px rgba(0, 0, 0, 0.08);
}

.compliance-card h3 {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 15px;
}

.compliance-card p {
  font-size: 16px;
  color: var(--light-text);
  line-height: 1.7;
}

.support-section {
  padding: 100px 0;
  background-color: var(--background-white);
}

.support-wrapper {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 60px;
  align-items: stretch;
}

.support-text h2 {
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 20px;
}

.support-text p {
  font-size: 18px;
  color: var(--light-text);
  margin-bottom: 30px;
  line-height: 1.8;
}

.support-actions {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.support-highlight {
  background-color: var(--light-gray-bg);
  border-radius: 16px;
  padding: 40px;
  border: 1px solid rgba(229, 231, 235, 0.8);
}

.support-highlight h3 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
}

.support-highlight ul li {
  font-size: 16px;
  color: var(--light-text);
  margin-bottom: 15px;
  position: relative;
  padding-left: 22px;
}

.support-highlight ul li::before {
  content: '\2713';
  position: absolute;
  left: 0;
  color: var(--primary-red);
  font-weight: 600;
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

.cta-section .btn-primary {
  background-color: var(--background-white);
  color: var(--primary-red);
  font-size: 18px;
  padding: 16px 40px;
}

.cta-section .btn-primary:hover {
  background-color: var(--light-gray-bg);
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

  .terms-grid,
  .compliance-grid {
    grid-template-columns: 1fr;
  }

  .content-wrapper,
  .support-wrapper {
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
  .support-text h2 {
    font-size: 32px;
  }

  .intro-content p,
  .text-content p,
  .support-text p {
    font-size: 16px;
  }

  .btn {
    width: 100%;
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

  .terms-card,
  .compliance-card,
  .support-highlight {
    padding: 28px;
  }

  .footer-grid {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .support-actions {
    flex-direction: column;
  }
}
</style>

