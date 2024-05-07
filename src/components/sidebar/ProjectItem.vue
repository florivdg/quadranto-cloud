<template>
  <a
    :href="href"
    class="ml-3 flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
    :class="[isActive ? 'bg-muted text-primary' : 'text-muted-foreground']"
  >
    <LayoutGrid class="h-4 w-4" />
    <slot />
    <Badge
      v-if="taskCount"
      class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
    >
      {{ taskCount }}
    </Badge>
  </a>
</template>

<script setup lang="ts">
import { LayoutGrid } from 'lucide-vue-next'

import { Badge } from '@/components/ui/badge'

defineProps<{
  href: string
  isActive: boolean
  taskCount?: number
}>()
</script>
