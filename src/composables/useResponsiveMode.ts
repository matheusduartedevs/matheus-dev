import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const desktopBreakpoint = 960

export const useResponsiveMode = () => {
  const width = ref(desktopBreakpoint)

  const updateWidth = () => {
    width.value = typeof window === 'undefined' ? desktopBreakpoint : window.innerWidth
  }

  onMounted(() => {
    updateWidth()
    window.addEventListener('resize', updateWidth)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateWidth)
  })

  const isDesktop = computed(() => width.value >= desktopBreakpoint)

  return {
    isDesktop,
    width,
  }
}
