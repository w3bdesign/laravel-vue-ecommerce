import { createStore, createLogger } from 'vuex';

const debug = process.env.NODE_ENV !== 'production';

export default createStore({

  state: { cart: [] },
  mutations: {
    ADD_PRODUCT_TO_CART({ cart }, payload) {
      cart.push(payload);
    },
  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: debug ? [createLogger()] : [],
  // actions: {},
  // modules: {},
});
