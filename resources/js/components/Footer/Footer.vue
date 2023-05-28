<template>
    <div class="container mx-auto mt-12">
        <footer
            class="px-6 text-center bg-white border border-gray-200 rounded-lg shadow-md"
        >
            <div class="p-6">Copyright &copy; {{ todayDate }}</div>
        </footer>
    </div>
</template>

<script setup>
const todayDate = new Date().getFullYear();
</script>
