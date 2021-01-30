import { createStore } from 'vuex';

export default createStore({
  state: { cart: [] },
  mutations: {
    ADD_PRODUCT_TO_CART({ cart }, payload) {
      cart.push(payload);
    },
  },
  // actions: {},
  // modules: {},
});
