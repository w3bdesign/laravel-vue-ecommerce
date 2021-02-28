const getters = {
  cartTotal: (state) => (state.cart.length
    ? state.cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    )
    : 0),
  cartQuantity: (state) => (state.cart.length
    ? state.cart.reduce(
      (accumulator, value) => accumulator.quantity + value.quantity,
    )
    : 0),
  productStateLength: ({ products }) => products.length,
  customerDetails: ({ customer }) => customer,
  checkoutFormIsValid: ({ checkoutFormIsValid }) => checkoutFormIsValid,
};

export default getters;
