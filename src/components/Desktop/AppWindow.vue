<script setup lang="ts">
import WindowControls from '@/components/Desktop/WindowControls.vue'
import type { DesktopWindowMode } from '@/types/desktop'
import type { OsTheme } from '@/types/theme'

withDefaults(
  defineProps<{
    title: string
    theme: OsTheme
    isFocused: boolean
    windowMode: DesktopWindowMode
    x?: number
    y?: number
    width?: number
    height?: number
    zIndex: number
  }>(),
  {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
)

defineEmits<{
  focus: []
  minimize: []
  maximize: []
  close: []
}>()
</script>

<template>
  <article
    class="desktop-window"
    :class="[`theme-${theme}`, `is-${windowMode}`, { 'is-focused': isFocused }]"
    :style="{
      top: windowMode === 'half' ? `${y}px` : undefined,
      left: windowMode === 'half' ? `${x}px` : undefined,
      width: windowMode === 'half' ? `${width}px` : undefined,
      height: windowMode === 'half' ? `${height}px` : undefined,
      zIndex,
    }"
    @pointerdown="$emit('focus')"
  >
    <header class="desktop-window__titlebar" :class="`theme-${theme}`">
      <span class="desktop-window__title">{{ title }}</span>
      <WindowControls
        :theme="theme"
        @minimize="$emit('minimize')"
        @maximize="$emit('maximize')"
        @close="$emit('close')"
      />
    </header>

    <div class="desktop-window__body">
      <slot />
    </div>
  </article>
</template>
