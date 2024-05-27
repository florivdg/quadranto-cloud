<template>
  <div class="flex justify-between gap-4 pb-4 lg:pb-6">
    <div>
      <div class="flex items-center">
        <h1 class="text-lg font-semibold md:text-2xl">
          {{ project.title }}
        </h1>

        <div
          v-if="project.dueDate"
          class="ml-2.5 flex items-center text-sm text-muted-foreground"
        >
          <CalendarIcon class="mr-1 h-4 w-4 text-muted-foreground" />

          <time datetime="{project.dueDate}">
            {{ formatDate(project.dueDate, locale) }}
          </time>
        </div>
      </div>
      <p class="line-clamp-3 text-xl text-muted-foreground lg:line-clamp-2">
        {{ project.description }}
      </p>
    </div>
    <div>
      <ProjectHeaderActions />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CalendarIcon } from 'lucide-vue-next'

import ProjectHeaderActions from '@/components/projects/ProjectHeaderActions.vue'
import { type Project } from '@/db/schema'
import { formatDate } from '@/lib/formatters'

defineProps<{
  project: Project
  locale?: string
}>()
</script>
