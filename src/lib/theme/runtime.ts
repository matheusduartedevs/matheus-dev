import { defaultTheme, themeOptions, type OsTheme } from '@/types/theme'

const storageKey = 'system-os-theme'

type NavigatorWithUserAgentData = Navigator & {
  userAgentData?: {
    platform?: string
  }
}

export const isBrowser = () => typeof window !== 'undefined'

export const isTheme = (value: string | null): value is OsTheme =>
  value !== null && themeOptions.includes(value as OsTheme)

export const detectOsTheme = (): OsTheme => {
  if (!isBrowser()) {
    return defaultTheme
  }

  const userAgentData = (navigator as NavigatorWithUserAgentData).userAgentData
  const platform = userAgentData?.platform ?? [navigator.platform, navigator.userAgent].join(' ')
  const normalizedPlatform = platform.toLowerCase()

  if (normalizedPlatform.includes('mac')) {
    return 'macos'
  }

  if (normalizedPlatform.includes('win')) {
    return 'windows'
  }

  if (
    normalizedPlatform.includes('linux') ||
    normalizedPlatform.includes('x11') ||
    normalizedPlatform.includes('ubuntu') ||
    normalizedPlatform.includes('fedora')
  ) {
    return 'linux'
  }

  return defaultTheme
}

export const readStoredTheme = (): OsTheme | null => {
  if (!isBrowser()) {
    return null
  }

  const storedTheme = window.localStorage.getItem(storageKey)
  return isTheme(storedTheme) ? storedTheme : null
}

export const writeStoredTheme = (theme: OsTheme) => {
  if (!isBrowser()) {
    return
  }

  window.localStorage.setItem(storageKey, theme)
}

export const clearStoredTheme = () => {
  if (!isBrowser()) {
    return
  }

  window.localStorage.removeItem(storageKey)
}
