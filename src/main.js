/* ------------------------------------------------------------------------- */

import { bus } from "./bus";

import store from './store'

/* ------------------------------------------------------------------------- */

// store.dispatch('user/vkDataSet', {
//   "id": Math.ceil(Math.random() * 1000),
//   "first_name": "Алексей",
//   "last_name": "Марголин",
//   "is_closed": false,
//   "can_access_closed": true,
//   "city": {
//     "id": 2,
//     "title": "Санкт-Петербург"
//   },
//   "photo_100": "https://sun9-24.userapi.com/c847018/v847018570/151896/jt7GnnXOVdQ.jpg"
// });
store.dispatch('user/querystringSet', location.search.substr(1));

/* ------------------------------------------------------------------------- */

import bridge from '@vkontakte/vk-bridge';

bridge.subscribe(e => {
  if (!e.detail) return;

  switch(e.detail.type) {
    case 'VKWebAppGetUserInfoResult':
      store.dispatch('user/vkDataSet', e.detail.data);
      bus.$emit('init');
      break;

    default: console.log(e);
  }
});

bridge.send('VKWebAppInit');
bridge.send('VKWebAppGetUserInfo');

/* ------------------------------------------------------------------------- */

Vue.config.productionTip = false;

import Vue from 'vue'
import App from './components/App'

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');