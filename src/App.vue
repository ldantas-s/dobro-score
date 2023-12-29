<script setup lang="ts">
import { reactive, ref } from 'vue';

import Game from './entity/Game'

import Row from './components/Row.vue'
import RoundTitle from './components/RoundTitle.vue'
import Table from './components/Table.vue';
import TableBodyClimb from './components/TableBodyClimb.vue';
import Button from './components/Button.vue';
import InputPlayer from './components/InputPlayer.vue';

const game = reactive(new Game())
let isRoundStarted = ref(false)

const toggleRound = () => isRoundStarted.value = !isRoundStarted.value

const startRound = () => {
  game.startRound()
  toggleRound()
}
const finishRound = () => {
  toggleRound();
  game.finishRound()
}

</script>

<template>
  <section class="round-info" v-show="!isRoundStarted">
    <RoundTitle data-test="round-title__rounds" :title="`Rodadas: ${game.currentRound()} / 3`" />
    <h3 class="distribuition-cards">Distribuir {{ game.cardToDistribute() }} cartas</h3>
    <InputPlayer :game="(game as Game)" />
    <Table :heads="['Jogador', 'Pontos']">
      <TableBodyClimb :players="game.playersOrderByPoints" />
    </Table>
    <Button data-test="start_round" :disabled="game.hasNotPlayersEnough()" :click="startRound">Começar Rodada {{
      game.currentRound() + 1 }}</Button>
  </section>
  <section class="climbing-info" v-show="isRoundStarted">
    <h1>Escaladas</h1>
    <RoundTitle data-test="round-title__climbs" :title="`Rodada atual: ${game.currentRound()}`" />
    <Table :heads="['Nome', 'Esquecido', 'Q. Cartas', 'Posição (Mais Cartas)', 'Pontos']">
      <tr v-for="(player, key) in game.playersOrderByCards" :key="player.name">
        <Row :player="player" :order="key + 1" />
      </tr>
    </Table>
    <Button data-test="finish_round" :click="finishRound">Finalizar Rodada</Button>
  </section>
  <section v-show="game.isFinished()">
    <h1 class="winner-congrats">Congratulations! {{ game.winnerPlayer?.name }} is the Winner with {{
      game.winnerPlayer?.points }} points</h1>
  </section>
</template>

<style scoped></style>
