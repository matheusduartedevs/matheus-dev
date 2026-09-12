<script setup lang="ts">
import PortfolioPage from '@/components/Portfolio/PortfolioPage.vue'
import type { PortfolioContent } from '@/types/portfolio'
defineProps<{ content: PortfolioContent }>()
</script>

<template>
  <div class="mobile-portfolio"><PortfolioPage :content="content" /></div>
</template>
