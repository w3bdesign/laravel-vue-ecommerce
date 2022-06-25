<template>
  <button :type="type" class="
      px-6
      py-2
      font-semibold
      text-white      
      rounded-md
      hover:opacity-95
      focus:outline-none" 
      :class="props.backgroundColor">
    <slot></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  backgroundColor: String
})
</script>