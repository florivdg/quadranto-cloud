<template>
  <div class="h-full">
    <div id="quadrants" class="grid h-full grid-cols-2 grid-rows-2 gap-4">
      <Quadrant
        :priority="prio"
        :tasks="tasksForPriority(prio)"
        v-for="prio in prios"
        :key="`task-card-${prio}`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Quadrant from '@/components/tasks/Quadrant.vue'
import type { Priority, Task } from '@/db/schema'

const prios: Priority[] = ['urgent', 'high', 'medium', 'low']

const props = defineProps<{
  initialTasks: Task[]
}>()

function tasksForPriority(priority: Priority) {
  return props.initialTasks.filter((task) => task.priority === priority)
}
</script>
