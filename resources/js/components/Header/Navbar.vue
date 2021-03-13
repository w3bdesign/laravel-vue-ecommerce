<template>
  <header
    role="banner"
    class="container flex flex-col justify-center px-0 pt-6 mx-auto mb-6"
  >
    <div class="flex flex-wrap lg:px-4">
      <div class="w-9/12 pr-2 my-2 overflow-hidden lg:w-3/12 md:w-10/12">
        <div class="ml-4 lg:ml-0">
          <img
            alt="Logo"
            class="h-20 lg:h-24"
            aria-label="Nettbutikk logo"
            src="../../../img/svg/Logo.svg"
          >
        </div>
      </div>
      <mobile-menu />
      <div class="hidden lg:w-1/12 lg:block" />
      <div
        id="nav-content"
        class="hidden w-full mt-4 bg-black lg:w-8/12 lg:block lg:bg-white lg:mt-0 lg:text-right"
        aria-expanded="false"
      >
        <div class="px-6 lg:px-0 lg:pt-5 xl:pt-7">
          <nav
            id="block-main"
            role="navigation"
            aria-labelledby="block-main-menu"
          >
            <ul
              class="items-center justify-end flex-1 pr-4 -mr-4 list-reset lg:flex"
            >
              <li
                class="inline-block py-2 text-xl font-semibold no-underline lg:text-base lg:px-4"
              >
                <router-link
                  tabindex="0"
                  to="/"
                >
                  <span
                    class="text-xl text-white no-underline lg:text-black is-active"
                  >
                    Home
                  </span>
                </router-link>
              </li>
              <li
                class="inline-block py-2 text-xl font-semibold no-underline lg:text-base lg:px-4"
              >
                <router-link
                  tabindex="0"
                  to="/products"
                >
                  <span
                    class="text-xl text-white no-underline lg:text-black"
                  >Products</span>
                </router-link>
              </li>
              <li
                class="inline-block py-2 text-xl font-semibold no-underline lg:text-base lg:px-4"
              />
              <li
                class="inline-block py-2 text-xl font-semibold no-underline lg:text-base lg:px-4"
              >
                <cart />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import Cart from './Cart.vue';
import MobileMenu from './MobileMenu.vue';

export default {
  name: 'Navbar',
  components: { MobileMenu, Cart },
};
</script>

<style>
.inputSearch {
  @apply w-56 px-2 py-2 pt-2 pb-2 border border-gray-400;
  @apply rounded appearance-none focus:border-indigo-600 focus:outline-none;
}
</style>
