<template>
  <Card class="mx-auto min-w-96 max-w-sm">
    <form @submit.prevent="handleLogin">
      <CardHeader>
        <CardTitle class="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your username below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert v-if="errorMessage" variant="destructive" class="-mt-2 mb-4">
          <AlertCircle class="h-4 w-4" />
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
            <div class="flex items-center">
              <Label for="password">Password</Label>
              <a
                href="/password-reset"
                class="ml-auto inline-block text-sm underline"
              >
                Forgot your password?
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

          <Button type="submit" class="w-full">Sign in</Button>
        </div>
        <div class="mt-4 text-center text-sm">
          Don't have an account?
          <a href="/signup" class="underline">Sign up</a>
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

const username = ref('')
const password = ref('')
const errorMessage = ref('')

async function handleLogin() {
  errorMessage.value = ''

  /// Collect the form data
  const body = new FormData()
  body.append('username', username.value)
  body.append('password', password.value)

  /// Send the form data to the server
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    body,
  })

  /// Redirect to the home page if the login is successful
  if (response.ok) {
    window.location.href = '/'
  } else {
    const data = await response.json()
    errorMessage.value = data.error ?? 'Invalid username or password'
  }
}
</script>
