<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline" size="icon">
        <MoreVertical class="size-4" />
        <span class="sr-only">{{ t.common.more }}</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="editDialogOpen = true">
        <Pencil class="mr-2 size-4" />
        <span>{{ t.common.edit }}</span>
      </DropdownMenuItem>
      <DropdownMenuItem @click="deleteDialogOpen = true">
        <Trash2 class="mr-2 size-4" />
        <span>{{ t.common.delete }}</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  <EditProjectDialog
    v-model:open="editDialogOpen"
    :project="project"
    :locale="locale"
  />
  <DeleteProjectDialog
    v-model:open="deleteDialogOpen"
    :project="project"
    :locale="locale"
  />
</template>

<script setup lang="ts">
import { MoreVertical, Pencil, Trash2 } from 'lucide-vue-next'
import { computed, ref } from 'vue'

import DeleteProjectDialog from '@/components/projects/DeleteProjectDialog.vue'
import EditProjectDialog from '@/components/projects/EditProjectDialog.vue'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import type { Project } from '@/db/schema/projects'
import { createTranslator, type Locale } from '@/i18n'

const props = defineProps<{
  project: Project
  locale: Locale
}>()

const t = computed(() => createTranslator(props.locale))

const editDialogOpen = ref(false)
const deleteDialogOpen = ref(false)
</script>
