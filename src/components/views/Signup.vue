<template>
  <Card class="mx-auto max-w-sm min-w-96">
    <form @submit.prevent="handleSignup">
      <CardHeader>
        <CardTitle class="text-2xl">{{ t.auth.signUp }}</CardTitle>
        <CardDescription>
          {{ t.auth.enterInfoToCreate }}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert v-if="errorMessage" variant="destructive" class="-mt-2 mb-4">
          <AlertCircle class="size-4" />
          <AlertTitle>{{ t.common.error }}</AlertTitle>
          <AlertDescription>
            {{ errorMessage }}
          </AlertDescription>
        </Alert>
        <div class="grid gap-4">
          <div class="grid gap-2">
            <Label for="username">{{ t.auth.username }}</Label>
            <Input
              v-model="username"
              id="username"
              type="text"
              placeholder="quadranaut"
              autocomplete="username"
              required
            />
            <p v-if="usernameError" class="text-destructive text-sm">
              {{ usernameError }}
            </p>
          </div>
          <div class="grid gap-2">
            <Label for="password">{{ t.auth.password }}</Label>
            <Input
              v-model="password"
              id="password"
              type="password"
              autocomplete="new-password"
            />
          </div>
          <Button
            type="submit"
            class="w-full"
            :disabled="isLoading || !!usernameError"
          >
            {{ isLoading ? t.auth.creatingAccount : t.auth.createAccount }}
          </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          {{ t.auth.haveAccount }}
          <a href="/login" class="underline">{{ t.auth.signIn }}</a>
        </div>
      </CardContent>
    </form>
  </Card>
</template>

<script setup lang="ts">
import { AlertCircle } from 'lucide-vue-next'
import { computed, ref } from 'vue'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createTranslator, type Locale } from '@/i18n'
import { authClient } from '@/lib/auth-client'
import { validateUsername } from '@/lib/validators'

const props = defineProps<{
  locale: Locale
}>()

const t = computed(() => createTranslator(props.locale))

const username = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const usernameError = computed(() => {
  if (!username.value) return ''
  const result = validateUsername(username.value)
  return result.error ?? ''
})

async function handleSignup() {
  errorMessage.value = ''

  const validation = validateUsername(username.value)
  if (!validation.valid) {
    errorMessage.value = validation.error ?? 'Invalid username'
    return
  }

  isLoading.value = true

  try {
    const result = await authClient.signUp.email({
      email: `${username.value}@placeholder.local`,
      password: password.value,
      username: username.value,
      name: username.value,
    })

    if (result.error) {
      errorMessage.value = result.error.message ?? 'Failed to create account'
    } else {
      window.location.href = '/'
    }
  } catch {
    errorMessage.value = t.value.auth.unexpectedError
  } finally {
    isLoading.value = false
  }
}
</script>
