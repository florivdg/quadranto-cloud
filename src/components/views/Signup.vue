<template>
  <Card class="mx-auto max-w-sm min-w-96">
    <form @submit.prevent="handleSignup">
      <CardHeader>
        <CardTitle class="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert v-if="errorMessage" variant="destructive" class="-mt-2 mb-4">
          <AlertCircle class="size-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {{ errorMessage }}
          </AlertDescription>
        </Alert>
        <div class="grid gap-4">
          <div class="grid gap-2">
            <Label for="username">Username</Label>
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
            <Label for="password">Password</Label>
            <Input
              v-model="password"
              id="password"
              type="password"
              autocomplete="new-password"
            />
          </div>
          <Button type="submit" class="w-full" :disabled="isLoading">
            {{ isLoading ? 'Creating account...' : 'Create an account' }}
          </Button>
        </div>
        <div class="mt-4 text-center text-sm">
          Already have an account?
          <a href="/login" class="underline">Sign in</a>
        </div>
      </CardContent>
    </form>
  </Card>
</template>

<script setup lang="ts">
import { AlertCircle } from 'lucide-vue-next'
import { ref } from 'vue'

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
import { authClient } from '@/lib/auth-client'

const username = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

async function handleSignup() {
  errorMessage.value = ''
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
    errorMessage.value = 'An unexpected error occurred'
  } finally {
    isLoading.value = false
  }
}
</script>
