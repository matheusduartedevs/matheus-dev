<script setup lang="ts">
import { computed, ref } from 'vue'

import AppWindow from '@/components/desktop/AppWindow.vue'
import DesktopFooter from '@/components/desktop/DesktopFooter.vue'
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

const isBrowserOpen = ref(false)
const isBrowserMinimized = ref(false)

const openBrowser = () => {
  isBrowserOpen.value = true
  isBrowserMinimized.value = false
}

const minimizeBrowser = () => {
  isBrowserMinimized.value = true
}

const closeBrowser = () => {
  isBrowserOpen.value = false
  isBrowserMinimized.value = false
}

const isBrowserVisible = computed(() => isBrowserOpen.value && !isBrowserMinimized.value)

const browserButtonLabel = computed(() => {
  if (isBrowserVisible.value) {
    return 'Browser open'
  }

  if (isBrowserMinimized.value) {
    return 'Restore browser'
  }

  return 'Open browser'
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

        <div v-if="!isBrowserVisible" class="desktop-home-action">
          <button class="desktop-primary-button" type="button" @click="openBrowser">
            {{ browserButtonLabel }}
          </button>
        </div>

        <DesktopFooter :theme="effectiveTheme" />

        <AppWindow
          v-if="isBrowserVisible"
          :theme="effectiveTheme"
          :is-focused="true"
          :z-index="3"
          fill
          @focus="openBrowser"
          @minimize="minimizeBrowser"
          @close="closeBrowser"
        >
          <div class="browser-home">
            <div class="browser-home__hero">
              <p class="preview-kicker">Browser preview</p>
              <strong class="preview-heading">{{ content.name }}</strong>
              <p class="preview-text">{{ content.summary }}</p>
            </div>

            <div class="browser-home__grid">
              <article class="browser-card">
                <span class="fact-label">About</span>
                <p class="preview-text">{{ content.summary }}</p>
              </article>

              <article class="browser-card">
                <span class="fact-label">Project</span>
                <p class="preview-text">{{ content.projects[0]?.name }}</p>
              </article>

              <article class="browser-card">
                <span class="fact-label">Resume</span>
                <p class="preview-text">{{ content.resume.label }}</p>
              </article>
            </div>
          </div>
        </AppWindow>
      </div>
    </section>
  </section>
</template>
