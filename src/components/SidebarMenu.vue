<template>
  <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
    <a
      v-for="item in navItems"
      :href="item.href"
      class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
    >
      <component :is="item.icon" class="h-4 w-4" />
      {{ item.name }}
    </a>
  </nav>
</template>

<script setup lang="ts">
import { navItems } from '@/lib/nav'
</script>
