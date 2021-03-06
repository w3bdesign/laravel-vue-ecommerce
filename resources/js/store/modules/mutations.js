const mutations = {
  FETCH_PRODUCTS_FROM_API(state, products) {
    Object.assign(state.products, products);
    window.location.reload();
  },
  UPDATE_CART(state, cart) {
    const newState = state;
    newState.cart = cart;
  },
  DELETE_CUSTOMER(state, customer) {
    const newState = state;
    newState.customer = customer;
  },
  UPDATE_ORDER(state, order) {
    Object.assign(state.order, order);
  },
  ADD_PRODUCT_TO_CART({ cart }, payload) {
    // ESLint complains if we modify the state directly
    const cartCopy = cart;
    const foundProductInCartIndex = cart.findIndex(
      (item) => item.slug === payload.slug,
    );
    if (foundProductInCartIndex > -1) {
      cartCopy[foundProductInCartIndex].quantity += 1;
      return cartCopy;
    }
    const newPayload = payload;
    newPayload.quantity = 1;
    cart.push(newPayload);
    return cart;
  },
  REMOVE_PRODUCT_FROM_CART({ cart }, payload) {
    cart.splice(cart.indexOf(payload), 1);
  },
  SAVE_CUSTOMER_DETAILS({ customer }, payload) {
    Object.assign(customer, payload);
  },
  SET_CHECKOUT_FORM_VALID(state, payload) {
    const copyState = state;
    copyState.checkoutFormIsValid = payload;
  },
};

export default mutations;
