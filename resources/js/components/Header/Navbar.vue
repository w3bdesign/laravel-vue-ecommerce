<template>
  <header
    role="banner"
    class="container flex flex-col justify-center px-0 pt-6 mx-auto mb-6"
  >
    <div class="flex flex-wrap justify-between">
      <div class="pr-2 my-2 overflow-hidden">
        <div class="ml-4 lg:ml-0 hidden md:block">
          <router-link to="/">
            <img
              alt="Logo"
              class="h-20 lg:h-24"
              aria-label="Nettbutikk logo"
              src="../../../img/svg/Logo.svg"
            />
          </router-link>
        </div>
        <router-link to="/">
          <img
            alt="Mobile logo"
            class="h-16 md:hidden block w-32"
            aria-label="Nettbutikk logo"
            src="../../../img/svg/MobileLogo.svg"
          />
        </router-link>
      </div>
      <div class="lg:hidden block">
        <cart-component />
      </div>
      <mobile-menu />
      <div class="hidden lg:w-1/12 lg:block" />
      <div
        id="nav-content"
        class="hidden w-full mt-4 bg-black lg:w-8/12 lg:block lg:bg-white lg:mt-0 lg:text-right"
        aria-expanded="false"
      >
        <div class="px-6 lg:px-0 lg:pt-5 xl:pt-7">
          <nav id="block-main" role="navigation" aria-labelledby="block-main-menu">
            <ul class="items-center justify-end flex-1 pr-4 -mr-4 list-reset lg:flex">
              <li
                class="inline-block py-2 text-xl font-semibold no-underline lg:text-base pl-6"
              >
                <router-link tabindex="0" to="/">
                  <span
                    class="text-2xl text-white no-underline lg:text-black link-underline link-underline-blue"
                  >
                    Home
                  </span>
                </router-link>
              </li>
              <li
                class="inline-block py-2 text-xl font-semibold no-underline lg:text-base pl-6"
              >
                <router-link tabindex="0" to="/products">
                  <span
                    class="text-2xl text-white no-underline lg:text-black link-underline link-underline-blue"
                  >
                    Products
                  </span>
                </router-link>
              </li>
              <li
                class="inline-block py-2 text-xl font-semibold no-underline lg:text-base pl-6"
              >
                <cart-component />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.link-underline {
  border-bottom-width: 0;
  background-image: linear-gradient(transparent, transparent), linear-gradient(#fff, #fff);
  background-size: 0 3px;
  background-position: 0 100%;
  background-repeat: no-repeat;
  transition: background-size 0.3s ease-in-out;
}

.link-underline-blue {
  background-image: linear-gradient(transparent, transparent),
    linear-gradient(rgb(42, 53, 217), rgb(42, 53, 217));
}

.link-underline:hover {
  background-size: 100% 3px;
  background-position: 0 100%;
}
</style>
