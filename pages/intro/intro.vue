<template>
  <div class="uig-landing-page-root">
    <header class="header">
        <div class="container">
            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                <a href="#" class="logo" style="margin-right: 15px;">
                    <img src="/static/logo.png" alt="Uigenius Logo">
                    Uigenius
                </a>
                <nav class="nav-menu">
                    <ul>
                        <li><a @click.prevent="scrollToSection('home')">{{$t('intro.nav.home')}}</a></li>
                        <li><a @click.prevent="goToQuickStart">{{$t('intro.nav.quickStart')}}</a></li>
                        <li><a @click.prevent="scrollToSection('features')">{{$t('intro.nav.features')}}</a></li>
                        <li><a @click.prevent="scrollToSection('why-choose')">{{$t('intro.nav.whyChoose')}}</a></li>
                        <li><a @click.prevent="scrollToSection('testimonial')">{{$t('intro.nav.testimonial')}}</a></li>
                        <li><a @click.prevent="scrollToSection('pricing')">{{$t('intro.nav.pricing')}}</a></li>
                        <li><a @click.prevent="scrollToSection('contact')">{{$t('intro.nav.contact')}}</a></li>
                    </ul>
                    <div class="try-free" @click="goToLogin">
                        <span>{{$t('intro.try')}}</span>
                        <span>{{$t('intro.free')}}</span>
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
        <section id="home" class="hero">
            <div class="container hero-content">
                <h1>{{$t('intro.hero.title')}}<br> {{$t('intro.hero.subtitle')}}</h1>
                <div class="hero-buttons">
                    <a href="#" class="btn btn-primary" @click.prevent="goToLogin">{{$t('intro.hero.tryNow')}}</a>
                    <a href="https://apps.microsoft.com/detail/9P7XBXGZN5JS" class="btn btn-secondary">
                        <i class="fab fa-windows"></i> {{$t('intro.hero.downloadWindows')}}
                    </a>
                </div>
            </div>
            <div class="hero-illustration"></div>
            <div class="scroll-to-top" @click="scrollToTop">
                <i class="fas fa-chevron-up"></i>
            </div>
        </section>

        <section id="features" class="features">
            <div class="container">
                <h2 class="section-title text-center mb-6">{{$t('intro.features.title')}}</h2>
                <div class="features-grid">
                    <div class="feature-item">
                        <div class="icon"><i class="fas fa-font"></i></div>
                        <h3>{{$t('intro.features.textToDesign.title')}}</h3>
                        <p>{{$t('intro.features.textToDesign.description')}}</p>
                    </div>
                    <div class="feature-item">
                        <div class="icon"><i class="fas fa-users"></i></div>
                        <h3>{{$t('intro.features.collaboration.title')}}</h3>
                        <p>{{$t('intro.features.collaboration.description')}}</p>
                    </div>
                    <div class="feature-item">
                        <div class="icon"><i class="fas fa-camera"></i></div>
                        <h3>{{$t('intro.features.screenshot.title')}}</h3>
                        <p>{{$t('intro.features.screenshot.description')}}</p>
                    </div>
                    <div class="feature-item">
                        <div class="icon"><i class="fas fa-pencil-ruler"></i></div>
                        <h3>{{$t('intro.features.sketch.title')}}</h3>
                        <p>{{$t('intro.features.sketch.description')}}</p>
                    </div>
                    <div class="feature-item">
                        <div class="icon"><i class="fas fa-cloud"></i></div>
                        <h3>{{$t('intro.features.cloud.title')}}</h3>
                        <p>{{$t('intro.features.cloud.description')}}</p>
                    </div>
                    <div class="feature-item">
                        <div class="icon"><i class="fas fa-mobile-alt"></i></div>
                        <h3>{{$t('intro.features.multiPlatform.title')}}</h3>
                        <p>{{$t('intro.features.multiPlatform.description')}}</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="why-choose" class="why-choose">
            <div class="why-choose-container">
                <h2 class="section-title text-center mb-6">{{$t('intro.whyChoose.title')}}</h2>
                <div class="why-choose-grid">
                    <div class="why-choose-item">
                        <div class="icon"><i class="fas fa-rocket"></i></div>
                        <h3>{{$t('intro.whyChoose.rapidPrototyping.title')}}</h3>
                        <p>{{$t('intro.whyChoose.rapidPrototyping.description')}}</p>
                    </div>
                    <div class="why-choose-item">
                        <div class="icon"><i class="fas fa-user-check"></i></div>
                        <h3>{{$t('intro.whyChoose.noDesignSkills.title')}}</h3>
                        <p>{{$t('intro.whyChoose.noDesignSkills.description')}}</p>
                    </div>
                    <div class="why-choose-item">
                        <div class="icon"><i class="fas fa-cogs"></i></div>
                        <h3>{{$t('intro.whyChoose.intuitiveInterface.title')}}</h3>
                        <p>{{$t('intro.whyChoose.intuitiveInterface.description')}}</p>
                    </div>
                    <div class="why-choose-item">
                        <div class="icon"><i class="fas fa-code"></i></div>
                        <h3>{{$t('intro.whyChoose.exportReady.title')}}</h3>
                        <p>{{$t('intro.whyChoose.exportReady.description')}}</p>
                    </div>
                </div>
                <div class="why-choose-illustration"></div>
            </div>
        </section>

        <section class="as-seen-on">
            <div class="container">
                <h2 class="section-title text-center">{{$t('intro.asSeenOn.title')}}</h2>
                <div class="company-logos">
                    <div class="company-logo-item">
                        <a href="https://www.producthunt.com/products/uigenius?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-uigenius" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1042924&theme=light&t=1764212733379" alt="Uigenius - Uigenius: AI-Powered UI/UX Design Tools | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>
                    </div>
                    <div class="company-logo-item"><span>GRAYGRIDS</span></div>
                    <div class="company-logo-item"><span>UIdeck</span></div>
                    <div class="company-logo-item"><span>Ayro UI</span></div>
                    <div class="company-logo-item"><span>Lineicons</span></div>
                </div>
            </div>
        </section>

        <section id="testimonial" class="testimonial">
            <div class="container">
                <div class="testimonial-card">
                    <p>"{{$t('intro.testimonial.quote')}}"</p>
                    <div class="testimonial-author">
                        <img src="https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/static/avatar.png" alt="Fajar Profile Picture">
                        <span class="name">{{$t('intro.testimonial.author')}}</span>
                        <span class="title">{{$t('intro.testimonial.title')}}</span>
                    </div>
                </div>
            </div>
        </section>

        <section id="pricing" class="pricing">
            <div class="container">
                <h2 class="section-title text-center">{{$t('intro.pricing.title')}}</h2>
                <p class="section-subtitle text-center">{{$t('intro.pricing.subtitle')}}</p>
                <div class="pricing-card-wrapper">
                    <div class="pricing-card" style="margin-right: 25px; width: 450px;">
                        <div class="label">{{$t('intro.pricing.free.label')}}</div>
                        <span class="price">$0<span> {{$t('intro.pricing.free.period')}}</span></span>
                        <ul>
                            <li>{{$t('intro.pricing.free.feature1')}}</li>
                            <li>{{$t('intro.pricing.free.feature2')}}</li>
                            <li>{{$t('intro.pricing.free.feature3')}}</li>
                        </ul>
                        <a href="#" class="btn btn-primary" @click.prevent="goToLogin">{{$t('intro.pricing.free.button')}}</a>
                    </div><div class="pricing-card" style="margin-right: 25px; width: 450px;">
                        <div class="label">{{$t('intro.pricing.pro.label')}}</div>
                        <span class="price">$12<span> {{$t('intro.pricing.pro.period')}}</span></span>
                        <ul>
                            <li>{{$t('intro.pricing.pro.feature1')}}</li>
                            <li>{{$t('intro.pricing.pro.feature2')}}</li><li>{{$t('intro.pricing.pro.feature3')}}</li>
                            <li>{{$t('intro.pricing.pro.feature4')}}</li>
                            <li>{{$t('intro.pricing.pro.feature5')}}</li>
                        </ul>
                        <a href="#" class="btn btn-primary" @click.prevent="handleProPayment('prod_23PrXe2PUsElWYj1C7cKqf')">{{$t('intro.pricing.pro.button')}}</a>
                    </div><div class="pricing-card" style="width: 450px;">
                        <div class="label">{{$t('intro.pricing.lifetime.label')}}</div>
                        <span class="price">$79<span> {{$t('intro.pricing.lifetime.period')}}</span></span>
                        <ul>
                            <li>{{$t('intro.pricing.lifetime.feature1')}}</li>
                            <li>{{$t('intro.pricing.lifetime.feature2')}}</li><li>{{$t('intro.pricing.lifetime.feature3')}}</li><li>{{$t('intro.pricing.lifetime.feature4')}}</li>
                            <li>{{$t('intro.pricing.lifetime.feature5')}}</li>
                            <li>{{$t('intro.pricing.lifetime.feature6')}}</li>
                            <li>{{$t('intro.pricing.lifetime.feature7')}}</li>
                        </ul>
                        <a href="#" class="btn btn-primary" @click.prevent="handleLifetimePayment('prod_7m7FLqGesIUZD6MstjzOLR')">{{$t('intro.pricing.lifetime.button')}}</a>
                    </div>
                </div>
            </div>
        </section>

        <section class="image-showcase">
            <div class="container"><h1>{{$t('intro.imageShowcase.title')}}<br><br></h1>
                <div class="image-showcase-grid">
                    <div class="image-showcase-item">
                        <img src="https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/static/test01.png" alt="Design Example 1">
                    </div>
                    <div class="image-showcase-item">
                        <img src="https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/static/test02.png" alt="Design Example 2">
                    </div>
                    <div class="image-showcase-item">
                        <img src="https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/static/test03.png" alt="Design Example 3">
                    </div>
                </div>
            </div>
        </section>

        <section class="start-for-free">
            <div class="container">
                <h2 class="section-title">{{$t('intro.startForFree.title')}}</h2>
                <p>{{$t('intro.startForFree.description')}}</p>
            </div>
        </section>

        <section id="contact" class="contact">
            <div class="container">
                <h2 class="section-title text-center mb-6">{{$t('intro.contact.title')}}</h2>
                <form class="contact-form">
                    <div class="form-row">
                        <div class="form-group">
                            <!-- <input name="test" style="border: solid 1px #999999;height: 40px;" type="text" @input="onInput" :value="value" /> -->
                            <input type="text" id="name" name="name" :placeholder="$t('intro.contact.name')" v-model="form.name" :disabled="submitting" required>
                        </div>
                        <div class="form-group">
                            <input type="email" id="email" name="email" :placeholder="$t('intro.contact.email')" v-model="form.email" :disabled="submitting" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <input type="text" id="subject" name="subject" :placeholder="$t('intro.contact.subject')" v-model="form.subject" :disabled="submitting" required>
                    </div>
                    <div class="form-group">
                        <textarea id="message" name="message" rows="6" :placeholder="$t('intro.contact.message')" v-model="form.message" :disabled="submitting"></textarea>
                    </div>
                    <button type="button" class="btn btn-primary" :disabled="submitting" @click="submitForm">{{ submitting ? $t('intro.contact.sending') : $t('intro.contact.send') }}</button>
                </form>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container footer-grid">
            <div class="footer-about">
                <a href="#" class="logo">
                    <img src="/static/logo.png" alt="Uigenius Logo">
                    Uigenius
                </a>
                <p>{{$t('intro.footer.description')}}</p>
            </div>
            <div class="footer-links">
                <h4>{{$t('intro.footer.product')}}</h4>
                <ul>
                    <li><a @click.prevent="scrollToSection('features')">{{$t('intro.footer.features')}}</a></li>
                    <li><a @click.prevent="scrollToSection('pricing')">{{$t('intro.footer.pricing')}}</a></li>
                    <!-- <li><a href="#">Tutorials</a></li> -->
                </ul>
            </div>
            <div class="footer-links">
                <h4>{{$t('intro.footer.company')}}</h4>
                <ul>
                    <li><a @click.prevent="goToAboutUs">{{$t('intro.footer.aboutUs')}}</a></li>
                    <li><a @click.prevent="goToCareers">{{$t('intro.footer.careers')}}</a></li>
                    <li><a @click.prevent="scrollToSection('contact')">{{$t('intro.footer.contact')}}</a></li>
                </ul>
            </div>
            <div class="footer-links">
                <h4>{{$t('intro.footer.connect')}}</h4>
                <div class="social-icons">
                    <a href="https://x.com/Uigenius13952" target="_blank" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                </div>
            </div>
            <div class="footer-links">
                <h4>{{$t('intro.footer.support')}}</h4>
                <div class="support-email">
                    <a href="mailto:support@uigenius.top"><i class="fas fa-envelope"></i> support@uigenius.top</a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <div class="container">
                <p> {{$t('intro.footer.copyright')}}</p>
                <div class="footer-legal-links">
                    <a @click.prevent="goToTerms">{{$t('intro.footer.terms')}}</a>
                    <span class="separator">|</span>
                    <a @click.prevent="goToPrivacy">{{$t('intro.footer.privacy')}}</a>
                </div>
            </div>
        </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'UigeniusLandingPage',
  data() {
    return {
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      submitting: false,
      showLanguageDropdown: false,
      currentLocale: 'en'
    }
  },
  watch: {
    currentLocale() {
      // Close dropdown when locale changes
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
    // Load saved language preference
    this.loadSavedLanguage();
    
    // Check if we need to scroll to a specific section
    const scrollToSection = uni.getStorageSync('scrollToSection');
    if (scrollToSection) {
      // Clear the storage
      uni.removeStorageSync('scrollToSection');
      // Wait a bit for the page to fully render
      setTimeout(() => {
        this.scrollToSection(scrollToSection);
      }, 300);
    }
  },
  mounted() {
    // Load saved language preference on mount
    this.loadSavedLanguage();
    
    // Close dropdown when clicking outside (only if document is available)
    if (typeof document !== 'undefined') {
      document.addEventListener('click', this.handleClickOutside);
    }
  },
  beforeDestroy() {
    // Remove event listener (only if document is available)
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
          // Also update i18n locale if available
          if (this.$i18n) {
            this.$i18n.locale = savedLocale;
          }
        } else {
          // Get current locale from uni-app
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
      // Toggle dropdown - @click.stop on menu items prevents bubbling
      this.showLanguageDropdown = !this.showLanguageDropdown;
    },
    selectLanguage(localeCode) {
      // Close dropdown immediately
      this.showLanguageDropdown = false;
      
      if (this.currentLocale === localeCode) {
        return;
      }
      
      // Use setTimeout to ensure dropdown closes after any potential re-renders
      setTimeout(() => {
        this.showLanguageDropdown = false;
      }, 0);
      
      try {
        // Set the locale
        uni.setLocale(localeCode);
        
        // Update i18n locale if available
        if (this.$i18n) {
          this.$i18n.locale = localeCode;
        }
        
        // Update current locale
        this.currentLocale = localeCode;
        
        // Save to local storage
        uni.setStorageSync('appLocale', localeCode);
        
        // Ensure dropdown is closed after locale change
        this.$nextTick(() => {
          this.showLanguageDropdown = false;
          // Force page refresh to apply language changes
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
      // Only handle if document is available (web platform)
      if (typeof document === 'undefined') {
        return;
      }
      const languageSelector = this.$el?.querySelector('.language-selector');
      if (languageSelector && !languageSelector.contains(event.target)) {
        this.showLanguageDropdown = false;
      }
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    },
    goToLogin() {
      // If login is a tabBar page, switchTab is required; otherwise navigateTo works.
      // Try switchTab first; if it fails, fallback to navigateTo.
    //   uni.switchTab({
    //     url: '/pages/login/login',
    //     fail: () => {
    //       uni.navigateTo({ url: '/pages/login/login' })
    //     }
    //   })
    uni.navigateTo({ url: '/pages/login/login' })
    },
    async handleProPayment(productId) {
      await this.checkMembershipBeforePayment(productId);
    },
    async handleLifetimePayment(productId) {
      await this.checkMembershipBeforePayment(productId);
    },
    async checkMembershipBeforePayment(productId) {
      try {
        uni.showLoading({
          title: this.$t('intro.payment.checking')
        });

        // Get user ID from storage
        const uid = uni.getStorageSync('uid');
        
        if (!uid) {
          uni.hideLoading();
          uni.showToast({
            title: this.$t('intro.payment.error.noUserId'),
            icon: 'none',
            duration: 2000
          });
          this.goToLogin();
          return;
        }

        // Check if userId matches the specific ID
        if (uid == '123bcbfeqqaeabfaf5a') {
          uni.hideLoading();
          this.goToLogin();
          return;
        }

        // Call checkMembership cloud function
        const result = await uniCloud.callFunction({
          name: 'checkMembership',
          data: {
            action: 'checkMembership',
            uid: uid
          }
        });

        uni.hideLoading();

        if (result.result && result.result.success) {
          const membershipData = result.result.data;
          
          // Check if user already has membership
          if (membershipData.hasMembership) {
            uni.showToast({
              title: this.$t('intro.payment.error.hasMembership'),
              icon: 'none',
              duration: 2000
            });
            return;
          }

          // User doesn't have membership, proceed to payment
          this.redirectToPayment(productId);
        } else {
          uni.showToast({
            title: result.result?.message || this.$t('intro.payment.error.checkFailed'),
            icon: 'none',
            duration: 2000
          });
        }
      } catch (error) {
        uni.hideLoading();
        uni.showToast({
          title: this.$t('intro.payment.error.checkError'),
          icon: 'none',
          duration: 2000
        });
        console.error('Error checking membership:', error);
      }
    },
    redirectToPayment(productId) {
      // Redirect to payment URL in the same window
      window.location.href = `https://www.creem.io/payment/${productId}`;
    },
    contactSupport() {
      window.location.href = 'mailto:support@uigenius.top';
    },
    goToAboutUs() {
      uni.navigateTo({ url: '/pages/about/about' });
    },
    goToQuickStart() {
      uni.navigateTo({ url: '/pages/quickstart/quickstart' });
    },
    goToCareers() {
      uni.navigateTo({ url: '/pages/careers/careers' });
    },
    goToTerms() {
      uni.navigateTo({ url: '/pages/terms/terms' });
    },
    goToPrivacy() {
      uni.navigateTo({ url: '/pages/privacy/privacy' });
    },
    async submitForm() {
      if (this.submitting) return;
      if (!this.form.name || !this.form.email || !this.form.subject || !this.form.message) {
        uni.showToast({ title: this.$t('intro.contact.error.fillAll'), icon: 'none' });
        return;
      }
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email);
      if (!emailValid) {
        uni.showToast({ title: this.$t('intro.contact.error.invalidEmail'), icon: 'none' });
        return;
      }
      try {
        this.submitting = true;
        const res = await uniCloud.callFunction({
          name: 'contact-us',
          data: {
            name: this.form.name,
            email: this.form.email,
            subject: this.form.subject,
            message: this.form.message
          }
        });
        if (res && res.result && res.result.code === 0) {
          uni.showToast({ title: this.$t('intro.contact.success'), icon: 'success' });
          this.form = { name: '', email: '', subject: '', message: '' };
        } else {
          const msg = (res && res.result && res.result.msg) || this.$t('intro.contact.error.sendFailed');
          uni.showToast({ title: msg, icon: 'none' });
        }
      } catch (error) {
        console.error(error);
        uni.showToast({ title: this.$t('intro.contact.error.sendFailed'), icon: 'none' });
      } finally {
        this.submitting = false;
      }
    }
  }
};
</script>
<style scoped>
/* Component styles - ensure all original styling is preserved */
/* If you see this comment, the AI model may not have included all styles */
/* Please check the original HTML for any missing styles */
</style>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

.uig-landing-page-root {
    /* CSS Custom Properties (Variables) from :root */
    --primary-red: #ef4444; /* A vibrant red */
    --dark-text: #333;
    --light-text: #666;
    --lighter-text: #999;
    --background-white: #fff;
    --light-gray-bg: #f8f8f8;
    --border-color: #eee;
    --button-hover: #dc2626;

    /* Global Body Styles from original HTML */
    font-family: 'Poppins', sans-serif;
    line-height: 1.6;
    color: var(--dark-text);
    background-color: var(--background-white);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    /* Inline style from original outermost relevant div */
    width: 100%;
}

/* Reset styles (from original * selector) */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* General styles */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}
.why-choose-container {
    max-height: 650px;
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

/* Utility Classes */
.text-center {
    text-align: center;
}
.mb-6 { margin-bottom: 4rem; } /* Increased margin for sections */
.mb-4 { margin-bottom: 2rem; }
.mt-4 { margin-top: 2rem; }

.btn {
    display: inline-block;
    padding: 12px 28px;
    border-radius: 5px;
    font-weight: 500;
    transition: background-color 0.3s ease;
    cursor: pointer;
    text-align: center;
}

.btn-primary {
    background-color: var(--primary-red);
    color: var(--background-white);
    border: none;
}

.btn-primary:hover {
    background-color: var(--button-hover);
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
}

.logo {
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: 700;
    color: var(--dark-text);
}

.logo img {
    height: 30px; /* Adjust as needed */
    margin-right: 8px;
}

.nav-menu {
    display: flex;
    align-items: center;
    gap: 13px; /* Space between nav items */
}

.nav-menu ul {
    display: flex;
    gap: 30px;
}

.nav-menu a {
    font-weight: 500;
    color: var(--light-text);
    transition: color 0.3s ease;
}

.nav-menu a:hover {
    color: var(--primary-red);
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
    flex-direction: column;
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
    float: none;
    clear: both;
}

.language-dropdown-menu li:hover {
    background-color: var(--light-gray-bg);
}

.language-dropdown-menu li.active {
    background-color: rgba(239, 68, 68, 0.1);
    color: var(--primary-red);
    font-weight: 500;
}

.try-free {
    font-weight: 600;
    color: var(--primary-red);
    border: 2px solid var(--primary-red);
    border-radius: 50%; /* Makes it circular */
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
.hero {
    padding: 80px 0 100px;
    text-align: center;
    position: relative;
    overflow: hidden; /* To contain the illustration */
    background-color: var(--light-gray-bg); /* Match background */
}

.hero-content {
    max-width: 800px;
    margin: 0 auto;
    position: relative;
    z-index: 1; /* Ensure text is above illustration */
}

.hero h1 {
    font-size: 56px;
    font-weight: 700;
    margin-bottom: 25px;
    line-height: 1.2;
    color: var(--dark-text);
}

.hero-buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 25px;
}

.btn-secondary {
    background-color: #ffffff;
    color: #333;
    border: 2px solid #ccc;
    display: flex;
    align-items: center;
    gap: 8px;
}

.btn-secondary:hover {
    background-color: #f2f2f2;
    border-color: #999;
}

.btn-secondary .fab {
    font-size: 1.2em;
}

.hero .btn {
    padding: 15px 40px;
    font-size: 18px;
}

.windows-download-btn {
    background-color: #ffffff;
    color: #333;
    border: 2px solid #ccc;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 15px 30px;
    font-size: 18px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.windows-download-btn:hover {
    background-color: #f2f2f2;
    border-color: #999;
}

.windows-download-btn .fab {
    font-size: 1.2em;
}

.hero-illustration {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 90%; /* Adjust size */
    max-width: 1000px; /* Max width for the illustration */
    height: 400px; /* Placeholder height */
    background-image: url('https://via.placeholder.com/1000x400/F0F8FF/87CEEB?text=UI+Design+Illustration'); /* Placeholder image */
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center bottom;
    z-index: 0;
    margin-top: 50px; /* Space between text and illustration */
}

@media (max-width: 768px) {
    .hero {
        padding-bottom: 300px; /* Adjust for smaller illustration */
    }
    .hero-illustration {
        height: 300px;
        width: 100%;
    }
    .hero h1 {
        font-size: 40px;
    }
}
@media (max-width: 480px) {
    .hero h1 {
        font-size: 32px;
    }
}

/* Section Titles */
.section-title {
    font-size: 42px;
    font-weight: 700;
    margin-bottom: 20px;
    color: var(--dark-text);
}
.section-subtitle {
    font-size: 18px;
    color: var(--light-text);
    margin-bottom: 40px;
}

/* Features Section */
.features {
    padding: 100px 0;
    background-color: var(--background-white);
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 40px;
}

.feature-item {
    text-align: center;
    padding: 30px;
    background-color: var(--light-gray-bg);
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.feature-item .icon {
    font-size: 40px;
    color: var(--primary-red);
    margin-bottom: 20px;
    background-color: rgba(239, 68, 68, 0.1); /* Light red background for icon */
    border-radius: 50%;
    width: 80px;
    height: 80px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
}

.feature-item h3 {
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 15px;
    color: var(--dark-text);
}

.feature-item p {
    font-size: 15px;
    color: var(--light-text);
}

/* Why Choose Section */
.why-choose {
    padding: 100px 0;
    background-color: var(--light-gray-bg);
    position: relative;
    overflow: hidden;
    text-align: center;
}

.why-choose-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
    position: relative;
    z-index: 1;
    margin-bottom: 60px; /* Space for illustration */
}

.why-choose-item {
    text-align: center;
    background-color: var(--background-white);
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.why-choose-item .icon {
    font-size: 36px;
    color: var(--primary-red);
    margin-bottom: 15px;
}

.why-choose-item h3 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
    color: var(--dark-text);
}

.why-choose-item p {
    font-size: 14px;
    color: var(--light-text);
}

.why-choose-illustration {
    width: 100%;
    max-width: 900px;
    height: 350px; /* Placeholder height */
    background-image: url('https://via.placeholder.com/900x350/E0F2F7/87CEFA?text=Working+Illustration'); /* Placeholder image */
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center bottom;
    margin: 0 auto;
    position: relative;
    z-index: 0;
    bottom: -30px; /* Adjust to slightly overlap the bottom of the section */
}

@media (max-width: 768px) {
    .why-choose-illustration {
        height: 250px;
    }
}

/* As Seen On Section */
.as-seen-on {
    padding: 80px 0;
    background-color: var(--background-white);
    text-align: center;
}

.company-logos {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 50px;
    margin-top: 40px;
}

.company-logo-item {
    height: 54px; /* Standard height for logos */
    width: auto;
    max-width: 250px;
    filter: grayscale(100%);
    opacity: 0.6;
    transition: opacity 0.3s ease, filter 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}
.company-logo-item:hover {
    filter: grayscale(0%);
    opacity: 1;
}

/* Placeholder logo styling */
.company-logo-item span {
    font-size: 24px;
    font-weight: 600;
    color: var(--light-text);
}

/* Testimonial Section */
.testimonial {
    padding: 100px 0;
    background-color: var(--light-gray-bg);
    position: relative;
    overflow: hidden;
}

.testimonial-card {
    background-color: var(--background-white);
    padding: 50px;
    border-radius: 10px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    position: relative;
    z-index: 1;
}

.testimonial-card p {
    font-size: 20px;
    font-style: italic;
    margin-bottom: 30px;
    color: var(--light-text);
    line-height: 1.8;
}

.testimonial-author {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.testimonial-author img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 10px;
    border: 3px solid var(--primary-red);
}

.testimonial-author .name {
    font-size: 20px;
    font-weight: 600;
    color: var(--dark-text);
}

.testimonial-author .title {
    font-size: 15px;
    color: var(--lighter-text);
}

/* Pricing Section */
.pricing {
    padding: 100px 0;
    background-color: var(--background-white);
    text-align: center;
}

.pricing-card-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 60px;
}

.pricing-card {
    background-color: var(--light-gray-bg);
    border: 1px solid var(--border-color);
    border-radius: 10px;
    padding: 40px;
    width: 350px;
    text-align: left;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
}

.pricing-card .label {
    font-size: 14px;
    font-weight: 600;
    color: var(--primary-red);
    text-transform: uppercase;
    margin-bottom: 10px;
}

.pricing-card .price {
    font-size: 48px;
    font-weight: 700;
    color: var(--dark-text);
    margin-bottom: 30px;
    display: block;
}

.pricing-card .price span {
    font-size: 20px;
    font-weight: 400;
    color: var(--light-text);
}

.pricing-card ul {
    margin-bottom: 40px;
    color: var(--light-text);
}

.pricing-card ul li {
    font-size: 16px;
    margin-bottom: 15px;
    position: relative;
    padding-left: 25px;
}

.pricing-card ul li::before {
    content: "\f00c"; /* Font Awesome check icon */
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    color: var(--primary-red);
    position: absolute;
    left: 0;
    top: 2px;
}

/* Image Showcase Section */
.image-showcase {
    background-color: var(--background-white);
    padding-bottom: 100px;
    text-align: center; /* Center the images */
}

.image-showcase-grid {
    display: flex; /* Use flexbox for horizontal layout */
    justify-content: center; /* Center the items */
    gap: 20px; /* Space between images */
    flex-wrap: wrap; /* Allow wrapping on small screens */
    margin-top: 40px;
}

.image-showcase-item {
    width: 300px; /* Fixed width for consistency */
    height: 250px; /* Fixed height */
    background-color: var(--light-gray-bg);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--lighter-text);
    font-size: 18px;
}

