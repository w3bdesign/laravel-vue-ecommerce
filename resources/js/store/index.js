import { createStore } from "vuex";

export default createStore({
    state: { cart: [] },
    mutations: {
        addProductToCart({ cart }, payload) {
            cart.push(payload);
        },
    },
    //actions: {},
    //modules: {},
});
