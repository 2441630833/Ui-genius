<template>
  <div class="login-bg">
    <div class="login-card">
      <h2 class="login-title">Login to UiGenius</h2>
      <input type="text" class="login-input" placeholder="Email" v-model="user.email" />
      <input type="password" class="login-input" placeholder="Password" v-model="user.password" />
      <button class="main-btn" @click="login">Login</button>
      <button class="secondary-btn" @click="signup">Sign Up</button>
      <div class="google-login" @click="auth">
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" class="google-icon" />
        <span>Continue with Google</span>
      </div>
      <!-- skip login -->
      <div class="skip-login" @click="skipLogin">Skip Login</div>
      <div class="remember-link">
        <checkbox-group>
          <label>
            <checkbox value="psw" :checked='rememberPsw' @tap="rememberPsw = !rememberPsw" color="#e53935" />Remember
            email and password
          </label>
        </checkbox-group>
      </div>
      <!-- <div class="forgot-link">Forgot your password?</div> -->
    </div>
  </div>
</template>

<script>
const uniIdCo = uniCloud.importObject("uni-id-co", {
  loadingOptions: { // loading 
    title: 'logging in...',
    mask: true // 
  },
  errorOptions: {
    type: 'toast'
  }
})
// Import token management functions
import { setTokenWithExpiration, setGoogleTokenWithExpiration, isTokenExpired, isGoogleTokenExpired } from '@/common/permission.js'
// 添加一个简单的 URLSearchParams polyfill
// #ifndef H5
class URLSearchParamsPolyfill {
  constructor(searchString) {
    this.params = new Map();

    if (!searchString || typeof searchString !== 'string') {
      return;
    }

    // 移除开头的 '?' 符号
    const search = searchString.startsWith('?') ? searchString.substring(1) : searchString;

    // 解析参数
    const pairs = search.split('&');
    for (const pair of pairs) {
      if (!pair) continue;
      const parts = pair.split('=');
      const key = decodeURIComponent(parts[0]);
      const value = parts.length > 1 ? decodeURIComponent(parts[1]) : '';
      this.params.set(key, value);
    }
  }

  get(key) {
    return this.params.get(key) || null;
  }

  getAll(key) {
    return this.params.get(key) ? [this.params.get(key)] : [];
  }

  has(key) {
    return this.params.has(key);
  }
}

// 如果平台不支持 URLSearchParams，则使用 polyfill
if (typeof URLSearchParams === 'undefined') {
  globalThis.URLSearchParams = URLSearchParamsPolyfill;
}
// #endif

