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
	<div v-show="game.isIdle()" class="d-flex flex-column gap-8">
		<input type="text" data-test="input-player" class="rounded-2 text-black p-16 text-center bg-white bold-400" v-model.trim="playerName" />
		<Button data-test="add-player__button" @click="addPlayer" :disabled="game.hasLimitPlayers()">
			Adicionar Jogador
		</Button>
	</div>
</template>
<style scoped></style>