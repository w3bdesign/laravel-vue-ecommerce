<template>
    <div class="w-full">
        <h3 class="h-12 py-6 mt-6 text-2xl font-bold text-center">
            Use the following card details for testing:
        </h3>
    </div>
    <div class="relative mt-8 overflow-x-auto shadow-md sm:rounded-lg">
        <table
            class="w-full text-lg text-left text-gray-500 dark:text-gray-400"
        >
            <caption class="sr-only">
                Fake visa card details
            </caption>
            <thead
                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
                <tr>
                    <th scope="col" class="px-6 py-3">Number</th>
                    <th scope="col" class="px-6 py-3">CVC</th>
                    <th scope="col" class="px-6 py-3">Date</th>
                    <th scope="col" class="px-6 py-3">Zipcode</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                    <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    >
                        4242424242424242
                    </th>
                    <td class="px-6 py-4">Any 3 digits</td>
                    <td class="px-6 py-4">Any future date</td>
                    <td class="px-6 py-4">Any zip code</td>
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
