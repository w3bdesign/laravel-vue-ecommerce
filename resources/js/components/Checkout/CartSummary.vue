<template>
  <div class="w-full">
    <h3 class="h-12 py-4 mt-2 text-2xl font-bold text-center">Cart summary</h3>
  </div>

  <div class="relative mt-2 overflow-x-auto">
    <table
      class="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5"
    >
      <caption class="sr-only">
        Cart summary
      </caption>

      <thead class="text-white">
        <template v-for="_content in getCartContent" :key="content">
          <tr
            class="bg-gray-600 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0"
          >
            <th
              v-for="header in tableHeaders"
              :key="header"
              scope="col"
              class="p-3 text-center h-12"
            >
              {{ header }}
            </th>
          </tr>
        </template>
      </thead>
      <tbody class="flex-1 sm:flex-none">
        <template
          v-for="{ name, quantity, price } in getCartContent"
          :key="id"
          class="border-grey-light border hover:bg-gray-100 p-3 text-center"
        >
          <tr class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
            <td class="border-grey-light border hover:bg-gray-100 h-12">
              <a tabindex="0" @click="removeProductFromCart(product)">
                <img
                  class="mt-2 mx-auto cursor-pointer"
                  alt="Remove icon"
                  aria-label="Remove"
                  src="../../../img/svg/Remove.svg"
                />
              </a>
            </td>
            <td class="border-grey-light border hover:bg-gray-100 p-3 text-center h-12">
              {{ name }}
            </td>
            <td class="border-grey-light border hover:bg-gray-100 p-3 text-center h-12">
              {{ quantity }}
            </td>
            <td class="border-grey-light border hover:bg-gray-100 p-3 text-center h-12">
              {{ formatPrice(price) }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <div
      v-if="getCartQuantity"
      class="container mx-auto flex flex-wrap flex-row justify-end items-end content-center"
    >
      <span class="p-4 text-xl font-bold text-right"
        >Total: {{ formatPrice(getCartTotal) }}</span
      >
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";

import { formatPrice } from "../../utils/functions";
import { useCart } from "../../store/useCart";

const tableHeaders = ["Remove", "Name", "Quantity", "Price"];

const store = useCart();

const { getCartContent, getCartTotal, getCartQuantity } = storeToRefs(store);
</script>

<style>
@media (min-width: 640px) {
  table {
    display: inline-table !important;
  }

  thead tr:not(:first-child) {
    display: none;
  }
}

td:not(:last-child) {
  border-bottom: 0;
}

th:not(:last-child) {
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
}
</style>
