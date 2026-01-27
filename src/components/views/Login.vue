<template>
  <Card class="mx-auto max-w-sm min-w-96">
    <form @submit.prevent="handleLogin">
      <CardHeader>
        <CardTitle class="text-2xl">{{ t.auth.login }}</CardTitle>
        <CardDescription>
          {{ t.auth.enterUsernameToLogin }}
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
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label for="password">{{ t.auth.password }}</Label>
              <a
                href="/password-reset"
                class="ml-auto inline-block text-sm underline"
              >
                {{ t.auth.forgotPassword }}
              </a>
            </div>
            <Input
              v-model="password"
              id="password"
              type="password"
              autocomplete="current-password"
              required
            />
          </div>

          <Button type="submit" class="w-full" :disabled="isLoading">
            {{ isLoading ? t.auth.signingIn : t.auth.signIn }}
          </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          {{ t.auth.noAccount }}
          <a href="/signup" class="underline">{{ t.auth.signUp }}</a>
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

const props = defineProps<{
  locale: Locale
}>()

const t = computed(() => createTranslator(props.locale))

const username = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

async function handleLogin() {
  errorMessage.value = ''
  isLoading.value = true

  try {
    const result = await authClient.signIn.username({
      username: username.value,
      password: password.value,
    })

    if (result.error) {
      errorMessage.value =
        result.error.message ?? 'Invalid username or password'
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
