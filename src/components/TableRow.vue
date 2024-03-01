<script setup lang="ts">
defineProps(['isEven']);
defineEmits(['click']);
</script>
<template>
  <tr
    @click="$emit('click')"
    :class="`player ${
      isEven ? 'bg-white' : 'bg-gray-400'
    } text-green-600 bold-400 text-center`"
  >
    <slot></slot>
  </tr>
</template>
<style scoped></style>
