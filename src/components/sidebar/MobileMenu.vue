<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button variant="outline" size="icon" class="shrink-0 md:hidden">
        <Menu class="h-5 w-5" />
      </Button>
    </SheetTrigger>
    <SheetContent side="left" class="flex flex-col">
      <nav class="grid gap-2 text-lg font-medium">
        <a href="/" class="flex items-center gap-2 text-lg font-semibold">
          <Package2 class="h-6 w-6" />
          <span class="sr-only">quadranto.cloud</span>
        </a>
        <SidebarMenuMobileItem href="/" :is-active="activePath === '/'">
          <template #icon="{ iconClass }">
            <Home :class="iconClass" aria-hidden="true" />
          </template>
          Dashboard
        </SidebarMenuMobileItem>

        <SidebarMenuMobileItem
          href="/projects"
          :is-active="activePath === '/projects'"
        >
          <template #icon="{ iconClass }">
            <component
              :is="activePath === '/projects' ? FolderOpen : FolderClosed"
              :class="iconClass"
              aria-hidden="true"
            />
          </template>
          Projects
        </SidebarMenuMobileItem>

        <SidebarMenuMobileItem
          href="/settings"
          :is-active="activePath === '/settings'"
        >
          <template #icon="{ iconClass }">
            <Settings :class="iconClass" aria-hidden="true" />
          </template>
          Settings
        </SidebarMenuMobileItem>
      </nav>
    </SheetContent>
  </Sheet>
</template>

<script setup lang="ts">
import {
  Menu,
  Package2,
  Home,
  FolderOpen,
  FolderClosed,
  Settings,
} from 'lucide-vue-next'

import SidebarMenuMobileItem from '@/components/sidebar/MobileMenuItem.vue'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import type { Project } from '@/db/schema'

defineProps<{
  activePath: string
  initialProjects?: Project[]
}>()
</script>
