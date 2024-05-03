<template>
  <div :class="[`prio-${priority}`, classes]" class="rounded-lg p-4">
    <input
      type="text"
      class="tasks w-full rounded-md border border-gray-300 px-2 py-3 text-black"
      placeholder="Add a task..."
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  priority: 1 | 2 | 3 | 4
}>()

const classes = computed(() => ({
  'bg-lime-100': props.priority === 1,
  'bg-sky-100': props.priority === 2,
  'bg-yellow-100': props.priority === 3,
  'bg-red-100': props.priority === 4,
}))
</script>
