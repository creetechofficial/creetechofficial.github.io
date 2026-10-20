<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
const { y } = useWindowScroll()
const isVisible = computed(() => y.value > 300)
const waMsg = encodeURIComponent('Hi Creetech! I\'d love to discuss a project with you 👋')
</script>

<template>
  <Transition name="fab">
    <a
      v-if="isVisible"
      :href="`https://wa.me/6281808311579?text=${waMsg}`"
      target="_blank"
      class="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 px-5 py-3.5 font-semibold text-sm group"
      aria-label="Chat via WhatsApp"
    >
      <Icon name="mdi:whatsapp" class="text-xl flex-shrink-0" />
      <span class="hidden sm:inline whitespace-nowrap">Chat on WA</span>
    </a>
  </Transition>
</template>

<style scoped>
.fab-enter-active, .fab-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fab-enter-from, .fab-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}
</style>
