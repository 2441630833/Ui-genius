//白名单 不需要验证token
const whiteList = [
	"/pages/signup/signup",
	"/pages/login/login",
	"/pages/intro/intro",
	"/pages/about/about",
	"/pages/careers/careers",
	"/pages/privacy/privacy",
	"/pages/quickstart/quickstart",
	"/pages/terms/terms",
]
//登录页
const loginPage = "/pages/login/login"

// Token expiration time in milliseconds (e.g., 7 days)
const TOKEN_EXPIRATION_TIME = 7 * 24 * 60 * 60 * 1000;

// Function to store token with expiration
export function setTokenWithExpiration(tokenData) {
	// Store the actual token
	if (tokenData.newToken) {
		uni.setStorageSync('token', tokenData.newToken);
	}
	
	// Store user ID if available
	if (tokenData.uid) {
		uni.setStorageSync('uid', tokenData.uid);
	}
	
	// Set token expiration timestamp
	const expirationTime = Date.now() + TOKEN_EXPIRATION_TIME;
	uni.setStorageSync('tokenExpiration', expirationTime);
	
	console.log('Token stored with expiration:', new Date(expirationTime).toLocaleString());
}

export function setGoogleTokenWithExpiration(tokenData) {
	// Store the token
	if (tokenData.token) {
		uni.setStorageSync('googleToken', tokenData.token);
	}
	
	// Store user ID if available
	if (tokenData.uid) {
		uni.setStorageSync('googleUid', tokenData.uid);
	}
	
	// Store user info if available
	if (tokenData.userInfo) {
		uni.setStorageSync('googleUserInfo', tokenData.userInfo);
	}
	
	// Set token expiration timestamp using provided tokenExpired or default expiration time
	const expirationTime = tokenData.tokenExpired || (Date.now() + TOKEN_EXPIRATION_TIME);
	uni.setStorageSync('googleTokenExpiration', expirationTime);
	
	console.log('Google Token stored with expiration:', new Date(expirationTime).toLocaleString());
}

// Function to check if token is expired
export function isTokenExpired() {
	const expirationTime = uni.getStorageSync('tokenExpiration');
	if (!expirationTime) return true;
	
	return Date.now() > expirationTime;
}

// Function to check if Google token is expired
export function isGoogleTokenExpired() {
	const expirationTime = uni.getStorageSync('googleTokenExpiration');
	if (!expirationTime) return true;
	
	return Date.now() > expirationTime;
}

// Function to clear all auth data
export function clearAuthData() {
	uni.removeStorageSync('token');
	uni.removeStorageSync('googleToken');
	uni.removeStorageSync('tokenExpiration');
	uni.removeStorageSync('googleTokenExpiration');
	uni.removeStorageSync('uid');
	uni.removeStorageSync('googleUid');
	uni.removeStorageSync('googleUserInfo');
}

// Function to determine which auth method is currently active and valid,avoidding the duplicate login logic
// export function getActiveAuthMethod() {
// 	const token = uni.getStorageSync('token');
// 	const googleToken = uni.getStorageSync('googleToken');
// 	const tokenExpired = isTokenExpired();
// 	const googleTokenExpired = isGoogleTokenExpired();
	
// 	if (token && !tokenExpired) {
// 		return 'standard';
// 	} else if (googleToken && !googleTokenExpired) {
// 		return 'google';
// 	} else {
// 		return null; // No valid auth
// 	}
// }

export default function initPermission() {
	/**
	 * 页面跳转拦截器
	 */
	const list = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
	list.forEach(item => { //用遍历的方式分别为,uni.navigateTo,uni.redirectTo,uni.reLaunch,uni.switchTab这4个路由方法添加拦截器
		uni.addInterceptor(item, {
			invoke(e) { // 调用前拦截
				// console.log('拦截', e)
				//获取用户的token
				const token = uni.getStorageSync('token')
				const googleToken = uni.getStorageSync('googleToken')
				//获取要跳转的页面路径（url去掉"?"和"?"后的参数）
				const url = e.url.split('?')[0];
				let notNeed = whiteList.includes(url)
				
				// 如果在whiteList里面就不需要登录
				if (notNeed) {
					return e
				} else {
					// Check if we have valid authentication
					const hasValidToken = token && !isTokenExpired();
					const hasValidGoogleToken = googleToken && !isGoogleTokenExpired();
					
					if (!hasValidToken && !hasValidGoogleToken) {
						// If neither token is valid, clear all auth data
						clearAuthData();
						
						uni.showToast({
							title: 'login expired, please login first',
							icon: 'none'
						})
						
						setTimeout(() => {
						uni.navigateTo({
								url: loginPage
							})
						}, 2000);
						return false
					} else {
						return e
					}
				}
			},
			fail(err) { // 失败回调拦截 
				// console.log(err);
			}
		})
	})
}

