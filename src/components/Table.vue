<script setup lang="ts">
defineProps<{ heads: string[] }>();
</script>
<template>
  <table>
    <thead>
      <tr>
        <th class="p-8 break-words bg-green-500" v-for="head in heads" :key="head">
          {{ head }}
        </th>
      </tr>
    </thead>
    <tbody>
      <slot></slot>
    </tbody>
  </table>
</template>
<style scoped></style>
