<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'

import { getResumeDownloadHref, getResumeOpenHref } from '@/lib/resume'
import { useDesktopStore } from '@/stores/desktop'
import type { PortfolioContent, PortfolioSkill } from '@/types/portfolio'
import type { OsTheme } from '@/types/theme'

const props = defineProps<{
  content: PortfolioContent
  theme: OsTheme
}>()

const desktopStore = useDesktopStore()
const { browserRefreshKey, canGoBackBrowser, canGoForwardBrowser, currentBrowserPage } =
  storeToRefs(desktopStore)

const pageViewport = ref<HTMLElement | null>(null)

const currentAddress = computed(() =>
  currentBrowserPage.value === 'resume' ? 'portfolio-os.dev/resume' : 'portfolio-os.dev/home',
)

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

const resumeFrameKey = computed(() => `${currentBrowserPage.value}-${browserRefreshKey.value}`)
const homePageKey = computed(() => `home-${browserRefreshKey.value}`)

const openHomePage = () => {
  desktopStore.openBrowserPage('home')
}

const openResumePage = () => {
  desktopStore.openBrowserPage('resume')
}

watch(
  [currentBrowserPage, browserRefreshKey],
  async () => {
    await nextTick()

    if (pageViewport.value) {
      pageViewport.value.scrollTop = 0
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="browser-app" :class="`browser-app--${theme}`">
    <div class="browser-app__chrome">
      <div class="browser-app__tabs">
        <button
          type="button"
          class="browser-app__tab"
          :class="{ 'is-active': currentBrowserPage === 'home' }"
          @click="openHomePage"
        >
          <span class="browser-app__tab-label">Início</span>
        </button>

        <button
          type="button"
          class="browser-app__tab"
          :class="{ 'is-active': currentBrowserPage === 'resume' }"
          @click="openResumePage"
        >
          <span class="browser-app__tab-label">Currículo</span>
        </button>
      </div>

      <div class="browser-app__toolbar">
        <div class="browser-app__nav">
          <button
            type="button"
            class="browser-app__icon-button"
            aria-label="Go back"
            :disabled="!canGoBackBrowser"
            @click="desktopStore.goBackBrowser()"
          >
            ←
          </button>
          <button
            type="button"
            class="browser-app__icon-button"
            aria-label="Go forward"
            :disabled="!canGoForwardBrowser"
            @click="desktopStore.goForwardBrowser()"
          >
            →
          </button>
          <button
            type="button"
            class="browser-app__icon-button"
            aria-label="Refresh"
            @click="desktopStore.refreshBrowserPage()"
          >
            ↻
          </button>
        </div>

        <div class="browser-app__addressbar">
          <span class="browser-app__address-indicator"></span>
          <div class="browser-app__address-copy">
            <span class="browser-app__address-domain">{{ currentAddress }}</span>
          </div>
        </div>
      </div>
    </div>

    <div ref="pageViewport" class="browser-app__page">
      <div v-if="currentBrowserPage === 'home'" :key="homePageKey" class="browser-editorial">
        <section class="browser-editorial__hero">
          <div class="browser-editorial__lead">
            <p class="browser-editorial__eyebrow">Frontend engineer</p>
            <h1 class="browser-editorial__name">{{ content.name }}</h1>

            <div class="browser-editorial__hero-body">
              <p class="browser-editorial__headline">{{ content.title }}</p>
              <p class="browser-editorial__summary">{{ content.summary }}</p>
            </div>

            <div class="browser-editorial__hero-actions">
              <button type="button" class="browser-app__cta" @click="openResumePage">
                Abrir currículo
              </button>

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

              <button
                type="button"
                class="browser-editorial__contact-item browser-editorial__contact-item--resume"
                @click="openResumePage"
              >
                <span>Currículo</span>
                <strong>{{ content.resume.label }}</strong>
              </button>
            </div>
          </div>
        </section>
      </div>

      <div v-else class="browser-resume">
        <section class="browser-resume__hero">
          <div class="browser-editorial__section-head">
            <span class="browser-editorial__index">08</span>
            <div>
              <p class="browser-editorial__section-label">Currículo</p>
              <h2 class="browser-editorial__section-title">{{ content.resume.label }}</h2>
            </div>
          </div>

          <div class="browser-resume__actions">
            <a class="browser-app__cta" :href="getResumeOpenHref(content.resume)" target="_blank" rel="noreferrer">
              Abrir externamente
            </a>
            <a
              class="browser-app__cta browser-app__cta--secondary"
              :href="getResumeDownloadHref(content.resume)"
              :download="content.resume.downloadName"
            >
              Baixar em PDF
            </a>
          </div>
        </section>

        <div class="browser-resume__viewer-shell">
          <iframe
            :key="resumeFrameKey"
            class="browser-resume__viewer"
            :src="`${content.resume.publicPath}#toolbar=0&navpanes=0&scrollbar=1`"
            :title="content.resume.label"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="@/styles/browser.css"></style>
