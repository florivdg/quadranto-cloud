<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="secondary" size="icon" class="rounded-full">
        <CircleUser class="h-5 w-5" />
        <span class="sr-only">{{ t.userMenu.toggleMenu }}</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>{{ t.userMenu.myAccount }}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem as="a" href="/settings">{{
        t.common.settings
      }}</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="handleLogout">{{
        t.auth.logout
      }}</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { CircleUser } from 'lucide-vue-next'
import { computed } from 'vue'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { createTranslator, type Locale } from '@/i18n'
import { authClient } from '@/lib/auth-client'

const props = defineProps<{
  locale: Locale
}>()

const t = computed(() => createTranslator(props.locale))

/**
 * Handles the logout functionality.
 * Uses Better Auth signOut and redirects the user to the login page.
 */
async function handleLogout() {
  await authClient.signOut()
  window.location.href = '/login'
}
</script>
