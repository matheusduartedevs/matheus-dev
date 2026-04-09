<script setup lang="ts">
import type { PortfolioContent } from '@/types/portfolio'
import type { OsTheme } from '@/types/theme'

defineProps<{
  content: PortfolioContent
  theme: OsTheme
}>()
</script>

<template>
  <div class="file-window" :class="`file-window--${theme}`">
    <div class="file-window__toolbar">
      <div class="file-window__breadcrumbs">
        <span>Início</span>
        <span>/</span>
        <span>Documentos</span>
      </div>
    </div>

    <div class="file-window__layout">
      <aside class="file-window__sidebar">
        <span class="file-window__sidebar-title">Locais</span>
        <button class="file-window__sidebar-item is-active" type="button">Documentos</button>
        <button class="file-window__sidebar-item" type="button">Downloads</button>
        <button class="file-window__sidebar-item" type="button">Área de trabalho</button>
      </aside>

      <section class="file-window__content">
        <div class="file-window__header-row">
          <span>Nome</span>
          <span>Tipo</span>
          <span>Ação</span>
        </div>

        <div class="file-window__row" :class="`file-window__row--${theme}`">
          <div class="file-window__file">
            <span class="file-window__file-badge">PDF</span>
            <span class="file-window__file-name">{{ content.resume.label }}</span>
          </div>
          <span class="file-window__meta">Documento PDF</span>
          <div class="file-window__actions">
            <a :href="content.resume.href" target="_blank" rel="noreferrer">Open</a>
            <a :href="content.resume.href" download>Download</a>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
