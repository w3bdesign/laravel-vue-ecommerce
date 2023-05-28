<template>
    <base-table
        tableTitle="Customer details"
        :tableHeaders="['Name', 'Address', 'Zipcode', 'City', 'State', 'Email']"
        :tableData="[
            `${firstName} ${lastName}`,
            address,
            zipcode,
            city,
            state,
            email,
        ]"
    />
</template>

<script setup>
import { useCart } from "../../store/useCart";

const store = useCart();

const { firstName, lastName, address, zipcode, city, state, email } =
    store.getCustomerDetails;
</script>
