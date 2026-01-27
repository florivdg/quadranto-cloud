<template>
  <Dialog v-model:open="open">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Delete Project</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete "{{ project.title }}"? This action
          cannot be undone and will remove all associated tasks.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter class="gap-2">
        <Button variant="outline" @click="open = false">Cancel</Button>
        <Button
          variant="destructive"
          :disabled="isDeleting"
          @click="handleDelete"
        >
          <template v-if="isDeleting">Deleting...</template>
          <template v-else>Delete</template>
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { deleteProject } from '@/api/project'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { Project } from '@/db/schema/projects'

const props = defineProps<{
  project: Project
}>()

const open = defineModel<boolean>('open', { default: false })
const isDeleting = ref(false)

async function handleDelete() {
  isDeleting.value = true
  const [, error] = await deleteProject(props.project.id)

  if (error) {
    console.error(error)
    isDeleting.value = false
    return
  }

  window.location.href = '/projects'
}
</script>
