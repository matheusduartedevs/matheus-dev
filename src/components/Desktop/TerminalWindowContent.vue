<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'

import { useTerminalSession } from '@/composables/useTerminalSession'
import type { PortfolioContent } from '@/types/portfolio'
import type { OsTheme } from '@/types/theme'

const props = defineProps<{
  content: PortfolioContent
  theme: OsTheme
}>()

const outputElement = ref<HTMLElement | null>(null)
const inputElement = ref<HTMLInputElement | null>(null)

const {
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
} = useTerminalSession(props.content)

const bannerBlocks = [
  {
    tone: 'primary',
    lines: [
      '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
      '~ __  __    _  _____ _   _ _____ _   _ ____  ~',
      '~|  \\/  |  / \\|_   _| | | | ____| | | / ___| ~',
      '~| |\\/| | / _ \\ | | | |_| |  _| | | | \\___ \\ ~',
      '~| |  | |/ ___ \\| | |  _  | |___| |_| |___) |~',
      '~|_|__|_/_/ _ \\_\\_| |_|_|_|_____|\\___/|____/ ~',
      '~|  _ \\| | | | / \\  |  _ \\_   _| ____|       ~',
      '~| | | | | | |/ _ \\ | |_) || | |  _|         ~',
      '~| |_| | |_| / ___ \\|  _ < | | | |___        ~',
      '~|____/ \\___/_/   \\_\\_| \\_\\|_| |_____|       ~',
      '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
    ],
  },
] as const

const capabilityRows = props.content.metrics.map((metric) => ({
  label: metric.label,
  value: metric.value,
}))

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

const focusInput = () => {
  inputElement.value?.focus()
}

onMounted(() => {
  focusInput()
})

watch(isLoading, async (loading) => {
  if (loading) {
    return
  }

  await nextTick()
  focusInput()
})

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
  <div class="terminal-window" :class="`terminal-window--${theme}`" @pointerdown="focusInput">
    <div ref="outputElement" class="terminal-window__output" :class="`terminal-window__output--${theme}`">
      <section class="terminal-window__hero">
        <div class="terminal-window__banner" aria-hidden="true">
          <div
            v-for="block in bannerBlocks"
            :key="block.tone"
            class="terminal-window__banner-block"
            :class="`terminal-window__banner-block--${block.tone}`"
          >
            <p v-for="line in block.lines" :key="line" class="terminal-window__banner-line">
              {{ line }}
            </p>
          </div>
        </div>

        <div class="terminal-window__hero-grid">
          <article class="terminal-window__panel">
            <p class="terminal-window__panel-text">{{ content.title }}</p>
            <p class="terminal-window__panel-meta">{{ content.summary }}</p>
          </article>

          <article class="terminal-window__panel">
            <span class="terminal-window__panel-label">Capacidades</span>
            <div class="terminal-window__capabilities">
              <div
                v-for="row in capabilityRows"
                :key="row.label"
                class="terminal-window__capability-row"
              >
                <span class="terminal-window__capability-label">{{ row.label }}</span>
                <strong class="terminal-window__capability-value">{{ row.value }}</strong>
              </div>
            </div>
          </article>
        </div>
      </section>

      <div class="terminal-window__log">
        <div
          v-for="entry in entries"
          :key="entry.id"
          class="terminal-window__entry"
          :class="[
            `terminal-window__entry--${entry.tone}`,
            { 'is-animated': entry.isAnimated, 'is-loading': entry.tone === 'loading' },
          ]"
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
    </div>

    <div v-if="hintedCommands.length" class="terminal-window__suggestions">
      <button
        v-for="command in hintedCommands"
        :key="command.name"
        class="terminal-window__suggestion"
        type="button"
        @mousedown.prevent
        @click="commandInput = command.name"
      >
        <span class="terminal-window__suggestion-command">/{{ command.usage ?? command.name }}</span>
        <span class="terminal-window__suggestion-description">{{ command.description }}</span>
      </button>
    </div>

    <label class="terminal-window__input-row" :class="`terminal-window__input-row--${theme}`">
      <span class="terminal-window__input-marker">&gt;</span>
      <span class="terminal-window__prompt" :class="`terminal-window__prompt--${theme}`">
        {{ promptValue }}
      </span>
      <input
        ref="inputElement"
        v-model="commandInput"
        class="terminal-window__input"
        :class="`terminal-window__input--${theme}`"
        type="text"
        placeholder='Digite um comando... tente "/help"'
        spellcheck="false"
        :disabled="isLoading"
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
</template>
