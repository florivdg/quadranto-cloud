<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button variant="outline" size="icon" class="shrink-0 md:hidden">
        <Menu class="h-5 w-5" />
        <span class="sr-only">Toggle navigation menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent side="left" class="flex flex-col">
      <nav class="grid gap-2 text-lg font-medium">
        <a href="/" class="flex items-center gap-2 text-lg font-semibold">
          <Package2 class="h-6 w-6" />
          <span class="sr-only">Go to Dashboard</span>
          <span aria-hidden="true">quadranto.cloud</span>
        </a>
        <a
          v-for="item in navItems"
          :href="item.href"
          class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
        >
          <component :is="item.icon" class="h-5 w-5" />
          {{ item.name }}
        </a>
      </nav>
    </SheetContent>
  </Sheet>
</template>

<script setup lang="ts">
import { Menu, Package2 } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { navItems } from '@/lib/nav'
</script>
