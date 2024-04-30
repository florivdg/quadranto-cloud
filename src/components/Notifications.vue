<template>
  <Button variant="outline" size="icon" class="ml-auto h-8 w-8">
    <Bell class="h-4 w-4" />
    <span class="sr-only">Toggle notifications</span>
  </Button>
</template>

<script setup lang="ts">
import { Bell } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
</script>
