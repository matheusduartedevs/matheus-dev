<script setup lang="ts">
import type { PortfolioContent } from '@/types/portfolio'

defineProps<{
  content: PortfolioContent
}>()
</script>

<template>
  <section class="mobile-page">
    <header class="mobile-hero">
      <p class="mobile-eyebrow">Versão institucional mobile</p>
      <h1 class="mobile-title">{{ content.name }}</h1>
      <p class="mobile-subtitle">{{ content.title }}</p>
      <p class="mobile-summary">{{ content.mobileIntro }}</p>
      <a class="resume-link" :href="content.resume.href" target="_blank" rel="noreferrer">
        {{ content.resume.label }}
      </a>
    </header>

    <section class="mobile-section">
      <h2 class="mobile-section-title">Sobre</h2>
      <p class="mobile-body">{{ content.summary }}</p>
    </section>

    <section class="mobile-section">
      <h2 class="mobile-section-title">Projetos selecionados</h2>

      <div class="mobile-card-list">
        <article v-for="project in content.projects" :key="project.name" class="mobile-card">
          <div class="mobile-card-meta">
            <span>{{ project.role }}</span>
            <span>{{ project.year }}</span>
          </div>
          <h3 class="mobile-card-title">{{ project.name }}</h3>
          <p class="mobile-body">{{ project.summary }}</p>
        </article>
      </div>
    </section>

    <section class="mobile-section">
      <h2 class="mobile-section-title">Experiência</h2>

      <div class="mobile-card-list">
        <article
          v-for="entry in content.experience"
          :key="`${entry.company}-${entry.role}`"
          class="mobile-card"
        >
          <div class="mobile-card-meta">
            <span>{{ entry.company }}</span>
            <span>{{ entry.period }}</span>
          </div>
          <h3 class="mobile-card-title">{{ entry.role }}</h3>
          <p class="mobile-body">{{ entry.summary }}</p>
        </article>
      </div>
    </section>

    <section class="mobile-section">
      <h2 class="mobile-section-title">Contato</h2>

      <div class="mobile-contact-list">
        <a
          v-for="contact in content.contacts"
          :key="contact.label"
          class="mobile-contact-link"
          :href="contact.href"
          target="_blank"
          rel="noreferrer"
        >
          <span>{{ contact.label }}</span>
          <strong>{{ contact.value }}</strong>
        </a>
      </div>
    </section>
  </section>
</template>
