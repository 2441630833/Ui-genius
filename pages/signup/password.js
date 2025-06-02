// Import configuration
import config from '@/uni_modules/uni-id-pages/config.js'

const {passwordStrength} = config

// Password strength expressions
const passwordRules = {
	// Password must contain uppercase and lowercase letters, numbers and special symbols
	super: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@#$%^&*_\-+=`|\\(){}[\]:;"'<>,.?/])[0-9a-zA-Z~!@#$%^&*_\-+=`|\\(){}[\]:;"'<>,.?/]{8,16}$/,
	// Password must contain letters, numbers and special symbols
	strong: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[~!@#$%^&*_\-+=`|\\(){}[\]:;"'<>,.?/])[0-9a-zA-Z~!@#$%^&*_\-+=`|\\(){}[\]:;"'<>,.?/]{8,16}$/,
	// Password must be a combination of any two of letters, numbers and special symbols
	medium: /^(?![0-9]+$)(?![a-zA-Z]+$)(?![~!@#$%^&*_\-+=`|\\(){}[\]:;"'<>,.?/]+$)[0-9a-zA-Z~!@#$%^&*_\-+=`|\\(){}[\]:;"'<>,.?/]{8,16}$/,
	// Password must contain letters and numbers
	weak: /^(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z~!@#$%^&*_\-+=`|\\(){}[\]:;"'<>,.?/]{6,16}$/
}

const ERROR = {
	normal: {
		noPwd: 'Please enter password',
		noRePwd: 'Please enter password again',
		rePwdErr: 'The two passwords are inconsistent'
	},
	passwordStrengthError: {
		super: 'Password must contain uppercase and lowercase letters, numbers and special symbols, password length must be between 8-16 characters',
		strong: 'Password must contain letters, numbers and special symbols, password length must be between 8-16 characters',
		medium: 'Password must be a combination of any two of letters, numbers and special symbols, password length must be between 8-16 characters',
		weak: 'Password must contain letters, password length must be between 6-16 characters'
	}
}

function validPwd(password) {
	//Strength validation
	if (passwordStrength && passwordRules[passwordStrength]) {
		if (!new RegExp(passwordRules[passwordStrength]).test(password)) {
			return ERROR.passwordStrengthError[passwordStrength]
		}
	}
	return true
}

function getPwdRules(pwdName = 'password', rePwdName = 'password2') {
	const rules = {}
	rules[pwdName] = {
		rules: [{
				required: true,
				errorMessage: ERROR.normal.noPwd,
			},
			{
				validateFunction: function(rule, value, data, callback) {
					const checkRes = validPwd(value)
					if (checkRes !== true) {
						callback(checkRes)
					}
					return true
				}
			}
		]
	}

	if (rePwdName) {
		rules[rePwdName] = {
			rules: [{
					required: true,
					errorMessage: ERROR.normal.noRePwd,
				},
				{
					validateFunction: function(rule, value, data, callback) {
						if (value != data[pwdName]) {
							callback(ERROR.normal.rePwdErr)
						}
						return true
					}
				}
			]
		}
	}
	return rules
}

export default {
	ERROR,
	validPwd,
	getPwdRules
}
