// https://www.youtube.com/watch?v=Ok6vO98RV_Q&t=335s

// https://www.youtube.com/watch?v=9whgkjxoCME

import { defineStore } from "pinia";

export const useCart = defineStore("cart", {
    state: () => ({
        cart: [],
        name: "Test",
    }),
    actions: {
        addToCart(item) {
            this.cart.push(item);
        },
        clearCart() {
            this.cart = null;
        },
    },
});
