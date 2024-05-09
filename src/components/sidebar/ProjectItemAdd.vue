<template>
  <button
    class="ml-3 flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
    @click="$emit('add')"
  >
    <CirclePlus class="h-4 w-4" />
    New Project...
  </button>
</template>

<script setup lang="ts">
import { CirclePlus } from 'lucide-vue-next'

defineEmits<{
  add: [void]
}>()
</script>
