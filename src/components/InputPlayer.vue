<script setup lang="ts">
import { ref } from 'vue';
import Button from './Button.vue';
import Game from '../entity/Game';

const props = defineProps<{ game: InstanceType<typeof Game> }>()
const playerName = ref('')
const addPlayer = () => {
	props.game.addPlayer(playerName.value)
	playerName.value = ''
}
</script>
<template>
	<div v-show="game.isIdle()">
		<input type="text" class="input-player" v-model="playerName" />
		<Button data-test="add-player__button" :click="addPlayer" :disabled="game.hasLimitPlayers()">Adicionar Jogador</Button>
	</div>
</template>
<style scoped></style>