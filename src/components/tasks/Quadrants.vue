<template>
  <div class="h-full overflow-hidden @container/project">
    <div
      class="h-full overflow-y-auto p-4 @2xl/project:h-full @2xl/project:overflow-hidden lg:p-6"
    >
      <div
        class="grid grid-cols-1 gap-4 @2xl/project:h-full @2xl/project:grid-cols-2 @2xl/project:grid-rows-2 @2xl/project:overflow-hidden"
      >
        <Quadrant
          :priority="prio"
          :tasks="tasksForPriority(prio)"
          v-for="prio in prios"
          :key="`task-card-${prio}`"
        />
      </div>
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
