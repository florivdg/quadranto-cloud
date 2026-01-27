<template>
  <Dialog v-model:open="open">
    <DialogContent class="sm:max-w-[575px]">
      <DialogHeader>
        <DialogTitle class="mb-4">{{ t.projects.editProject }}</DialogTitle>
        <DialogDescription class="sr-only">
          {{ t.projects.editProjectDesc }}
        </DialogDescription>
      </DialogHeader>
      <ProjectForm
        mode="edit"
        :locale="locale"
        :initial-values="initialValues"
        @update="handleUpdateProject"
      />
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { updateProject } from '@/api/project'
import ProjectForm from '@/components/projects/ProjectForm.vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { NewProject, Project } from '@/db/schema/projects'
import { createTranslator, type Locale } from '@/i18n'

const props = defineProps<{
  project: Project
  locale: Locale
}>()

const t = computed(() => createTranslator(props.locale))

const open = defineModel<boolean>('open', { default: false })

const initialValues = computed(() => ({
  title: props.project.title,
  description: props.project.description ?? undefined,
  dueDate: props.project.dueDate ?? undefined,
}))

async function handleUpdateProject(payload: NewProject) {
  const [, error] = await updateProject(props.project.id, payload)

  if (error) {
    console.error(error)
    return
  }

  open.value = false
  window.location.reload()
}
</script>
