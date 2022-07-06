<template>
  <div class="relative mt-8 overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-lg text-left text-gray-500 dark:text-gray-400">
      <caption class="sr-only">
        Customer details
      </caption>
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3">Name</th>
          <th scope="col" class="px-6 py-3">Address</th>
          <th scope="col" class="px-6 py-3">Zipcode</th>
          <th scope="col" class="px-6 py-3">City</th>
          <th scope="col" class="px-6 py-3">State</th>
          <th scope="col" class="px-6 py-3">Email</th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
          >
            {{ getCustomerDetails.firstName }}
            {{ getCustomerDetails.lastName }}
          </th>
          <td class="px-6 py-4">
            {{ getCustomerDetails.address }}
          </td>
          <td class="px-6 py-4">
            {{ getCustomerDetails.zipcode }}
          </td>
          <td class="px-6 py-4">
            {{ getCustomerDetails.city }}
          </td>
          <td class="px-6 py-4 text-right">
            {{ getCustomerDetails.state }}
          </td>
          <td class="px-6 py-4 text-right">
            {{ getCustomerDetails.email }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";

import { useCart } from "../../store/useCart";

const { getCustomerDetails } = storeToRefs(useCart());
</script>
