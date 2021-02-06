import { createStore, createLogger } from 'vuex';

const debug = process.env.NODE_ENV !== 'production';

// TODO Move state into modules when the store grows bigger

export default createStore({

  state: { cart: [] },
  mutations: {
    ADD_PRODUCT_TO_CART({ cart }, payload) {
      const foundProductInCartIndex = cart.findIndex((item) => item === cart.product);

      if (foundProductInCartIndex !== -1) {
        console.log('Found item!');
        return;
      }

      cart.push(payload);
    },
  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: debug ? [createLogger()] : [],
  // actions: {},
  // modules: {},
});
