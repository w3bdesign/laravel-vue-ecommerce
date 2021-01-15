<template>
    <div>
        <header class="text-gray-700 body-font">
            <div
                class="container flex flex-col flex-wrap items-center p-5 mx-auto md:flex-row"
            >
                <a
                    class="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        class="w-10 h-10 p-2 text-white bg-indigo-500 rounded-full"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                        ></path>
                    </svg>
                    <span class="ml-3 text-xl">Shopping Cart</span>
                </a>
                <nav
                    class="flex flex-wrap items-center justify-center text-base md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400"
                >
                    <router-link
                        class="mr-5 hover:text-gray-900"
                        :to="{ name: 'products.index' }"
                    >
                        Products
                    </router-link>
                </nav>
                <router-link
                    class="inline-flex items-center px-3 py-1 mt-4 text-base bg-gray-200 border-0 rounded focus:outline-none hover:bg-gray-300 md:mt-0"
                    :to="{ name: 'order.checkout' }"
                >
                    Checkout<span class="inline-block ml-1"></span>
                </router-link>
            </div>
        </header>
    </div>
</template>

<script>
export default {
    name: "Navbar",
};
</script>

<style scoped>
header {
    max-width: 1400px;
}
</style>