.image-showcase-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* Start For Free Section */
.start-for-free {
    background-color: var(--light-gray-bg);
    padding: 80px 0;
    text-align: center;
}

.start-for-free .section-title {
    font-size: 36px;
}

.start-for-free p {
    font-size: 18px;
    color: var(--light-text);
    max-width: 600px;
    margin: 0 auto 30px;
}

/* About Us Section */
.about-us {
    padding: 100px 0;
    background-color: var(--background-white);
}

.about-content {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 60px;
    align-items: start;
}

.about-text h3 {
    font-size: 24px;
    font-weight: 600;
    color: var(--dark-text);
    margin-top: 30px;
    margin-bottom: 15px;
}

.about-text h3:first-child {
    margin-top: 0;
}

.about-text p {
    font-size: 16px;
    line-height: 1.8;
    color: var(--light-text);
    margin-bottom: 20px;
}

.about-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    background-color: var(--light-gray-bg);
    padding: 40px;
    border-radius: 10px;
}

.stat-item {
    text-align: center;
}

.stat-number {
    font-size: 42px;
    font-weight: 700;
    color: var(--primary-red);
    margin-bottom: 10px;
}

.stat-label {
    font-size: 14px;
    color: var(--light-text);
    font-weight: 500;
}

/* Careers Section */
.careers {
    padding: 100px 0;
    background-color: var(--light-gray-bg);
}

