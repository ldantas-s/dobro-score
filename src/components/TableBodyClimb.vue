<script setup lang="ts">
import Player from '../entity/Player';

defineProps<{ players: Player[] }>()
</script>
<template>
	<tr v-for="player in players" class="player" :key="player.name">
		<td class="player-name">{{ player.name }}</td>
		<td class="player-points">{{ player.points }}</td>
	</tr>
</template>
<style scoped></style>