<template>
  <div class="login-bg">
    <div class="login-card">
      <h2 class="login-title">Login to UiGenius</h2>
      <input type="text" class="login-input" placeholder="Email" />
      <input type="password" class="login-input" placeholder="Password" />
      <button class="main-btn">Login</button>
      <button class="secondary-btn">Sign Up</button>
      <div class="google-login" @click="auth">
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" class="google-icon" />
        <span>Continue with Google</span>
      </div>
      <div class="forgot-link">Forgot your password?</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      title: '',
      pic: '',
      email: ''
    }
  },
  // mounted() {
  //   this.getUserInfo()
  // },
  onLoad() {
    this.getUserInfo()
  },
  methods: {
    auth() {
      // Google OAuth client ID
      window.clientId = '137524279748-rg43jumis252rh8odausn13glj64nmit.apps.googleusercontent.com'
      // Redirect URI
      window.redirectUri = 'http://localhost:5173'
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
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get('code')
      if (!code) {
        return
      }

      const tokenEndpoint = 'https://oauth2.googleapis.com/token'
      const requestBody = new URLSearchParams()
      requestBody.append('code', code)
      requestBody.append('client_id', '137524279748-rg43jumis252rh8odausn13glj64nmit.apps.googleusercontent.com')
      requestBody.append('client_secret', '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')
      requestBody.append('redirect_uri', 'http://localhost:5173')
      requestBody.append('grant_type', 'authorization_code')

      fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: requestBody
      })
        .then(response => response.json())
        .then(data => {
          const accessToken = data.access_token
          return fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
        })
        .then(response => response.json())
        .then(userInfo => {
          this.title = userInfo.name
          this.pic = userInfo.picture
          this.email = userInfo.email
          console.log('User Info:', userInfo)
        })
        .catch(error => {
          console.error('Error during authentication:', error)
        })
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
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
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
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  transition: box-shadow 0.2s;
}
.login-input:focus {
  box-shadow: 0 2px 8px rgba(229,57,53,0.10);
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
.forgot-link {
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
</style>
