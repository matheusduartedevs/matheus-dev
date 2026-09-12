<script setup lang="ts">
import { computed, ref } from 'vue'
import PortfolioArrow from './PortfolioArrow.vue'
import { getResumeOpenHref } from '@/lib/resume'
import type { PortfolioContent } from '@/types/portfolio'

defineProps<{ content: PortfolioContent; embedded?: boolean }>()
const emit = defineEmits<{ openResume: [] }>()
const root = ref<HTMLElement | null>(null)
const selectedProject = ref(0)
const projectIds = ['modernizacao', 'checkout', 'seo']
const sectionId = (name: string) => `portfolio-${name}`
const activeProjectId = computed(() => projectIds[selectedProject.value])

function navigate(name: string) {
  const target = root.value?.querySelector<HTMLElement>(`#${sectionId(name)}`)
  if (!target) return
  const viewport = root.value?.closest<HTMLElement>('.browser-app__page')
  if (viewport) {
    viewport.scrollTo({
      top:
        viewport.scrollTop +
        target.getBoundingClientRect().top -
        viewport.getBoundingClientRect().top -
        20,
      behavior: 'instant',
    })
  } else {
    window.scrollTo({
      top: window.scrollY + target.getBoundingClientRect().top - 20,
      behavior: 'instant',
    })
  }
  target.focus({ preventScroll: true })
}
</script>

