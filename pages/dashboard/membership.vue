<template>
    <div class="container">
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Invite &amp; Earn - Get Free Membership!</title>
  
      <main>
          <!-- Hero Section -->
          <section class="hero-section">
              <h1>Unlock Exclusive Rewards: Invite Friends, Get Free Membership!</h1>
              <p>Share the benefits of our platform with your network and earn free monthly or even lifetime access.</p>
  
              <div class="offer-cards-container">
                  <div class="offer-card">
                      <h3>Invite 1 Friend</h3>
                      <p>Get 1 Month FREE PRO Membership</p>
                  </div>
                  <div class="offer-card">
                      <h3>Invite 4 Friends</h3>
                      <p>Get Lifetime Membership Access</p>
                  </div>
              </div>
  
              <button type="button" class="btn btn-primary hero-cta" @click="startInviting">Start Inviting Now</button>
          </section>
          
          <!-- Received an Invitation? Section -->
          <section class="received-invite-section">
              <h2>Got an Invite Code?</h2>
              <p>Enter the special code you received from a friend to claim your exclusive joining offer.</p>
  
              <div class="invite-code-form">
                  <div class="input-group">
                      <input type="text" id="invitationCode" class="input-field" placeholder="e.g., jbi8lT7cdFgIklEP" aria-label="Invitation Code"
                             v-model="invitationCode" :class="{ error: isCodeValid === false, success: isCodeValid === true }">
                      <button type="button" class="btn btn-secondary" id="applyCodeBtn" @click="applyInvitationCode">Apply Code</button>
                  </div>
                  <div id="validationMessage" class="form-message" :class="{ show: showValidationMessage, success: isCodeValid === true, error: isCodeValid === false }" role="alert" aria-live="assertive">{{ validationMessage }}</div>
              </div>
          </section>
      </main>
    </div>
</template>
  
