import { defineStore } from "pinia";

import axios from "axios";

// TODO https://seb-l.github.io/pinia-plugin-persist/#install

const state = {
    products: [],
    cart: [],
    order: {},
    customer: {},
    checkoutFormIsValid: false,
    error: null,
};

export const useCart = defineStore("shopState", {
    state: () => state,
    actions: {
        async getProductsFromApi() {
            axios
                .get("/api/products")
                .then((response) => {
                    if (response.data) {
                        this.products = response.data;
                    }
                })
                .catch((error) => (this.error = error));
        },
        //addToCart(item) {
        addToCart({ item }) {
            const foundProductInCartIndex = this.cart.findIndex(
                (cartItem) => item.slug === cartItem.slug
            );

            if (foundProductInCartIndex > -1) {
                this.cart[foundProductInCartIndex].quantity += 1;
            } else {
                item.quantity = 1;
                this.cart.push(item);
            }
        },
        clearCart() {
            this.cart.length = 0;
        },

        getSingleProduct(slug) {
            return this.products.find((product) => product.slug === slug);
        },
    },
    getters: {
        getCartQuantity() {
            const cartTotalQuantity = this.cart.reduce(
                (total, product) => total + product.quantity,
                0
            );
            return cartTotalQuantity;
        },
        getCartContent() {
            return this.cart;
        },
        getCustomerDetails() {
            return this.customer;
        },
        getCartTotal() {
            const cartTotalAmount = this.cart.reduce(
                (total, product) => total + product.price * product.quantity,
                0
            );
            return cartTotalAmount;
        },
    },
    persist: {
        enabled: true,
    },
});
