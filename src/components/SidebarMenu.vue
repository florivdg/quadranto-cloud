<template>
  <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
    <a
      href="/"
      class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
    >
      <Home class="h-4 w-4" />
      Dashboard
    </a>
    <a
      href="#"
      class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
    >
      <ShoppingCart class="h-4 w-4" />
      Orders
      <Badge
        class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
      >
        6
      </Badge>
    </a>
    <a
      href="#"
      class="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
    >
      <Package class="h-4 w-4" />
      Products
    </a>
    <a
      href="#"
      class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
    >
      <Users class="h-4 w-4" />
      Customers
    </a>
    <a
      href="#"
      class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
    >
      <LineChart class="h-4 w-4" />
      Analytics
    </a>
  </nav>
</template>

<script setup lang="ts">
import { Home, ShoppingCart, Package, Users, LineChart } from 'lucide-vue-next'

import { Badge } from '@/components/ui/badge'
</script>
