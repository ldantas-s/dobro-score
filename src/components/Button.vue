<script setup lang="ts">
defineProps<{ click: () => void }>()
</script>
<template>
    <button @click="click">
        <slot>submit</slot>
    </button>
</template>
<style scoped></style>