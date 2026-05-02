<script setup lang="ts">
import { ref } from 'vue'

import WindowControls from '@/components/Desktop/WindowControls.vue'
import type { DesktopWindowMode, DesktopWindowPosition } from '@/types/desktop'
import type { OsTheme } from '@/types/theme'

const props = withDefaults(
  defineProps<{
    title: string
    theme: OsTheme
    isFocused: boolean
    windowMode: DesktopWindowMode
    bodyClass?: string
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

const emit = defineEmits<{
  focus: []
  minimize: []
  maximize: []
  close: []
  move: [position: DesktopWindowPosition]
}>()

const windowElement = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const dragStart = ref({
  pointerX: 0,
  pointerY: 0,
  windowX: 0,
  windowY: 0,
})

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(Math.max(value, minimum), maximum)

const getBoundedPosition = (x: number, y: number) => {
  const parent = windowElement.value?.offsetParent

  if (!(parent instanceof HTMLElement) || !windowElement.value) {
    return { x, y }
  }

  const titlebar = windowElement.value.querySelector<HTMLElement>('.desktop-window__titlebar')
  const parentWidth = parent.clientWidth
  const parentHeight = parent.clientHeight
  const windowWidth = windowElement.value.offsetWidth
  const titlebarHeight = titlebar?.offsetHeight ?? 48
  const minimumVisibleWidth = Math.min(160, windowWidth)
  const minX = minimumVisibleWidth - windowWidth
  const maxX = parentWidth - minimumVisibleWidth
  const maxY = Math.max(0, parentHeight - titlebarHeight)

  return {
    x: Math.round(clamp(x, minX, maxX)),
    y: Math.round(clamp(y, 0, maxY)),
  }
}

const startDrag = (event: PointerEvent) => {
  const target = event.target

  if (
    props.windowMode === 'fullscreen' ||
    event.button !== 0 ||
    (target instanceof HTMLElement && target.closest('button'))
  ) {
    return
  }

  emit('focus')
  event.preventDefault()
  isDragging.value = true
  dragStart.value = {
    pointerX: event.clientX,
    pointerY: event.clientY,
    windowX: props.x,
    windowY: props.y,
  }

  event.currentTarget instanceof HTMLElement && event.currentTarget.setPointerCapture(event.pointerId)
}

const moveDrag = (event: PointerEvent) => {
  if (!isDragging.value) {
    return
  }

  const nextX = dragStart.value.windowX + event.clientX - dragStart.value.pointerX
  const nextY = dragStart.value.windowY + event.clientY - dragStart.value.pointerY

  emit('move', getBoundedPosition(nextX, nextY))
}

const stopDrag = (event: PointerEvent) => {
  if (!isDragging.value) {
    return
  }

  isDragging.value = false

  if (event.currentTarget instanceof HTMLElement && event.currentTarget.hasPointerCapture(event.pointerId)) {
    event.currentTarget.releasePointerCapture(event.pointerId)
  }
}
</script>

<template>
  <article
    ref="windowElement"
    class="desktop-window"
    :class="[`theme-${theme}`, `is-${windowMode}`, { 'is-focused': isFocused, 'is-dragging': isDragging }]"
    :style="{
      top: windowMode === 'half' ? `${y}px` : undefined,
      left: windowMode === 'half' ? `${x}px` : undefined,
      width: windowMode === 'half' ? `${width}px` : undefined,
      height: windowMode === 'half' ? `${height}px` : undefined,
      zIndex,
    }"
    @pointerdown="$emit('focus')"
  >
    <header
      class="desktop-window__titlebar"
      :class="`theme-${theme}`"
      @pointerdown.stop="startDrag"
      @pointermove="moveDrag"
      @pointerup="stopDrag"
      @pointercancel="stopDrag"
    >
      <WindowControls
        v-if="theme === 'macos'"
        :theme="theme"
        @minimize="$emit('minimize')"
        @maximize="$emit('maximize')"
        @close="$emit('close')"
      />
      <span class="desktop-window__title">{{ title }}</span>
      <WindowControls
        v-if="theme !== 'macos'"
        :theme="theme"
        @minimize="$emit('minimize')"
        @maximize="$emit('maximize')"
        @close="$emit('close')"
      />
    </header>

    <div class="desktop-window__body" :class="bodyClass">
      <slot />
    </div>
  </article>
</template>
