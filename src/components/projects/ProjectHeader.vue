<template>
  <div class="flex justify-between gap-4 pb-4 lg:pb-6">
    <div>
      <div class="flex items-center">
        <h1 class="text-lg font-semibold md:text-2xl">
          {{ project.title }}
        </h1>

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

import ProjectHeaderActions from '@/components/projects/ProjectHeaderActions.vue'
import { type Project } from '@/db/schema/projects'
import type { Locale } from '@/i18n'
import { formatDate } from '@/lib/formatters'

defineProps<{
  project: Project
  locale: Locale
}>()
</script>
