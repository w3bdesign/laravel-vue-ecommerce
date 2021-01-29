<template>
    <div>
        <hero />
        <products />
    </div>
</template>

<script>
import { defineComponent } from "vue";

import Hero from "./Index/Hero";
import Products from "./Products/Products";

export default defineComponent({
    components: { Hero, Products },
});
</script>