export default {
  name: 'LoginPage',
  data() {
    return {
      googleName: '',
      googlePic: '',
      googleEmail: '',
      user: {
        email: '',
        password: ''
      },
      needCaptcha: false,
      rememberPsw: true,
      fakeToken: {
        newToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9M',
        uid: '123bcbfeqqaeabfaf5a'
      }
    }
  },
  mounted() {
    this.getUserInfo()
    // Retrieve stored email and password
    const userEmail = uni.getStorageSync('userEmail')
    const userPsw = uni.getStorageSync('userPsw')
    if (userEmail && userPsw) {
      this.user.email = userEmail
      this.user.password = userPsw
    } else {
      this.user.email = ''
      this.user.password = ''
    }
  },
  methods: {
    skipLogin() {
      const token = uni.getStorageSync('token');
      const hasValidToken = token && !isTokenExpired();
      if (hasValidToken) {
        uni.switchTab({
          url: '/pages/dashboard/dashboard'
        })
        return
      }
      else {
        uni.setStorageSync('isSkipLogin', true)
        setTokenWithExpiration(this.fakeToken)
        
        // Show success toast first
        uni.showToast({
          title: 'Login successful',
          icon: 'success'
        })
        
        // Navigate to dashboard after successful login with a timeout
        setTimeout(() => {
          uni.switchTab({
            url: '/pages/dashboard/dashboard'
          })
        }, 1000) // 1.5 second delay
      }

    },
    login() {
      if (uni.getStorageSync('isSkipLogin')) {
        uni.removeStorageSync('isSkipLogin')
        uni.removeStorageSync('token')
        uni.removeStorageSync('tokenExpiration')
        return
      }
      // Check if user already has a valid token
      const token = uni.getStorageSync('token');
      const hasValidToken = token && !isTokenExpired();

      if (hasValidToken) {
        // uni.showToast({
        //   title: 'You are already logged in',
        //   icon: 'none',
        //   duration: 3000
        // });

        // Navigate to dashboard if already logged in
        uni.switchTab({
          url: '/pages/dashboard/dashboard'
        });
        return;
      }

      // Save email and password to local storage if rememberPsw is checked
      if (this.rememberPsw) {
        uni.setStorageSync('userEmail', this.user.email)
        uni.setStorageSync('userPsw', this.user.password)
      } else {
        uni.removeStorageSync('userEmail')
        uni.removeStorageSync('userPsw')
      }

      // Call the pwdLogin method
      this.pwdLogin()
    },
    loginSuccess(e) {
      console.log('Login successful', e)

      // Store token with expiration
      setTokenWithExpiration(e)

      // Show success toast first
      uni.showToast({
        title: 'Login successful',
        icon: 'success'
      })

      // Navigate to dashboard after successful login with a timeout
      setTimeout(() => {
        uni.switchTab({
          url: '/pages/dashboard/dashboard'
        })
      }, 1500) // 1.5 second delay

    },
    googleLoginSuccess(e) {
      // console.log('Google login successful', e)
      uni.setStorageSync('uid', e.uid)
      // Store Google token with expiration
      setGoogleTokenWithExpiration(e)

      // Show success toast first
      uni.showToast({
        title: 'Google login successful',
        icon: 'success'
      })

      // Navigate to dashboard after successful login with a timeout
      setTimeout(() => {
        uni.switchTab({
          url: '/pages/dashboard/dashboard'
        })
      }, 1500) // 1.5 second delay
    },
    pwdLogin() {
      if (!this.user.password.length) {
        this.focusPassword = true
        return uni.showToast({
          title: 'password is required',
          icon: 'none',
          duration: 3000
        });
      }
      if (!this.user.email.length) {
        this.focusUsername = true
        return uni.showToast({
          title: 'email is required',
          icon: 'none',
          duration: 3000
        });
      }

      let data = {
        "password": this.user.password,
      }

      if (/^1\d{10}$/.test(this.user.email)) {
        data.mobile = this.user.email
      } else if (/@/.test(this.user.email)) {
        data.email = this.user.email
      } else {
        data.username = this.user.email
      }

      uniIdCo.login(data).then(e => {
        this.loginSuccess(e)
        uni.setStorageSync('email', this.user.email)
      }).catch(e => {
        console.log(e)
        // if (e.errCode == 'uni-id-captcha-required') {
        //   // this.needCaptcha = true
        //   console.log('captcha required')

        // } else if (this.needCaptcha) {
        //   //登录失败，自动重新获取验证码
        //   this.$refs.captcha.getImageCaptcha()
        // }
      })
    },
    signup() {
      uni.navigateTo({
        url: '/pages/signup/signup'
      })
    },
    auth() {
      // Check if user already has a valid Google token
      const googleToken = uni.getStorageSync('googleToken');
      const hasValidGoogleToken = googleToken && !isGoogleTokenExpired();

      if (hasValidGoogleToken) {
        uni.showToast({
          title: 'You are already logged in with Google',
          icon: 'none',
          duration: 3000
        });

        // Navigate to dashboard if already logged in
        uni.switchTab({
          url: '/pages/dashboard/dashboard'
        });
        return;
      }

      // Show loading toast
      uni.showLoading({
        title: 'Logging in...',
        mask: true
      })

      // Google OAuth client ID
      window.clientId = '137524279748-rg43jumis252rh8odausn13glj64nmit.apps.googleusercontent.com'
      // Redirect URI
      window.redirectUri = 'https://uigenius.top'
      // Requested scopes
      window.scope = 'email profile'
      // CSRF protection state
      window.state = ''
      // Response type
      window.responseType = 'code'
      // Google OAuth client secret
      window.clientSecret = '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'
      window.grantType = 'authorization_code'

      window.authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${window.clientId}&redirect_uri=${window.redirectUri}&scope=${window.scope}&state=${window.state}&response_type=${window.responseType}`

      // Redirect to Google auth page
      window.location.href = window.authUrl
    },

    getUserInfo() {
      let code = null;

      // #ifdef H5
      // H5 环境下从 URL 获取 code 参数
      const urlParams = new URLSearchParams(window.location.search);
      code = urlParams.get('code');
      // #endif

      // #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ || MP-KUAISHOU
      // 小程序环境从页面参数获取 code
      if (this.$mp && this.$mp.query && this.$mp.query.code) {
        code = this.$mp.query.code;
      }
      // #endif

      // #ifdef APP-PLUS
      // App 环境从页面参数获取 code
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      if (currentPage && currentPage.options && currentPage.options.code) {
        code = currentPage.options.code;
      }
      // #endif

      if (!code) {
        // Hide any loading indicators
        uni.hideLoading();
        return;
      }
      // 获取 access_token
      uni.request({
        url: 'https://oauth2.googleapis.com/token',
        method: 'POST',
        data: {
          code: code,
          client_id: '137524279748-rg43jumis252rh8odausn13glj64nmit.apps.googleusercontent.com',
          client_secret: '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',
          redirect_uri: 'https://uigenius.top',
          grant_type: 'authorization_code'
        },
        success: (tokenRes) => {
          if (tokenRes.statusCode === 200 && tokenRes.data.access_token) {
            const googleToken = tokenRes.data.access_token;

            // 获取用户信息
            uni.request({
              url: 'https://www.googleapis.com/oauth2/v2/userinfo',
              method: 'GET',
              header: {
                'Authorization': `Bearer ${googleToken}`
              },
              success: (userRes) => {
                if (userRes.statusCode === 200) {
                  this.googleName = userRes.data.name;
                  this.googlePic = userRes.data.picture;
                  this.googleEmail = userRes.data.email;
                  uni.setStorageSync('email', userRes.data.email)
                  console.log('User Info:', userRes.data);

                  // Debug log to check exactly what's in userRes.data
                  // console.log('User ID:', userRes.data.id)
                  // console.log('User Email:', userRes.data.email)
                  // console.log('User Name:', userRes.data.name)
                  // console.log('User Picture:', userRes.data.picture)
                  // console.log('User Given Name:', userRes.data.given_name)
                  // console.log('User Family Name:', userRes.data.family_name)
                  // console.log('User Email Verified:', userRes.data.verified_email)

                  // Create Google info object
                  const googleInfo = {
                    id: userRes.data.id,
                    name: userRes.data.name,
                    email: userRes.data.email,
                    picture: userRes.data.picture,
                    given_name: userRes.data.given_name,
                    family_name: userRes.data.family_name,
                    verified_email: userRes.data.verified_email
                  }

                  // console.log('Google Info Object:', googleInfo)

                  // Store Google user info to uni-id-co
                  // console.log('About to call loginByGoogle with direct params')
                  uniIdCo.loginByGoogle(googleInfo).then(result => {
                    console.log('Google login success:', result)
                    // Login success, store token
                    this.googleLoginSuccess(result)
                  }).catch(err => {
                    console.error('Error storing Google user info:', err)
                    console.error('Error details:', err.message || err)

                    // If direct params failed, try with nested params
                    console.log('Retrying with nested params')
                    uniIdCo.loginByGoogle({ googleInfo }).then(result => {
                      console.log('Google login success with nested params:', result)
                      this.googleLoginSuccess(result)
                    }).catch(nestedErr => {
                      console.error('Error with nested params too:', nestedErr)
                      uni.showToast({
                        title: 'Failed to login with Google',
                        icon: 'none',
                        duration: 3000
                      })
                      uni.hideLoading()
                    })
                  })
                } else {
                  uni.showToast({
                    title: 'Failed to get user info: ' + userRes.statusCode,
                    icon: 'none',
                    duration: 3000
                  });
                  uni.hideLoading();
                }
              },
              fail: (error) => {
                console.error('Error getting user info:', error);
                uni.showToast({
                  title: 'Failed to get user info',
                  icon: 'none',
                  duration: 3000
                });
                uni.hideLoading();
              }
            });
          } else {
            uni.showToast({
              title: 'Failed to get access token: ' + (tokenRes.statusCode || 'unknown error'),
              icon: 'none',
              duration: 3000
            });
            uni.hideLoading();
          }
        },
        fail: (error) => {
          console.error('Error during authentication:', error);
          uni.showToast({
            title: 'Authentication failed',
            icon: 'none',
            duration: 3000
          });
          uni.hideLoading();
        }
      });

    }
  },
  // 添加 onLoad 生命周期钩子，确保在小程序环境下也能正确获取参数
  onLoad(options) {
    if (options && options.code) {
      this.getUserInfo();
    }
  }
};
</script>

<style scoped>
.login-bg {
  min-height: 100vh;
  background: #fcfbfb;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-card {
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
  padding: 48px 36px 36px 36px;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.login-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 32px;
  color: #222;
}

.login-input {
  border: none;
  outline: none;
  border-radius: 18px;
  padding: 14px 20px;
  margin-bottom: 18px;
  background: #f5f5f5;
  font-size: 1.1rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  transition: box-shadow 0.2s;
}

.login-input:focus {
  box-shadow: 0 2px 8px rgba(229, 57, 53, 0.10);
  outline: none;
}

.main-btn {
  cursor: pointer;
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 52px;
  padding: 0px 8px;
  border: 0;
  box-sizing: border-box;
  border-radius: 22px;
  background-color: #dd161c;
  color: #ffffff;
  font-size: 14px;
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 600;
  line-height: 20px;
  outline: none;
  margin-bottom: 12px;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.main-btn:hover {
  background: #b71c1c;
}

.secondary-btn {
  cursor: pointer;
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 52px;
  padding: 0px 8px;
  box-sizing: border-box;
  border-radius: 22px;
  background: #fff;
  color: #e53935;
  border: 1px solid #e53935;
  font-size: 14px;
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 600;
  line-height: 20px;
  outline: none;
  margin-bottom: 18px;
  transition: background 0.2s, color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.secondary-btn:hover {
  background: #fbe9e7;
}

.skip-login {
  text-align: center;
  margin-top: 18px;
  color: #888;
  font-size: 0.98rem;
  cursor: pointer;
}

.google-login {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: white;
  padding: 12px 24px;
  border-radius: 18px;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;
}

.google-login:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-1px);
}

.google-icon {
  width: 24px;
  height: 24px;
}

.google-login span {
  color: #333;
  font-size: 16px;
  font-weight: 500;
}

.remember-link {
  text-align: center;
  margin-top: 18px;
  color: #888;
  font-size: 0.98rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remember-link label {
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>
