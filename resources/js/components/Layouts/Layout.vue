<template>
    <nav-bar />
    <router-view></router-view>
    <footer />
</template>

<script>
import NavBar from "../Header/Navbar";

export default {
    components: { NavBar },
};
</script>

<style></style>
