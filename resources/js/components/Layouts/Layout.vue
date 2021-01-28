<template>
    <nav-bar />
    <div class="flex justify-center w-full">
        <router-view></router-view>
    </div>
    <footer />
</template>

<script>
import NavBar from "../Header/Navbar";

export default {
    components: { NavBar },
};
</script>

<style></style>
