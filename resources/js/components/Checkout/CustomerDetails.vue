<template>
  <base-table
    tableTitle="Customer details"
    :tableHeaders="['Name', 'Address', 'Zipcode', 'City', 'State', 'Email']"
    :tableData="[
      `${getCustomerDetails.firstName} ${getCustomerDetails.lastName}`,
      getCustomerDetails.address,
      getCustomerDetails.zipcode,
      getCustomerDetails.city,
      getCustomerDetails.state,
      getCustomerDetails.email,
    ]"
  />
</template>

<script setup>
import { storeToRefs } from "pinia";

import { useCart } from "../../store/useCart";

const store = useCart();

const { getCustomerDetails } = storeToRefs(store);
</script>
