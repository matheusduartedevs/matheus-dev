<script setup lang="ts">
import { computed, onMounted } from 'vue'

import DesktopShellPreview from '@/components/DesktopShellPreview.vue'
import MobileInstitutionalView from '@/components/MobileInstitutionalView.vue'
import { useResponsiveMode } from '@/composables/useResponsiveMode'
import { portfolioContent } from '@/content/portfolio'
import { useThemeStore } from '@/stores/theme'
import { themeOptions, type OsTheme } from '@/types/theme'

const themeStore = useThemeStore()
const { isDesktop } = useResponsiveMode()

const shellStatus = computed(() =>
  themeStore.isSystemTheme ? 'Using detected OS theme' : 'Using manual override',
)

const setTheme = (theme: OsTheme) => {
  themeStore.setTheme(theme)
}

onMounted(() => {
  themeStore.initializeTheme()
})
</script>

<template>
  <main :data-os-theme="themeStore.effectiveTheme" class="app-shell">
    <DesktopShellPreview
      v-if="isDesktop"
      :content="portfolioContent"
      :themes="themeOptions"
      :detected-theme="themeStore.detectedTheme"
      :selected-theme="themeStore.selectedTheme"
      :effective-theme="themeStore.effectiveTheme"
      :is-system-theme="themeStore.isSystemTheme"
      :shell-status="shellStatus"
      @select-theme="setTheme"
      @clear-theme="themeStore.clearThemeSelection()"
    />

    <MobileInstitutionalView v-else :content="portfolioContent" />
  </main>
</template>
