<script setup lang="ts">
import { inject } from 'vue';

import Game from '../entity/Game';

import TableBodyClimb from '../components/TableBodyClimb.vue';
import Table from '../components/Table.vue';
import InputPlayer from '../components/InputPlayer.vue';
import RoundTitle from '../components/RoundTitle.vue';
import Button from '../components/Button.vue';


const game = inject('game') as Game
const toggleView = inject('toggleView') as Function
const start = () => {
  toggleView('climb')
  game.startRound()
}
</script>
<template>
  <section class="round-info">
    <div class="text-center info-section">
      <RoundTitle data-test="round-title__rounds" :title="`Rodadas: ${game.currentRound()} / 3`" />
      <h3 class="distribuition-cards title-3">Distribuir {{ game.cardToDistribute() }} cartas</h3>
    </div>
    <InputPlayer :game="(game as Game)" />
    <Table :heads="['Jogador', 'Pontos']">
      <TableBodyClimb :players="game.playersOrderByPoints" />
    </Table>
    <Button data-test="start_round" :disabled="game.hasNotPlayersEnough()" :click="start">
      Começar Rodada {{ game.currentRound() + 1 }}
    </Button>
  </section>
</template>
<style scoped>
.info-section {
  padding: 16px;
}
</style>