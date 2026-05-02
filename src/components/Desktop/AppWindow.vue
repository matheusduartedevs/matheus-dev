<script setup lang="ts">
import { ref } from 'vue'

import WindowControls from '@/components/Desktop/WindowControls.vue'
import type { DesktopWindowBounds, DesktopWindowMode, DesktopWindowPosition } from '@/types/desktop'
import type { OsTheme } from '@/types/theme'

const minimumWindowWidth = 420
const minimumWindowHeight = 300
const resizeHandlePositions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const

type ResizeHandlePosition = (typeof resizeHandlePositions)[number]

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
  resize: [bounds: DesktopWindowBounds]
}>()

const windowElement = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const dragStart = ref({
  pointerX: 0,
  pointerY: 0,
  windowX: 0,
  windowY: 0,
})
const isResizing = ref(false)
const resizeStart = ref({
  pointerX: 0,
  pointerY: 0,
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  parentWidth: 0,
  parentHeight: 0,
})
const resizeHandlePosition = ref<ResizeHandlePosition | null>(null)

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

const getBoundedBounds = (event: PointerEvent) => {
  const deltaX = event.clientX - resizeStart.value.pointerX
  const deltaY = event.clientY - resizeStart.value.pointerY
  const startRight = resizeStart.value.x + resizeStart.value.width
  const startBottom = resizeStart.value.y + resizeStart.value.height
  const direction = resizeHandlePosition.value
  const parentWidth = resizeStart.value.parentWidth
  const parentHeight = resizeStart.value.parentHeight

  if (!parentWidth || !parentHeight) {
    return {
      x: props.x,
      y: props.y,
      width: Math.round(Math.max(props.width, minimumWindowWidth)),
      height: Math.round(Math.max(props.height, minimumWindowHeight)),
    }
  }

  const maxX = Math.max(0, parentWidth - minimumWindowWidth)
  const maxY = Math.max(0, parentHeight - minimumWindowHeight)
  let nextX = clamp(resizeStart.value.x, 0, maxX)
  let nextY = clamp(resizeStart.value.y, 0, maxY)
  let nextWidth = resizeStart.value.width
  let nextHeight = resizeStart.value.height

  if (direction?.includes('left')) {
    nextX = clamp(resizeStart.value.x + deltaX, 0, Math.max(0, startRight - minimumWindowWidth))
    nextWidth = startRight - nextX
  }

  if (direction?.includes('right')) {
    nextWidth = clamp(resizeStart.value.width + deltaX, minimumWindowWidth, parentWidth - nextX)
  }

  if (direction?.includes('top')) {
    nextY = clamp(resizeStart.value.y + deltaY, 0, startBottom - minimumWindowHeight)
    nextHeight = startBottom - nextY
  }

  if (direction?.includes('bottom')) {
    nextHeight = clamp(resizeStart.value.height + deltaY, minimumWindowHeight, parentHeight - nextY)
  }

  return {
    x: Math.round(nextX),
    y: Math.round(nextY),
    width: Math.round(nextWidth),
    height: Math.round(nextHeight),
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

const startResize = (event: PointerEvent, handlePosition: ResizeHandlePosition) => {
  if (props.windowMode === 'fullscreen' || event.button !== 0) {
    return
  }

  const parent = windowElement.value?.offsetParent

  emit('focus')
  event.preventDefault()
  isResizing.value = true
  resizeHandlePosition.value = handlePosition
  resizeStart.value = {
    pointerX: event.clientX,
    pointerY: event.clientY,
    x: props.x,
    y: props.y,
    width: props.width,
    height: props.height,
    parentWidth: parent instanceof HTMLElement ? parent.clientWidth : 0,
    parentHeight: parent instanceof HTMLElement ? parent.clientHeight : 0,
  }

  event.currentTarget instanceof HTMLElement && event.currentTarget.setPointerCapture(event.pointerId)
}

const moveResize = (event: PointerEvent) => {
  if (!isResizing.value) {
    return
  }

  emit('resize', getBoundedBounds(event))
}

const stopResize = (event: PointerEvent) => {
  if (!isResizing.value) {
    return
  }

  isResizing.value = false
  resizeHandlePosition.value = null

  if (event.currentTarget instanceof HTMLElement && event.currentTarget.hasPointerCapture(event.pointerId)) {
    event.currentTarget.releasePointerCapture(event.pointerId)
  }
}
</script>

<template>
  <article
    ref="windowElement"
    class="desktop-window"
    :class="[
      `theme-${theme}`,
      `is-${windowMode}`,
      resizeHandlePosition ? `is-resizing-${resizeHandlePosition}` : '',
      { 'is-focused': isFocused, 'is-dragging': isDragging, 'is-resizing': isResizing },
    ]"
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

    <template v-if="windowMode === 'half'">
      <span
        v-for="handlePosition in resizeHandlePositions"
        :key="handlePosition"
        class="desktop-window__resize-handle"
        :class="`desktop-window__resize-handle--${handlePosition}`"
        aria-hidden="true"
        @pointerdown.stop="startResize($event, handlePosition)"
        @pointermove="moveResize"
        @pointerup="stopResize"
        @pointercancel="stopResize"
      />
    </template>
  </article>
</template>
