<script setup lang="ts">
defineProps<{ heads: string[] }>()
</script>
<template>
	<table>
		<thead>
			<tr>
				<th v-for="head in heads" :key="head">{{ head }}</th>
			</tr>
		</thead>
		<tbody>
			<slot></slot>
		</tbody>
	</table>
</template>
<style scoped></style>