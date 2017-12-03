// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from '@/store'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.component('transition-fade', require('@/components/parts/TransitionFade').default)
Vue.component('file-directory', require('@/components/parts/Directory').default)

// https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart (targetLength, padString) {
        targetLength = targetLength >> 0 // floor if number or convert non-number to 0;
        padString = String(padString || ' ')
        if (this.length > targetLength) {
            return String(this)
        } else {
            targetLength = targetLength - this.length
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length) // append to original to ensure we are longer than needed
            }
            return padString.slice(0, targetLength) + String(this)
        }
    }
}

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
