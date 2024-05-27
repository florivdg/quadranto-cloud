<template>
  <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
    <SidebarMenuItem href="/" :is-active="activePath === '/'">
      <template #icon="{ iconClass }">
        <Home :class="iconClass" aria-hidden="true" />
      </template>
      Dashboard
    </SidebarMenuItem>

    <SidebarMenuItem href="/projects" :is-active="activePath === '/projects'">
      <template #icon="{ iconClass }">
        <component
          :is="activePath.startsWith('/projects') ? FolderOpen : FolderClosed"
          :class="iconClass"
          aria-hidden="true"
        />
      </template>
      Projects
    </SidebarMenuItem>

    <slot name="new-project" v-if="initialProjects?.length" />

    <SidebarProjectItem
      v-for="project in initialProjects"
      :href="`/projects/${project.id}`"
      :is-active="activePath.includes(project.id)"
      :key="project.id"
      >{{ project.title }}</SidebarProjectItem
    >

    <SidebarMenuItem href="/settings" :is-active="activePath === '/settings'">
      <template #icon="{ iconClass }">
        <Settings :class="iconClass" aria-hidden="true" />
      </template>
      Settings
    </SidebarMenuItem>
  </nav>
</template>

<script setup lang="ts">
import { Home, FolderOpen, FolderClosed, Settings } from 'lucide-vue-next'

import SidebarMenuItem from '@/components/sidebar/MenuItem.vue'
import SidebarProjectItem from '@/components/sidebar/ProjectItem.vue'
import type { Project } from '@/db/schema'

defineProps<{
  activePath: string
  initialProjects?: Project[]
}>()
</script>
