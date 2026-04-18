<script setup lang="ts">
import { getResumeOpenHref } from '@/lib/resume'
import type { PortfolioContent } from '@/types/portfolio'

defineProps<{
  content: PortfolioContent
}>()
</script>

<template>
  <section class="mobile-page">
    <header class="mobile-hero">
      <div class="mobile-hero__header">
        <p class="mobile-eyebrow">Portfolio overview</p>
        <span class="mobile-hero__status">Frontend engineer</span>
      </div>

      <div class="mobile-hero__content">
        <h1 class="mobile-title">{{ content.name }}</h1>
        <p class="mobile-subtitle">{{ content.title }}</p>
        <p class="mobile-summary">{{ content.mobileIntro }}</p>
      </div>

      <div class="mobile-hero__actions">
        <a
          class="resume-link"
          :href="getResumeOpenHref(content.resume)"
          target="_blank"
          rel="noreferrer"
        >
          {{ content.resume.label }}
        </a>

        <a
          v-for="contact in content.contacts.slice(0, 2)"
          :key="contact.label"
          class="mobile-hero__action-link"
          :href="contact.href"
          :target="contact.href.startsWith('#') ? undefined : '_blank'"
          :rel="contact.href.startsWith('#') ? undefined : 'noreferrer'"
        >
          <span>{{ contact.label }}</span>
          <strong>{{ contact.value }}</strong>
        </a>
      </div>

      <div class="mobile-metric-grid">
        <article v-for="metric in content.metrics" :key="metric.label" class="mobile-metric-card">
          <span class="mobile-section-title">{{ metric.label }}</span>
          <strong>{{ metric.value }}</strong>
        </article>
      </div>
    </header>

    <section class="mobile-section">
      <div class="mobile-section__intro">
        <h2 class="mobile-section-title">Overview</h2>
        <p class="mobile-body">{{ content.summary }}</p>
      </div>
    </section>

    <section class="mobile-section">
      <div class="mobile-section__intro">
        <h2 class="mobile-section-title">Projects</h2>
        <p class="mobile-body">Projetos recentes com foco em impacto, contexto técnico e produto.</p>
      </div>

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
      <div class="mobile-section__intro">
        <h2 class="mobile-section-title">Experience</h2>
        <p class="mobile-body">Trajetória em produto digital, performance e fluxos críticos.</p>
      </div>

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
          <ul class="mobile-list">
            <li v-for="highlight in entry.highlights.slice(0, 4)" :key="highlight">{{ highlight }}</li>
          </ul>
        </article>
      </div>
    </section>

    <section class="mobile-section">
      <div class="mobile-section__intro">
        <h2 class="mobile-section-title">Skills</h2>
        <p class="mobile-body">Stack principal e áreas onde a execução tende a ser mais forte.</p>
      </div>

      <div class="mobile-tag-grid">
        <span v-for="skill in content.skills" :key="skill.value" class="mobile-tag">
          {{ skill.value }}
        </span>
      </div>
    </section>

    <section class="mobile-section mobile-section--split">
      <article class="mobile-subsection">
        <div class="mobile-section__intro">
          <h2 class="mobile-section-title">Education</h2>
        </div>

        <div class="mobile-card-list">
          <article
            v-for="item in content.education"
            :key="`${item.institution}-${item.program}`"
            class="mobile-card"
          >
            <div class="mobile-card-meta">
              <span>{{ item.institution }}</span>
              <span>{{ item.period }}</span>
            </div>
            <h3 class="mobile-card-title">{{ item.program }}</h3>
            <p class="mobile-body">{{ item.summary }}</p>
          </article>
        </div>
      </article>

      <article class="mobile-subsection">
        <div class="mobile-section__intro">
          <h2 class="mobile-section-title">Languages</h2>
        </div>

        <div class="mobile-card-list">
          <article v-for="item in content.languages" :key="item.name" class="mobile-card">
            <div class="mobile-card-meta">
              <span>{{ item.name }}</span>
              <span>{{ item.level }}</span>
            </div>
            <p class="mobile-body">{{ item.detail ?? 'Uso em contexto profissional e colaboração.' }}</p>
          </article>
        </div>
      </article>
    </section>

    <section class="mobile-section">
      <div class="mobile-section__intro">
        <h2 class="mobile-section-title">Certifications</h2>
        <p class="mobile-body">Formação complementar e credenciais verificáveis.</p>
      </div>

      <div class="mobile-card-list">
        <article v-for="item in content.certifications" :key="`${item.name}-${item.year}`" class="mobile-card">
          <div class="mobile-card-meta">
            <span>{{ item.issuer }}</span>
            <span>{{ item.year }}</span>
          </div>
          <h3 class="mobile-card-title">{{ item.name }}</h3>
          <p class="mobile-body">{{ item.summary }}</p>
        </article>
      </div>
    </section>

    <section class="mobile-section">
      <div class="mobile-section__intro">
        <h2 class="mobile-section-title">Contact</h2>
        <p class="mobile-body">Canais para conversa, portfólio público e currículo completo.</p>
      </div>

      <div class="mobile-contact-list">
        <a
          v-for="contact in content.contacts"
          :key="contact.label"
          class="mobile-contact-link"
          :href="contact.href"
          :target="contact.href.startsWith('#') ? undefined : '_blank'"
          :rel="contact.href.startsWith('#') ? undefined : 'noreferrer'"
        >
          <span>{{ contact.label }}</span>
          <strong>{{ contact.value }}</strong>
        </a>

        <a
          class="mobile-contact-link mobile-contact-link--resume"
          :href="getResumeOpenHref(content.resume)"
          target="_blank"
          rel="noreferrer"
        >
          <span>Resume</span>
          <strong>{{ content.resume.label }}</strong>
        </a>
      </div>
    </section>
  </section>
</template>
