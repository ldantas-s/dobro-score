<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
import Button from './Button.vue';
import Game from '../entity/Game';

const playerName = ref<HTMLInputElement | null>(null)
const game = inject('game') as Game

const clearRefInputAndFocus = () => {
	if (!playerName.value) return
	playerName.value.value = ''
	playerName.value.focus()
}

const addPlayer = () => {
	if (!playerName.value) return
	game.addPlayer(playerName.value.value)
	clearRefInputAndFocus()

}

onMounted(clearRefInputAndFocus)
</script>
<template>
	<div v-show="game.isIdle()" class="d-flex flex-column gap-8">
		<input type="text" data-test="input-player" class="rounded-2 text-black p-16 text-center bg-white bold-400"
			ref="playerName" />
		<Button data-test="add-player__button" @click="addPlayer" :disabled="game.hasLimitPlayers()">
			Adicionar Jogador
		</Button>
	</div>
</template>
<style scoped></style>