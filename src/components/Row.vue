<script setup lang="ts">
import Player from '../entity/Player';
type Row = {
  player: Player;
  order: number;
};
const props = defineProps<Row>();
const event = defineEmits(['defineForgotten']);
</script>

<template>
  <td class="px-24" :data-test="`${props.player.name}-name`">
    {{ props.player.name }}
  </td>
  <td class="p-8">
    <input
      type="radio"
      name="forgotten"
      :data-test="`player-climb-forgotten-${props.player.name}`"
      class="player-climb-forgotten"
      @click="$emit('defineForgotten', player.name)"
    />
  </td>
  <td class="p-8">
    <input
      type="number"
      :data-test="`${props.player.name}-cards`"
      class="player-climb-cards__input w-[42px] text-center border-b-4 border-green-600"
      v-model.lazy="props.player.cards"
    />
  </td>
  <td
    class="player-climb-position"
    :data-test="`${props.player.name}-position`"
  >
    {{ props.order }}o
  </td>
  <td class="player-climb-point" :data-test="`${props.player.name}-points`">
    {{ props.order }}
  </td>
</template>

<style scoped></style>
