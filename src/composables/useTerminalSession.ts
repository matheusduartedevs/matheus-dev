import { computed, ref } from 'vue'

import {
  executeTerminalCommand,
  findTerminalCommand,
  getTerminalCommands,
} from '@/lib/terminal/commands'
import type { PortfolioContent } from '@/types/portfolio'
import type { TerminalCommandDefinition, TerminalEntry } from '@/types/terminal'

const createEntryId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

const createInitialEntries = (): TerminalEntry[] => [
  {
    id: createEntryId(),
    tone: 'system',
    lines: ['Terminal pronto. Digite "help" para ver os comandos disponíveis.'],
  },
]

export const useTerminalSession = (content: PortfolioContent) => {
  const commands: TerminalCommandDefinition[] = getTerminalCommands(content)
  const entries = ref<TerminalEntry[]>(createInitialEntries())
  const commandInput = ref('')
  const commandHistory = ref<string[]>([])
  const historyIndex = ref(commandHistory.value.length)

  const trimmedInput = computed(() => commandInput.value.trim())

  const hintedCommand = computed(() => {
    if (!trimmedInput.value) {
      return null
    }

    const normalizedInput = trimmedInput.value.toLowerCase()
    const exactMatch = findTerminalCommand(commands, normalizedInput)

    if (exactMatch) {
      return exactMatch
    }

    return commands.find((command) => command.name.startsWith(normalizedInput)) ?? null
  })

  const commandHint = computed(() => {
    if (!trimmedInput.value) {
      return 'Pressione Tab para autocomplete. Use ↑ e ↓ para o histórico.'
    }

    if (!hintedCommand.value) {
      return 'Nenhum comando correspondente. Digite "help" para ver os comandos.'
    }

    if (trimmedInput.value.toLowerCase() === hintedCommand.value.name) {
      return hintedCommand.value.description
    }

    return `Sugestão: ${hintedCommand.value.name}`
  })

  const appendEntry = (tone: TerminalEntry['tone'], lines: string[]) => {
    entries.value.push({
      id: createEntryId(),
      tone,
      lines,
    })
  }

  const submitCommand = () => {
    const normalizedInput = trimmedInput.value

    if (!normalizedInput) {
      appendEntry('error', ['Digite um comando antes de pressionar Enter.'])
      return
    }

    appendEntry('input', [normalizedInput])
    commandHistory.value.push(normalizedInput)
    historyIndex.value = commandHistory.value.length

    const result = executeTerminalCommand(commands, content, normalizedInput)

    if (result.type === 'clear') {
      entries.value = createInitialEntries()
    } else {
      appendEntry(result.tone ?? 'output', result.lines)
    }

    commandInput.value = ''
  }

  const applyHistoryValue = (nextIndex: number) => {
    if (!commandHistory.value.length) {
      return
    }

    if (nextIndex < 0) {
      historyIndex.value = 0
      commandInput.value = commandHistory.value[0] ?? ''
      return
    }

    if (nextIndex >= commandHistory.value.length) {
      historyIndex.value = commandHistory.value.length
      commandInput.value = ''
      return
    }

    historyIndex.value = nextIndex
    commandInput.value = commandHistory.value[nextIndex] ?? ''
  }

  const moveHistoryUp = () => {
    if (!commandHistory.value.length) {
      return
    }

    const nextIndex = Math.max(historyIndex.value - 1, 0)
    applyHistoryValue(nextIndex)
  }

  const moveHistoryDown = () => {
    if (!commandHistory.value.length) {
      return
    }

    const nextIndex = Math.min(historyIndex.value + 1, commandHistory.value.length)
    applyHistoryValue(nextIndex)
  }

  const applyHint = () => {
    if (!hintedCommand.value) {
      return
    }

    commandInput.value = hintedCommand.value.name
  }

  return {
    commandInput,
    commandHint,
    entries,
    hintedCommand,
    submitCommand,
    moveHistoryUp,
    moveHistoryDown,
    applyHint,
  }
}
