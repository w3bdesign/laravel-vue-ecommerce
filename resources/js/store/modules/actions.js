import axios from 'axios';

const actions = {
  getProductsFromApi({ commit }) {
    axios
      .get('/api/products')
      .then((response) => {
        commit('FETCH_PRODUCTS_FROM_API', response.data);
      })
      .catch((error) => console.error(error));
  },
  addProductToCart({ commit }, product) {
    commit('ADD_PRODUCT_TO_CART', product);
  },
  removeProductFromCart({ commit }, product) {
    commit('REMOVE_PRODUCT_FROM_CART', product);
  },
  emptyCart({ commit }) {
    commit('UPDATE_CART', []);
  },
  deleteCustomer({ commit }) {
    commit('DELETE_CUSTOMER', []);
  },
  saveCustomerDetails({ commit }, customer) {
    commit('SAVE_CUSTOMER_DETAILS', customer);
  },
  setCheckoutFormToValid({ commit }, value) {
    commit('SET_CHECKOUT_FORM_VALID', value);
  },
};

export default actions;
