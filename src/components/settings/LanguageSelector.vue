<template>
  <div class="space-y-4">
    <div>
      <h3 class="text-lg font-medium">{{ t.settings.language }}</h3>
      <p class="text-muted-foreground text-sm">
        {{ t.settings.languageDescription }}
      </p>
    </div>

    <div class="flex items-center gap-4">
      <Select v-model="selectedValue">
        <SelectTrigger class="w-[200px]">
          <SelectValue :placeholder="t.settings.language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="auto">{{ t.settings.automatic }}</SelectItem>
          <SelectItem value="en">{{ t.settings.english }}</SelectItem>
          <SelectItem value="de">{{ t.settings.german }}</SelectItem>
        </SelectContent>
      </Select>

      <Button @click="saveLanguage" :disabled="!hasChanges">
        {{ t.settings.saveLanguage }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  clearClientLocale,
  createTranslator,
  getBrowserLocale,
  setClientLocale,
  type Locale,
} from '@/i18n'

const props = defineProps<{
  locale: Locale
  localeIsStored: boolean
}>()

type LocaleValue = Locale | 'auto'

// Initialize with correct value based on server-side knowledge of stored preference
const initialLocaleValue: LocaleValue = props.localeIsStored
  ? props.locale
  : 'auto'
const selectedValue = ref<LocaleValue>(initialLocaleValue)
const initialValue = ref<LocaleValue>(initialLocaleValue)

const displayLocale = computed<Locale>(() => {
  if (selectedValue.value === 'auto') {
    // During SSR, navigator is undefined - use server-provided locale
    return typeof navigator !== 'undefined' ? getBrowserLocale() : props.locale
  }
  return selectedValue.value
})

const t = computed(() => createTranslator(displayLocale.value))

const hasChanges = computed(() => selectedValue.value !== initialValue.value)

function saveLanguage() {
  if (!hasChanges.value) return

  if (selectedValue.value === 'auto') {
    clearClientLocale()
  } else {
    setClientLocale(selectedValue.value)
  }

  window.location.reload()
}
</script>
