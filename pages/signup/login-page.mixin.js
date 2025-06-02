import {
	mutations
} from '@/uni_modules/uni-id-pages/common/store.js'
import config from '@/uni_modules/uni-id-pages/config.js'
const mixin = {
	data() {
		return {
			config,
			uniIdRedirectUrl: '',
			isMounted: false
		}
	},
	onUnload() {
		// #ifdef H5
		document.onkeydown = false
		// #endif
	},
	mounted() {
		this.isMounted = true
	},
	onLoad(e) {
		if (e.is_weixin_redirect) {
			uni.showLoading({
				mask: true
			})

			if (window.location.href.includes('#')) {
				// Split the URL by ? to get the parameter string, then split by & to separate each parameter
				const paramsArr = window.location.href.split('?')[1].split('&')
				paramsArr.forEach(item => {
					const arr = item.split('=')
					if (arr[0] == 'code') {
						e.code = arr[1]
					}
				})
			}
			this.$nextTick(n => {
				// console.log(this.$refs.uniFabLogin);
				this.$refs.uniFabLogin.login({
					code: e.code
				}, 'weixin')
			})
		}

		if (e.uniIdRedirectUrl) {
			this.uniIdRedirectUrl = decodeURIComponent(e.uniIdRedirectUrl)
		}

		// #ifdef MP-WEIXIN
		if (getCurrentPages().length === 1) {
			uni.hideHomeButton()
			console.log('Hidden: Return to home button');
		}
		// #endif
	},
	computed: {
		needAgreements() {
			if (this.isMounted) {
				if (this.$refs.agreements) {
					return this.$refs.agreements.needAgreements
				} else {
					return false
				}
			}
		},
		agree: {
			get() {
				if (this.isMounted) {
					if (this.$refs.agreements) {
						return this.$refs.agreements.isAgree
					} else {
						return true
					}
				}
			},
			set(agree) {
				if (this.$refs.agreements) {
					this.$refs.agreements.isAgree = agree
				} else {
					console.log('Privacy policy agreement component does not exist');
				}
			}
		}
	},
	methods: {
		loginSuccess(e) {
			mutations.loginSuccess({
				...e,
				uniIdRedirectUrl: this.uniIdRedirectUrl
			})
		}
	}
}

export default mixin
