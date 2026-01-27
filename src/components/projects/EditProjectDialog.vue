<template>
  <Dialog v-model:open="open">
    <DialogContent class="sm:max-w-[575px]">
      <DialogHeader>
        <DialogTitle class="mb-4">Edit Project</DialogTitle>
        <DialogDescription class="sr-only">
          Edit the project details. Update the form below to save changes.
        </DialogDescription>
      </DialogHeader>
      <ProjectForm
        mode="edit"
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

const props = defineProps<{
  project: Project
}>()

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
