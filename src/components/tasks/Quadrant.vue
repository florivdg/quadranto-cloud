<template>
  <Card class="flex flex-col">
    <CardHeader class="bg-muted/40 py-3">
      <CardTitle class="truncate leading-normal">{{ title }}</CardTitle>
    </CardHeader>
    <CardContent class="flex flex-1 flex-col overflow-hidden p-0">
      <TaskInput @add="handleAddTask" />
      <ul class="overflow-y-auto">
        <li v-for="task in tasks" class="px-3 py-1.5 odd:bg-muted/40">
          {{ task.title }}
        </li>
      </ul>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import TaskInput from '@/components/tasks/TaskInput.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Priority, Task } from '@/db/schema'

/**
 * Props.
 */
const props = defineProps<{
  priority: Priority
  tasks: Task[]
}>()

/**
 * Compute quadrant title based on priority.
 */
const title = computed(() => {
  switch (props.priority) {
    case 'urgent':
      return 'Urgent and Important 🔥'
    case 'high':
      return 'Important, but not Urgent ⏰'
    case 'medium':
      return 'Urgent, but not Important ⚡'
    case 'low':
      return 'Not Important, not Urgent 💤'
  }
})

/**
 * Handle adding a task.
 * @param title The user input.
 */
async function handleAddTask(title: string) {
  console.log(title)
}
</script>
