<template>
  <form class="w-full space-y-4" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="title">
      <FormItem>
        <FormLabel class="flex items-center">
          {{ t.projectForm.title }}
        </FormLabel>
        <FormControl>
          <Input
            type="text"
            :placeholder="t.projectForm.titlePlaceholder"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="description">
      <FormItem>
        <FormLabel>{{ t.projectForm.description }}</FormLabel>
        <FormControl>
          <Textarea
            :placeholder="t.projectForm.descriptionPlaceholder"
            class="resize-none"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField name="dueDate">
      <FormItem class="flex flex-col">
        <FormLabel>{{ t.projectForm.dueDate }}</FormLabel>
        <Popover>
          <PopoverTrigger as-child>
            <FormControl>
              <Button
                variant="outline"
                :class="
                  cn(
                    'w-[240px] ps-3 text-start font-normal',
                    !dueDateValue && 'text-muted-foreground',
                  )
                "
              >
                <span>{{
                  dueDateValue
                    ? df.format(toDate(dueDateValue))
                    : t.projectForm.dueDatePlaceholder
                }}</span>
                <CalendarIcon class="ms-auto size-4 opacity-50" />
              </Button>
              <input hidden />
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="w-auto p-0">
            <Calendar
              v-model:placeholder="dueDatePlaceholder"
              v-model="dueDateValue"
              :calendar-label="t.projectForm.dueDate"
              initial-focus
              :min-value="today(getLocalTimeZone())"
              @update:model-value="
                (v) => {
                  if (v) {
                    form.setFieldValue('dueDate', v.toString())
                  } else {
                    form.setFieldValue('dueDate', undefined)
                  }
                }
              "
            />
          </PopoverContent>
        </Popover>
        <FormMessage />
      </FormItem>
    </FormField>

    <Collapsible v-model:open="labelsOpen" class="space-y-2">
      <div class="flex items-center gap-2">
        <CollapsibleTrigger as-child>
          <Button variant="ghost" size="sm" class="-ml-2 gap-1 px-2">
            <ChevronRight
              class="size-4 transition-transform"
              :class="{ 'rotate-90': labelsOpen }"
            />
            {{ t.projectForm.quadrantLabels }}
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent class="space-y-3">
        <p class="text-muted-foreground text-sm">
          {{ t.projectForm.quadrantLabelsDescription }}
        </p>

        <FormField v-slot="{ componentField }" name="quadrantLabels.urgent">
          <FormItem>
            <FormControl>
              <div class="flex items-center gap-2">
                <span class="shrink-0 text-lg">🔥</span>
                <Input
                  type="text"
                  :placeholder="t.quadrants.urgentImportant"
                  v-bind="componentField"
                />
              </div>
            </FormControl>
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="quadrantLabels.high">
          <FormItem>
            <FormControl>
              <div class="flex items-center gap-2">
                <span class="shrink-0 text-lg">⏰</span>
                <Input
                  type="text"
                  :placeholder="t.quadrants.importantNotUrgent"
                  v-bind="componentField"
                />
              </div>
            </FormControl>
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="quadrantLabels.medium">
          <FormItem>
            <FormControl>
              <div class="flex items-center gap-2">
                <span class="shrink-0 text-lg">⚡</span>
                <Input
                  type="text"
                  :placeholder="t.quadrants.urgentNotImportant"
                  v-bind="componentField"
                />
              </div>
            </FormControl>
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="quadrantLabels.low">
          <FormItem>
            <FormControl>
              <div class="flex items-center gap-2">
                <span class="shrink-0 text-lg">💤</span>
                <Input
                  type="text"
                  :placeholder="t.quadrants.notImportantNotUrgent"
                  v-bind="componentField"
                />
              </div>
            </FormControl>
          </FormItem>
        </FormField>
      </CollapsibleContent>
    </Collapsible>

    <Button type="submit">{{
      mode === 'edit' ? t.projectForm.saveChanges : t.projectForm.createProject
    }}</Button>
  </form>
</template>

<script setup lang="ts">
import {
  DateFormatter,
  getLocalTimeZone,
  parseDate,
  today,
} from '@internationalized/date'
import { toTypedSchema } from '@vee-validate/zod'
import { Calendar as CalendarIcon, ChevronRight } from 'lucide-vue-next'
import { toDate } from 'reka-ui/date'
import { useForm } from 'vee-validate'
import { computed, ref } from 'vue'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input/'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import type { NewProject, QuadrantLabels } from '@/db/schema/projects'
import { insertProjectSchema } from '@/db/schema/projects'
import { createTranslator, type Locale } from '@/i18n'
import { cn } from '@/lib/utils'

/**
 * Extended project type for the form that includes quadrantLabels.
 */
type ProjectFormValues = NewProject & {
  quadrantLabels?: QuadrantLabels
}

/**
 * Props.
 */
const props = withDefaults(
  defineProps<{
    mode: 'create' | 'edit'
    initialValues?: Partial<ProjectFormValues>
    locale: Locale
  }>(),
  { mode: 'create' },
)

/**
 * Emits.
 */
const emit = defineEmits<{
  create: [project: ProjectFormValues]
  update: [project: ProjectFormValues]
}>()

const t = computed(() => createTranslator(props.locale))

/// Convert from drizzle-zod schema to vee-validate schema
const formSchema = toTypedSchema(insertProjectSchema)

/// Create the form instance for validation
const form = useForm({
  validationSchema: formSchema,
  initialValues: props.initialValues,
})

/// Date formatter for the due date field
const df = new DateFormatter(props.locale, {
  dateStyle: 'long',
})

/// Due date placeholder
const dueDatePlaceholder = ref()

/// Due date value
const dueDateValue = computed({
  get: () => (form.values.dueDate ? parseDate(form.values.dueDate) : undefined),
  set: (val) => val,
})

/// Collapsible state for quadrant labels section
const labelsOpen = ref(false)

/// Handle form submission
const onSubmit = form.handleSubmit((values) => {
  // Clean up quadrantLabels - remove empty strings
  const quadrantLabels = values.quadrantLabels as QuadrantLabels | undefined
  let cleanedLabels: QuadrantLabels | undefined

  if (quadrantLabels) {
    cleanedLabels = {}
    for (const [key, value] of Object.entries(quadrantLabels)) {
      if (value?.trim()) {
        cleanedLabels[key as keyof QuadrantLabels] = value.trim()
      }
    }
    // If all labels are empty, don't include the object
    if (Object.keys(cleanedLabels).length === 0) {
      cleanedLabels = undefined
    }
  }

  const payload = {
    ...values,
    quadrantLabels: cleanedLabels,
  } as ProjectFormValues

  if (props.mode === 'edit') {
    emit('update', payload)
  } else {
    emit('create', payload)
  }
})
</script>
