<script setup lang="ts">
withDefaults(defineProps<{ direction?: 'diagonal' | 'up' | 'down' }>(), { direction: 'diagonal' })
</script>

<template>
  <svg
    class="portfolio-arrow"
    :class="`portfolio-arrow--${direction}`"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.6"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M6 18 18 6M6 6h12v12" />
  </svg>
</template>
