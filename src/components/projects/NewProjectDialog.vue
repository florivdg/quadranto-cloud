<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button :variant="variant" class="my-1.5">{{
        t.projects.createProject
      }}</Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[575px]">
      <DialogHeader>
        <DialogTitle class="mb-4">{{
          t.projects.createNewProject
        }}</DialogTitle>
        <DialogDescription class="sr-only">
          {{ t.projects.createNewProjectDesc }}
        </DialogDescription>
      </DialogHeader>
      <ProjectForm
        :locale="locale"
        @create="handleCreateProject"
        mode="create"
      />
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { addProject } from '@/api/project'
import ProjectForm from '@/components/projects/ProjectForm.vue'
import { Button } from '@/components/ui/button'
import { type ButtonVariants } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import type { NewProject } from '@/db/schema/projects'
import { createTranslator, type Locale } from '@/i18n'

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariants['variant']
    locale: Locale
  }>(),
  { variant: 'outline' },
)

const t = computed(() => createTranslator(props.locale))

async function handleCreateProject(payload: NewProject) {
  const [project, error] = await addProject(payload)

  if (error) {
    console.error(error)
    return
  } else if (project) {
    const projectId = project.id
    window.location.href = `/projects/${projectId}`
  }
}
</script>
