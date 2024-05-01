<template>
  <a
    :href="href"
    class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground"
    :class="[isActive ? 'bg-muted text-foreground' : 'text-muted-foreground']"
  >
    <slot name="icon" iconClass="h-5 w-5"></slot>
    <slot />
  </a>
</template>

<script setup lang="ts">
defineProps<{
  href: string
  isActive: boolean
}>()
</script>
