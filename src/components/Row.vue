<script setup lang="ts">
type Player = { name: string; cards: number }
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
  <td class="player-climb-name">{{ player.name }}</td>
  <td><input type="radio" name="forgoteen" class="player-climb-forgotten" /></td>
  <td>
    <input type="number" value="0" class="player-climb-cards__input" @change="handleChangeCards($event, player)"
      v-model="player.cards" />
  </td>
  <td class="player-climb-position">{{ order }}o</td>
  <td class="player-climb-point">{{ order }}</td>
</template>

<style scoped></style>
