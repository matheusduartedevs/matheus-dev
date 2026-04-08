<script setup lang="ts">
import { ref } from 'vue'

import type { OsTheme } from '@/types/theme'

defineProps<{
  theme: OsTheme
}>()

const commandInput = ref('')
</script>

<template>
  <div class="terminal-window" :class="`terminal-window--${theme}`">
    <div class="terminal-window__surface" :class="`terminal-window__surface--${theme}`">
      <div class="terminal-window__intro" :class="`terminal-window__intro--${theme}`">
        <p class="terminal-window__eyebrow">Terminal</p>
        <h2 class="terminal-window__title">Portfolio interativo</h2>
        <p class="terminal-window__description">
          Digite um comando para navegar pelo terminal.
        </p>
      </div>

      <div class="terminal-window__output" :class="`terminal-window__output--${theme}`">
        <p class="terminal-window__line">
          <span class="terminal-window__prompt" :class="`terminal-window__prompt--${theme}`">
            {{ theme === 'windows' ? 'C:\\portfolio>' : theme === 'linux' ? 'matheus@portfolio:~$' : 'matheus@portfolio %' }}
          </span>
          <span class="terminal-window__hint"></span>
        </p>
      </div>

      <label class="terminal-window__input-row" :class="`terminal-window__input-row--${theme}`">
        <span class="terminal-window__prompt" :class="`terminal-window__prompt--${theme}`">
          {{ theme === 'windows' ? '>' : '$' }}
        </span>
        <input
          v-model="commandInput"
          class="terminal-window__input"
          :class="`terminal-window__input--${theme}`"
          type="text"
          placeholder="Type a command"
          spellcheck="false"
        />
      </label>
    </div>
  </div>
</template>
