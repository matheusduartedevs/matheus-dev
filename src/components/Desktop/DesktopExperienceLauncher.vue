<script setup lang="ts">
import { ref } from 'vue'

import type { OsTheme } from '@/types/theme'

defineProps<{
  theme: OsTheme
  title: string
  ctaLabel: string
}>()

const emit = defineEmits<{
  activate: []
}>()

const isActivating = ref(false)

const handleActivate = () => {
  if (isActivating.value) {
    return
  }

  isActivating.value = true

  window.setTimeout(() => {
    emit('activate')
  }, 460)
}
</script>

<template>
  <div
    class="desktop-launcher"
    :class="[`desktop-launcher--${theme}`, { 'is-activating': isActivating }]"
  >
    <div class="desktop-launcher__backdrop" aria-hidden="true">
      <span class="desktop-launcher__orb desktop-launcher__orb--primary" />
      <span class="desktop-launcher__orb desktop-launcher__orb--secondary" />
      <span class="desktop-launcher__grid" />
    </div>

    <div class="desktop-launcher__panel">
      <span class="desktop-launcher__eyebrow">portfolio-OS</span>
      <h1 class="desktop-launcher__title">{{ title }}</h1>
      <p class="desktop-launcher__body">
        Uma experiência desktop inspirada em sistemas operacionais para navegar pela minha trajetória,
        projetos e repertório técnico.
      </p>

      <button
        class="desktop-launcher__button"
        type="button"
        :disabled="isActivating"
        @click="handleActivate"
      >
        {{ ctaLabel }}
      </button>
    </div>
  </div>
</template>
