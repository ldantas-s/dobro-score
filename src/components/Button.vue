<script setup lang="ts">
defineProps<{ click: () => void, disabled?: boolean }>()
</script>
<template>
	<button @click="click" :class="`bold-400 py-8 rounded-4 bg-blue-500 py-10 ${disabled ? 'bg-gray-500' : 'hover:bg-blue-600'}`"
		:disabled="disabled">
		<slot>submit</slot>
	</button>
</template>
<style scoped></style>