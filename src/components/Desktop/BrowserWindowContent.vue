<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import PortfolioPage from '@/components/Portfolio/PortfolioPage.vue'
import { storeToRefs } from 'pinia'

import { getResumeDownloadHref, getResumeOpenHref, getResumeViewerHref } from '@/lib/resume'
import { useDesktopStore } from '@/stores/desktop'
import type { PortfolioContent } from '@/types/portfolio'
import type { OsTheme } from '@/types/theme'

defineProps<{
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
          :aria-current="currentBrowserPage === 'home' ? 'page' : undefined"
          @click="openHomePage"
        >
          <span class="browser-app__tab-label">Início</span>
        </button>

        <button
          type="button"
          class="browser-app__tab"
          :class="{ 'is-active': currentBrowserPage === 'resume' }"
          :aria-current="currentBrowserPage === 'resume' ? 'page' : undefined"
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
            aria-label="Voltar"
            :disabled="!canGoBackBrowser"
            @click="desktopStore.goBackBrowser()"
          >
            ←
          </button>
          <button
            type="button"
            class="browser-app__icon-button"
            aria-label="Avançar"
            :disabled="!canGoForwardBrowser"
            @click="desktopStore.goForwardBrowser()"
          >
            →
          </button>
          <button
            type="button"
            class="browser-app__icon-button"
            aria-label="Recarregar"
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
      <PortfolioPage
        v-if="currentBrowserPage === 'home'"
        :key="homePageKey"
        :content="content"
        embedded
        @open-resume="openResumePage"
      />

      <div v-else class="browser-resume">
        <section class="browser-resume__hero">
          <h1 class="browser-resume__title">{{ content.resume.label }}</h1>

          <div class="browser-resume__actions">
            <a
              class="browser-app__cta"
              :href="getResumeOpenHref(content.resume)"
              target="_blank"
              rel="noreferrer"
            >
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
            :src="getResumeViewerHref(content.resume)"
            :title="content.resume.label"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="@/styles/browser.css"></style>