<script>
export default {
  name: 'InviteAndEarn',
  data() {
    return {
      invitationCode: '',
      validationMessage: '',
      showValidationMessage: false,
      isCodeValid: null, // null: initial, true: success, false: error
      userInviteCode: '', // User generated invite code
      showInviteCode: false, // Whether to show invite code
      copySuccessMessage: '', // Copy success message
    };
  },
  methods: {
    // Main method for generating invite code
    startInviting() {
      try {
        // Get user ID from local storage
        const userData = uni.getStorageSync('uid');
        console.log('userData', userData);
        
        if (!userData) {
          this.showErrorMessage('User information not found, please login first');
          return;
        }

        // Convert user ID to base62 invite code
        const inviteCode = this.convertToBase62(userData);
        this.userInviteCode = inviteCode;
        this.showInviteCode = true;

        // Auto copy to clipboard
        this.copyToClipboard(inviteCode);
        // show success message
        this.showCopySuccess();
        
      } catch (error) {
        console.error('Failed to generate invite code:', error);
        this.showErrorMessage('Failed to generate invite code, please try again');
      }
    },

    // Convert hex string to base62 (0-9, a-z, A-Z)
    convertToBase62(hexString) {
      const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let result = '';
      
      // Convert hex string to BigInt to handle large numbers
      let number = BigInt('0x' + hexString);
      
      if (number === 0n) {
        return '000000';
      }
      
      while (number > 0n) {
        result = chars[Number(number % 62n)] + result;
        number = number / 62n;
      }
      
      // Ensure invite code has minimum length (at least 6 digits)
      while (result.length < 6) {
        result = '0' + result;
      }
      
      return result;
    },

    // Convert base62 invite code back to original hex string
    convertFromBase62(code) {
      const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let result = 0n;
      
      // Remove leading zeros and validate format
      const cleanCode = code.replace(/^0+/, '') || '0';
      
      // Validate that all characters are valid base62 characters
      if (!/^[0-9a-zA-Z]+$/.test(cleanCode)) {
        throw new Error('Invalid base62 format');
      }
      
      // Convert from base62 to BigInt
      for (let i = 0; i < cleanCode.length; i++) {
        const char = cleanCode[i];
        const charIndex = chars.indexOf(char);
        
        if (charIndex === -1) {
          throw new Error('Invalid character in invite code');
        }
        
        result = result * 62n + BigInt(charIndex);
      }
      
      // Convert BigInt back to hex string
      return result.toString(16);
    },

    // Copy to clipboard
    copyToClipboard(text) {
      // #ifdef H5
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
          this.showCopySuccess();
        }).catch(() => {
          this.fallbackCopyToClipboard(text);
        });
      } else {
        this.fallbackCopyToClipboard(text);
      }
      // #endif
      
      // #ifdef APP-PLUS
      uni.setClipboardData({
        data: text,
        success: () => {
          this.showCopySuccess();
        },
        fail: () => {
          this.showErrorMessage('Copy failed, please copy manually');
        }
      });
      // #endif
      
      // #ifdef MP
      uni.setClipboardData({
        data: text,
        success: () => {
          this.showCopySuccess();
        },
        fail: () => {
          this.showErrorMessage('Copy failed, please copy manually');
        }
      });
      // #endif
    },

    // Fallback copy method (for browsers that don't support modern clipboard API)
    fallbackCopyToClipboard(text) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        this.showCopySuccess();
      } catch (err) {
        this.showErrorMessage('Copy failed, please copy manually');
      }
      
      document.body.removeChild(textArea);
    },

    // Show copy success message
    showCopySuccess() {
      this.copySuccessMessage = 'Invite code has been copied to clipboard!';
      uni.showToast({
        title: this.copySuccessMessage,
        icon: 'success',
        duration: 3000
      });
      setTimeout(() => {
        this.copySuccessMessage = '';
      }, 3000);
    },

    // Show error message
    showErrorMessage(message) {
      this.validationMessage = message;
      this.isCodeValid = false;
      this.showValidationMessage = true;
      setTimeout(() => {
        this.showValidationMessage = false;
        this.isCodeValid = null;
        this.validationMessage = '';
      }, 3000);
    },

    // Manually copy invite code
    copyInviteCode() {
      this.copyToClipboard(this.userInviteCode);
    },

    applyInvitationCode() {
      // Simulate real invite code validation logic
      if (!this.invitationCode || this.invitationCode.trim() === '') {
        this.isCodeValid = false;
        this.validationMessage = 'Please enter an invitation code.';
        this.showValidationMessage = true;
        setTimeout(() => {
          this.showValidationMessage = false;
          this.isCodeValid = null;
          this.validationMessage = '';
        }, 3000);
        return;
      }

      try {
        // Convert invite code back to original user ID
        const originalInviterUserId = this.convertFromBase62(this.invitationCode.trim());
        console.log('Converted invite code to user ID:', originalInviterUserId);
        
        // Get current user ID
        const currentUserId = uni.getStorageSync('uid');
        if (!currentUserId) {
          this.showErrorMessage('User information not found, please login first');
          return;
        }

        // Call cloud function to validate invitation code
        this.validateInvitationCodeWithCloud(originalInviterUserId, currentUserId);
        
      } catch (error) {
        console.error('Failed to convert invite code:', error);
        this.isCodeValid = false;
        this.validationMessage = 'Invalid invitation code format. Please check and try again.';
        this.showValidationMessage = true;
        setTimeout(() => {
          this.showValidationMessage = false;
          this.isCodeValid = null;
          this.validationMessage = '';
        }, 3000);
      }
    },

    // New method to call cloud function
    async validateInvitationCodeWithCloud(originalInviterUserId, currentUserId) {
      try {
        const result = await uniCloud.callFunction({
          name: 'checkMembership',
          data: {
            action: 'validateInvitationCode',
            uid: currentUserId,
            originalInviterUserId: originalInviterUserId
          }
        });

        console.log('Cloud function result:', result);

        if (result.result.success) {
          this.isCodeValid = true;
          const data = result.result.data;
          
          let successMessage = 'Invitation code applied successfully! You have received 1 month of free Pro membership!';
          if (data.membershipBenefit === '1_month_pro') {
            successMessage += ' The inviter has also received 1 month of free Pro membership!';
          } else if (data.membershipBenefit === 'lifetime') {
            successMessage += ' The inviter has received lifetime membership!';
          }
          
          this.validationMessage = successMessage;
          this.showValidationMessage = true;
          
          // Show success toast
          uni.showToast({
            title: 'Invitation code applied successfully! You got 1 month Pro membership!',
            icon: 'success',
            duration: 4000
          });
          
          setTimeout(() => {
            this.showValidationMessage = false;
            this.isCodeValid = null;
            this.validationMessage = '';
          }, 5000);
        } else {
          this.isCodeValid = false;
          this.validationMessage = result.result.message || 'Invalid invitation code.';
          this.showValidationMessage = true;
          
          // Show error toast
          uni.showToast({
            title: result.result.message || 'Invalid invitation code',
            icon: 'error',
            duration: 3000
          });
          
          setTimeout(() => {
            this.showValidationMessage = false;
            this.isCodeValid = null;
            this.validationMessage = '';
          }, 3000);
        }
      } catch (error) {
        console.error('Failed to validate invitation code:', error);
        this.isCodeValid = false;
        this.validationMessage = 'Unable to verify invitation code. Please try again later.';
        this.showValidationMessage = true;
        
        // Show error toast
        uni.showToast({
          title: 'Network error, please try again',
          icon: 'error',
          duration: 3000
        });
        
        setTimeout(() => {
          this.showValidationMessage = false;
          this.isCodeValid = null;
          this.validationMessage = '';
        }, 3000);
      }
    },
    
    // async simulateApiCall(code) {
    //   // Simulate network delay
    //   await new Promise(resolve => setTimeout(resolve, 1000));
      
    //   // Simulate some real validation logic
    //   // 1. Check invite code format
    //   if (!/^[A-Z0-9]{8,20}$/i.test(code)) {
    //     return false;
    //   }
      
    //   // 2. Simulate checking if invite code has been used
    //   const usedCodes = ['USED123456', 'EXPIRED789'];
    //   if (usedCodes.includes(code.toUpperCase())) {
    //     return false;
    //   }
      
    //   // 3. Simulate checking if invite code is expired
    //   // Can add timestamp checking logic here
      
    //   // 4. Simulate valid invite codes
    //   const validCodes = ['FRIEND2024', 'WELCOME123', 'INVITE456'];
    //   return validCodes.includes(code.toUpperCase());
    // },
    
    // onInvitationCodeSuccess(code) {
    //   // Processing logic after successful invite code validation
    //   console.log(`Invitation code ${code} applied successfully`);
      
    //   // Can do here:
    //   // 1. Update user status
    //   // 2. Show special offers
    //   // 3. Record invitation relationship
    //   // 4. Send welcome email, etc.
      
    //   // For example: show special offer popup
    //   // this.showSpecialOffer = true;
      
    //   // Or: update user membership status
    //   // this.userMembershipStatus = 'premium';
    // }
  }
};
</script>
  
