<template>
  <Card class="flex flex-col gap-0 py-0">
    <CardHeader class="bg-muted/40 gap-0 py-3">
      <CardTitle class="flex items-center gap-2 text-2xl leading-normal">
        <template v-if="isEditing">
          <input
            ref="inputRef"
            v-model="editValue"
            type="text"
            class="flex-1 truncate bg-transparent outline-none"
            :placeholder="defaultLabel"
            @keydown.enter="saveLabel"
            @keydown.escape="cancelEdit"
            @blur="saveLabel"
          />
        </template>
        <template v-else>
          <span
            class="flex-1 cursor-pointer truncate"
            :title="t.quadrants.editLabel"
            @dblclick="startEdit"
            >{{ displayLabel }}</span
          >
        </template>
        <span class="shrink-0">{{ emoji }}</span>
      </CardTitle>
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
import { computed, ref, nextTick } from 'vue'

import TaskCell from '@/components/tasks/TaskCell.vue'
import TaskInput from '@/components/tasks/TaskInput.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Priority, QuadrantLabels, Task } from '@/db/schema/projects'
import { createTranslator, type Locale } from '@/i18n'
import {
  resolveQuadrantLabel,
  getQuadrantEmoji,
  getDefaultQuadrantLabel,
} from '@/lib/quadrant-labels'

/**
 * Props.
 */
const props = defineProps<{
  priority: Priority
  tasks: Task[]
  locale: Locale
  customLabels?: QuadrantLabels | null
  projectId: string
}>()

/**
 * Emits.
 */
const emit = defineEmits<{
  add: [title: string]
  toggleDone: [task: Task]
  updateLabel: [priority: Priority, label: string]
}>()

const t = computed(() => createTranslator(props.locale))

/**
 * Edit mode state.
 */
const isEditing = ref(false)
const editValue = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

/**
 * Get the emoji for this quadrant.
 */
const emoji = computed(() => getQuadrantEmoji(props.priority))

/**
 * Get the default i18n label for this quadrant.
 */
const defaultLabel = computed(() =>
  getDefaultQuadrantLabel(props.priority, props.locale),
)

/**
 * Compute display label based on custom labels or i18n default.
 */
const displayLabel = computed(() =>
  resolveQuadrantLabel(props.priority, props.customLabels, props.locale),
)

/**
 * Start inline editing.
 */
function startEdit() {
  editValue.value = props.customLabels?.[props.priority] ?? ''
  isEditing.value = true
  nextTick(() => {
    inputRef.value?.focus()
    inputRef.value?.select()
  })
}

/**
 * Save the edited label.
 */
function saveLabel() {
  if (!isEditing.value) return
  isEditing.value = false
  const newLabel = editValue.value.trim()
  const currentCustom = props.customLabels?.[props.priority] ?? ''

  // Only emit if the value changed
  if (newLabel !== currentCustom) {
    emit('updateLabel', props.priority, newLabel)
  }
}

/**
 * Cancel editing and revert to original value.
 */
function cancelEdit() {
  isEditing.value = false
  editValue.value = ''
}

/**
 * Handle adding a task.
 * @param title The user input.
 */
async function handleAddTask(title: string) {
  emit('add', title)
}
</script>
