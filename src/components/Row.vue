<script setup lang="ts">
import Player from '../entity/Player';

type Row = {
  player: Player
  order: number
}
defineProps<Row>()
</script>

<template>
  <td class="p-8" :data-test="`${player.name}-name`">{{ player.name }}</td>
  <td class="p-8"><input type="radio" name="forgoteen" class="player-climb-forgotten" /></td>
  <td class="p-8">
    <input type="number" :data-test="`${player.name}-cards`" class="player-climb-cards__input"
      v-model.lazy="player.cards" />
  </td>
  <td class="player-climb-position" :data-test="`${player.name}-position`">{{ order }}o</td>
  <td class="player-climb-point" :data-test="`${player.name}-points`">{{ order }}</td>
</template>

<style scoped></style>