<style scoped>
@import 'https://uigenius.top/static/editor/libs/builder/../../css/uigenius-page.css';

/* CRITICAL: Styles for :root and body applied to the component's outermost wrapper (.container) */
.container {
    /* CSS Variables from :root */
    --primary-accent: #e53935; /* Strong Red */
    --primary-accent-light: #f44336; /* Lighter Red for hover */
    --text-heading: #1A202C; /* Dark Charcoal */
    --text-body: #4A5568; /* Medium Gray */
    --background: #FDFDFD; /* Soft Off-White */
    --secondary-background: #FFFFFF; /* Pure White for cards/content */
    --border-color: #E0E0E0; /* Light Gray for subtle borders */
    --secondary-accent-light: #F7F8FC; /* Very light blue-gray for subtle contrast/hover */

    --success-color: #4CAF50; /* Vibrant Green */
    --error-color: #F44336; /* Bright Red */

    --shadow-light: rgba(0, 0, 0, 0.05);
    --shadow-medium: rgba(0, 0, 0, 0.12);
    --focus-outline: #8d1c1a; /* Darker red for focus state outline */

    /* Typography */
    --font-heading: 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
    --font-body: 'Roboto', 'Open Sans', 'Lato', 'Segoe UI', Arial, sans-serif;

    /* Spacing */
    --spacing-xs: 0.5rem; /* 8px */
    --spacing-sm: 1rem;   /* 16px */
    --spacing-md: 1.5rem; /* 24px */
    --spacing-lg: 2rem;   /* 32px */
    --spacing-xl: 3rem;   /* 48px */
    --spacing-xxl: 4rem;  /* 64px */

    /* Base Styles from body */
    font-family: var(--font-body);
    color: var(--text-body);
    background-color: var(--background);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: var(--spacing-md);
}

