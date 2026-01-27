<template>
  <div class="flex justify-between gap-4 pb-4 lg:pb-6">
    <div>
      <div class="flex items-center">
        <template v-if="isEditing">
          <input
            ref="inputRef"
            v-model="editValue"
            type="text"
            class="bg-transparent text-lg font-semibold outline-none md:text-2xl"
            @keydown.enter="saveTitle"
            @keydown.escape="cancelEdit"
            @blur="saveTitle"
          />
        </template>
        <template v-else>
          <h1
            class="cursor-pointer text-lg font-semibold md:text-2xl"
            :title="t.projects.editTitle"
            @dblclick="startEdit"
          >
            {{ project.title }}
          </h1>
        </template>

        <div
          v-if="project.dueDate"
          class="text-muted-foreground ml-2.5 flex items-center text-sm"
        >
          <CalendarIcon class="text-muted-foreground mr-1 size-4" />

          <time datetime="{project.dueDate}">
            {{ formatDate(project.dueDate, locale) }}
          </time>
        </div>
      </div>
      <p class="text-muted-foreground line-clamp-3 text-xl lg:line-clamp-2">
        {{ project.description }}
      </p>
    </div>
    <div>
      <ProjectHeaderActions :project="project" :locale="locale" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CalendarIcon } from 'lucide-vue-next'
import { computed, ref, nextTick } from 'vue'

import ProjectHeaderActions from '@/components/projects/ProjectHeaderActions.vue'
import { type Project } from '@/db/schema/projects'
import { createTranslator, type Locale } from '@/i18n'
import { formatDate } from '@/lib/formatters'

const props = defineProps<{
  project: Project
  locale: Locale
}>()

const emit = defineEmits<{
  updateTitle: [title: string]
}>()

const t = computed(() => createTranslator(props.locale))

/**
 * Edit mode state.
 */
const isEditing = ref(false)
const editValue = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

/**
 * Start inline editing.
 */
function startEdit() {
  editValue.value = props.project.title
  isEditing.value = true
  nextTick(() => {
    inputRef.value?.focus()
    inputRef.value?.select()
  })
}

/**
 * Save the edited title.
 */
function saveTitle() {
  if (!isEditing.value) return
  isEditing.value = false
  const newTitle = editValue.value.trim()

  // Don't save empty titles - revert to original
  if (!newTitle) {
    editValue.value = ''
    return
  }

  // Only emit if the value changed
  if (newTitle !== props.project.title) {
    emit('updateTitle', newTitle)
  }
}

/**
 * Cancel editing and revert to original value.
 */
function cancelEdit() {
  isEditing.value = false
  editValue.value = ''
}
</script>
