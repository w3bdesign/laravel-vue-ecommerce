import { createStore } from "vuex";

export default createStore({
    state: { cart: [] },
    mutations: {
        addProductToCart({ cart }) {
            console.log(cart);
            cart.push("test");
        },
    },
    //actions: {},
    //modules: {},
});
