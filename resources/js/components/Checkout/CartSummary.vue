<template>
  <base-table
    tableTitle="Checkout"
    :tableHeaders="['Remove', 'Name', 'Quantity', 'Price']"
    :tableData="['Test', 'Test', 'Test']"
  >
    <template #remove>
      <a tabindex="0" @click="removeProductFromCart(product)">
        <img
          class="mt-2 cursor-pointer mx-auto"
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
