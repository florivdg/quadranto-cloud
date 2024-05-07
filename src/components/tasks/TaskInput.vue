<template>
  <div class="relative w-full items-center p-1.5 shadow-sm">
    <Input
      type="text"
      placeholder="Add task..."
      class="h-8 rounded-none border-none py-0 pl-8"
      @keyup.enter="handleInput"
    />
    <span
      aria-hidden="true"
      class="absolute inset-y-0 start-0 flex items-center justify-center px-2"
    >
      <Plus class="size-5 text-muted-foreground" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { Plus } from 'lucide-vue-next'

import { Input } from '@/components/ui/input'

/**
 * Emits.
 */
const emit = defineEmits<{
  add: [text: string]
}>()

/**
 * Handle user input.
 */
function handleInput(event: InputEvent) {
  const input = event.target as HTMLInputElement
  emit('add', input.value.trim())
  input.value = ''
}
</script>
