<script setup lang="ts">
import { computed } from 'vue'

import DesktopAppIcon from '@/components/Desktop/DesktopAppIcon.vue'
import type { DesktopAppDefinition, DesktopAppId, DesktopWindow } from '@/types/desktop'

const props = defineProps<{
  apps: DesktopAppDefinition[]
  windows: DesktopWindow[]
}>()

defineEmits<{
  activateApp: [appId: DesktopAppId]
}>()

const shortcuts = computed(() =>
  props.apps
    .filter((app) => app.id === 'browser' || app.id === 'terminal' || app.id === 'files')
    .map((app) => ({
      app,
      isOpen: props.windows.some((window) => window.appId === app.id && window.isOpen && !window.isMinimized),
    })),
)
</script>

<template>
  <div class="desktop-shortcuts">
    <button
      v-for="{ app, isOpen } in shortcuts"
      :key="app.id"
      class="desktop-shortcut"
      :class="{ 'is-open': isOpen }"
      type="button"
      @click="$emit('activateApp', app.id)"
    >
      <span class="desktop-shortcut__icon">
        <DesktopAppIcon :app="app" size="lg" />
      </span>
      <span class="desktop-shortcut__label">{{ app.shortLabel }}</span>
    </button>
  </div>
</template>
