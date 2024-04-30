<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="secondary" size="icon" class="rounded-full">
        <CircleUser class="h-5 w-5" />
        <span class="sr-only">Toggle user menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Settings</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="handleLogout">Logout</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { CircleUser } from 'lucide-vue-next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

/**
 * Handles the logout functionality.
 * Sends a DELETE request to the '/api/auth/logout' endpoint and redirects the user to the login page.
 */
async function handleLogout() {
  await fetch('/api/auth/logout', {
    method: 'DELETE',
  })
  window.location.href = '/login'
}
</script>
