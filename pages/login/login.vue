<template>
  <div class="login-container">
    <div class="logo-title">
      <span class="chip-icon">🔴</span>
      <span class="title">GPU Virtual Rental</span>
    </div>
    <div class="login-form">
      <h2>Welcome Back</h2>
      <label class="input-label">Username</label>
      <input type="text" class="input-field" placeholder="" />
      <label class="input-label">Password</label>
      <input type="password" class="input-field" placeholder="" />
      <div class="button-row">
        <button class="login-btn">Login</button>
        <button class="signup-btn">Sign Up</button>
      </div>
      <div class="google-login">
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" class="google-icon" />
        <span>Continue with Google</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: #fff;
  border-radius: 32px;
  padding: 32px 0 0 0;
}
.logo-title {
  display: flex;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 80px;
}
.chip-icon {
  font-size: 2.2rem;
  color: #e53935;
  margin-right: 10px;
}
.title {
  font-size: 2rem;
  font-weight: 500;
}
.login-form {
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: none;
}
.login-form h2 {
  text-align: center;
  margin-bottom: 32px;
  font-size: 2.2rem;
  font-weight: 400;
}
.input-label {
  margin-bottom: 6px;
  margin-top: 12px;
  font-size: 1.1rem;
}
.input-field {
  border: none;
  outline: none;
  border-radius: 32px;
  padding: 16px 24px;
  margin-bottom: 8px;
  background: #fafafa;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  font-size: 1.1rem;
  transition: box-shadow 0.2s;
}
.input-field:focus {
  box-shadow: 0 4px 16px rgba(229,57,53,0.12);
}
.button-row {
  display: flex;
  justify-content: space-between;
  margin: 24px 0 32px 0;
}
.login-btn {
  flex: 1;
  background: #e53935;
  color: #fff;
  border: none;
  border-radius: 32px;
  padding: 16px 0;
  font-size: 1.2rem;
  font-weight: 500;
  margin-right: 12px;
  cursor: pointer;
  transition: background 0.2s;
}
.login-btn:hover {
  background: #b71c1c;
}
.signup-btn {
  flex: 1;
  background: #fff;
  color: #757575;
  border: none;
  border-radius: 32px;
  padding: 16px 0;
  font-size: 1.2rem;
  font-weight: 500;
  margin-left: 12px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  transition: background 0.2s, color 0.2s;
}
.signup-btn:hover {
  background: #f5f5f5;
  color: #e53935;
}
.google-login {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: white;
  padding: 12px 24px;
  border-radius: 8px;
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
