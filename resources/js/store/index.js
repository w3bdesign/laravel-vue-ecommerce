import { createStore, createLogger } from 'vuex';

const debug = process.env.NODE_ENV !== 'production';

// TODO Move state into modules when the store becomes bigger

export default createStore({

  state: {
    products: [],
    cart: [],
    order: {},
  },
  mutations: {
    ADD_PRODUCT_TO_CART({ cart }, payload) {
      const foundProductInCartIndex = cart.findIndex((item) => item === cart.product);

      console.log(foundProductInCartIndex);

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
