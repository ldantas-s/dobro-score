<script setup lang="ts">
import { inject } from 'vue';
import Game from '../entity/Game';
import Button from '../components/Button.vue';
const game = inject('game') as Game
const toggleView = inject('toggleView') as Function

const newGame = () => {
  toggleView('score')
  game.reset()
}
</script>
<template>
  <section data-test="view-winner" class="d-flex flex-column">

    <h1 v-for="player in game.winnerPlayer" :key="player.name" class="winner-congrats text-center my-16 title-1">
      Congratulations! {{ player.name }} is the Winner with {{ player.points }} points
    </h1>
    <Button @click="newGame()">Novo jogo</Button>
  </section>
</template>
<style scoped></style>