/* Original CSS from the <style> tag */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

main {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    background-color: var(--secondary-background);
    box-shadow: 0 8px 30px var(--shadow-light);
    border-radius: 12px;
    overflow: hidden;
}

section {
    padding: var(--spacing-xl) var(--spacing-md);
    text-align: center;
}

h1, h2, h3 {
    font-family: var(--font-heading);
    color: var(--text-heading);
    margin-bottom: var(--spacing-md);
    line-height: 1.2;
    font-weight: 700;
}

h1 {
    font-size: 2.2rem;
    margin-bottom: var(--spacing-sm);
    color: var(--primary-accent);
}

h2 {
    font-size: 1.8rem;
    margin-bottom: var(--spacing-lg);
    display: inline-block;
    padding-bottom: var(--spacing-xs);
    border-bottom: 2px solid var(--border-color);
}

h3 {
    font-size: 1.4rem;
}

p {
    margin-bottom: var(--spacing-md);
}

/* Accessibility: Screen Reader Only */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
}

/* Buttons */
.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-sm) var(--spacing-lg);
    border: none;
    border-radius: 8px;
    font-family: var(--font-heading);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    text-align: center;
    outline: none;
    user-select: none;
}

.btn-primary {
    background-color: var(--primary-accent);
    color: var(--secondary-background);
    box-shadow: 0 4px 15px rgba(229, 57, 53, 0.4);
}

.btn-primary:hover {
    background-color: var(--primary-accent-light);
    box-shadow: 0 6px 20px rgba(229, 57, 53, 0.5);
    transform: translateY(-2px);
}

.btn-primary:active {
    transform: translateY(0);
    box-shadow: 0 2px 10px rgba(229, 57, 53, 0.3);
}

.btn-primary:focus-visible {
    box-shadow: 0 0 0 4px var(--focus-outline), 0 4px 15px rgba(229, 57, 53, 0.4);
}

.btn-secondary {
    background-color: transparent;
    color: var(--primary-accent);
    border: 2px solid var(--primary-accent);
}

.btn-secondary:hover {
    background-color: var(--primary-accent);
    color: var(--secondary-background);
    box-shadow: 0 2px 10px rgba(229, 57, 53, 0.2);
}

.btn-secondary:active {
    transform: translateY(1px);
}

.btn-secondary:focus-visible {
    box-shadow: 0 0 0 4px var(--focus-outline);
}

/* Hero Section */
.hero-section {
    background: linear-gradient(135deg, var(--background) 0%, var(--secondary-accent-light) 100%);
    padding-top: var(--spacing-xxl);
    padding-bottom: var(--spacing-xxl);
}

