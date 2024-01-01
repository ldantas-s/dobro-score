<script setup lang="ts">
import Player from '../entity/Player';

type Row = {
  player: Player
  order: number
}
defineProps<Row>()

const handleChangeCards = (event: Event, player: Player) => {
  const input = event.target as HTMLInputElement
  player.cards = Number(input.value)
}

</script>

<template>
  <td class="player-climb-name" :data-test="`${player.name}-name`">{{ player.name }}</td>
  <td><input type="radio" name="forgoteen" class="player-climb-forgotten" /></td>
  <td>
    <input type="number" :data-test="`${player.name}-cards`" class="player-climb-cards__input"
      @change="handleChangeCards($event, player)" v-model.lazy="player.cards" />
  </td>
  <td class="player-climb-position" :data-test="`${player.name}-position`">{{ order }}o</td>
  <td class="player-climb-point" :data-test="`${player.name}-points`">{{ order }}</td>
</template>

<style scoped></style>
