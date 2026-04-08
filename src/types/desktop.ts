export const desktopAppIds = ['browser', 'terminal', 'files'] as const

export type DesktopAppId = (typeof desktopAppIds)[number]

export type DesktopWindow = {
  id: DesktopAppId
  appId: DesktopAppId
  title: string
  isOpen: boolean
  isMinimized: boolean
  isFocused: boolean
  zIndex: number
  x: number
  y: number
  width: number
  height: number
}

export type DesktopAppDefinition = {
  id: DesktopAppId
  title: string
  shortLabel: string
}
