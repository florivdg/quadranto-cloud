<template>
  <form>
    <div class="relative">
      <Search class="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search tasks or products..."
        class="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 xl:w-1/3"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { Search } from 'lucide-vue-next'

import { Input } from '@/components/ui/input'
</script>
