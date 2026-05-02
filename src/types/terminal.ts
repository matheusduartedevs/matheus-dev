import type { BrowserPage } from '@/types/desktop'
import type { PortfolioContent } from '@/types/portfolio'

export type TerminalEntryTone = 'input' | 'output' | 'error' | 'system' | 'loading'
export type TerminalLineTone = 'default' | 'heading' | 'accent' | 'success' | 'muted'

export type TerminalLine =
  | string
  | {
      text: string
      tone?: TerminalLineTone
    }

export type TerminalEntry = {
  id: string
  tone: TerminalEntryTone
  lines: TerminalLine[]
  isAnimated?: boolean
}

export type TerminalCommandResult =
  | {
      type: 'print'
      tone?: Exclude<TerminalEntryTone, 'input'>
      lines: TerminalLine[]
    }
  | {
      type: 'navigate'
      tone?: Exclude<TerminalEntryTone, 'input'>
      lines: TerminalLine[]
      page: BrowserPage
    }
  | {
      type: 'clear'
    }

export type TerminalCommandContext = {
  content: PortfolioContent
  commands: TerminalCommandDefinition[]
  rawInput: string
  args: string[]
}

export type TerminalCommandDefinition = {
  name: string
  aliases?: string[]
  description: string
  usage?: string
  execute: (context: TerminalCommandContext) => TerminalCommandResult
}
