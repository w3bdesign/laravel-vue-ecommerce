<template>
  <div class="w-full">
    <h3 class="h-12 py-4 mt-2 text-2xl font-bold text-center">
      {{ tableTitle }}
    </h3>
  </div>
  <div class="relative mt-2 overflow-x-auto">
    <table
      class="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5"
    >
      <caption class="sr-only">
        {{
          tableTitle
        }}
      </caption>
      <thead class="text-white">
        <tr
          class="bg-gray-600 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0"
        >
          <th
            v-for="header in tableHeaders"
            :key="header"
            scope="col"
            class="p-3 text-center"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody class="flex-1 sm:flex-none">
        <tr class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">



      
          

          <template
            v-for="(data, index) in tableData"
            :key="data"
            class="border-grey-light border hover:bg-gray-100 p-3 text-center"
          >
          <td v-if="$slots.remove && index === 0" class="inline-block mt-4 lg:h-12 h-20 w-32 md:w-full lg:w-full xl:w-full"><slot name="remove"></slot></td>
         
           <td class="border-grey-light border hover:bg-gray-100 p-3 text-center">{{ data }}</td> 
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useSlots } from "vue";


defineProps(["tableTitle", "tableHeaders", "tableData"]);

const slotDefault = useSlots();
console.log('slotDefault', slotDefault["remove"]);

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
