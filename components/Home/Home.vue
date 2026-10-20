<script setup lang="ts">
import { ref, onMounted } from 'vue'
import animation from '@/assets/image/animation.json'

const stats = [
  { value: 25, suffix: '+', label: 'Projects Done' },
  { value: 90, suffix: '%', label: 'Happy Clients' },
  { value: 120, suffix: '+', label: 'Happy Users' },
]

const counters = stats.map(s => useAnimatedCounter(s.value, 2000))
const heroRef = ref<HTMLElement | null>(null)
let started = false

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !started) {
        started = true
        counters.forEach(c => c.start())
      }
    },
    { threshold: 0.3 }
  )
  if (heroRef.value) observer.observe(heroRef.value)
  // auto start on first load
  setTimeout(() => {
    if (!started) {
      started = true
      counters.forEach(c => c.start())
    }
  }, 800)
})
</script>

<template>
  <section
    id="home"
    ref="heroRef"
    class="relative min-h-screen flex items-center hero-gradient pt-20"
  >
    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div class="absolute bottom-1/4 left-1/4 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl" />
    </div>

    <div class="container relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-16">

        <!-- Text Side -->
        <div class="order-2 md:order-1">
          <!-- Badge -->
          <div class="section-badge animate-fade-in">
            <span class="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Software Community · Est. 2022
          </div>

          <!-- Headline -->
          <h1 class="section-title mb-6 animate-fade-up dark:text-white" style="animation-delay:0.1s">
            We build software<br />
            that
            <span class="gradient-text"> actually works</span><br />
            — not just looks good.
          </h1>

          <!-- Subheadline -->
          <p class="section-subtitle mb-10 max-w-md animate-fade-up" style="animation-delay:0.2s">
            Creetech is a community of developers & designers who've shipped
            dozens of real projects together. We take software seriously — and we'd love to hear about your idea.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-wrap gap-4 animate-fade-up" style="animation-delay:0.3s">
            <a href="#contact" class="btn-primary">
              <Icon name="carbon:chat" />
              Let's Talk
            </a>
            <a href="#portfolio" class="btn-outline dark:text-white dark:border-white/30 dark:hover:bg-white/10">
              <Icon name="carbon:portfolio" />
              See Our Work
            </a>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-4 mt-14 pt-10 border-t border-gray-200 dark:border-gray-800 animate-fade-up" style="animation-delay:0.4s">
            <div v-for="(stat, i) in stats" :key="i" class="text-center">
              <div class="text-3xl font-black text-primary-ink dark:text-primary">
                {{ counters[i].current.value }}{{ stat.suffix }}
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ stat.label }}</div>
            </div>
          </div>
        </div>

        <!-- Lottie Side -->
        <div class="order-1 md:order-2 flex justify-center animate-float">
          <Lottie
            :data="animation"
            class="w-full max-w-sm md:max-w-none"
          />
        </div>

      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
      <span class="text-xs text-gray-400">Scroll</span>
      <Icon name="carbon:chevron-down" class="text-gray-400" />
    </div>
  </section>
</template>
