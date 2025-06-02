export default {
  // Debug mode
  debug: false,
  /*
		Login types not listed or not supported by the operating environment will be automatically hidden.
		If you need different configurations on different platforms, use conditional compilation
	*/
  isAdmin: false, // Distinguish between admin and user side
  loginTypes: [
    // "qq",
    // "xiaomi",
    // "sinaweibo",
    // "taobao",
    // "facebook",
    // "google",
    // "alipay",
    // "douyin",

    // #ifdef APP
    'univerify',
    // #endif
    // #ifndef MP-HARMONY
    'weixin',
    // #endif
    'username',
    // #ifdef APP
    'apple',
    // #endif
    'smsCode',
    // #ifdef APP-HARMONY || MP-HARMONY
    'huawei',
    'huaweiMobile'
    // #endif
  ],
  // Policy agreements
  agreements: {
    serviceUrl: 'https://xxx', // User service agreement link
    privacyUrl: 'https://xxx', // Privacy policy terms link
    // Which scenarios to display, 1. Registration (including login and registration, such as: WeChat login, Apple login, SMS verification code login), 2. Login (such as: username password login)
    scope: [
      'register', 'login', 'realNameVerify'
    ]
  },
  // Application ID for providing various service access (such as WeChat login service)
  appid: {
    weixin: {
      // WeChat public account appid, source: Login to WeChat public account (https://mp.weixin.qq.com) -> Settings and Development -> Basic Configuration -> Public Account Development Information -> AppID
      h5: 'xxxxxx',
      // WeChat Open Platform appid, source: Login to WeChat Open Platform (https://open.weixin.qq.com) -> Management Center -> Website Application -> Select the corresponding application name, click to view -> AppID
      web: 'xxxxxx'
    }
  },
  /**
	 * Password strength
	 * super (Super strong: Password must contain uppercase and lowercase letters, numbers and special symbols, length range: between 8-16 characters)
	 * strong (Strong: Password must contain letters, numbers and special symbols, length range: between 8-16 characters)
	 * medium (Medium: Password must be a combination of any two of letters, numbers and special symbols, length range: between 8-16 characters)
	 * weak (Weak: Password must contain letters and numbers, length range: between 6-16 characters)
	 * Empty or false will not verify password strength
	 */
  passwordStrength: 'medium',
  /**
	 * Allow users to set a password after login (only for users who have not set a password)
	 * To enable this feature, set setPasswordAfterLogin to true
	 * "setPasswordAfterLogin": false
	 *
	 * If you allow users to skip setting a password, set allowSkip to true
	 * "setPasswordAfterLogin": {
	 *   "allowSkip": true
	 * }
	 * */
  setPasswordAfterLogin: false
}
