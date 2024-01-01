<script setup lang="ts">
import { inject } from 'vue';

import Table from '../components/Table.vue';
import RoundTitle from '../components/RoundTitle.vue';
import Button from '../components/Button.vue';
import Row from '../components/Row.vue';
import Game from '../entity/Game';

const game = inject('game') as Game
const toggleView = inject('toggleView') as Function

const finish = () => {
  game.finishRound()
  if (game.isFinished()) {
    toggleView('win')
    return
  }

  toggleView('score')
}

</script>
<template>
  <section class="climbing-info">
    <h1>Escaladas</h1>
    <RoundTitle data-test="round-title__climbs" :title="`Rodada atual: ${game.currentRound()}`" />
    <Table :heads="['Nome', 'Esquecido', 'Q. Cartas', 'Posição (Mais Cartas)', 'Pontos']">
      <tr data-test="player-climb" v-for="(player, key) in game.playersOrderByCards" :key="player.name">
        <Row :player="player" :order="key + 1" />
      </tr>
    </Table>
    <Button data-test="finish_round" :click="finish">Finalizar Rodada</Button>
  </section>
</template>
<style scoped></style>