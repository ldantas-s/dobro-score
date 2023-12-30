<script setup lang="ts">
import { inject, ref } from 'vue';
import Button from './Button.vue';
import Game from '../entity/Game';

const playerName = ref('')
const game = inject('game') as Game
const addPlayer = () => {
	game.addPlayer(playerName.value)
	playerName.value = ''
}
</script>
<template>
	<div v-show="game.isIdle()">
		<input type="text" class="input-player" v-model.trim="playerName" />
		<Button data-test="add-player__button" :click="addPlayer" :disabled="game.hasLimitPlayers()">Adicionar Jogador</Button>
	</div>
</template>
<style scoped></style>