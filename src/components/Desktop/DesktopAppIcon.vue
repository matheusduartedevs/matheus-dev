<script setup lang="ts">
import type { DesktopAppDefinition } from '@/types/desktop'

defineProps<{
  app: DesktopAppDefinition
  size?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <span class="desktop-app-icon" :class="`desktop-app-icon--${size ?? 'md'}`">
    <img :src="app.icons.windows" alt="" aria-hidden="true" class="desktop-app-icon__image desktop-app-icon__image--windows" />
    <img :src="app.icons.macos" alt="" aria-hidden="true" class="desktop-app-icon__image desktop-app-icon__image--macos" />
    <img :src="app.icons.linux" alt="" aria-hidden="true" class="desktop-app-icon__image desktop-app-icon__image--linux" />
  </span>
</template>
