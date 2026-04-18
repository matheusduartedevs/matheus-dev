import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import type { BrowserPage, DesktopAppDefinition, DesktopAppId, DesktopWindow } from '@/types/desktop'
import browserLinuxIcon from '@/assets/icons/browser-linux.svg'
import browserMacosIcon from '@/assets/icons/browser-macos.svg'
import browserWindowsIcon from '@/assets/icons/browser-windows.svg'
import filesLinuxIcon from '@/assets/icons/files-linux.svg'
import filesMacosIcon from '@/assets/icons/files-macos.svg'
import filesWindowsIcon from '@/assets/icons/files-windows.svg'
import terminalLinuxIcon from '@/assets/icons/terminal-linux.svg'
import terminalMacosIcon from '@/assets/icons/terminal-macos.svg'
import terminalWindowsIcon from '@/assets/icons/terminal-windows.svg'

const desktopApps: DesktopAppDefinition[] = [
  {
    id: 'browser',
    title: 'Browser',
    shortLabel: 'Browser',
    icons: {
      windows: browserWindowsIcon,
      macos: browserMacosIcon,
      linux: browserLinuxIcon,
    },
  },
  {
    id: 'terminal',
    title: 'Terminal',
    shortLabel: 'Terminal',
    icons: {
      windows: terminalWindowsIcon,
      macos: terminalMacosIcon,
      linux: terminalLinuxIcon,
    },
  },
  {
    id: 'files',
    title: 'Arquivos',
    shortLabel: 'Arquivos',
    icons: {
      windows: filesWindowsIcon,
      macos: filesMacosIcon,
      linux: filesLinuxIcon,
    },
  },
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
    windowMode: 'half',
    x: 72,
    y: 112,
    width: 980,
    height: 620,
  },
  {
    id: 'terminal',
    appId: 'terminal',
    title: 'Terminal',
    isOpen: false,
    isMinimized: false,
    isFocused: false,
    zIndex: 1,
    windowMode: 'half',
    x: 136,
    y: 148,
    width: 860,
    height: 520,
  },
  {
    id: 'files',
    appId: 'files',
    title: 'Files',
    isOpen: false,
    isMinimized: false,
    isFocused: false,
    zIndex: 1,
    windowMode: 'half',
    x: 200,
    y: 88,
    width: 1100,
    height: 610,
  },
]

export const useDesktopStore = defineStore('desktop', () => {
  const apps = ref<DesktopAppDefinition[]>(desktopApps)
  const windows = ref<DesktopWindow[]>(createWindows())
  const zIndexCounter = ref(1)
  const isDesktopActivated = ref(false)
  const browserHistory = ref<BrowserPage[]>(['home'])
  const browserHistoryIndex = ref(0)
  const browserRefreshKey = ref(0)

  const visibleWindows = computed(() =>
    windows.value
      .filter((window) => window.isOpen && !window.isMinimized)
      .sort((left, right) => left.zIndex - right.zIndex),
  )
  const currentBrowserPage = computed(() => browserHistory.value[browserHistoryIndex.value] ?? 'home')
  const canGoBackBrowser = computed(() => browserHistoryIndex.value > 0)
  const canGoForwardBrowser = computed(() => browserHistoryIndex.value < browserHistory.value.length - 1)

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

  const activateDesktop = () => {
    isDesktopActivated.value = true
  }

  const pushBrowserHistory = (page: BrowserPage) => {
    const nextHistory = browserHistory.value.slice(0, browserHistoryIndex.value + 1)
    nextHistory.push(page)
    browserHistory.value = nextHistory
    browserHistoryIndex.value = nextHistory.length - 1
  }

  const openBrowserPage = (page: BrowserPage) => {
    const currentPage = currentBrowserPage.value

    if (currentPage === page) {
      openWindow('browser')
      return
    }

    pushBrowserHistory(page)
    openWindow('browser')
  }

  const goBackBrowser = () => {
    if (!canGoBackBrowser.value) {
      return
    }

    browserHistoryIndex.value -= 1
    openWindow('browser')
  }

  const goForwardBrowser = () => {
    if (!canGoForwardBrowser.value) {
      return
    }

    browserHistoryIndex.value += 1
    openWindow('browser')
  }

  const refreshBrowserPage = () => {
    browserRefreshKey.value += 1
  }

  const activateApp = (appId: DesktopAppId) => {
    const window = getWindow(appId)

    if (!window || !window.isOpen || window.isMinimized) {
      openWindow(appId)
      return
    }

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

  const toggleWindowMode = (appId: DesktopAppId) => {
    const window = getWindow(appId)

    if (!window || !window.isOpen) {
      return
    }

    window.windowMode = window.windowMode === 'fullscreen' ? 'half' : 'fullscreen'
    focusWindow(appId)
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
    isDesktopActivated,
    visibleWindows,
    currentBrowserPage,
    canGoBackBrowser,
    canGoForwardBrowser,
    browserRefreshKey,
    activateDesktop,
    getWindow,
    openWindow,
    openBrowserPage,
    goBackBrowser,
    goForwardBrowser,
    refreshBrowserPage,
    activateApp,
    focusWindow,
    minimizeWindow,
    toggleWindowMode,
    closeWindow,
  }
})
