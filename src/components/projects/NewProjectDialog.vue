<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button :variant="variant" class="my-1.5">Create Project...</Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[575px]">
      <DialogHeader>
        <DialogTitle class="mb-4">Create a New Project</DialogTitle>
        <DialogDescription class="sr-only">
          Create a new project. Fill in the form below to get started.
        </DialogDescription>
      </DialogHeader>
      <ProjectForm @create="handleCreateProject" />
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
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
import type { NewProject } from '@/db/schema'

withDefaults(
  defineProps<{
    variant?: ButtonVariants['variant']
  }>(),
  { variant: 'outline' },
)

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
