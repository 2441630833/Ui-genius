<!-- Email Verification Code Registration -->
<template>
    <view class="login-bg">
        <view class="login-card">
            <match-media :min-width="690">
                <!-- <view class="login-logo">
                    <image :src="logo"></image>
                </view> -->
                <!-- Top text -->
                <text class="login-title">Sign Up</text>
            </match-media>
            <uni-forms ref="form" :value="formData" :rules="rules" validate-trigger="submit" err-show-type="toast">
                <uni-forms-item name="email" required>
                    <uni-easyinput :inputBorder="false" :focus="focusEmail" @blur="focusEmail = false"
                        class="login-input" placeholder="Email address" v-model="formData.email" trim="both" />
                </uni-forms-item>

                <uni-forms-item name="nickname" required>
                    <uni-easyinput :inputBorder="false" :focus="focusNickname" @blur="focusNickname = false"
                        class="login-input" placeholder="Username" v-model="formData.nickname" trim="both" />
                </uni-forms-item>

                <uni-forms-item name="password" v-model="formData.password" required>
                    <uni-easyinput :inputBorder="false" :focus="focusPassword" @blur="focusPassword = false"
                        class="login-input" maxlength="20"
                        :placeholder="'Password (' + (config.passwordStrength == 'weak' ? '6' : '8') + '-16 characters)'"
                        type="password" v-model="formData.password" trim="both" />
                </uni-forms-item>

                <uni-forms-item name="password2" v-model="formData.password2" required>
                    <uni-easyinput :inputBorder="false" :focus="focusPassword2" @blur="focusPassword2 = false"
                        class="login-input" placeholder="Confirm password" maxlength="20" type="password"
                        v-model="formData.password2" trim="both" />
                </uni-forms-item>

                <!-- <uni-forms-item name="code">
                    <uni-id-pages-email-form 
                        ref="shortCode" 
                        :email="formData.email" 
                        type="register" 
                        v-model="formData.code"
                    />
                </uni-forms-item> -->

                <!-- <uni-id-pages-agreements scope="register" ref="agreements"></uni-id-pages-agreements> -->

                <button class="main-btn" type="primary" @click="submit">Sign Up</button>
                <button @click="navigateBack" class="secondary-btn">Back</button>

                <!-- <match-media :min-width="690">
                    <view class="link-box">
                        <text class="link" @click="registerByUserName">Register with username</text>
                        <text class="link" @click="toLogin">Already have an account? Login here</text>
                    </view>
                </match-media> -->
            </uni-forms>
        </view>
    </view>
</template>

<script>
import rules from './validator.js';
import mixin from './login-page.mixin.js';
import config from './config.js'
import passwordMod from './password.js'
const uniIdCo = uniCloud.importObject("uni-id-co", {
    loadingOptions: { // loading 
        title: 'logging in...',
        mask: true // 
    },
    errorOptions: {
        type: 'toast'
    }
})
export default {
    mixins: [mixin],
    data() {
        return {
            formData: {
                email: "",
                nickname: "",
                password: "",
                password2: "",
                code: ""
            },
            rules: {
                email: {
                    rules: [{
                        required: true,
                        errorMessage: 'Please enter your email',
                    }, {
                        format: 'email',
                        errorMessage: 'Invalid email format',
                    }
                    ]
                },
                nickname: {
                    rules: [{
                        minLength: 3,
                        maxLength: 32,
                        errorMessage: 'Username must be between {minLength} and {maxLength} characters',
                    },
                    {
                        validateFunction: function (rule, value, data, callback) {
                            // console.log(value);
                            if (/^1\d{10}$/.test(value) || /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(value)) {
                                callback('Username cannot be a phone number or email')
                            };
                            if (/^\d+$/.test(value)) {
                                callback('Username cannot be numbers only')
                            };
                            if (/[\u4E00-\u9FA5\uF900-\uFA2D]{1,}/.test(value)) {
                                callback('Username cannot contain Chinese characters')
                            }
                            return true
                        }
                    }
                    ],
                    label: "Username"
                },
                ...passwordMod.getPwdRules(),
                // code: {
                // 	rules: [{
                // 			required: true,
                // 			errorMessage: 'Please enter email verification code',
                // 		},
                // 		{
                // 			pattern: /^.{6}$/,
                // 			errorMessage: 'Incorrect verification code',
                // 		}
                // 	]
                // }
            },
            focusEmail: false,
            focusNickname: false,
            focusPassword: false,
            focusPassword2: false,
            logo: "/static/logo.png"
        }
    },
    onReady() {
        this.$refs.form.setRules(this.rules)
    },
    onShow() {
        // #ifdef H5
        document.onkeydown = event => {
            var e = event || window.event;
            if (e && e.keyCode == 13) { //Enter key code is 13
                this.submit()
            }
        };
        // #endif
    },
    methods: {
        /**
         * Trigger form submission
         */
        submit() {
            this.$refs.form.validate().then((res) => {
                if (this.needAgreements && !this.agree) {
                    return this.$refs.agreements.popup(() => {
                        this.submitForm(res)
                    })
                }
                this.submitForm(res)
            }).catch((errors) => {
                let key = errors[0].key
                key = key.replace(key[0], key[0].toUpperCase())
                // console.log(key);
                this['focus' + key] = true
            })
        },
        submitForm(params) {
            uniIdCo.registerUserByEmail(this.formData).then(e => {

                uni.showToast({
                    title: 'Sign up successfully!',
                    icon: 'success'
                })

                // console.log(e);

                setTimeout(() => {
                    uni.navigateTo({
                        url: '/pages/login/login',
                        complete: (e) => {
                            // console.log(e);
                        }
                    })
                }, 1500)
            })
                .catch(e => {
                    // console.log(e);
                    console.log(e.message);
                })
        },
        navigateBack() {
            uni.navigateTo({
                url: '/pages/login/login',
                fail: () => {
                    uni.navigateTo({ url: '/pages/login/login' })
                }
            })
        },
        toLogin() {
            uni.navigateTo({
                url: '/uni_modules/uni-id-pages/pages/login/login-withpwd'
            })
        },
        registerByUserName() {
            uni.navigateTo({
                url: '/uni_modules/uni-id-pages/pages/register/register'
            })
        }
    }
}
</script>

<style lang="scss">
@import "@/uni_modules/uni-id-pages/common/login-page.scss";

.login-bg {
    min-height: 100vh;
    background: url(../../static/login_background.png);
    background-size: cover;
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
    overflow: hidden;
    /* Prevent content from overflowing */
}

.login-title {
    text-align: center;
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 32px;
    color: #222;
    display: block;
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
    width: 90%;
    /* Ensure input takes full width */
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

@media screen and (max-width: 690px) {
    .login-card {
        margin-top: 15px;
    }
}

@media screen and (min-width: 690px) {
    .link-box {
        /* #ifndef APP-NVUE */
        display: flex;
        /* #endif */
        flex-direction: row;
        justify-content: space-between;
        margin-top: 10px;
    }

    .link {
        font-size: 12px;
    }
}
</style>
