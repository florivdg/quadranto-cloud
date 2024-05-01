<template>
  <a
    :href="href"
    class="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
    :class="[isActive ? 'bg-muted text-primary' : 'text-muted-foreground']"
  >
    <slot name="icon" iconClass="h-4 w-4"></slot>
    <slot />
  </a>
</template>

<script setup lang="ts">
defineProps<{
  href: string
  isActive: boolean
}>()
</script>
