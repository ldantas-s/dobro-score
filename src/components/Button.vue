<script setup lang="ts">
defineProps<{ disabled?: boolean }>()
defineEmits(['click'])
</script>
<template>
	<button @click="$emit('click')" :class="`bold-400 p-16 rounded-4 bg-blue-500 ${disabled ? 'bg-gray-500' : 'hover:bg-blue-600'}`"
		:disabled="disabled">
		<slot>submit</slot>
	</button>
</template>
<style scoped></style>