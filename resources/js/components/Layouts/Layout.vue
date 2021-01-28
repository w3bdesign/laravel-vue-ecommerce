<template>
    <nav-bar />
    <div class="flex justify-center">
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
