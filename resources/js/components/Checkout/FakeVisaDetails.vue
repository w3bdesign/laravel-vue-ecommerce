<template>
    <div class="w-full">
        <h3 class="h-12 py-6 mt-6 text-2xl font-bold text-center">
            Use the following card details for testing:
        </h3>
    </div>
    <div class="relative mt-8 overflow-x-auto">
        <table
            class="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5"
        >
            <caption class="sr-only">
                Fake visa card details
            </caption>
            <thead class="text-white">
                <tr
                    class="bg-gray-600 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0"
                >
                    <th scope="col" class="p-3 text-left">Number</th>
                    <th scope="col" class="p-3 text-left">CVC</th>
                    <th scope="col" class="p-3 text-left">Date</th>
                    <th scope="col" class="p-3 text-left">Zipcode</th>
                </tr>
            </thead>
            <tbody class="flex-1 sm:flex-none">
                <tr
                    class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0"
                >
                    <td class="border-grey-light border hover:bg-gray-100 p-3">
                        4242424242424242
                    </td>
                    <td class="border-grey-light border hover:bg-gray-100 p-3">
                        Any 3 digits
                    </td>
                    <td class="border-grey-light border hover:bg-gray-100 p-3">
                        Any future date
                    </td>
                    <td class="border-grey-light border hover:bg-gray-100 p-3">
                        Any zip code
                    </td>
                </tr>
            </tbody>
        </table>

        Reusable table component:

        <base-table
            tableTitle="Use the following card details for testing"
            :tableHeaders="['Number', 'CVC', 'Date', 'Zipcode']"
            :tableData="[
                '4242424242424242',
                'Any 3 digits',
                'Any future date',
                'Any zip code',
            ]"
        ></base-table>
    </div>
</template>

<script setup>
import { storeToRefs } from "pinia";

import { useCart } from "../../store/useCart";

const { getCustomerDetails } = storeToRefs(useCart());
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
