<script setup lang="ts">
import type { PortfolioContent } from '@/types/portfolio'

defineProps<{
  content: PortfolioContent
}>()
</script>

<template>
  <div class="browser-home">
    <div class="browser-home__hero">
      <p class="preview-kicker">Prévia do navegador</p>
      <strong class="preview-heading">{{ content.name }}</strong>
      <strong class="browser-home__title">{{ content.title }}</strong>
      <p class="preview-text">{{ content.summary }}</p>
    </div>

    <div class="browser-home__metrics">
      <article v-for="metric in content.metrics" :key="metric.label" class="browser-stat">
        <span class="fact-label">{{ metric.label }}</span>
        <strong>{{ metric.value }}</strong>
      </article>
    </div>

    <div class="browser-section">
      <div class="browser-section__header">
        <span class="fact-label">Sobre</span>
      </div>

      <article class="browser-card">
        <p class="preview-text">{{ content.summary }}</p>
      </article>
    </div>

    <div class="browser-section">
      <div class="browser-section__header">
        <span class="fact-label">Projetos</span>
      </div>

      <div class="browser-home__grid">
        <article v-for="project in content.projects" :key="project.name" class="browser-card">
          <span class="fact-label">{{ project.year }}</span>
          <strong>{{ project.name }}</strong>
          <p class="preview-text">{{ project.role }}</p>
          <p class="preview-text">{{ project.summary }}</p>
        </article>
      </div>
    </div>

    <div class="browser-section">
      <div class="browser-section__header">
        <span class="fact-label">Experiência</span>
      </div>

      <div class="browser-home__timeline">
        <article
          v-for="entry in content.experience"
          :key="`${entry.company}-${entry.role}`"
          class="browser-card"
        >
          <span class="fact-label">{{ entry.period }}</span>
          <strong>{{ entry.role }}</strong>
          <p class="preview-text">{{ entry.company }}</p>
          <p class="preview-text">{{ entry.summary }}</p>
        </article>
      </div>
    </div>

    <div class="browser-section">
      <div class="browser-section__header">
        <span class="fact-label">Contato</span>
      </div>

      <div class="browser-home__contacts">
        <a
          v-for="contact in content.contacts"
          :key="contact.label"
          class="browser-contact"
          :href="contact.href"
          :target="contact.href.startsWith('#') ? undefined : '_blank'"
          :rel="contact.href.startsWith('#') ? undefined : 'noreferrer'"
        >
          <span class="fact-label">{{ contact.label }}</span>
          <strong>{{ contact.value }}</strong>
        </a>

        <a
          class="browser-contact browser-contact--resume"
          :href="content.resume.href"
          target="_blank"
          rel="noreferrer"
        >
          <span class="fact-label">Currículo</span>
          <strong>{{ content.resume.label }}</strong>
        </a>
      </div>
    </div>
  </div>
</template>
