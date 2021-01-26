import { createStore } from "vuex";

export default createStore({
    state: { cart: [] },
    mutations: {
        addProductToCart({ cart }, payload) {
            console.log(cart);
            console.log(payload);
            cart.push(payload);
        },
    },
    //actions: {},
    //modules: {},
});
