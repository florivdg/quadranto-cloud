<template>
  <Card class="flex flex-col gap-0 py-0">
    <CardHeader class="bg-muted/40 gap-0 py-3">
      <CardTitle class="truncate text-2xl leading-normal">{{
        title
      }}</CardTitle>
    </CardHeader>
    <CardContent class="flex flex-1 flex-col overflow-hidden p-0">
      <TaskInput :locale="locale" @add="handleAddTask" />
      <ul class="overflow-y-auto">
        <TaskCell
          v-for="task in tasks"
          :task="task"
          :locale="locale"
          :key="task.id"
          @toggle-done="$emit('toggleDone', $event)"
        />
      </ul>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import TaskCell from '@/components/tasks/TaskCell.vue'
import TaskInput from '@/components/tasks/TaskInput.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Priority, Task } from '@/db/schema/projects'
import { createTranslator, type Locale } from '@/i18n'

/**
 * Props.
 */
const props = defineProps<{
  priority: Priority
  tasks: Task[]
  locale: Locale
}>()

/**
 * Emits.
 */
const emit = defineEmits<{
  add: [title: string]
  toggleDone: [task: Task]
}>()

const t = computed(() => createTranslator(props.locale))

/**
 * Compute quadrant title based on priority.
 */
const title = computed(() => {
  switch (props.priority) {
    case 'urgent':
      return `${t.value.quadrants.urgentImportant} 🔥`
    case 'high':
      return `${t.value.quadrants.importantNotUrgent} ⏰`
    case 'medium':
      return `${t.value.quadrants.urgentNotImportant} ⚡`
    case 'low':
      return `${t.value.quadrants.notImportantNotUrgent} 💤`
  }
})

/**
 * Handle adding a task.
 * @param title The user input.
 */
async function handleAddTask(title: string) {
  emit('add', title)
}
</script>
