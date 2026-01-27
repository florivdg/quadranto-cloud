<template>
  <Dialog v-model:open="open">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{{ t.projects.deleteProject }}</DialogTitle>
        <DialogDescription>
          {{ t.projects.deleteProjectConfirm(project.title) }}
        </DialogDescription>
      </DialogHeader>
      <DialogFooter class="gap-2">
        <Button variant="outline" @click="open = false">{{
          t.common.cancel
        }}</Button>
        <Button
          variant="destructive"
          :disabled="isDeleting"
          @click="handleDelete"
        >
          <template v-if="isDeleting">{{ t.projects.deleting }}</template>
          <template v-else>{{ t.common.delete }}</template>
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

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
import { createTranslator, type Locale } from '@/i18n'

const props = defineProps<{
  project: Project
  locale: Locale
}>()

const t = computed(() => createTranslator(props.locale))

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
