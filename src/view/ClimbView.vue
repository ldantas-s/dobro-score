<script setup lang="ts">
import { inject } from 'vue';

import Table from '../components/Table.vue';
import Button from '../components/Button.vue';
import Row from '../components/Row.vue';
import Game from '../entity/Game';
import TableRow from '../components/TableRow.vue';

const game = inject('game') as Game;
const toggleView = inject('toggleView') as Function;

const finish = () => {
  game.finishRound();
  if (game.isFinished()) {
    toggleView('win');
    return;
  }
  toggleView('score');
};
</script>
<template>
  <section class="flex flex-col w-full lg:w-7/12">
    <div class="text-center py-16">
      <h1 class="title-1">Escaladas</h1>
      <h2 class="title-2" data-test="round-title__climbs">
        Rodada atual: {{ game.currentRound() }}
      </h2>
    </div>
    <Table
      :heads="[
        'Nome',
        'Esquecido',
        'Q. Cartas',
        'Posição (Mais Cartas)',
        'Pontos',
      ]"
      class="mb-8"
    >
      <TableRow
        data-test="player-climb"
        v-for="(player, key) in game.playersOrderByCards"
        :is-even="key % 2 === 0"
        :key="player.name"
      >
        <Row
          :player="player"
          :order="key + 1"
          @define-forgotten="game.defineForgottenPlayer"
        />
      </TableRow>
    </Table>
    <Button data-test="finish_round" @click="finish" class="self-center"
      >Finalizar Rodada</Button
    >
  </section>
</template>
<style scoped></style>
