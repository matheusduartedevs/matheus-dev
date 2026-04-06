import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import {
  clearStoredTheme,
  detectOsTheme,
  readStoredTheme,
  writeStoredTheme,
} from '@/lib/theme/runtime'
import { defaultTheme, type OsTheme } from '@/types/theme'

export const useThemeStore = defineStore('theme', () => {
  const detectedTheme = ref<OsTheme>(defaultTheme)
  const selectedTheme = ref<OsTheme | null>(null)
  const isReady = ref(false)

  const effectiveTheme = computed(() => selectedTheme.value ?? detectedTheme.value)
  const isSystemTheme = computed(() => selectedTheme.value === null)

  const initializeTheme = () => {
    detectedTheme.value = detectOsTheme()
    selectedTheme.value = readStoredTheme()
    isReady.value = true
  }

  const setTheme = (theme: OsTheme) => {
    selectedTheme.value = theme
    writeStoredTheme(theme)
  }

  const clearThemeSelection = () => {
    selectedTheme.value = null
    clearStoredTheme()
  }

  return {
    detectedTheme,
    selectedTheme,
    effectiveTheme,
    isSystemTheme,
    isReady,
    initializeTheme,
    setTheme,
    clearThemeSelection,
  }
})
