<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ title }}</CardTitle>
    </CardHeader>
    <CardContent>
      <ul>
        <li v-for="task in tasks">{{ task.title }}</li>
      </ul>
    </CardContent>
    <CardFooter></CardFooter>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import type { Priority, Task } from '@/db/schema'

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
