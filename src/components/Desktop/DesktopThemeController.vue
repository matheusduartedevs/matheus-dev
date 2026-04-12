<script setup lang="ts">
import { ref } from 'vue'

import themeControllerLinuxIcon from '@/assets/icons/theme-controller-linux.svg'
import themeControllerMacosIcon from '@/assets/icons/theme-controller-macos.svg'
import themeControllerWindowsIcon from '@/assets/icons/theme-controller-windows.svg'
import type { OsTheme } from '@/types/theme'

defineProps<{
  themes: readonly OsTheme[]
  effectiveTheme: OsTheme
  isSystemTheme: boolean
  shellStatus: string
}>()

defineEmits<{
  selectTheme: [theme: OsTheme]
  clearTheme: []
}>()

const isOpen = ref(false)
</script>

<template>
  <button
    class="desktop-theme-launcher"
    :class="{ 'is-active': isOpen }"
    type="button"
    @click="isOpen = !isOpen"
  >
    <span class="desktop-theme-launcher__glyph" aria-hidden="true">
      <img :src="themeControllerWindowsIcon" alt="" class="desktop-theme-launcher__image desktop-theme-launcher__image--windows" />
      <img :src="themeControllerMacosIcon" alt="" class="desktop-theme-launcher__image desktop-theme-launcher__image--macos" />
      <img :src="themeControllerLinuxIcon" alt="" class="desktop-theme-launcher__image desktop-theme-launcher__image--linux" />
    </span>
    <span class="desktop-theme-launcher__label">OS</span>
  </button>

  <div v-if="isOpen" class="desktop-theme-controller">
    <div class="desktop-theme-controller__header">
      <div class="desktop-theme-controller__heading">
        <span class="desktop-theme-controller__eyebrow">Aparência do desktop</span>
        <span class="desktop-theme-controller__title">Escolha o sistema visual</span>
      </div>
    </div>

    <div class="desktop-theme-controller__meta">
      <span class="desktop-theme-controller__state">{{ shellStatus }}</span>
    </div>

    <div class="desktop-theme-controller__options">
      <button
        class="theme-button theme-button--system"
        :class="{ 'is-active': isSystemTheme }"
        type="button"
        @click="$emit('clearTheme'); isOpen = false"
      >
        <span class="theme-button__title">Sistema</span>
        <span class="theme-button__meta">Automático</span>
      </button>

      <button
        v-for="theme in themes"
        :key="theme"
        class="theme-button"
        :class="{ 'is-active': effectiveTheme === theme && !isSystemTheme }"
        type="button"
        @click="$emit('selectTheme', theme); isOpen = false"
      >
        <span class="theme-button__title">{{ theme }}</span>
        <span class="theme-button__meta">Manual</span>
      </button>
    </div>
  </div>
</template>
