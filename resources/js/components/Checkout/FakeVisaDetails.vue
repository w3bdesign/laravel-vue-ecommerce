<template>
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
</template>
