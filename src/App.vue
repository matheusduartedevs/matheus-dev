<script setup lang="ts">
import { computed, onMounted } from 'vue'

import { useThemeStore } from '@/stores/theme'
import { themeOptions, type OsTheme } from '@/types/theme'

const themeStore = useThemeStore()

const shellStatus = computed(() =>
  themeStore.isSystemTheme ? 'Using detected OS theme' : 'Using manual override',
)

const setTheme = (theme: OsTheme) => {
  themeStore.setTheme(theme)
}

onMounted(() => {
  themeStore.initializeTheme()
})
</script>

<template>
  <main :data-os-theme="themeStore.effectiveTheme" class="app-shell">
    <section class="hero-panel">
      <div class="hero-copy">
        <div class="hero-meta">
          <p class="eyebrow">System OS Portfolio</p>
          <span class="status-pill">{{ shellStatus }}</span>
        </div>

        <div class="hero-stack">
          <h1 class="hero-title">Desktop shell theme controller</h1>
          <p class="hero-description">
            The interface detects the visitor platform as a starting point and lets them switch the
            operating system skin at any time.
          </p>
        </div>

        <dl class="theme-facts">
          <div class="fact-card">
            <dt class="fact-label">Detected</dt>
            <dd class="fact-value">{{ themeStore.detectedTheme }}</dd>
          </div>

          <div class="fact-card">
            <dt class="fact-label">Selected</dt>
            <dd class="fact-value">
              {{ themeStore.selectedTheme ?? 'system default' }}
            </dd>
          </div>

          <div class="fact-card">
            <dt class="fact-label">Active</dt>
            <dd class="fact-value">{{ themeStore.effectiveTheme }}</dd>
          </div>
        </dl>
      </div>

      <div class="control-panel">
        <div class="control-group">
          <span class="control-label">Theme source</span>

          <button
            class="source-button"
            :class="{ 'is-active': themeStore.isSystemTheme }"
            type="button"
            @click="themeStore.clearThemeSelection()"
          >
            Follow detected OS
          </button>
        </div>

        <div class="control-group">
          <span class="control-label">Manual switch</span>

          <div class="theme-switcher">
            <button
              v-for="theme in themeOptions"
              :key="theme"
              class="theme-button"
              :class="{
                'is-active': themeStore.effectiveTheme === theme && !themeStore.isSystemTheme,
              }"
              type="button"
              @click="setTheme(theme)"
            >
              {{ theme }}
            </button>
          </div>
        </div>

        <div class="preview-window">
          <header class="preview-titlebar">
            <div class="window-dots">
              <span />
              <span />
              <span />
            </div>

            <span class="preview-app-name">portfolio.chrome</span>
          </header>

          <div class="preview-content">
            <p class="preview-kicker">Current shell</p>
            <strong class="preview-heading">
              {{ themeStore.effectiveTheme }}
            </strong>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
