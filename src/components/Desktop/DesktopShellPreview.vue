<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import AppWindow from '@/components/Desktop/AppWindow.vue'
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

const browserButtonLabel = computed(() => {
  if (browserWindowVisible.value) {
    return 'Navegador aberto'
  }

  if (browserWindow.value?.isMinimized) {
    return 'Restaurar navegador'
  }

  return 'Abrir navegador'
})

const terminalButtonLabel = computed(() => {
  if (terminalWindowVisible.value) {
    return 'Terminal aberto'
  }

  if (terminalWindow.value?.isMinimized) {
    return 'Restaurar terminal'
  }

  return 'Abrir terminal'
})

const filesButtonLabel = computed(() => {
  if (filesWindowVisible.value) {
    return 'Arquivos abertos'
  }

  if (filesWindow.value?.isMinimized) {
    return 'Restaurar arquivos'
  }

  return 'Abrir arquivos'
})

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

        <div v-if="!visibleWindows.length" class="desktop-home-action">
          <div class="desktop-home-action__buttons">
            <button
              class="desktop-primary-button"
              type="button"
              @click="desktopStore.openWindow('browser')"
            >
              {{ browserButtonLabel }}
            </button>
            <button
              class="desktop-primary-button desktop-primary-button--terminal"
              type="button"
              @click="desktopStore.openWindow('terminal')"
            >
              {{ terminalButtonLabel }}
            </button>
            <button
              class="desktop-primary-button desktop-primary-button--files"
              type="button"
              @click="desktopStore.openWindow('files')"
            >
              {{ filesButtonLabel }}
            </button>
          </div>
        </div>

        <DesktopFooter :theme="effectiveTheme" />

        <AppWindow
          v-if="browserWindowVisible && browserWindow"
          :title="browserWindow.title"
          :theme="effectiveTheme"
          :is-focused="browserWindow.isFocused"
          :z-index="browserWindow.zIndex"
          fill
          @focus="desktopStore.focusWindow('browser')"
          @minimize="desktopStore.minimizeWindow('browser')"
          @close="desktopStore.closeWindow('browser')"
        >
          <BrowserWindowContent :content="content" />
        </AppWindow>

        <AppWindow
          v-if="terminalWindowVisible && terminalWindow"
          :title="terminalWindow.title"
          :theme="effectiveTheme"
          :is-focused="terminalWindow.isFocused"
          :z-index="terminalWindow.zIndex"
          fill
          @focus="desktopStore.focusWindow('terminal')"
          @minimize="desktopStore.minimizeWindow('terminal')"
          @close="desktopStore.closeWindow('terminal')"
        >
          <TerminalWindowContent :content="content" :theme="effectiveTheme" />
        </AppWindow>

        <AppWindow
          v-if="filesWindowVisible && filesWindow"
          :title="filesWindow.title"
          :theme="effectiveTheme"
          :is-focused="filesWindow.isFocused"
          :z-index="filesWindow.zIndex"
          :x="filesWindow.x"
          :y="filesWindow.y"
          :width="filesWindow.width"
          :height="filesWindow.height"
          @focus="desktopStore.focusWindow('files')"
          @minimize="desktopStore.minimizeWindow('files')"
          @close="desktopStore.closeWindow('files')"
        >
          <FileWindowContent :content="content" :theme="effectiveTheme" />
        </AppWindow>

        <button
          v-if="lastMinimizedWindow"
          class="desktop-restore-chip"
          type="button"
          @click="desktopStore.openWindow(lastMinimizedWindow.appId)"
        >
          Restaurar {{ lastMinimizedWindow.title }}
        </button>
      </div>
    </section>
  </section>
</template>
