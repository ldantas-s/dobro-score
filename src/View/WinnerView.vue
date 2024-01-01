<script setup lang="ts">
import { inject } from 'vue';
import Game from '../entity/Game';

const game = inject('game') as Game
</script>

<template>
  <section data-test="view-winner">
    <h1 class="winner-congrats">Congratulations! {{ game.winnerPlayer?.name }} is the Winner with {{
      game.winnerPlayer?.points }} points</h1>
  </section>
</template>
<style scoped></style>