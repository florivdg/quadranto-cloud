<template>
  <li
    class="group flex items-center justify-between gap-2 px-3 py-1.5 odd:bg-muted/40"
  >
    <span :class="[task.done ? 'line-through opacity-30' : '']">{{
      task.title
    }}</span>
    <div
      class="flex items-center gap-2 opacity-25 transition-opacity duration-75 group-hover:opacity-100"
    >
      <button @click="$emit('toggleDone', task)">
        <span class="sr-only">Toggle done</span><CheckIcon class="size-5" />
      </button>
    </div>
  </li>
</template>

<script setup lang="ts">
import { CheckIcon } from 'lucide-vue-next'

import type { Task } from '@/db/schema'

/**
 * Props.
 */
defineProps<{
  task: Task
}>()

/**
 * Emits.
 */
defineEmits<{
  toggleDone: [task: Task]
}>()
</script>
