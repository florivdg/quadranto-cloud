<template>
  <li
    class="group odd:bg-muted/40 flex items-center justify-between gap-2 px-3 py-1.5"
  >
    <span :class="[task.done ? 'line-through opacity-30' : '']">{{
      task.title
    }}</span>
    <div
      class="flex items-center gap-2 opacity-25 transition-opacity duration-75 group-hover:opacity-100"
    >
      <button @click="$emit('toggleDone', task)">
        <span class="sr-only">{{ t.tasks.toggleDone }}</span
        ><CheckIcon class="size-5" />
      </button>
    </div>
  </li>
</template>

<script setup lang="ts">
import { CheckIcon } from 'lucide-vue-next'
import { computed } from 'vue'

import type { Task } from '@/db/schema/projects'
import { createTranslator, type Locale } from '@/i18n'

/**
 * Props.
 */
const props = defineProps<{
  task: Task
  locale: Locale
}>()

const t = computed(() => createTranslator(props.locale))

/**
 * Emits.
 */
defineEmits<{
  toggleDone: [task: Task]
}>()
</script>
