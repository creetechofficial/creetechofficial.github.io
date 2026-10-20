<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, computed } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import logoA from '../assets/image/logo.svg'
import logoB from '../assets/image/logo-white.svg'

const { isDark, toggleDark, initTheme } = useTheme()
const { y: scrollY } = useWindowScroll()

const isScrolled = computed(() => scrollY.value > 50)

onMounted(() => {
  initTheme()
  updateWidth()
  window.addEventListener('resize', updateWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth)
})

const logo = ref(logoA)
watch(isDark, (val) => { logo.value = val ? logoB : logoA }, { immediate: true })

const navbar = ref(false)
const windowWidth = ref(0)

const updateWidth = () => {
  if (typeof window !== 'undefined') windowWidth.value = window.innerWidth
}

watch(windowWidth, (val) => { if (val >= 1024) navbar.value = false })

const navList = [
  { name: 'Home', path: 'home' },
  { name: 'About', path: 'about-us' },
  { name: 'Services', path: 'services' },
  { name: 'Portfolio', path: 'portfolio' },
  { name: 'Estimator', path: 'estimator' },
  { name: 'Tech', path: 'technology' },
  { name: 'Team', path: 'team' },
  { name: 'Process', path: 'how-we-work' },
  { name: 'Contact', path: 'contact' },
]

const activeSection = ref('home')
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) activeSection.value = e.target.id
      })
    },
    { rootMargin: '-40% 0px -55% 0px' }
  )
  navList.forEach(({ path }) => {
    const el = document.getElementById(path)
    if (el) observer.observe(el)
  })
})

const scrollToSection = (path: string) => {
  const el = document.getElementById(path)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
  navbar.value = false
}
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="isScrolled
      ? 'glass shadow-glass border-b border-white/10'
      : 'bg-transparent'"
  >
    <div class="container">
      <div class="flex items-center justify-between py-4">
        <!-- Logo -->
        <button class="flex-shrink-0" @click="scrollToSection('home')">
          <img :src="logo" class="h-8 w-auto transition-all duration-300" alt="Creetech" />
        </button>

        <!-- Desktop Nav -->
        <nav class="hidden lg:flex items-center gap-1">
          <button
            v-for="nav in navList"
            :key="nav.path"
            class="px-3 py-2 text-sm font-medium rounded-full transition-all duration-200"
            :class="activeSection === nav.path
              ? 'text-primary-ink dark:text-primary bg-primary/10'
              : 'text-gray-700 dark:text-gray-300 hover:text-primary-ink dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-white/5'"
            @click="scrollToSection(nav.path)"
          >
            {{ nav.name }}
          </button>

          <!-- Dark mode toggle -->
          <button
            class="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-all ml-2"
            @click="toggleDark()"
          >
            <Icon :name="isDark ? 'carbon:moon' : 'carbon:sun'" class="text-lg" />
          </button>

          <!-- CTA -->
          <button class="btn-primary ml-3 !py-2.5 !px-5 !text-xs" @click="scrollToSection('contact')">
            Start a Project
          </button>
        </nav>

        <!-- Mobile controls -->
        <div class="flex items-center gap-2 lg:hidden">
          <button
            class="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-all"
            @click="toggleDark()"
          >
            <Icon :name="isDark ? 'carbon:moon' : 'carbon:sun'" class="text-lg" />
          </button>
          <button
            class="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 transition-all"
            aria-label="Menu"
            @click="navbar = !navbar"
          >
            <span class="block w-5 h-5 relative">
              <span
                class="absolute left-0 w-full h-0.5 bg-current rounded-full transition-all duration-300"
                :class="navbar ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-1'"
              />
              <span
                class="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-current rounded-full transition-all duration-300"
                :class="navbar ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'"
              />
              <span
                class="absolute left-0 w-full h-0.5 bg-current rounded-full transition-all duration-300"
                :class="navbar ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-1'"
              />
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition name="menu">
      <div v-if="navbar" class="lg:hidden glass border-t border-white/10">
        <div class="container py-4 flex flex-col gap-1">
          <button
            v-for="nav in navList"
            :key="nav.path"
            class="text-left px-4 py-3 rounded-xl text-sm font-medium transition-all"
            :class="activeSection === nav.path
              ? 'text-primary-ink dark:text-primary bg-primary/10'
              : 'text-gray-700 dark:text-gray-300'"
            @click="scrollToSection(nav.path)"
          >
            {{ nav.name }}
          </button>
          <button class="btn-primary mt-2 w-full justify-center" @click="scrollToSection('contact')">
            Start a Project
          </button>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
