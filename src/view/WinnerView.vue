<script setup lang="ts">
import { inject } from 'vue';
import Game from '../entity/Game';
import Button from '../components/Button.vue';
const game = inject('game') as Game;
const toggleView = inject('toggleView') as Function;

const newGame = () => {
  toggleView('score');
  game.reset();
};
</script>
<template>
  <section data-test="view-winner" class="flex flex-col lg:w-7/12">
    <h1
      v-for="player in game.winnerPlayer"
      :key="player.name"
      class="winner-congrats text-center text-white my-8 title-1 self-center"
    >
      Congratulations!
      <span
        class="before:content-[''] before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-green-600 relative inline-block"
      >
        <span class="relative text-white">{{ player.name }}</span>
      </span>
      is the Winner with {{ player.points }} points
    </h1>
    <Button @click="newGame()">Novo jogo</Button>
  </section>
</template>
<style scoped></style>
