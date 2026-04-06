<script setup lang="ts">
import type { PortfolioContent } from '@/types/portfolio'
import type { OsTheme } from '@/types/theme'

defineProps<{
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
</script>

<template>
  <section class="desktop-shell">
    <div class="hero-panel">
      <div class="hero-copy">
        <div class="hero-meta">
          <p class="eyebrow">System OS Portfolio</p>
          <span class="status-pill">{{ shellStatus }}</span>
        </div>

        <div class="hero-stack">
          <h1 class="hero-title">{{ content.title }}</h1>
          <p class="hero-description">{{ content.desktopIntro }}</p>
        </div>

        <dl class="theme-facts">
          <div class="fact-card">
            <dt class="fact-label">Detected</dt>
            <dd class="fact-value">{{ detectedTheme }}</dd>
          </div>

          <div class="fact-card">
            <dt class="fact-label">Selected</dt>
            <dd class="fact-value">{{ selectedTheme ?? 'system default' }}</dd>
          </div>

          <div class="fact-card">
            <dt class="fact-label">Active</dt>
            <dd class="fact-value">{{ effectiveTheme }}</dd>
          </div>
        </dl>

        <dl class="metric-grid">
          <div v-for="metric in content.metrics" :key="metric.label" class="metric-card">
            <dt class="fact-label">{{ metric.label }}</dt>
            <dd class="metric-value">{{ metric.value }}</dd>
          </div>
        </dl>
      </div>

      <div class="control-panel">
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
          <span class="control-label">Manual switch</span>

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
            <p class="preview-kicker">Desktop entry</p>
            <strong class="preview-heading">{{ content.name }}</strong>
            <p class="preview-text">{{ content.summary }}</p>

            <div class="preview-list">
              <article
                v-for="project in content.projects.slice(0, 2)"
                :key="project.name"
                class="preview-item"
              >
                <span class="preview-item-meta">{{ project.year }}</span>
                <strong class="preview-item-title">{{ project.name }}</strong>
                <p class="preview-item-text">{{ project.summary }}</p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
