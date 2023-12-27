<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import Row from './components/Row.vue'

type Player = { name: string, points: number, cards: number }
const players: Player[] = reactive([])
const playerName = ref('')
const round = ref(1)
let isRoundStarted = ref(false)

const toggleRound = () => isRoundStarted.value = !isRoundStarted.value

const addPlayer = (name: string) => {
  if (!name) return
  players.push({ name: name, points: 0, cards: 0 })
  playerName.value = ''
}
const startClimbing = () => {
  alert('starting...')
  toggleRound()
}

const hasNotPlayers = () => players.length < 2
const isTooMuchPlayers = () => players.length === 6
const quantityOfCardsToDistribute = () => players.length === 6 ? 5 : 6

const climbingPlayersSortedByCards = computed(() => players.sort((a, b) => {
  if (a.cards > b.cards) return -1
  else if (a.cards < b.cards) return 1
  return 0
}))

const playersSortedByPoints = computed(() => climbingPlayersSortedByCards.value.sort((a, b) => {
  if (a.points > b.points) return -1
  if (a.points < b.points) return 1
  return 0
}))

const pointsProcess = () => {
  round.value++;
  toggleRound();
  climbingPlayersSortedByCards.value.forEach((player, index) => {
    player.points += index+1
    player.cards = 0
  })
}

</script>

<template>
  <section class="round-info" v-show="!isRoundStarted">
    <h1 class="round">Rodada: {{ round }} / 3</h1>
    <h2 class="distribuition-cards">Distribuir {{ quantityOfCardsToDistribute() }} cartas</h2>
    <input type="text" class="input-player" v-model="playerName" />
    <button class="add-player" @click="addPlayer(playerName)" :disabled="isTooMuchPlayers()">Add Player</button>
    <table>
      <thead>
        <tr>
          <th>Jogador</th>
          <th>Pontos</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="player in playersSortedByPoints" class="player">
          <td class="player-name">{{ player.name }}</td>
          <td class="player-points">{{ player.points }}</td>
        </tr>
      </tbody>
    </table>
    <button class="start-climbing" :disabled="hasNotPlayers()" @click="startClimbing()">Começar Rodada {{ round }}</button>
  </section>
  <section class="climbing-info" v-show="isRoundStarted">
    <h1>Climbing</h1>
    <h1 class="round">Rodada: {{ round }} / 3</h1>
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
        <tr v-for="(player, key) in climbingPlayersSortedByCards" :key="key">
          <Row :player="player" :order="key + 1" />
        </tr>
      </tbody>
    </table>
    <button data-testid="process_values" @click="pointsProcess">Processar pontos</button>
  </section>
</template>

<style scoped></style>
