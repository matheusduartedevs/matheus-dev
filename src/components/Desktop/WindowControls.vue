<script setup lang="ts">
import type { OsTheme } from '@/types/theme'

defineProps<{
  theme: OsTheme
}>()

defineEmits<{
  minimize: []
  close: []
}>()
</script>

<template>
  <div
    v-if="theme === 'macos'"
    class="window-controls window-controls--macos"
  >
    <button
      class="window-controls__macos-action window-controls__macos-action--close"
      type="button"
      @click.stop="$emit('close')"
    />
    <button
      class="window-controls__macos-action window-controls__macos-action--minimize"
      type="button"
      @click.stop="$emit('minimize')"
    />
    <span class="window-controls__macos-action window-controls__macos-action--maximize" />
  </div>

  <div
    v-else
    class="window-controls"
    :class="`window-controls--${theme}`"
  >
    <button
      class="window-controls__system-action window-controls__system-action--minimize"
      :class="`window-controls__system-action--${theme}`"
      type="button"
      @click.stop="$emit('minimize')"
    >
      <span />
    </button>
    <button
      class="window-controls__system-action window-controls__system-action--maximize"
      :class="`window-controls__system-action--${theme}`"
      type="button"
      aria-label="maximize"
    >
      <span />
    </button>
    <button
      class="window-controls__system-action window-controls__system-action--close"
      :class="`window-controls__system-action--${theme}`"
      type="button"
      @click.stop="$emit('close')"
    >
      <span />
    </button>
  </div>
</template>