<template>
  <div ref="root" class="portfolio-page">
    <nav class="portfolio-nav" aria-label="Navegação do portfólio">
      <button
        class="portfolio-wordmark"
        aria-label="Voltar à apresentação"
        @click="navigate('inicio')"
      >
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M4 24V8h8l4 8 4-8h8v16M4 16h8m8 0h8" />
        </svg>
        <span>matheus<span class="portfolio-wordmark__dot">.</span></span>
      </button>
      <div class="portfolio-nav__links">
        <button @click="navigate('projetos')">Projetos</button>
        <button @click="navigate('sobre')">Sobre</button>
        <button class="portfolio-nav__contact" @click="navigate('contato')">
          Contato <PortfolioArrow />
        </button>
      </div>
    </nav>

    <section
      :id="sectionId('inicio')"
      class="portfolio-hero"
      tabindex="-1"
      aria-labelledby="portfolio-name"
    >
      <div class="portfolio-hero__name-row">
        <h1 id="portfolio-name">Matheus Duarte<span>.</span></h1>
        <svg class="portfolio-symbol" viewBox="0 0 100 100" aria-hidden="true">
          <path d="M18 32 2 50l16 18M82 32l16 18-16 18M61 16 39 84" />
        </svg>
      </div>
      <div class="portfolio-hero__intro">
        <h2>Front-end para produtos que precisam <em>funcionar de verdade.</em></h2>
        <div class="portfolio-hero__aside">
          <p>
            Interfaces claras, arquitetura e confiabilidade. Atuo em jornadas de venda e checkout,
            conectando engenharia à experiência de quem usa.
          </p>
          <div class="portfolio-actions">
            <button class="portfolio-button" @click="navigate('projetos')">
              Explorar projetos <PortfolioArrow direction="down" />
            </button>
            <button v-if="embedded" class="portfolio-text-link" @click="emit('openResume')">
              Meu currículo <PortfolioArrow />
            </button>
            <a
              v-else
              class="portfolio-text-link"
              :href="getResumeOpenHref(content.resume)"
              target="_blank"
              rel="noreferrer"
              >Meu currículo <PortfolioArrow
            /></a>
          </div>
        </div>
      </div>
      <div class="portfolio-hero__footnote">
        <span>São Paulo, Brasil</span>
        <span>TypeScript · Vue / Nuxt · React</span>
      </div>
    </section>

    <section
      :id="sectionId('projetos')"
      class="portfolio-section portfolio-work"
      tabindex="-1"
      aria-labelledby="portfolio-work-heading"
    >
      <div class="portfolio-section__heading">
        <h2 id="portfolio-work-heading">Engenharia em prática<span>.</span></h2>
        <p>Entregas selecionadas.<br />Contexto, decisões e contribuição.</p>
      </div>
      <div class="portfolio-workspace">
        <div class="portfolio-workspace__bar">
          <span>Projetos / {{ activeProjectId }}</span
          ><span>{{ content.projects.length }} entregas</span>
        </div>
        <div class="portfolio-workspace__body">
          <div class="portfolio-project-picker" aria-label="Selecionar projeto">
            <button
              v-for="(project, index) in content.projects"
              :key="project.name"
              :class="{ 'is-selected': selectedProject === index }"
              :aria-pressed="selectedProject === index"
              aria-controls="portfolio-project-detail"
              @click="selectedProject = index"
            >
              <span class="portfolio-project-picker__year">{{ project.year }}</span>
              <strong>{{ project.name }}</strong
              ><PortfolioArrow class="portfolio-project-picker__arrow" />
            </button>
          </div>
          <article
            id="portfolio-project-detail"
            class="portfolio-project-detail"
            aria-live="polite"
            aria-atomic="true"
          >
            <template v-for="(project, index) in content.projects" :key="project.name">
              <div
                v-if="index === selectedProject"
                :key="selectedProject"
                class="portfolio-project-detail__content"
              >
                <h3>{{ project.name }}</h3>
                <p class="portfolio-project-detail__role">{{ project.role }}</p>
                <p>{{ project.summary }}</p>
                <h4>Minha contribuição</h4>
                <ul>
                  <li v-for="highlight in project.highlights" :key="highlight">{{ highlight }}</li>
                </ul>
              </div>
            </template>
          </article>
        </div>
      </div>
    </section>

    <section
      :id="sectionId('sobre')"
      class="portfolio-section"
      tabindex="-1"
      aria-labelledby="portfolio-about-heading"
    >
      <div class="portfolio-section__heading">
        <h2 id="portfolio-about-heading">Construir é só o começo<span>.</span></h2>
        <p>O trabalho continua<br />depois do deploy.</p>
      </div>
      <p class="portfolio-about-copy">{{ content.summary }}</p>
      <div class="portfolio-experience">
        <article
          v-for="entry in content.experience"
          :key="entry.role"
          class="portfolio-experience__entry"
        >
          <div class="portfolio-experience__meta">
            <span>{{ entry.period }}</span
            ><strong>{{ entry.company }}</strong>
          </div>
          <div>
            <h3>{{ entry.role }}</h3>
            <p>{{ entry.summary }}</p>
            <details>
              <summary>Ver contribuições</summary>
              <ul>
                <li v-for="item in entry.highlights" :key="item">{{ item }}</li>
              </ul>
            </details>
          </div>
        </article>
      </div>
    </section>

    <section
      class="portfolio-section portfolio-toolkit"
      aria-labelledby="portfolio-toolkit-heading"
    >
      <div class="portfolio-section__heading">
        <h2 id="portfolio-toolkit-heading">Repertório técnico<span>.</span></h2>
      </div>
      <div class="portfolio-skill-grid">
        <details v-for="group in content.skills" :key="group.title" class="portfolio-skill-group">
          <summary>{{ group.title }}<span aria-hidden="true">+</span></summary>
          <ul>
            <li v-for="item in group.items" :key="item.value">{{ item.value }}</li>
          </ul>
        </details>
      </div>
    </section>

    <section
      class="portfolio-section portfolio-background"
      aria-label="Formação, idiomas e certificações"
    >
      <div>
        <h2>Formação</h2>
        <article v-for="education in content.education" :key="education.program">
          <span class="portfolio-meta">{{ education.period }}</span>
          <h3>{{ education.program }}</h3>
          <p>{{ education.institution }}</p>
          <p>{{ education.summary }}</p>
        </article>
      </div>
      <div>
        <h2>Idiomas</h2>
        <article v-for="language in content.languages" :key="language.name">
          <h3>
            {{ language.name }} <span>{{ language.level }}</span>
          </h3>
          <p v-if="language.detail">{{ language.detail }}</p>
        </article>
        <h2 class="portfolio-cert-heading">Certificações</h2>
        <details
          v-for="certificate in content.certifications"
          :key="certificate.name"
          class="portfolio-certificate"
        >
          <summary>{{ certificate.name }}</summary>
          <p>{{ certificate.issuer }} · {{ certificate.year }}</p>
          <p>{{ certificate.summary }}</p>
        </details>
      </div>
    </section>

    <footer
      :id="sectionId('contato')"
      class="portfolio-contact"
      tabindex="-1"
      aria-labelledby="portfolio-contact-heading"
    >
      <div class="portfolio-contact__intro">
        <h2 id="portfolio-contact-heading">Vamos conversar<span>?</span></h2>
        <p>Sobre produtos, interfaces<br />e o que podemos construir.</p>
      </div>
      <div class="portfolio-contact__links">
        <template v-for="contact in content.contacts" :key="contact.label">
          <a
            v-if="!contact.href.startsWith('#')"
            :href="contact.href"
            :target="contact.href.startsWith('mailto:') ? undefined : '_blank'"
            rel="noreferrer"
            ><span>{{ contact.label }}</span
            ><strong>{{ contact.value }}</strong
            ><PortfolioArrow
          /></a>
        </template>
      </div>
      <div class="portfolio-colophon">
        <span>{{ content.name }}</span
        ><button v-if="embedded" @click="emit('openResume')">
          Abrir currículo em PDF <PortfolioArrow /></button
        ><a v-else :href="getResumeOpenHref(content.resume)" target="_blank" rel="noreferrer"
          >Abrir currículo em PDF <PortfolioArrow /></a
        ><button @click="navigate('inicio')">
          Voltar ao início <PortfolioArrow direction="up" />
        </button>
      </div>
    </footer>
  </div>
</template>

<style src="@/styles/portfolio.css"></style>
