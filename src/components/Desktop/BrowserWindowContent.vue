<script setup lang="ts">
import { computed } from 'vue'

import { getResumeOpenHref } from '@/lib/resume'
import type { PortfolioContent, PortfolioSkill } from '@/types/portfolio'
import type { OsTheme } from '@/types/theme'

const props = defineProps<{
  content: PortfolioContent
  theme: OsTheme
}>()

const primaryContacts = computed(() =>
  props.content.contacts.filter((contact) => !contact.href.startsWith('#')).slice(0, 2),
)

const visibleSkills = computed(() => props.content.skills.slice(0, 18))

const skillColumns = computed(() => {
  const columns: PortfolioSkill[][] = [[], [], []]

  visibleSkills.value.forEach((skill, index) => {
    columns[index % columns.length]?.push(skill)
  })

  return columns
})
</script>

<template>
  <div class="browser-app" :class="`browser-app--${theme}`">
    <div class="browser-app__chrome">
      <div class="browser-app__toolbar">
        <div class="browser-app__nav">
          <button type="button" class="browser-app__icon-button" aria-label="Go back">
            ←
          </button>
          <button type="button" class="browser-app__icon-button" aria-label="Go forward">
            →
          </button>
          <button type="button" class="browser-app__icon-button" aria-label="Refresh">
            ↻
          </button>
        </div>

        <div class="browser-app__addressbar">
          <span class="browser-app__address-indicator"></span>
          <div class="browser-app__address-copy">
            <span class="browser-app__address-domain">portfolio-os.dev/home</span>
          </div>
        </div>
      </div>
    </div>

    <div class="browser-app__page browser-editorial">
      <section class="browser-editorial__hero">
        <div class="browser-editorial__lead">
          <p class="browser-editorial__eyebrow">Frontend engineer</p>
          <h1 class="browser-editorial__name">{{ content.name }}</h1>

          <div class="browser-editorial__hero-body">
            <p class="browser-editorial__headline">{{ content.title }}</p>
            <p class="browser-editorial__summary">{{ content.summary }}</p>
          </div>

          <div class="browser-editorial__hero-actions">
            <a class="browser-app__cta" :href="getResumeOpenHref(content.resume)" target="_blank" rel="noreferrer">
              Open resume
            </a>

            <div class="browser-editorial__primary-links">
              <a
                v-for="contact in primaryContacts"
                :key="contact.label"
                class="browser-editorial__primary-link"
                :href="contact.href"
                target="_blank"
                rel="noreferrer"
              >
                <span>{{ contact.label }}</span>
                <strong>{{ contact.value }}</strong>
              </a>
            </div>
          </div>
        </div>

        <!-- não quero isso -->
        <!-- <aside class="browser-editorial__aside">
          <div class="browser-editorial__aside-block">
            <span class="browser-editorial__meta-label">Focus</span>
            <strong>{{ content.metrics[0]?.value }}</strong>
            <p>{{ content.desktopIntro }}</p>
          </div>

          <div class="browser-editorial__aside-block browser-editorial__aside-block--compact">
            <div v-for="metric in content.metrics.slice(1)" :key="metric.label" class="browser-editorial__metric">
              <span>{{ metric.label }}</span>
              <strong>{{ metric.value }}</strong>
            </div>
          </div>
        </aside> -->
      </section>

      <section class="browser-editorial__section">
        <div class="browser-editorial__section-head">
          <span class="browser-editorial__index">01</span>
          <div>
            <p class="browser-editorial__section-label">Destaques</p>
            <h2 class="browser-editorial__section-title">Projetos com contexto, impacto e responsabilidade técnica.</h2>
          </div>
        </div>

        <div class="browser-editorial__project-list">
          <article v-for="project in content.projects" :key="project.name" class="browser-editorial__project">
            <div class="browser-editorial__project-meta">
              <span>{{ project.year }}</span>
              <strong>{{ project.name }}</strong>
            </div>
            <p class="browser-editorial__project-role">{{ project.role }}</p>
            <p class="browser-editorial__project-summary">{{ project.summary }}</p>
          </article>
        </div>
      </section>

      <section class="browser-editorial__section">
        <div class="browser-editorial__section-head">
          <span class="browser-editorial__index">02</span>
          <div>
            <p class="browser-editorial__section-label">Experiência</p>
            <h2 class="browser-editorial__section-title">Trajetória orientada por produto, qualidade e fluxos críticos.</h2>
          </div>
        </div>

        <div class="browser-editorial__experience-list">
          <article
            v-for="entry in content.experience"
            :key="`${entry.company}-${entry.role}`"
            class="browser-editorial__experience"
          >
            <div class="browser-editorial__experience-meta">
              <span>{{ entry.period }}</span>
              <strong>{{ entry.role }}</strong>
              <p>{{ entry.company }}</p>
            </div>

            <div class="browser-editorial__experience-body">
              <p>{{ entry.summary }}</p>
              <ul class="browser-editorial__experience-points">
                <li v-for="highlight in entry.highlights" :key="highlight">{{ highlight }}</li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      <section class="browser-editorial__section browser-editorial__section--capabilities">
        <div class="browser-editorial__section-head">
          <span class="browser-editorial__index">03</span>
          <div>
            <p class="browser-editorial__section-label">Habilidades</p>
            <h2 class="browser-editorial__section-title">Stack principal, ferramentas e repertório técnico em produção.</h2>
          </div>
        </div>

        <div class="browser-editorial__capabilities">
          <div class="browser-editorial__skill-columns">
            <div v-for="(column, index) in skillColumns" :key="index" class="browser-editorial__skill-column">
              <span v-for="skill in column" :key="skill.value" class="browser-editorial__skill">
                {{ skill.value }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section class="browser-editorial__section browser-editorial__section--footer">
        <div class="browser-editorial__section-head">
          <span class="browser-editorial__index">04</span>
          <div>
            <p class="browser-editorial__section-label">Educação</p>
            <h2 class="browser-editorial__section-title">Formação acadêmica e base técnica construída ao longo da graduação.</h2>
          </div>
        </div>

        <div class="browser-editorial__stack">
          <article
            v-for="item in content.education"
            :key="`${item.institution}-${item.program}`"
            class="browser-editorial__stack-item"
          >
            <span>{{ item.period }}</span>
            <strong>{{ item.program }}</strong>
            <p>{{ item.institution }}</p>
            <p>{{ item.summary }}</p>
          </article>
        </div>
      </section>

      <section class="browser-editorial__section browser-editorial__section--footer">
        <div class="browser-editorial__section-head">
          <span class="browser-editorial__index">05</span>
          <div>
            <p class="browser-editorial__section-label">Certificações</p>
            <h2 class="browser-editorial__section-title">Certificações complementares em idioma, segurança e desenvolvimento.</h2>
          </div>
        </div>

        <div class="browser-editorial__stack">
          <article
            v-for="item in content.certifications"
            :key="`${item.name}-${item.year}`"
            class="browser-editorial__stack-item"
          >
            <span>{{ item.year }}</span>
            <strong>{{ item.name }}</strong>
            <p>{{ item.issuer }}</p>
            <p>{{ item.summary }}</p>
          </article>
        </div>
      </section>

      <section class="browser-editorial__section browser-editorial__section--footer">
        <div class="browser-editorial__section-head">
          <span class="browser-editorial__index">06</span>
          <div>
            <p class="browser-editorial__section-label">Idiomas</p>
            <h2 class="browser-editorial__section-title">Idiomas e nível de proficiência.</h2>
          </div>
        </div>

        <div class="browser-editorial__stack">
          <div class="browser-editorial__language-list">
            <div v-for="item in content.languages" :key="item.name" class="browser-editorial__language-item">
              <strong>{{ item.name }}</strong>
              <span>{{ item.level }}</span>
              <p>{{ item.detail }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="browser-editorial__section browser-editorial__section--footer">
        <div class="browser-editorial__section-head">
          <span class="browser-editorial__index">07</span>
          <div>
            <p class="browser-editorial__section-label">Contato</p>
            <h2 class="browser-editorial__section-title">Vamos nos conectar!</h2>
          </div>
        </div>

        <div class="browser-editorial__stack">
          <div class="browser-editorial__contact-list">
            <a
              v-for="contact in content.contacts"
              :key="contact.label"
              class="browser-editorial__contact-item"
              :href="contact.href"
              :target="contact.href.startsWith('#') ? undefined : '_blank'"
              :rel="contact.href.startsWith('#') ? undefined : 'noreferrer'"
            >
              <span>{{ contact.label }}</span>
              <strong>{{ contact.value }}</strong>
            </a>

            <a
              class="browser-editorial__contact-item browser-editorial__contact-item--resume"
              :href="getResumeOpenHref(content.resume)"
              target="_blank"
              rel="noreferrer"
            >
              <span>Currículo</span>
              <strong>{{ content.resume.label }}</strong>
            </a>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style src="@/styles/browser.css"></style>
