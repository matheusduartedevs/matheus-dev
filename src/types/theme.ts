export const themeOptions = ['windows', 'macos', 'linux'] as const

export type OsTheme = (typeof themeOptions)[number]

export const defaultTheme: OsTheme = 'windows'
