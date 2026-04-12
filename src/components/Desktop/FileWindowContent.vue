<script setup lang="ts">
import { getResumeDownloadHref, getResumeOpenHref } from '@/lib/resume'
import type { PortfolioContent } from '@/types/portfolio'
import type { OsTheme } from '@/types/theme'

const props = defineProps<{
  content: PortfolioContent
  theme: OsTheme
}>()
const toolbarByTheme = {
  windows: {
    summary: '1 item',
  },
  macos: {
    summary: '1 arquivo',
  },
  linux: {
    summary: '1 documento',
  },
} as const

const openResume = () => {
  window.open(getResumeOpenHref(props.content.resume), '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <div class="file-window" :class="`file-window--${theme}`">
    <div class="file-window__toolbar">
      <div class="file-window__breadcrumbs">
        <span>Início</span>
        <span>/</span>
        <span>Documentos</span>
      </div>

      <div class="file-window__toolbar-status">
        <span class="file-window__toolbar-pill">{{ toolbarByTheme[theme].summary }}</span>
        <span class="file-window__toolbar-pill">PDF</span>
      </div>
    </div>

    <div class="file-window__layout">
      <section class="file-window__content">
        <div class="file-window__header-row">
          <span>Nome</span>
          <span>Tipo</span>
          <span>Ação</span>
        </div>

        <div
          class="file-window__row"
          :class="`file-window__row--${theme}`"
          @dblclick="openResume"
        >
          <div class="file-window__file">
            <span class="file-window__file-badge">PDF</span>
            <span class="file-window__file-name">{{ content.resume.label }}</span>
          </div>
          <span class="file-window__meta">Documento PDF</span>
          <div class="file-window__actions">
            <a :href="getResumeOpenHref(content.resume)" target="_blank" rel="noreferrer">Abrir</a>
            <a :href="getResumeDownloadHref(content.resume)" :download="content.resume.downloadName">
              Download
            </a>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
