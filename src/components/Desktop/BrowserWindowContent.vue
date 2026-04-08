<script setup lang="ts">
import type { PortfolioContent } from '@/types/portfolio'

defineProps<{
  content: PortfolioContent
}>()
</script>

<template>
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
</template>
