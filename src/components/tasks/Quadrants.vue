<template>
  <div class="h-full overflow-hidden @container/project">
    <div
      class="h-full overflow-y-auto p-4 @2xl/project:flex @2xl/project:h-full @2xl/project:flex-col @2xl/project:overflow-hidden lg:p-6"
    >
      <ProjectHeader :project="project" :locale="locale" />
      <div
        class="grid grid-cols-1 gap-4 @2xl/project:h-full @2xl/project:grid-cols-2 @2xl/project:grid-rows-2 @2xl/project:overflow-hidden"
      >
        <Quadrant
          :priority="prio"
          :tasks="tasksForPriority(prio)"
          v-for="prio in prios"
          :key="`task-card-${prio}`"
          @add="handleAddTask($event, prio)"
          @toggle-done="handleToggleDone($event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { addTask, updateTask } from '@/api'
import ProjectHeader from '@/components/projects/ProjectHeader.vue'
import Quadrant from '@/components/tasks/Quadrant.vue'
import type { NewTask, Priority, Project, Task } from '@/db/schema'

/**
 * Available priorities.
 */
const prios: Priority[] = ['urgent', 'high', 'medium', 'low']

/**
 * Props.
 */
const props = defineProps<{
  initialTasks: Task[]
  project: Project
  locale?: string
}>()

/**
 * Tasks ref.
 * Local truth of tasks.
 */
const tasks = ref<Task[]>(props.initialTasks)

/**
 * Returns an array of tasks filtered by priority.
 *
 * @param priority - The priority to filter tasks by.
 * @returns - An array of filtered tasks.
 */
function tasksForPriority(priority: Priority) {
  return tasks.value.filter((task) => task.priority === priority)
}

/**
 * Handle adding a task.
 *
 * @param title - The title of the task.
 * @param priority - The priority of the task.
 */
async function handleAddTask(title: string, priority: Priority) {
  /// Set the data for the new task.
  const taskData: NewTask = {
    title,
    priority,
    projectId: props.project.id,
  }

  /// Update local tasks.
  const tempId = self.crypto.randomUUID()
  tasks.value.unshift({ ...(taskData as Task), id: tempId })

  /// Persist the task to the database.
  const [task, error] = await addTask(taskData)

  if (task) {
    /// Update local tasks with the persisted task.
    tasks.value = tasks.value.map((t) => (t.id === tempId ? task : t))
  } else {
    /// Remove the task from local tasks when failed to persist.
    tasks.value = tasks.value.filter((t) => t.id !== tempId)

    // TODO: Show error message.
    console.error(error)
  }
}

/**
 * Handle toggling the done state of a task.
 *
 * @param task - The task to toggle the done state of.
 */
async function handleToggleDone(task: Task) {
  /// Update local tasks.
  tasks.value = tasks.value.map((t) =>
    t.id === task.id ? { ...t, done: !t.done } : t,
  )

  /// Persist the task to the database.
  const [updatedTask, error] = await updateTask(task.id, { done: !task.done })

  if (updatedTask) {
    /// Update local tasks with the persisted task.
    tasks.value = tasks.value.map((t) => (t.id === task.id ? updatedTask : t))
  } else {
    /// Revert the task when failed to persist.
    tasks.value = tasks.value.map((t) =>
      t.id === task.id ? { ...t, done: !t.done } : t,
    )

    /// TODO: Show error message.
    console.error(error)
  }
}
</script>
