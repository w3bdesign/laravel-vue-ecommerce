<template>
  <div>
    <nav-bar />
    <div class="container mx-auto">
      <router-view />
      <footer-content />
    </div>
  </div>
</template>

<script>
import NavBar from './Header/Navbar.vue';
import FooterContent from './Footer/FooterContent.vue';

export default {
  components: { NavBar, FooterContent },
};
</script>
