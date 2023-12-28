<script setup lang="ts">
import { reactive, ref } from 'vue';
import Row from './components/Row.vue'
import Game from './entity/Game'

const game = reactive(new Game())
const playerName = ref('')
let isRoundStarted = ref(false)

const toggleRound = () => isRoundStarted.value = !isRoundStarted.value

const addPlayer = (name: string) => {
  game.addPlayer(name)
  playerName.value = ''
}
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
    <h1 class="rounds">Rodadas: {{ game.currentRound() }} / 3</h1>
    <h2 class="distribuition-cards">Distribuir {{ game.cardToDistribute() }} cartas</h2>
    <div v-show="game.currentRound() < 1">
      <input type="text" class="input-player" v-model="playerName" />
      <button class="add-player" @click="addPlayer(playerName)" :disabled="game.hasLimitPlayers()">Add Player</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>Jogador</th>
          <th>Pontos</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="player in game.playersOrderByPoints" class="player" :key="player.name">
          <td class="player-name">{{ player.name }}</td>
          <td class="player-points">{{ player.points }}</td>
        </tr>
      </tbody>
    </table>
    <button class="start-round" :disabled="game.hasNotPlayersEnough()" @click="startRound">Começar Rodada {{
      game.currentRound() + 1 }}</button>
  </section>
  <section class="climbing-info" v-show="isRoundStarted">
    <h1>Escaladas</h1>
    <h2 class="climbing-info__round">Rodada atual: {{ game.currentRound() }}</h2>
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Esquecido</th>
          <th>cartas</th>
          <th>Posição (mais cartas)</th>
          <th>Pontos</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(player, key) in game.playersOrderByCards" :key="player.name">
          <Row :player="player" :order="key + 1" />
        </tr>
      </tbody>
    </table>
    <button data-test="finish_round" @click="finishRound">Finalizar Rodada</button>
  </section>
  <section v-show="game.currentRound() === 3">
    <h1 class="winner-congrats">Congratulations! {{ game.winnerPlayer?.name }} is the Winner with {{ game.winnerPlayer?.points }} points</h1>
  </section>
</template>

<style scoped></style>
