<script setup lang="ts">
import { computed, ref } from 'vue'

import AppWindow from '@/components/Desktop/AppWindow.vue'
import BrowserWindowContent from '@/components/Desktop/BrowserWindowContent.vue'
import DesktopFooter from '@/components/Desktop/DesktopFooter.vue'
import FileWindowContent from '@/components/Desktop/FileWindowContent.vue'
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

type DesktopOverlay = 'browser' | 'terminal' | 'files' | null

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
const isFilesVisible = computed(() => activeOverlay.value === 'files')

const browserButtonLabel = computed(() => {
  if (isBrowserVisible.value) {
    return 'Navegador aberto'
  }

  if (minimizedOverlay.value === 'browser') {
    return 'Restaurar navegador'
  }

  return 'Abrir navegador'
})

const terminalButtonLabel = computed(() => {
  if (isTerminalVisible.value) {
    return 'Terminal aberto'
  }

  if (minimizedOverlay.value === 'terminal') {
    return 'Restaurar terminal'
  }

  return 'Abrir terminal'
})

const filesButtonLabel = computed(() => {
  if (isFilesVisible.value) {
    return 'Arquivos abertos'
  }

  if (minimizedOverlay.value === 'files') {
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
            <button
              class="desktop-primary-button desktop-primary-button--files"
              type="button"
              @click="openOverlay('files')"
            >
              {{ filesButtonLabel }}
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
          <TerminalWindowContent :content="content" :theme="effectiveTheme" />
        </AppWindow>

        <AppWindow
          v-if="isFilesVisible"
          :theme="effectiveTheme"
          :is-focused="true"
          :z-index="3"
          :x="180"
          :y="100"
          :width="680"
          :height="440"
          @focus="openOverlay('files')"
          @minimize="minimizeOverlay"
          @close="closeOverlay"
        >
          <FileWindowContent :content="content" :theme="effectiveTheme" />
        </AppWindow>
      </div>
    </section>
  </section>
</template>
