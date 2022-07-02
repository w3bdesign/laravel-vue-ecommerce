import { defineStore } from "pinia";

import axios from "axios";

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
        removeFromCart({ item }) {
            this.cart.splice(this.cart.indexOf(item), 1);
        },

        clearCart() {
            this.cart.length = 0;
        },

        saveCustomerDetails(customer) {
            console.log("Customer: ", customer);
            this.customer = customer;
        },
    },
    getters: {
        getCartQuantity() {
            return this.cart.reduce(
                (total, product) => total + product.quantity,
                0
            );
        },
        getSingleProduct(slug) {
            return this.products.find((product) => product.slug === slug);
        },
        getCartContent() {
            return this.cart;
        },
        getCustomerDetails() {
            return this.customer;
        },
        getCartTotal() {
            return this.cart.reduce(
                (total, product) => total + product.price * product.quantity,
                0
            );
        },
    },
    persist: {
        enabled: true,
    },
});
