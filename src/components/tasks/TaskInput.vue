<template>
  <div class="relative w-full items-center shadow-xs">
    <Input
      type="text"
      :placeholder="t.tasks.addTask"
      class="h-12 rounded-none border-none py-0 pl-8"
      @keyup.enter="handleInput"
    />
    <span
      aria-hidden="true"
      class="absolute inset-y-0 start-0 flex items-center justify-center px-2"
    >
      <Plus class="text-muted-foreground size-5" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
import { computed } from 'vue'

import { Input } from '@/components/ui/input'
import { createTranslator, type Locale } from '@/i18n'

const props = defineProps<{
  locale: Locale
}>()

const t = computed(() => createTranslator(props.locale))

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
