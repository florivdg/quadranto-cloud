<template>
  <Card class="w-full max-w-sm">
    <form @submit.prevent="handleLogin">
      <CardHeader>
        <CardTitle class="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your username to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent class="grid gap-4">
        <Alert v-if="errorMessage" variant="destructive">
          <AlertCircle class="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {{ errorMessage }}
          </AlertDescription>
        </Alert>
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
            autocomplete="current-password"
            required
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button class="w-full" type="submit">Sign in</Button>
      </CardFooter>
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
  CardFooter,
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
    errorMessage.value = 'Invalid username or password'
  }
}
</script>
