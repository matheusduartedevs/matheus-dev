import { computed, onBeforeUnmount, ref } from 'vue'

import {
  executeTerminalCommand,
  findTerminalCommand,
  getTerminalCommands,
} from '@/lib/terminal/commands'
import type { PortfolioContent } from '@/types/portfolio'
import type { TerminalCommandDefinition, TerminalEntry } from '@/types/terminal'

const loadingMessage = 'Consultando portfólio'

const loadingFrameCount = 4
const responseDelayMs = 720
const loadingFrameDelayMs = 150

const createEntryId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

const createInitialEntries = (): TerminalEntry[] => [
  {
    id: createEntryId(),
    tone: 'system',
    lines: ['Terminal pronto. Digite "help" para ver os comandos disponíveis.'],
  },
  {
    id: createEntryId(),
    tone: 'system',
    lines: [
      'Navegação rápida:',
      '/whoami',
      '/projects',
      '/experience',
      '/skills',
      '/education',
      '/contact',
    ],
  },
]

export const useTerminalSession = (content: PortfolioContent) => {
  const commands: TerminalCommandDefinition[] = getTerminalCommands(content)
  const entries = ref<TerminalEntry[]>(createInitialEntries())
  const commandInput = ref('')
  const commandHistory = ref<string[]>([])
  const historyIndex = ref(commandHistory.value.length)
  const isLoading = ref(false)
  let loadingInterval: number | null = null
  let loadingTimeout: number | null = null
  let resolveLoadingTimeout: (() => void) | null = null
  let isDisposed = false

  const trimmedInput = computed(() => commandInput.value.trim())
  const normalizedQuery = computed(() => trimmedInput.value.toLowerCase().replace(/^\//, ''))

  const hintedCommand = computed(() => {
    if (!trimmedInput.value) {
      return null
    }

    const normalizedInput = trimmedInput.value.toLowerCase()
    const exactMatch = findTerminalCommand(commands, normalizedInput)

    if (exactMatch) {
      return exactMatch
    }

    return (
      commands.find((command) => {
        const aliases = command.aliases ?? []

        return (
          command.name.startsWith(normalizedQuery.value) ||
          (command.usage ?? command.name).startsWith(normalizedQuery.value) ||
          aliases.some((alias) => alias.replace(/^\//, '').startsWith(normalizedQuery.value))
        )
      }) ?? null
    )
  })

  const hintedCommands = computed(() => {
    if (!trimmedInput.value || isLoading.value) {
      return []
    }

    return commands
      .filter((command) => {
        const aliases = command.aliases ?? []

        return (
          command.name.startsWith(normalizedQuery.value) ||
          (command.usage ?? command.name).startsWith(normalizedQuery.value) ||
          aliases.some((alias) => alias.replace(/^\//, '').startsWith(normalizedQuery.value))
        )
      })
      .slice(0, 5)
  })

  const commandHint = computed(() => {
    if (isLoading.value) {
      return ''
    }

    if (!trimmedInput.value) {
      return 'Pressione ↑ e ↓ para o histórico.'
    }

    if (hintedCommands.value.length) {
      return 'Pressione Tab para completar.'
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
    const entry: TerminalEntry = {
      id: createEntryId(),
      tone,
      lines,
    }

    if (tone === 'output' || tone === 'error' || tone === 'system') {
      entry.isAnimated = true
    }

    entries.value.push(entry)
    return entry.id
  }

  const updateEntry = (entryId: string, lines: string[]) => {
    const entry = entries.value.find((item) => item.id === entryId)

    if (!entry) {
      return
    }

    entry.lines = lines
  }

  const removeEntry = (entryId: string) => {
    entries.value = entries.value.filter((entry) => entry.id !== entryId)
  }

  const stopLoadingAnimation = () => {
    if (loadingInterval !== null) {
      window.clearInterval(loadingInterval)
      loadingInterval = null
    }
  }

  const stopLoadingTimeout = () => {
    if (loadingTimeout !== null) {
      window.clearTimeout(loadingTimeout)
      loadingTimeout = null
    }

    if (resolveLoadingTimeout) {
      resolveLoadingTimeout()
      resolveLoadingTimeout = null
    }
  }

  const startLoadingAnimation = (entryId: string) => {
    let frame = 0

    updateEntry(entryId, [`${loadingMessage}${'.'.repeat(frame)}`])

    loadingInterval = window.setInterval(() => {
      frame = (frame + 1) % loadingFrameCount
      updateEntry(entryId, [`${loadingMessage}${'.'.repeat(frame)}`])
    }, loadingFrameDelayMs)
  }

  const submitCommand = async () => {
    if (isLoading.value) {
      return
    }

    const normalizedInput = trimmedInput.value

    if (!normalizedInput) {
      appendEntry('error', ['Digite um comando antes de pressionar Enter.'])
      return
    }

    appendEntry('input', [normalizedInput])
    commandHistory.value.push(normalizedInput)
    historyIndex.value = commandHistory.value.length

    const result = executeTerminalCommand(commands, content, normalizedInput)
    const loadingEntryId = appendEntry('loading', [loadingMessage])
    isLoading.value = true
    startLoadingAnimation(loadingEntryId)
    commandInput.value = ''

    await new Promise<void>((resolve) => {
      resolveLoadingTimeout = resolve
      loadingTimeout = window.setTimeout(() => {
        loadingTimeout = null
        resolveLoadingTimeout = null
        resolve()
      }, responseDelayMs)
    })

    if (isDisposed) {
      return
    }

    stopLoadingAnimation()
    removeEntry(loadingEntryId)

    if (result.type === 'clear') {
      entries.value = createInitialEntries()
    } else {
      appendEntry(result.tone ?? 'output', result.lines)
    }

    isLoading.value = false
  }

  onBeforeUnmount(() => {
    isDisposed = true
    stopLoadingAnimation()
    stopLoadingTimeout()
  })

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
    commands,
    commandInput,
    commandHint,
    entries,
    hintedCommand,
    hintedCommands,
    isLoading,
    submitCommand,
    moveHistoryUp,
    moveHistoryDown,
    applyHint,
  }
}
