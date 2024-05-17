<template>
  <form class="w-full space-y-4" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="title">
      <FormItem>
        <FormLabel class="flex items-center"> Title </FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Set the project title"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="description">
      <FormItem>
        <FormLabel>Description</FormLabel>
        <FormControl>
          <Textarea
            placeholder="Add some more infos about the project"
            class="resize-none"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField name="dueDate">
      <FormItem class="flex flex-col">
        <FormLabel>Due Date</FormLabel>
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
                    : 'Pick a due date'
                }}</span>
                <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
              </Button>
              <input hidden />
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="w-auto p-0">
            <Calendar
              v-model:placeholder="dueDatePlaceholder"
              v-model="dueDateValue"
              calendar-label="Project Due Date"
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

    <Button type="submit">Create Project</Button>
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
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { toDate } from 'radix-vue/date'
import { useForm } from 'vee-validate'
import { computed, ref } from 'vue'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
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
import { insertProjectSchema, type NewProject } from '@/db/schema.ts'
import { cn } from '@/lib/utils'

/**
 * Props.
 */
withDefaults(
  defineProps<{
    mode: 'create' | 'edit'
  }>(),
  { mode: 'create' },
)

/**
 * Emits.
 */
const emit = defineEmits<{
  create: [project: NewProject]
}>()

/// Convert from drizzle-zod schema to vee-validate schema
const formSchema = toTypedSchema(insertProjectSchema)

/// Create the form instance for validation
const form = useForm({
  validationSchema: formSchema,
})

/// Date formatter for the due date field
const df = new DateFormatter(navigator.language, {
  dateStyle: 'long',
})

/// Due date placeholder
const dueDatePlaceholder = ref()

/// Due date value
const dueDateValue = computed({
  get: () => (form.values.dueDate ? parseDate(form.values.dueDate) : undefined),
  set: (val) => val,
})

/// Handle form submission
const onSubmit = form.handleSubmit((values) => {
  emit('create', values)
})
</script>
