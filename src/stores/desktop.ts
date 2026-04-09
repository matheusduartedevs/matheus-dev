import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import type { DesktopAppDefinition, DesktopAppId, DesktopWindow } from '@/types/desktop'

const desktopApps: DesktopAppDefinition[] = [
  { id: 'browser', title: 'Browser', shortLabel: 'Browser' },
  { id: 'terminal', title: 'Terminal', shortLabel: 'Terminal' },
  { id: 'files', title: 'Files', shortLabel: 'Files' },
]

const createWindows = (): DesktopWindow[] => [
  {
    id: 'browser',
    appId: 'browser',
    title: 'Browser',
    isOpen: false,
    isMinimized: false,
    isFocused: false,
    zIndex: 1,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
  {
    id: 'terminal',
    appId: 'terminal',
    title: 'Terminal',
    isOpen: false,
    isMinimized: false,
    isFocused: false,
    zIndex: 1,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
  {
    id: 'files',
    appId: 'files',
    title: 'Files',
    isOpen: false,
    isMinimized: false,
    isFocused: false,
    zIndex: 1,
    x: 180,
    y: 100,
    width: 1200,
    height: 600,
  },
]

export const useDesktopStore = defineStore('desktop', () => {
  const apps = ref<DesktopAppDefinition[]>(desktopApps)
  const windows = ref<DesktopWindow[]>(createWindows())
  const zIndexCounter = ref(1)

  const visibleWindows = computed(() =>
    windows.value
      .filter((window) => window.isOpen && !window.isMinimized)
      .sort((left, right) => left.zIndex - right.zIndex),
  )

  const getWindow = (appId: DesktopAppId) => windows.value.find((window) => window.appId === appId) ?? null

  const clearFocus = () => {
    windows.value.forEach((window) => {
      window.isFocused = false
    })
  }

  const syncFocusToTopWindow = () => {
    const topWindow = visibleWindows.value.at(-1)
    clearFocus()

    if (topWindow) {
      topWindow.isFocused = true
    }
  }

  const focusWindow = (appId: DesktopAppId) => {
    const window = getWindow(appId)

    if (!window || !window.isOpen || window.isMinimized) {
      return
    }

    clearFocus()
    zIndexCounter.value += 1
    window.zIndex = zIndexCounter.value
    window.isFocused = true
  }

  const openWindow = (appId: DesktopAppId) => {
    const window = getWindow(appId)

    if (!window) {
      return
    }

    window.isOpen = true
    window.isMinimized = false
    focusWindow(appId)
  }

  const minimizeWindow = (appId: DesktopAppId) => {
    const window = getWindow(appId)

    if (!window || !window.isOpen) {
      return
    }

    window.isMinimized = true
    window.isFocused = false
    syncFocusToTopWindow()
  }

  const closeWindow = (appId: DesktopAppId) => {
    const window = getWindow(appId)

    if (!window) {
      return
    }

    window.isOpen = false
    window.isMinimized = false
    window.isFocused = false
    syncFocusToTopWindow()
  }

  return {
    apps,
    windows,
    visibleWindows,
    getWindow,
    openWindow,
    focusWindow,
    minimizeWindow,
    closeWindow,
  }
})
