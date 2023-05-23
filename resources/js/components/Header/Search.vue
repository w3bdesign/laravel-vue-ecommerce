<template>
    <label for="search-input" class="search-label">Search: Searchterm: {{ searchTerm.value }}
    </label>
    <input class="search-input" type="text" v-model="searchTerm" @input="searchProducts" />

    <!--
    <ul>
        <li v-for="product in data" :key="product.id">


            <img v-if="product.imageUrl" class="productImage" :alt="product.name" :src="product.imageUrl" width="100"
                height="100" /> - {{ product.name }}


        </li>
    </ul>-->

    <div>
        <div
            class="absolute bg-white left-0 right-0 h-auto mx-auto py-16 px-8 shadow-md overflow-y-auto overflow-x-hidden scrolling-touch z-50 max-w-screen-xl">
            <div class="search-result__products">
                <div v-for="product in data" :key="product.id" class="border-t-2 border-b-2 border-grey-500 py-4">
                    <a class="flex"
                        href="/product/1192617/hjem-fritid/stoevsugere-rengjoering/robotstoevsugere/roborock-s7-hvit-ink-toemmestasjon?q=tes">
                        <div class="h-[70px] w-[70px]">
                            <img v-if="product.imageUrl"
                                class="transform scale-70 max-w-[90px] max-h-full transition ease-in-out duration-200 transform-origin-center left-0 w-65 h-auto object-contain"
                                :alt="product.name" :src="product.imageUrl" />
                        </div>
                        <div class="w-[400px]">
                            <div class="product__name">
                                <div class="product__title" :title="product.name">
                                    {{ product.name }}
                                </div>

                            </div>
                            <div class="mt-4">
                                <div class="product__price"> {{ product.price }},-</div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
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

const { data } = useSWRV(`/api/products?q=Example`, fetcher);

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
