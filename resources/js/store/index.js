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
      console.log('Find index: ');
      const foundProductInCartIndex = cart.findIndex(
        (item) => item.slug === payload.slug,
      );

      console.log('foundProductInCartIndex: ');
      console.log(foundProductInCartIndex);

      if (foundProductInCartIndex !== -1) {
        console.log('Found item!');
        // cart[foundProductInCartIndex].quantity += 1;

        const increasedQuantity = cart;
        increasedQuantity[foundProductInCartIndex].quantity += 1;

        return increasedQuantity;
      }

      const newPayload = payload;

      newPayload.quantity = 1;
      cart.push(newPayload);
      return false;
    },
  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: debug ? [createLogger()] : [],
  // actions: {},
  // modules: {},
});
