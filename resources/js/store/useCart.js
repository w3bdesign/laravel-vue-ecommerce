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
                console.log(
                    "foundProductInCartIndex",
                    this.cart[foundProductInCartIndex].quantity
                );

                this.cart[foundProductInCartIndex].quantity += 1;

               // this.cart[foundProductInCartIndex].item.quantity += 1;
                //this.cart.push(item);
            } else {
                //  item.item.quantity = 1;
                item.quantity = 1;
                console.log("Pushing item ...", item);
                this.cart.push(item);
            }

            // this.cart.push(item);
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
            return this.cart.length;
        },
        getCartContent() {
            return this.cart;
        },
        getCustomerDetails() {
            return this.customer;
        },
    },
    persist: {
        enabled: true,
    },
});
