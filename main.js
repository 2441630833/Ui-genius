import App from './App'
import messages from './locale/index'

let i18nConfig = {
  locale: uni.getStorageSync('appLocale') || 'en', // Set locale from storage or default to English
  fallbackLocale: 'en', // Set fallback language to English
  messages
}

// #ifndef VUE3
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18nVue2 = new VueI18n(i18nConfig)
// console.log(i18nConfig)
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  i18n: i18nVue2,
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import { createI18n } from 'vue-i18n'
const i18nVue3 = createI18n(i18nConfig)
export function createApp() {
  const app = createSSRApp(App)
  app.use(i18nVue3)
  return {
    app
  }
}
// #endif
