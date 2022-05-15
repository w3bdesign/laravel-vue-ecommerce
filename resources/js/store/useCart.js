// https://www.youtube.com/watch?v=Ok6vO98RV_Q&t=335s

// https://www.youtube.com/watch?v=9whgkjxoCME

import { defineStore } from "pinia";

import axios from "axios";

const state = {
    products: [],
    cart: [],
    order: {},
    customer: {},
    checkoutFormIsValid: false,
};

export const useCart = defineStore("cart", {
    state: () => state,
    actions: {
        async getProductsFromApi() {
            axios
                .get("/api/products")
                .then((response) => {
                    console.log(response.data);
                    //commit('FETCH_PRODUCTS_FROM_API', response.data);
                })
                .catch((error) => console.error(error));
        },
        addToCart(item) {
            this.cart.push(item);
        },
        clearCart() {
            this.cart = null;
        },
    },
});
