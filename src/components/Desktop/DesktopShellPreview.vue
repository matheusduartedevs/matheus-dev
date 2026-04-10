<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import AppWindow from '@/components/Desktop/AppWindow.vue'
import DesktopAppIcon from '@/components/Desktop/DesktopAppIcon.vue'
import BrowserWindowContent from '@/components/Desktop/BrowserWindowContent.vue'
import DesktopFooter from '@/components/Desktop/DesktopFooter.vue'
import FileWindowContent from '@/components/Desktop/FileWindowContent.vue'
import TerminalWindowContent from '@/components/Desktop/TerminalWindowContent.vue'
import { useDesktopStore } from '@/stores/desktop'
import type { DesktopAppId } from '@/types/desktop'
import type { PortfolioContent } from '@/types/portfolio'
import type { OsTheme } from '@/types/theme'

const props = defineProps<{
  content: PortfolioContent
  themes: readonly OsTheme[]
  detectedTheme: OsTheme
  selectedTheme: OsTheme | null
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

const lastMinimizedWindow = computed(() => {
  const minimizedWindows = windows.value.filter((window) => window.isMinimized)
  return minimizedWindows.sort((left, right) => right.zIndex - left.zIndex)[0] ?? null
})

const desktopShortcuts = computed(() =>
  apps.value
    .filter((app) => app.id === 'browser' || app.id === 'terminal' || app.id === 'files')
    .map((app) => ({
      app,
      isOpen: visibleWindows.value.some((window) => window.appId === app.id),
    })),
)

const homeBadge = computed(() => {
  if (props.effectiveTheme === 'macos') {
    return 'Desktop macOS'
  }

  if (props.effectiveTheme === 'linux') {
    return 'Desktop Linux'
  }

  return 'Desktop Windows'
})
</script>

<template>
  <section class="desktop-shell">
    <section class="desktop-canvas" :class="`theme-${effectiveTheme}`">
      <div class="desktop-surface" :class="`theme-${effectiveTheme}`">
        <div class="desktop-theme-controller">
          <div class="desktop-theme-controller__meta">
            <span class="status-pill">{{ homeBadge }}</span>
            <span class="desktop-theme-controller__state">{{ shellStatus }}</span>
          </div>

          <div class="control-group">
            <span class="control-label">Origem do tema</span>

            <button
              class="source-button"
              :class="{ 'is-active': isSystemTheme }"
              type="button"
              @click="$emit('clearTheme')"
            >
              Seguir sistema detectado
            </button>
          </div>

          <div class="control-group">
            <span class="control-label">Trocar sistema</span>

            <div class="theme-switcher">
              <button
                v-for="theme in themes"
                :key="theme"
                class="theme-button"
                :class="{ 'is-active': effectiveTheme === theme && !isSystemTheme }"
                type="button"
                @click="$emit('selectTheme', theme)"
              >
                {{ theme }}
              </button>
            </div>
          </div>
        </div>

        <div class="desktop-shortcuts">
          <button
            v-for="{ app, isOpen } in desktopShortcuts"
            :key="app.id"
            class="desktop-shortcut"
            :class="{ 'is-open': isOpen }"
            type="button"
            @click="desktopStore.activateApp(app.id)"
          >
            <span class="desktop-shortcut__icon">
              <DesktopAppIcon :app="app" size="lg" />
            </span>
            <span class="desktop-shortcut__label">{{ app.shortLabel }}</span>
          </button>
        </div>

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
          <BrowserWindowContent :content="content" />
        </AppWindow>

        <AppWindow
          v-if="terminalWindowVisible && terminalWindow"
          :title="terminalWindow.title"
          :theme="effectiveTheme"
          :is-focused="terminalWindow.isFocused"
          :window-mode="terminalWindow.windowMode"
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
