import type { PortfolioContent } from '@/types/portfolio'

export type TerminalEntryTone = 'input' | 'output' | 'error' | 'system'

export type TerminalEntry = {
  id: string
  tone: TerminalEntryTone
  lines: string[]
}

export type TerminalCommandResult =
  | {
      type: 'print'
      tone?: Exclude<TerminalEntryTone, 'input'>
      lines: string[]
    }
  | {
      type: 'clear'
    }

export type TerminalCommandContext = {
  content: PortfolioContent
  commands: TerminalCommandDefinition[]
}

export type TerminalCommandDefinition = {
  name: string
  aliases?: string[]
  description: string
  execute: (context: TerminalCommandContext) => TerminalCommandResult
}
