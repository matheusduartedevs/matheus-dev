import type { PortfolioContent } from '@/types/portfolio'

export type TerminalEntryTone = 'input' | 'output' | 'error' | 'system' | 'loading'

export type TerminalEntry = {
  id: string
  tone: TerminalEntryTone
  lines: string[]
  isAnimated?: boolean
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
