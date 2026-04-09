<script setup lang="ts">
import WindowControls from '@/components/Desktop/WindowControls.vue'
import type { OsTheme } from '@/types/theme'

withDefaults(
  defineProps<{
    title: string
    theme: OsTheme
    isFocused: boolean
    x?: number
    y?: number
    width?: number
    height?: number
    zIndex: number
    fill?: boolean
  }>(),
  {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    fill: false,
  },
)

defineEmits<{
  focus: []
  minimize: []
  close: []
}>()
</script>

<template>
  <article
    class="desktop-window"
    :class="[`theme-${theme}`, { 'is-focused': isFocused, 'is-fill': fill }]"
    :style="{
      top: fill ? undefined : `${y}px`,
      left: fill ? undefined : `${x}px`,
      width: fill ? undefined : `${width}px`,
      height: fill ? undefined : `${height}px`,
      zIndex,
    }"
    @pointerdown="$emit('focus')"
  >
    <header class="desktop-window__titlebar" :class="`theme-${theme}`">
      <span class="desktop-window__title">{{ title }}</span>
      <WindowControls
        :theme="theme"
        @minimize="$emit('minimize')"
        @close="$emit('close')"
      />
    </header>

    <div class="desktop-window__body">
      <slot />
    </div>
  </article>
</template>
