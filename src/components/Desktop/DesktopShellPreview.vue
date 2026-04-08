<script setup lang="ts">
import { computed, ref } from 'vue'

import AppWindow from '@/components/Desktop/AppWindow.vue'
import BrowserWindowContent from '@/components/Desktop/BrowserWindowContent.vue'
import DesktopFooter from '@/components/Desktop/DesktopFooter.vue'
import TerminalWindowContent from '@/components/Desktop/TerminalWindowContent.vue'
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

type DesktopOverlay = 'browser' | 'terminal' | null

const activeOverlay = ref<DesktopOverlay>(null)
const minimizedOverlay = ref<Exclude<DesktopOverlay, null> | null>(null)

const openOverlay = (overlay: Exclude<DesktopOverlay, null>) => {
  activeOverlay.value = overlay
  minimizedOverlay.value = null
}

const minimizeOverlay = () => {
  if (!activeOverlay.value) {
    return
  }

  minimizedOverlay.value = activeOverlay.value
  activeOverlay.value = null
}

const closeOverlay = () => {
  activeOverlay.value = null
  minimizedOverlay.value = null
}

const isBrowserVisible = computed(() => activeOverlay.value === 'browser')
const isTerminalVisible = computed(() => activeOverlay.value === 'terminal')

const browserButtonLabel = computed(() => {
  if (isBrowserVisible.value) {
    return 'Browser open'
  }

  if (minimizedOverlay.value === 'browser') {
    return 'Restore browser'
  }

  return 'Open browser'
})

const terminalButtonLabel = computed(() => {
  if (isTerminalVisible.value) {
    return 'Terminal open'
  }

  if (minimizedOverlay.value === 'terminal') {
    return 'Restore terminal'
  }

  return 'Open terminal'
})

const homeBadge = computed(() => {
  if (props.effectiveTheme === 'macos') {
    return 'macOS desktop'
  }

  if (props.effectiveTheme === 'linux') {
    return 'Linux desktop'
  }

  return 'Windows desktop'
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
            <span class="control-label">Theme source</span>

            <button
              class="source-button"
              :class="{ 'is-active': isSystemTheme }"
              type="button"
              @click="$emit('clearTheme')"
            >
              Follow detected OS
            </button>
          </div>

          <div class="control-group">
            <span class="control-label">Switch OS</span>

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

        <div v-if="!activeOverlay" class="desktop-home-action">
          <div class="desktop-home-action__buttons">
            <button class="desktop-primary-button" type="button" @click="openOverlay('browser')">
              {{ browserButtonLabel }}
            </button>
            <button
              class="desktop-primary-button desktop-primary-button--terminal"
              type="button"
              @click="openOverlay('terminal')"
            >
              {{ terminalButtonLabel }}
            </button>
          </div>
        </div>

        <DesktopFooter :theme="effectiveTheme" />

        <AppWindow
          v-if="isBrowserVisible"
          :theme="effectiveTheme"
          :is-focused="true"
          :z-index="3"
          fill
          @focus="openOverlay('browser')"
          @minimize="minimizeOverlay"
          @close="closeOverlay"
        >
          <BrowserWindowContent :content="content" />
        </AppWindow>

        <AppWindow
          v-if="isTerminalVisible"
          :theme="effectiveTheme"
          :is-focused="true"
          :z-index="3"
          fill
          @focus="openOverlay('terminal')"
          @minimize="minimizeOverlay"
          @close="closeOverlay"
        >
          <TerminalWindowContent :theme="effectiveTheme" />
        </AppWindow>
      </div>
    </section>
  </section>
</template>
