<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'

import { useTerminalSession } from '@/composables/useTerminalSession'
import type { PortfolioContent } from '@/types/portfolio'
import type { OsTheme } from '@/types/theme'

const props = defineProps<{
  content: PortfolioContent
  theme: OsTheme
}>()

const outputElement = ref<HTMLElement | null>(null)

const {
  commandInput,
  commandHint,
  entries,
  hintedCommand,
  submitCommand,
  moveHistoryUp,
  moveHistoryDown,
  applyHint,
} = useTerminalSession(props.content)

const promptValue =
  props.theme === 'windows'
    ? 'C:\\portfolio>'
    : props.theme === 'linux'
      ? 'matheus@portfolio:~$'
      : 'matheus@portfolio %'

watch(
  entries,
  async () => {
    await nextTick()

    if (outputElement.value) {
      outputElement.value.scrollTop = outputElement.value.scrollHeight
    }
  },
  { deep: true },
)

const onInputKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    event.preventDefault()
    submitCommand()
    return
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault()
    moveHistoryUp()
    return
  }

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    moveHistoryDown()
    return
  }

  if (event.key === 'Tab') {
    event.preventDefault()
    applyHint()
  }
}
</script>

<template>
  <div class="terminal-window" :class="`terminal-window--${theme}`">
    <div class="terminal-window__surface" :class="`terminal-window__surface--${theme}`">
      <div class="terminal-window__intro" :class="`terminal-window__intro--${theme}`">
        <p class="terminal-window__eyebrow">Terminal</p>
        <h2 class="terminal-window__title">Portfólio interativo</h2>
        <p class="terminal-window__description">
          Digite um comando para navegar pelo terminal.
        </p>
      </div>

      <div ref="outputElement" class="terminal-window__output" :class="`terminal-window__output--${theme}`">
        <div
          v-for="entry in entries"
          :key="entry.id"
          class="terminal-window__entry"
          :class="`terminal-window__entry--${entry.tone}`"
        >
          <p
            v-for="(line, lineIndex) in entry.lines"
            :key="`${entry.id}-${lineIndex}`"
            class="terminal-window__line"
          >
            <span
              v-if="entry.tone === 'input' && lineIndex === 0"
              class="terminal-window__prompt"
              :class="`terminal-window__prompt--${theme}`"
            >
              {{ promptValue }}
            </span>
            <span>{{ line }}</span>
          </p>
        </div>
      </div>

      <label class="terminal-window__input-row" :class="`terminal-window__input-row--${theme}`">
        <span class="terminal-window__prompt" :class="`terminal-window__prompt--${theme}`">
          {{ promptValue }}
        </span>
        <input
          v-model="commandInput"
          class="terminal-window__input"
          :class="`terminal-window__input--${theme}`"
          type="text"
          placeholder="Digite um comando"
          spellcheck="false"
          @keydown="onInputKeydown"
        />
        <span
          class="terminal-window__input-hint"
          :class="{ 'is-actionable': Boolean(hintedCommand) }"
        >
          {{ commandHint }}
        </span>
      </label>
    </div>
  </div>
</template>
