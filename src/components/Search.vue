<template>
  <form>
    <div class="relative">
      <Search class="text-muted-foreground absolute top-3 left-2.5 size-4" />
      <Input
        type="search"
        placeholder="Search does not work yet..."
        class="bg-background w-full appearance-none pl-8 shadow-none md:w-2/3 xl:w-1/3"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { Search } from 'lucide-vue-next'

import { Input } from '@/components/ui/input'
</script>
