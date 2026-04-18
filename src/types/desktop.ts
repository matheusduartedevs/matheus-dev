import type { OsTheme } from '@/types/theme'

export const desktopAppIds = ['browser', 'terminal', 'files'] as const

export type DesktopAppId = (typeof desktopAppIds)[number]
export type DesktopWindowMode = 'half' | 'fullscreen'
export type DesktopAppIcons = Record<OsTheme, string>
export type BrowserPage = 'home' | 'resume'

export type DesktopWindow = {
  id: DesktopAppId
  appId: DesktopAppId
  title: string
  isOpen: boolean
  isMinimized: boolean
  isFocused: boolean
  zIndex: number
  windowMode: DesktopWindowMode
  x: number
  y: number
  width: number
  height: number
}

export type DesktopAppDefinition = {
  id: DesktopAppId
  title: string
  shortLabel: string
  icons: DesktopAppIcons
}
