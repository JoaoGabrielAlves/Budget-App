import Vue from 'vue'
import App from './App.vue'

import { BootstrapVue, BIconPencilSquare, BIconTrash, BIconCash, BIconCreditCard2Front, BIconWallet } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.component('Pencil', BIconPencilSquare)
Vue.component('Trash', BIconTrash)
Vue.component('Cash', BIconCash)
Vue.component('Card', BIconCreditCard2Front)
Vue.component('Wallet', BIconWallet)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
