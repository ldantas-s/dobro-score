<script setup lang="ts">
import { inject } from 'vue';

import Game from '../entity/Game';

import TableRow from '../components/TableRow.vue';
import Table from '../components/Table.vue';
import InputPlayer from '../components/InputPlayer.vue';
import Button from '../components/Button.vue';

const game = inject('game') as Game;
const toggleView = inject('toggleView') as Function;
const start = () => {
  toggleView('climb');
  game.startRound();
};
</script>
<template>
  <section data-test="round-info" class="flex flex-col w-full lg:w-7/12">
    <div class="text-center py-16">
      <h1 class="title-1" data-test="round-title__rounds">
        Rodadas: {{ game.currentRound() }} / 3
      </h1>
      <h3 class="distribuition-cards title-2">
        Distribuir {{ game.cardToDistribute() }} cartas
      </h3>
    </div>
    <InputPlayer />
    <Table :heads="['Jogador', 'Pontos']" class="my-2">
      <TableRow
        v-for="(player, index) in game.playersOrderByPoints"
        :is-even="index % 2 === 0"
        :key="player.name"
      >
        <td class="player-name p-16 lg:p-8" :data-test="`player-${player.name}`">
          {{ player.name }}
        </td>
        <td class="player-points" :data-test="`player-points-${player.name}`">
          {{ player.points }}
        </td>
      </TableRow>
    </Table>
    <Button
      data-test="start_round"
      :disabled="game.hasNotPlayersEnough()"
      @click="start"
      class="self-center"
    >
      Começar Rodada {{ game.currentRound() + 1 }}
    </Button>
  </section>
</template>
<style scoped></style>
