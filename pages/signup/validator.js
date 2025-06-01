import passwordMod from '@/uni_modules/uni-id-pages/common/password.js'
export default {
	"username": {
		"rules": [{
				required: true,
				errorMessage: 'Please enter username',
			},
			{
				minLength: 3,
				maxLength: 32,
				errorMessage: 'Username length should be between {minLength} and {maxLength} characters',
			},
			{
				validateFunction: function(rule, value, data, callback) {
					// console.log(value);
					if (/^1\d{10}$/.test(value) || /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value)) {
						callback('Username cannot be: phone number or email')
					};
					if (/^\d+$/.test(value)) {
						callback('Username cannot be pure numbers')
					};
					if(/[\u4E00-\u9FA5\uF900-\uFA2D]{1,}/.test(value)){
						callback('Username cannot contain Chinese characters')
					}
					return true
				}
			}
		],
		"label": "Username"
	},
	"nickname": {
		"rules": [{
				minLength: 3,
				maxLength: 32,
				errorMessage: 'Nickname length should be between {minLength} and {maxLength} characters',
			},
			{
				validateFunction: function(rule, value, data, callback) {
					// console.log(value);
					if (/^1\d{10}$/.test(value) || /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value)) {
						callback('Nickname cannot be: phone number or email')
					};
					if (/^\d+$/.test(value)) {
						callback('Nickname cannot be pure numbers')
					};
					if(/[\u4E00-\u9FA5\uF900-\uFA2D]{1,}/.test(value)){
						callback('Nickname cannot contain Chinese characters')
					}
					return true
				}
			}
		],
		"label": "Nickname"
	},
	...passwordMod.getPwdRules()
}
