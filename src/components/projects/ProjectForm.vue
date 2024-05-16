<template>
  <form class="w-full space-y-4" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="title">
      <FormItem>
        <FormLabel>Title</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Project title..."
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
            placeholder="Add some more infos about the project..."
            class="resize-none"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit">Create Project</Button>
  </form>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input/'
import { Textarea } from '@/components/ui/textarea'
import { insertProjectSchema, type NewProject } from '@/db/schema.ts'

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

/// Handle form submission
const onSubmit = form.handleSubmit((values) => {
  emit('create', values)
})
</script>
