<template>
  <Card class="flex flex-col">
    <CardHeader class="bg-muted/40">
      <CardTitle class="truncate leading-normal">{{ title }}</CardTitle>
    </CardHeader>
    <CardContent class="flex-1 overflow-y-auto py-0">
      <ul>
        <li v-for="task in tasks">{{ task.title }}</li>
      </ul>
      <ul>
        <li v-for="task in tasks">{{ task.title }}</li>
      </ul>
      <ul>
        <li v-for="task in tasks">{{ task.title }}</li>
      </ul>
      <ul>
        <li v-for="task in tasks">{{ task.title }}</li>
      </ul>
      <ul>
        <li v-for="task in tasks">{{ task.title }}</li>
      </ul>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Priority, Task } from '@/db/schema'

/**
 * Props.
 */
const props = defineProps<{
  priority: Priority
  tasks: Task[]
}>()

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
</script>
