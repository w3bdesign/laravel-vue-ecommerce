import { createStore, createLogger } from 'vuex';
// import { createStore } from 'vuex';

import VuexPersistence from 'vuex-persist';

const debug = process.env.NODE_ENV !== 'production';

const debugLogger = debug ? createLogger() : [];

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

// TODO Move state into modules when the store becomes bigger

export default createStore({
  state: {
    products: [],
    cart: [],
    order: {},
  },
  getters: {
    getCart: (state) => state.cart,
    cartLength: (state) => state.cart.length,
  },
  actions: {
    addProductToCart({ commit }, product) {
      commit('ADD_PRODUCT_TO_CART', product);
    },
    removeProductFromCart({ commit }, product) {
      commit('REMOVE_PRODUCT_FROM_CART', product);
    },

  },
  mutations: {
    ADD_PRODUCT_TO_CART({ cart }, payload) {
      const increasedQuantity = cart;
      const foundProductInCartIndex = cart.findIndex(
        (item) => item.slug === payload.slug,
      );
      // if (foundProductInCartIndex !== -1) {
      if (foundProductInCartIndex) {
        increasedQuantity[foundProductInCartIndex].quantity += 1;
        return increasedQuantity;
      }
      const newPayload = payload;
      newPayload.quantity = 1;
      cart.push(newPayload);
      return cart;
    },
    REMOVE_PRODUCT_FROM_CART({ cart }, payload) {
      cart.splice(cart.indexOf(payload), 1);
    },
  },
  strict: debug,
  plugins: [vuexLocal.plugin, debugLogger],
});
