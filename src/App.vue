<script setup lang="ts">
import { provide, reactive, ref } from 'vue';

import Game from './entity/Game';

import RoundView from './view/RoundView.vue';
import ClimbView from './view/ClimbView.vue';
import WinnerView from './view/WinnerView.vue';
import Header from './components/Header.vue';

const game = reactive(new Game());

type StatusView = 'score' | 'climb' | 'win';
const statusView = ref<StatusView>('score');

const toggleView = (status: StatusView) => {
  statusView.value = status;
};
const checkStatusView = (status: StatusView) => ({
  isScoreView: status === 'score',
  isClimbView: status === 'climb',
  isWinView: status === 'win',
});

provide<InstanceType<typeof Game>>('game', game as Game);
provide('toggleView', toggleView);
</script>

<template>
  <div class="p-16 flex flex-col items-center lg:flex-row w-screen">
    <Header></Header>
    <RoundView v-if="checkStatusView(statusView).isScoreView" />
    <ClimbView v-if="checkStatusView(statusView).isClimbView" />
    <WinnerView v-if="checkStatusView(statusView).isWinView" />
  </div>
</template>

<style scoped></style>
