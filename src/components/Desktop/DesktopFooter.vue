<script setup lang="ts">
import { computed } from 'vue'

import DesktopAppIcon from '@/components/Desktop/DesktopAppIcon.vue'
import type { DesktopAppDefinition, DesktopAppId, DesktopWindow } from '@/types/desktop'
import type { OsTheme } from '@/types/theme'

const props = defineProps<{
  theme: OsTheme
  apps: DesktopAppDefinition[]
  windows: DesktopWindow[]
}>()

defineEmits<{
  activateApp: [appId: DesktopAppId]
}>()

const appStates = computed(() =>
  props.apps.map((app) => {
    const window = props.windows.find((entry) => entry.appId === app.id) ?? null

    return {
      app,
      isOpen: Boolean(window?.isOpen),
      isMinimized: Boolean(window?.isMinimized),
      isFocused: Boolean(window?.isFocused),
    }
  }),
)
</script>

<template>
  <div class="desktop-footer" :class="`desktop-footer--${theme}`">
    <div v-if="theme === 'windows'" class="desktop-footer__windows-taskbar">
      <button class="desktop-footer__windows-start" type="button" aria-label="Open start menu">
        <span />
      </button>
      <div class="desktop-footer__windows-apps">
        <button
          v-for="{ app, isOpen, isMinimized, isFocused } in appStates"
          :key="app.id"
          class="desktop-footer__app-button desktop-footer__app-button--windows"
          :class="{
            'is-open': isOpen,
            'is-minimized': isMinimized,
            'is-focused': isFocused,
          }"
          type="button"
          :aria-label="app.title"
          @click="$emit('activateApp', app.id)"
        >
          <DesktopAppIcon :app="app" />
          <span class="desktop-footer__windows-label">{{ app.shortLabel }}</span>
        </button>
      </div>
      <div class="desktop-footer__windows-tray">
        <span />
        <span />
        <span />
      </div>
    </div>

    <div v-else-if="theme === 'macos'" class="desktop-footer__macos-dock">
      <button
        v-for="{ app, isOpen, isMinimized, isFocused } in appStates"
        :key="app.id"
        class="desktop-footer__app-button desktop-footer__app-button--macos"
        :class="{
          'is-open': isOpen,
          'is-minimized': isMinimized,
          'is-focused': isFocused,
        }"
        type="button"
        :aria-label="app.title"
        @click="$emit('activateApp', app.id)"
      >
        <DesktopAppIcon :app="app" size="lg" />
      </button>
    </div>

    <template v-else>
      <div class="desktop-footer__linux-topbar">
        <span class="desktop-footer__linux-topbar-pill" />
        <span class="desktop-footer__linux-topbar-dots" />
      </div>
      <div class="desktop-footer__linux-dock">
        <button
          v-for="{ app, isOpen, isMinimized, isFocused } in appStates"
          :key="app.id"
          class="desktop-footer__app-button desktop-footer__app-button--linux"
          :class="{
            'is-open': isOpen,
            'is-minimized': isMinimized,
            'is-focused': isFocused,
          }"
          type="button"
          :aria-label="app.title"
          @click="$emit('activateApp', app.id)"
        >
          <DesktopAppIcon :app="app" />
        </button>
      </div>
    </template>
  </div>
</template>
