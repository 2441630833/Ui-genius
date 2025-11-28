<template>
  <div class="uig-landing-page-root">
    <header class="header">
        <div class="container">
            <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                <a href="#" class="logo" style="margin-right: 15px;">
                    <img src="https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/static/Icon paint brush.png" alt="Uigenius Logo">
                    Uigenius
                </a>
                <nav class="nav-menu">
                    <ul>
                        <li><a @click.prevent="scrollToSection('home')">HOME</a></li>
                        <li><a @click.prevent="goToQuickStart">QUICK START</a></li>
                        <li><a @click.prevent="scrollToSection('features')">FEATURES</a></li>
                        <li><a @click.prevent="scrollToSection('why-choose')">WHY UIGENIUS</a></li>
                        <li><a @click.prevent="scrollToSection('testimonial')">TESTIMONIAL</a></li>
                        <li><a @click.prevent="scrollToSection('pricing')">PRICING</a></li>
                        <li><a @click.prevent="scrollToSection('contact')">CONTACT</a></li>
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
        <section id="home" class="hero">
            <div class="container hero-content">
                <h1>AI-powered UX/UI Design Tool<br> For Rapid Prototyping</h1>
                <div class="hero-buttons">
                    <a href="#" class="btn btn-primary" @click.prevent="goToLogin">Try Uigenius Now</a>
                    <a href="https://apps.microsoft.com/detail/9P7XBXGZN5JS" class="btn btn-secondary">
                        <i class="fab fa-windows"></i> Download for Windows
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
                <h2 class="section-title text-center mb-6">Key Features</h2>
                <div class="features-grid">
                    <div class="feature-item">
                        <div class="icon"><i class="fas fa-font"></i></div>
                        <h3>TEXT-TO-DESIGN</h3>
                        <p>Simply input text descriptions and watch as our AI automatically generates beautiful, functional designs for your apps and websites.</p>
                    </div>
                    <div class="feature-item">
                        <div class="icon"><i class="fas fa-users"></i></div>
                        <h3>REAL-TIME COLLABORATION</h3>
                        <p>Work together with your team in real-time, making design iterations faster and more efficient than ever before.</p>
                    </div>
                    <div class="feature-item">
                        <div class="icon"><i class="fas fa-camera"></i></div>
                        <h3>SCREENSHOT CONVERSION</h3>
                        <p>Upload screenshots or any images and our AI will convert them into editable design components that you can customize to your needs.</p>
                    </div>
                    <div class="feature-item">
                        <div class="icon"><i class="fas fa-pencil-ruler"></i></div>
                        <h3>SKETCH DIGITIZATION</h3>
                        <p>Transform your hand-drawn sketches into professional digital designs with our advanced AI recognition technology.</p>
                    </div>
                    <div class="feature-item">
                        <div class="icon"><i class="fas fa-cloud"></i></div>
                        <h3>CLOUD-BASED PLATFORM</h3>
                        <p>Access your designs from anywhere with our cloud-based platform. No downloads or installations required.</p>
                    </div>
                    <div class="feature-item">
                        <div class="icon"><i class="fas fa-mobile-alt"></i></div>
                        <h3>MULTI-PLATFORM SUPPORT</h3>
                        <p>Design for multiple platforms simultaneously. Create responsive websites and apps that work across all devices.</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="why-choose" class="why-choose">
            <div class="why-choose-container">
                <h2 class="section-title text-center mb-6">Why Choose Uigenius</h2>
                <div class="why-choose-grid">
                    <div class="why-choose-item">
                        <div class="icon"><i class="fas fa-rocket"></i></div>
                        <h3>Rapid Prototyping</h3>
                        <p>Create functional prototypes in minutes instead of hours or days. Speed up your design process dramatically.</p>
                    </div>
                    <div class="why-choose-item">
                        <div class="icon"><i class="fas fa-user-check"></i></div>
                        <h3>No Design Skills Required</h3>
                        <p>Our AI handles the design work, making it accessible to product managers, developers, and non-designers.</p>
                    </div>
                    <div class="why-choose-item">
                        <div class="icon"><i class="fas fa-cogs"></i></div>
                        <h3>Intuitive Interface</h3>
                        <p>Get started quickly with our user-friendly interface. No steep learning curve or complex tools.</p>
                    </div>
                    <div class="why-choose-item">
                        <div class="icon"><i class="fas fa-code"></i></div>
                        <h3>Export-Ready Designs</h3>
                        <p>Export your designs in multiple formats, ready for development or further refinement in other design tools.</p>
                    </div>
                </div>
                <div class="why-choose-illustration"></div>
            </div>
        </section>

        <section class="as-seen-on">
            <div class="container">
                <h2 class="section-title text-center">As Seen On</h2>
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
                    <p>"Uigenius has helped us create beautiful and functional designs for our AI projects. It's a great tool for quickly prototyping and iterating on designs. Save us time and effort."</p>
                    <div class="testimonial-author">
                        <img src="https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/static/avatar.png" alt="Fajar Profile Picture">
                        <span class="name">Belal Alsinglawi</span>
                        <span class="title">CEO, Innovalab.ai</span>
                    </div>
                </div>
            </div>
        </section>

        <section id="pricing" class="pricing">
            <div class="container">
                <h2 class="section-title text-center">Choose Your Plan</h2>
                <p class="section-subtitle text-center">Select the perfect plan for your design needs</p>
                <div class="pricing-card-wrapper">
                    <div class="pricing-card" style="margin-right: 25px; width: 450px;">
                        <div class="label">Free</div>
                        <span class="price">$0<span>/ Month</span></span>
                        <ul>
                            <li>10 UI generation&nbsp;request</li>
                            <li>3 screenshot convertion</li>
                            <li>Free AI model</li>
                        </ul>
                        <a href="#" class="btn btn-primary" @click.prevent="goToLogin">Try Free Now</a>
                    </div><div class="pricing-card" style="margin-right: 25px; width: 450px;">
                        <div class="label">PRO</div>
                        <span class="price">$12<span>/ Month</span></span>
                        <ul>
                            <li>Unlimited UI generation&nbsp;request</li>
                            <li>Unlimited screenshot convertion</li><li>Pro AI model</li>
                            <li>Unlimited storage</li>
                            <li>Priority support</li>
                        </ul>
                        <a href="#" class="btn btn-primary" @click.prevent="handleProPayment('prod_23PrXe2PUsElWYj1C7cKqf')">Buy Now</a>
                    </div><div class="pricing-card" style="width: 450px;">
                        <div class="label">Lifetime Deals</div>
                        <span class="price">$79<span>/ Lifetime</span></span>
                        <ul>
                            <li>Unlimited&nbsp;UI generation&nbsp;request</li>
                            <li>Unlimited screenshot convertion</li><li>Unlimited prompt limatation&nbsp;</li><li>Pro AI model</li>
                            <li>Unlimited storage</li>
                            <li>Priority support</li>
                            <li>Dedicated account manager</li>
                        </ul>
                        <a href="#" class="btn btn-primary" @click.prevent="handleLifetimePayment('prod_7m7FLqGesIUZD6MstjzOLR')">Buy Now</a>
                    </div>
                </div>
            </div>
        </section>

        <section class="image-showcase">
            <div class="container"><h1>AI Design Example<br><br></h1>
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
                <h2 class="section-title">Start For Free</h2>
                <p>Skip login user can get 3 times free trial.<br>Login user can get 10 times free trial.</p>
            </div>
        </section>

        <section id="contact" class="contact">
            <div class="container">
                <h2 class="section-title text-center mb-6">Contact</h2>
                <form class="contact-form">
                    <div class="form-row">
                        <div class="form-group">
                            <!-- <input name="test" style="border: solid 1px #999999;height: 40px;" type="text" @input="onInput" :value="value" /> -->
                            <input type="text" id="name" name="name" placeholder="Name" v-model="form.name" :disabled="submitting" required>
                        </div>
                        <div class="form-group">
                            <input type="email" id="email" name="email" placeholder="Email" v-model="form.email" :disabled="submitting" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <input type="text" id="subject" name="subject" placeholder="Subject" v-model="form.subject" :disabled="submitting" required>
                    </div>
                    <div class="form-group">
                        <textarea id="message" name="message" rows="6" placeholder="Message" v-model="form.message" :disabled="submitting"></textarea>
                    </div>
                    <button type="button" class="btn btn-primary" :disabled="submitting" @click="submitForm">{{ submitting ? 'Sending...' : 'Send Message' }}</button>
                </form>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container footer-grid">
            <div class="footer-about">
                <a href="#" class="logo">
                    <img src="https://mp-0728a9df-3eac-4bd5-b496-e252db36b648.cdn.bspapp.com/static/Icon paint brush.png" alt="Uigenius Logo">
                    Uigenius
                </a>
                <p>AI-powered UX/UI design tool that quickly generates prototypes for apps and websites from simple text descriptions.</p>
            </div>
            <div class="footer-links">
                <h4>Product</h4>
                <ul>
                    <li><a @click.prevent="scrollToSection('features')">Features</a></li>
                    <li><a @click.prevent="scrollToSection('pricing')">Pricing</a></li>
                    <!-- <li><a href="#">Tutorials</a></li> -->
                </ul>
            </div>
            <div class="footer-links">
                <h4>Company</h4>
                <ul>
                    <li><a @click.prevent="goToAboutUs">About Us</a></li>
                    <li><a @click.prevent="goToCareers">Careers</a></li>
                    <li><a @click.prevent="scrollToSection('contact')">Contact</a></li>
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
                <p> 2025 Uigenius. All rights reserved.</p>
                <div class="footer-legal-links">
                    <a @click.prevent="goToTerms">Terms of Service</a>
                    <span class="separator">|</span>
                    <a @click.prevent="goToPrivacy">Privacy Policy</a>
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
      submitting: false
    }
  },

  onShow() {
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

  methods: {
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
          title: 'Checking membership...'
        });

        // Get user ID from storage
        const uid = uni.getStorageSync('uid');
        
        if (!uid) {
          uni.hideLoading();
          uni.showToast({
            title: 'User ID not found',
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
              title: 'You already have an active membership',
              icon: 'none',
              duration: 2000
            });
            return;
          }

          // User doesn't have membership, proceed to payment
          this.redirectToPayment(productId);
        } else {
          uni.showToast({
            title: result.result?.message || 'Failed to check membership',
            icon: 'none',
            duration: 2000
          });
        }
      } catch (error) {
        uni.hideLoading();
        uni.showToast({
          title: 'Error checking membership',
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
        uni.showToast({ title: 'Please fill all fields', icon: 'none' });
        return;
      }
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email);
      if (!emailValid) {
        uni.showToast({ title: 'Invalid email', icon: 'none' });
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
          uni.showToast({ title: 'Message received. Thank you!', icon: 'success' });
          this.form = { name: '', email: '', subject: '', message: '' };
        } else {
          const msg = (res && res.result && res.result.msg) || 'Send failed';
          uni.showToast({ title: msg, icon: 'none' });
        }
      } catch (error) {
        console.error(error);
        uni.showToast({ title: 'Send failed', icon: 'none' });
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
    gap: 20px; /* Space between nav items */
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