<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import AppWindow from '@/components/Desktop/AppWindow.vue'
import BrowserWindowContent from '@/components/Desktop/BrowserWindowContent.vue'
import DesktopFooter from '@/components/Desktop/DesktopFooter.vue'
import DesktopShortcuts from '@/components/Desktop/DesktopShortcuts.vue'
import DesktopThemeController from '@/components/Desktop/DesktopThemeController.vue'
import FileWindowContent from '@/components/Desktop/FileWindowContent.vue'
import TerminalWindowContent from '@/components/Desktop/TerminalWindowContent.vue'
import { useDesktopStore } from '@/stores/desktop'
import type { DesktopAppId } from '@/types/desktop'
import type { PortfolioContent } from '@/types/portfolio'
import type { OsTheme } from '@/types/theme'

defineProps<{
  content: PortfolioContent
  themes: readonly OsTheme[]
  effectiveTheme: OsTheme
  isSystemTheme: boolean
  shellStatus: string
}>()

defineEmits<{
  selectTheme: [theme: OsTheme]
  clearTheme: []
}>()

const desktopStore = useDesktopStore()
const { apps, windows, visibleWindows } = storeToRefs(desktopStore)

const findWindow = (appId: DesktopAppId) => windows.value.find((window) => window.appId === appId) ?? null

const browserWindow = computed(() => findWindow('browser'))
const terminalWindow = computed(() => findWindow('terminal'))
const filesWindow = computed(() => findWindow('files'))

const isWindowVisible = (appId: DesktopAppId) =>
  computed(() => visibleWindows.value.some((window) => window.appId === appId))

const browserWindowVisible = isWindowVisible('browser')
const terminalWindowVisible = isWindowVisible('terminal')
const filesWindowVisible = isWindowVisible('files')

</script>

<template>
  <section class="desktop-shell">
    <section class="desktop-canvas" :class="`theme-${effectiveTheme}`">
      <div class="desktop-surface" :class="`theme-${effectiveTheme}`">
        <DesktopThemeController
          :themes="themes"
          :effective-theme="effectiveTheme"
          :is-system-theme="isSystemTheme"
          :shell-status="shellStatus"
          @clear-theme="$emit('clearTheme')"
          @select-theme="$emit('selectTheme', $event)"
        />

        <DesktopShortcuts
          :apps="apps"
          :windows="windows"
          @activate-app="desktopStore.activateApp"
        />

        <DesktopFooter
          :theme="effectiveTheme"
          :apps="apps"
          :windows="windows"
          @activate-app="desktopStore.activateApp"
        />

        <AppWindow
          v-if="browserWindowVisible && browserWindow"
          :title="browserWindow.title"
          :theme="effectiveTheme"
          :is-focused="browserWindow.isFocused"
          :window-mode="browserWindow.windowMode"
          body-class="desktop-window__body--flush"
          :x="browserWindow.x"
          :y="browserWindow.y"
          :width="browserWindow.width"
          :height="browserWindow.height"
          :z-index="browserWindow.zIndex"
          @focus="desktopStore.focusWindow('browser')"
          @minimize="desktopStore.minimizeWindow('browser')"
          @maximize="desktopStore.toggleWindowMode('browser')"
          @close="desktopStore.closeWindow('browser')"
        >
          <BrowserWindowContent :content="content" :theme="effectiveTheme" />
        </AppWindow>

        <AppWindow
          v-if="terminalWindowVisible && terminalWindow"
          :title="terminalWindow.title"
          :theme="effectiveTheme"
          :is-focused="terminalWindow.isFocused"
          :window-mode="terminalWindow.windowMode"
          body-class="desktop-window__body--flush"
          :x="terminalWindow.x"
          :y="terminalWindow.y"
          :width="terminalWindow.width"
          :height="terminalWindow.height"
          :z-index="terminalWindow.zIndex"
          @focus="desktopStore.focusWindow('terminal')"
          @minimize="desktopStore.minimizeWindow('terminal')"
          @maximize="desktopStore.toggleWindowMode('terminal')"
          @close="desktopStore.closeWindow('terminal')"
        >
          <TerminalWindowContent :content="content" :theme="effectiveTheme" />
        </AppWindow>

        <AppWindow
          v-if="filesWindowVisible && filesWindow"
          :title="filesWindow.title"
          :theme="effectiveTheme"
          :is-focused="filesWindow.isFocused"
          :window-mode="filesWindow.windowMode"
          :z-index="filesWindow.zIndex"
          :x="filesWindow.x"
          :y="filesWindow.y"
          :width="filesWindow.width"
          :height="filesWindow.height"
          @focus="desktopStore.focusWindow('files')"
          @minimize="desktopStore.minimizeWindow('files')"
          @maximize="desktopStore.toggleWindowMode('files')"
          @close="desktopStore.closeWindow('files')"
        >
          <FileWindowContent :content="content" :theme="effectiveTheme" />
        </AppWindow>
      </div>
    </section>
  </section>
</template>
