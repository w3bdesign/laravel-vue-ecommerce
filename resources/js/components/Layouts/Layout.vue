<template>
    <nav-bar />
    <div class="container mx-auto">
        <router-view />
        <footer-content />
    </div>

</template>

<script>
import NavBar from "../Header/Navbar";
import Footercontent from "../Footer/Footer";

export default {
    components: { NavBar, Footercontent },
};
</script>
