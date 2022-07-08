<template>
  <base-table
    tableTitle="Checkout"
    :tableHeaders="['Remove', 'Name', 'Quantity', 'Price']"
    :tableData="['Test', 'Test', 'Test']"
  >
    <template v-slot:remove>
      <a tabindex="0" @click="removeProductFromCart(product)">
        <img
          class="mt-2 ml-4 cursor-pointer"
          alt="Remove icon"
          aria-label="Remove"
          src="../../../img/svg/Remove.svg"
        />
      </a>
    </template>
  </base-table>
</template>

<script setup>
const removeProductFromCart = (product) => {
  console.log("Click!", product);
};
</script>
