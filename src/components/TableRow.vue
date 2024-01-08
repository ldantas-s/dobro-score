<script setup lang="ts">
defineProps(['isEven'])
</script>
<template>
  <tr :class="`player ${isEven ? 'bg-white' : 'bg-gray-400'} color-green-600 bold-400 text-center`">
    <slot></slot>
  </tr>
</template>
<style scoped></style>