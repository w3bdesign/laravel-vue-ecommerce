<template>
    <nav-bar />
    <div class="container mx-auto">
        <router-view />
        <foot />
    </div>

</template>

<script>
import NavBar from "../Header/Navbar";
import Foot from "../Footer/Footer";

export default {
    components: { NavBar, Foot },
};
</script>