.careers-content {
    max-width: 1200px;
    margin: 0 auto;
}

.career-intro {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 60px;
}

.career-intro p {
    font-size: 18px;
    line-height: 1.8;
    color: var(--light-text);
}

.career-positions {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
    margin-bottom: 80px;
}

.position-card {
    background-color: var(--background-white);
    padding: 35px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.position-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.position-card h3 {
    font-size: 22px;
    font-weight: 600;
    color: var(--dark-text);
    margin-bottom: 15px;
}

.position-meta {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 20px;
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

.position-card p {
    font-size: 15px;
    line-height: 1.6;
    color: var(--light-text);
    margin-bottom: 25px;
}

.position-card .btn {
    width: 100%;
    text-align: center;
}

.career-benefits {
    background-color: var(--background-white);
    padding: 50px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.career-benefits h3 {
    font-size: 28px;
    font-weight: 600;
    color: var(--dark-text);
    text-align: center;
    margin-bottom: 40px;
}

.benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 40px;
}

.benefit-item {
    text-align: center;
}

.benefit-item i {
    font-size: 40px;
    color: var(--primary-red);
    margin-bottom: 20px;
    background-color: rgba(239, 68, 68, 0.1);
    border-radius: 50%;
    width: 80px;
    height: 80px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
}

.benefit-item h4 {
    font-size: 18px;
    font-weight: 600;
    color: var(--dark-text);
    margin-bottom: 10px;
}

.benefit-item p {
    font-size: 14px;
    color: var(--light-text);
}

/* Contact Section */
.contact {
    padding: 100px 0;
    background-color: var(--background-white);
}

.contact-form {
    max-width: 700px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-row {
    display: flex;
    gap: 20px;
    flex-wrap: wrap; /* Allow wrapping for responsiveness */
}

.form-row .form-group {
    flex: 1;
    min-width: 280px; /* Ensure fields don't get too small */
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: var(--dark-text);
}

.form-group input {
    height: 40px;
    padding: 12px 15px;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    color: var(--dark-text);
    background-color: var(--light-gray-bg);
}
.form-group textarea {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    color: var(--dark-text);
    background-color: var(--light-gray-bg);
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: var(--primary-red);
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
}

.form-group textarea {
    resize: vertical;
    min-height: 120px;
}

.contact-form .btn {
    align-self: flex-start; /* Align button to the left */
    padding: 12px 35px;
    font-size: 16px;
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

.support-email {
    margin-top: 10px;
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

.support-email i {
    font-size: 18px;
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

/* Scroll to Top Button */
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
    transition: background-color 0.3s ease;
    z-index: 1000;
}

.scroll-to-top:hover {
    background-color: var(--button-hover);
}

/* Responsive Adjustments */
@media (max-width: 992px) {
    .nav-menu ul {
        display: none; /* Hide main nav links on smaller screens */
    }
    .nav-menu {
        gap: 15px;
    }
    .language-dropdown span {
        display: none; /* Hide language name on smaller screens, show only icon */
    }
    .hero h1 {
        font-size: 48px;
    }
    .section-title {
        font-size: 36px;
    }
    .footer-grid {
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 35px;
    }
    .footer-about {
        padding-right: 0;
    }
}

@media (max-width: 768px) {
    .header {
        flex-direction: column;
        gap: 15px;
    }
    .nav-menu {
        width: 100%;
        justify-content: center;
    }
    .try-free {
        margin-left: 0;
    }
    .hero {
        padding: 60px 0 80px;
    }
    .hero h1 {
        font-size: 38px;
    }
    .features, .why-choose, .as-seen-on, .testimonial, .pricing, .image-showcase, .contact, .footer {
        padding: 60px 0;
    }
    .features-grid, .why-choose-grid {
        grid-template-columns: 1fr;
    }
    .pricing-card-wrapper {
        flex-direction: column;
        align-items: center;
    }
    .pricing-card {
        width: 100%;
        max-width: 380px;
    }
    .form-row {
        flex-direction: column;
        gap: 0;
    }
    .form-group {
        min-width: unset;
    }
    .contact-form .btn {
        width: 100%;
        align-self: center;
    }
    .image-showcase-grid {
        flex-direction: column;
        align-items: center;
    }
    .image-showcase-item {
        width: 90%;
    }
}

@media (max-width: 480px) {
    .header {
        padding: 15px 0;
    }
    .hero h1 {
        font-size: 30px;
    }
    .hero .btn {
        padding: 10px 25px;
        font-size: 16px;
    }
    .section-title {
        font-size: 28px;
    }
    .feature-item h3 {
        font-size: 20px;
    }
    .testimonial-card p {
        font-size: 16px;
    }
    .pricing-card .price {
        font-size: 40px;
    }
    .footer-grid {
        grid-template-columns: 1fr;
        text-align: center;
    }
    .footer-about p {
        max-width: 100%;
    }
    .footer-links ul {
        padding-left: 0;
    }
    .footer-links li {
        display: inline-block;
        margin: 0 10px;
    }
    .social-icons {
        margin-top: 20px;
    }
    .footer-legal-links {
        flex-direction: column;
        gap: 8px;
    }
    .footer-legal-links .separator {
        display: none;
    }
}
</style>
