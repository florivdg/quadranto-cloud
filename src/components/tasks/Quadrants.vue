<template>
  <div class="h-full">
    <div id="quadrants" class="h-full">
      <Quadrant
        :priority="prio"
        v-for="prio in prios"
        :key="`task-card-${prio}`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Quadrant from '@/components/tasks/Quadrant.vue'

const prios = [1, 2, 3, 4] as const
</script>

<style>
#quadrants {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);

  & > div {
    grid-column: span 2;
    grid-row: span 2;
  }

  &:has(:focus) {
    .prio-1 {
      &:has(:focus) {
        grid-column: 1 / -2;
        grid-row: 1 / -2;
      }

      &:not(:has(:focus)) {
        grid-column: 1 / 2;
        grid-row: 1 / 4;
      }
    }

    .prio-2 {
      &:has(:focus) {
        grid-column: 2 / -1;
        grid-row: 1 / -2;
      }

      &:not(:has(:focus)) {
        grid-column: -2 / -1;
        grid-row: 1 / 4;
      }
    }

    .prio-3 {
      &:has(:focus) {
        grid-column: 1 / -2;
        grid-row: -1 / 2;
      }

      &:not(:has(:focus)) {
        grid-column: 1 / 2;
        grid-row: 2 / -1;
      }
    }

    .prio-4 {
      &:has(:focus) {
        grid-column: 2 / -1;
        grid-row: -1 / 2;
      }

      &:not(:has(:focus)) {
        grid-column: -2 / -1;
        grid-row: 2 / -1;
      }
    }
  }
}
</style>