.hero-section p {
    font-size: 1.1rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.offer-cards-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
    margin: var(--spacing-xl) auto;
    max-width: 700px;
}

.offer-card {
    background-color: var(--secondary-background);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: var(--spacing-lg);
    box-shadow: 0 8px 25px var(--shadow-light);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
    overflow: hidden;
}

.offer-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background-color: var(--primary-accent);
}

.offer-card h3 {
    color: var(--primary-accent);
    font-size: 1.5rem;
    margin-bottom: var(--spacing-xs);
}

.offer-card p {
    font-weight: 600;
    font-size: 1.2rem;
    color: var(--text-heading);
    margin-bottom: 0;
}

.hero-cta {
    width: 100%;
    max-width: 300px;
    margin: var(--spacing-lg) auto 0 auto;
}

/* Received an Invitation? Section */
.received-invite-section {
    background-color: var(--secondary-accent-light);
    padding-bottom: var(--spacing-xxl);
}

.invite-code-form {
    max-width: 500px;
    margin: var(--spacing-xl) auto 0 auto;
    text-align: center;
}

.invite-code-form p {
    font-size: 1.05rem;
    margin-bottom: var(--spacing-lg);
}

.input-group {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
    align-items: center;
    margin-bottom: var(--spacing-md);
}

.input-field {
    padding: var(--spacing-sm) var(--spacing-md);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    font-size: 1rem;
    font-family: var(--font-body);
    color: var(--text-heading);
    background-color: var(--secondary-background);
    outline: none;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    width: 100%;
    max-width: 400px;
    height: 50px;
}

.input-field::placeholder {
    color: var(--text-body);
    opacity: 0.7;
}

.input-field:focus {
    border-color: var(--primary-accent);
    box-shadow: 0 0 0 3px rgba(229, 57, 53, 0.2);
}

/* Validation states */
.input-field.error {
    border-color: var(--error-color);
    box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.2);
}

.input-field.success {
    border-color: var(--success-color);
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
}

.form-message {
    margin-top: var(--spacing-sm);
    font-size: 0.95rem;
    font-weight: 600;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease, height 0.3s ease, margin-top 0.3s ease;
    height: 0;
    overflow: hidden;
    text-align: left;
    padding-left: var(--spacing-xs);
}

.form-message.show {
    opacity: 1;
    visibility: visible;
    height: auto;
    margin-top: var(--spacing-sm);
}

.form-message.success {
    color: var(--success-color);
}

.form-message.error {
    color: var(--error-color);
}

/* Responsive Design - Tablet and Desktop */
@media (min-width: 768px) {
    .container {
        padding: var(--spacing-xl);
        align-items: center;
    }

    section {
        padding: var(--spacing-xxl) var(--spacing-lg);
    }

    h1 {
        font-size: 3.5rem;
    }

    h2 {
        font-size: 2.5rem;
    }

    .hero-section p {
        font-size: 1.25rem;
    }

    .offer-cards-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: var(--spacing-lg);
    }

    .offer-card {
        max-width: none;
        padding: var(--spacing-xl);
    }

    .hero-cta {
        width: auto;
        min-width: 250px;
    }

    .input-group {
        flex-direction: row;
        gap: var(--spacing-md);
        justify-content: center;
        align-items: center;
        max-width: 600px;
        margin: 0 auto var(--spacing-md) auto;
    }

    .input-field {
        flex: 1;
        max-width: 350px;
        height: 50px;
    }

    .received-invite-section .btn {
        flex-shrink: 0;
        width: auto;
        min-width: 140px;
        height: 50px;
    }

    .form-message {
        text-align: center;
    }
}

/* Responsive Design - Larger Desktops */
@media (min-width: 1024px) {
    h1 {
        font-size: 4rem;
    }
    h2 {
        font-size: 3rem;
    }
    section {
        padding: var(--spacing-xxl) var(--spacing-xl);
    }
}
</style>