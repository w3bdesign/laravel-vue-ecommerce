<template>
    <label for="search-input" class="search-label">Search:

        Data: {{ data }}

        Searchterm: {{ searchTerm.value }}
    </label>
    <input class="search-input" type="text" v-model="searchTerm" @input="searchProducts" />
    <ul>
        <li v-for="product in searchResults" :key="product.id">
            {{ product.name }}
        </li>
    </ul>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import useSWRV from "swrv";

const fetcher = (key) => fetch(key).then((res) => res.json());

const props = defineProps({
    searchResults: { type: Array, default: () => [] },
});

const searchTerm = ref("");

/*const { data } = useSWRV(searchTerm.value ? `/api/products?q=${searchTerm.value}` : null, fetcher
);*/

const { data } = useSWRV(`/api/products?q=Example`, fetcher
);


const searchResults = computed(() => data.value || []);

/*
watch(searchResults, () => {
    emit("update:searchResults", searchResults.value);
});*/

function searchProducts() {
    // Trigger reactivity by updating searchTerm
    searchTerm.value = searchTerm.value;
}
</script>

<style scoped>
.search-label {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    text-align: left;
}

.search-input {
    width: 100%;
    padding: 6px 10px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 2px;
    font-size: 14px;
    background-color: white;
    transition: 0.3s;
}

.search-input:focus {
    border-color: #007bff;
    outline: none;
}
</style>
