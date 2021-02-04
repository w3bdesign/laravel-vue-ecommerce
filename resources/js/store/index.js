import { createStore, createLogger } from 'vuex';

const debug = process.env.NODE_ENV !== 'production';

// TODO Move state into modules when the store grows bigger

export default createStore({

  state: { cart: [] },
  mutations: {
    ADD_PRODUCT_TO_CART({ cart }, payload) {
      cart.push(payload);
      // localStorage.setItem('agreedToPrivacy', true);
      // localStorage.setItem('LaravelCart', payload);

      localStorage.setItem('agreedToPrivacy', true);
      console.log('Set local storage to: ');
      console.log(localStorage.getItem('agreedToPrivacy'));
    },
  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: debug ? [createLogger()] : [],
  // actions: {},
  // modules: {},
});
