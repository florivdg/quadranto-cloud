<template>
  <Card class="mx-auto min-w-96 max-w-sm">
    <form @submit.prevent="handleSignup">
      <CardHeader>
        <CardTitle class="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
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
            <Label for="password">Password</Label>
            <Input
              v-model="password"
              id="password"
              type="password"
              autocomplete="new-password"
            />
          </div>
          <Button type="submit" class="w-full">Create an account</Button>
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
import { ref } from 'vue'
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
import { AlertCircle } from 'lucide-vue-next'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const username = ref('')
const password = ref('')
const errorMessage = ref('')

async function handleSignup() {
  /// Build the form data
  const body = new FormData()
  body.append('username', username.value)
  body.append('password', password.value)

  /// Send the form data to the server
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body,
  })

  /// Handle the response
  if (response.ok) {
    window.location.href = '/'
  } else {
    const data = await response.json()
    errorMessage.value = data.error ?? 'Invalid username or password'
  }
}
</script>
