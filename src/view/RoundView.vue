<script setup lang="ts">
import { inject } from 'vue';

import Game from '../entity/Game';

import TableRow from '../components/TableRow.vue';
import Table from '../components/Table.vue';
import InputPlayer from '../components/InputPlayer.vue';
import Button from '../components/Button.vue';


const game = inject('game') as Game
const toggleView = inject('toggleView') as Function
const start = () => {
  toggleView('climb')
  game.startRound()
}
</script>
<template>
  <section data-test="round-info" class="d-flex flex-column w-full">
    <div class="text-center py-16">
      <h1 class="title-1" data-test="round-title__rounds">Rodadas: {{game.currentRound()}} / 3</h1>
      <h3 class="distribuition-cards title-2">Distribuir {{ game.cardToDistribute() }} cartas</h3>
    </div>
    <InputPlayer :game="(game as Game)" />
    <Table :heads="['Jogador', 'Pontos']">
      <TableRow v-for="(player, index) in game.playersOrderByPoints" :is-even="index % 2 === 0" :key="player.name">
        <td class="player-name p-16">{{ player.name }}</td>
        <td class="player-points">{{ player.points }}</td>
      </TableRow>
    </Table>
    <Button data-test="start_round" :disabled="game.hasNotPlayersEnough()" :click="start">
      Começar Rodada {{ game.currentRound() + 1 }}
    </Button>
  </section>
</template>
<style scoped></style>