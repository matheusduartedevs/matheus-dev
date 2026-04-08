<script setup lang="ts">
import type { OsTheme } from '@/types/theme'

defineProps<{
  theme: OsTheme
}>()
</script>

<template>
  <div class="desktop-footer" :class="`desktop-footer--${theme}`">
    <div v-if="theme === 'windows'" class="desktop-footer__windows-taskbar">
      <div class="desktop-footer__windows-start" />
      <div class="desktop-footer__windows-search" />
      <div class="desktop-footer__windows-tray" />
    </div>

    <div v-else-if="theme === 'macos'" class="desktop-footer__macos-dock">
      <span v-for="item in 12" :key="item" class="desktop-footer__macos-dock-item" />
    </div>

    <template v-else>
      <div class="desktop-footer__linux-topbar">
        <span class="desktop-footer__linux-topbar-pill" />
        <span class="desktop-footer__linux-topbar-dots" />
      </div>
      <div class="desktop-footer__linux-dock">
        <span v-for="item in 8" :key="item" class="desktop-footer__linux-dock-item" />
      </div>
    </template>
  </div>
</template>
