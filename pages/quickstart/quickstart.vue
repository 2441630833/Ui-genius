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
              <li><a @click.prevent="goToHome">{{$t('common.nav.home')}}</a></li>
              <li><a @click.prevent="goToQuickStart">{{$t('common.nav.quickStart')}}</a></li>
              <li><a @click.prevent="goToAbout">{{$t('common.nav.about')}}</a></li>
              <li><a @click.prevent="goToPricing">{{$t('common.nav.pricing')}}</a></li>
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
          <h1>{{$t('quickstart.hero.title')}}</h1>
          <p class="hero-subtitle">{{$t('quickstart.hero.subtitle')}}</p>
          <button class="btn btn-primary" @click="goToLogin">{{$t('quickstart.hero.button')}}</button>
        </div>
      </section>

      <section class="steps-section">
        <div class="container">
          <h2 class="section-title text-center">{{$t('quickstart.step1.title')}}</h2>
          <div class="content-wrapper">
            <div class="text-content">
              <p>
                {{$t('quickstart.step1.p1')}}
              </p>
              <ul class="steps-list">
                <li>{{$t('quickstart.step1.item1')}}</li>
                <li>{{$t('quickstart.step1.item2')}}</li>
                <li>{{$t('quickstart.step1.item3')}}</li>
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
          <h2 class="section-title text-center">{{$t('quickstart.step2.title')}}</h2>
          <div class="content-wrapper reverse">
            <div class="image-content">
              <div class="placeholder-image">
                <img src="https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/quick_start/createPage.png" alt="Create project overview" class="quickstart-image">
              </div>
            </div>
            <div class="text-content">
              <ul class="steps-list">
                <li>{{$t('quickstart.step2.item1')}}</li>
                <li>{{$t('quickstart.step2.item2')}}</li>
                <li>{{$t('quickstart.step2.item3')}}</li>
                <li>{{$t('quickstart.step2.item4')}}</li>
                <li>{{$t('quickstart.step2.item5')}}</li>
                <li>{{$t('quickstart.step2.item6')}}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="steps-section">
        <div class="container">
          <h2 class="section-title text-center">{{$t('quickstart.step3.title')}}</h2>
          <div class="content-wrapper">
            <div class="text-content">
              <p>
                {{$t('quickstart.step3.p1')}}
              </p>
              <ul class="steps-list">
                <li>{{$t('quickstart.step3.item1')}}</li>
                <li>{{$t('quickstart.step3.item2')}}</li>
                <li>{{$t('quickstart.step3.item3')}}</li>
                <li>{{$t('quickstart.step3.item4')}}</li>
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
          <h2 class="section-title text-center">{{$t('quickstart.step4.title')}}</h2>
          <div class="content-wrapper">
            <div class="text-content">
              <p>
                {{$t('quickstart.step4.p1')}}
              </p>
              <ul class="steps-list">
                <li>{{$t('quickstart.step4.item1')}}</li>
                <li>{{$t('quickstart.step4.item2')}}</li>
                <li>{{$t('quickstart.step4.item3')}}</li>
                <li>{{$t('quickstart.step4.item4')}}</li>
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
          <h2 class="section-title text-center">{{$t('quickstart.step5.title')}}</h2>
          <div class="content-wrapper reverse">
            <div class="image-content">
              <div class="placeholder-image">
                <img src="https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/quick_start/manage.png" alt="Manage projects overview" class="quickstart-image">
              </div>
            </div>
            <div class="text-content">
              <ul class="steps-list">
                <li>{{$t('quickstart.step5.item1')}}</li>
                <li>{{$t('quickstart.step5.item2')}}</li>
                <li>{{$t('quickstart.step5.item3')}}</li>
                <li>{{$t('quickstart.step5.item4')}}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="tips-section">
        <div class="container">
          <h2 class="section-title text-center">{{$t('quickstart.tips.title')}}</h2>
          <div class="tips-grid">
            <div class="tip-item">
              <h3>{{$t('quickstart.tips.specific.title')}}</h3>
              <p>{{$t('quickstart.tips.specific.desc')}}</p>
            </div>
            <div class="tip-item">
              <h3>{{$t('quickstart.tips.simple.title')}}</h3>
              <p>{{$t('quickstart.tips.simple.desc')}}</p>
            </div>
            <div class="tip-item">
              <h3>{{$t('quickstart.tips.examples.title')}}</h3>
              <p>{{$t('quickstart.tips.examples.desc')}}</p>
            </div>
            <div class="tip-item">
              <h3>{{$t('quickstart.tips.refine.title')}}</h3>
              <p>{{$t('quickstart.tips.refine.desc')}}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="cta-section">
        <div class="container">
          <h2>{{$t('quickstart.cta.title')}}</h2>
          <p>{{$t('quickstart.cta.description')}}</p>
          <button class="btn btn-primary" @click="goToLogin">{{$t('quickstart.cta.button')}}</button>
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
          <p>{{$t('common.footer.description')}}</p>
        </div>
        <div class="footer-links">
          <h4>{{$t('common.footer.product')}}</h4>
          <ul>
            <li><a @click.prevent="goToHome">{{$t('quickstart.footer.overview')}}</a></li>
            <li><a @click.prevent="goToQuickStart">{{$t('quickstart.footer.quickStart')}}</a></li>
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
