<script setup lang="ts">
const { projects, filteredProjects, loading, activeCategory, fetchProjects } = useProjects()

const categories = [
  { label: 'All', value: 'all' },
  { label: 'Web App', value: 'web' },
  { label: 'Mobile', value: 'mobile' },
  { label: 'Design', value: 'design' },
  { label: 'Backend', value: 'backend' },
]

const selectedProject = ref<any | null>(null)
const screenshotIndex = ref(0)

// Daftar gambar carousel: screenshots, fallback ke cover, fallback ke emoji
const shots = computed(() => selectedProject.value?.screenshots?.length
  ? selectedProject.value.screenshots
  : (selectedProject.value?.cover_url ? [selectedProject.value.cover_url] : []))

const openProject = (project: any) => {
  selectedProject.value = project
  screenshotIndex.value = 0
  window.addEventListener('keydown', onKeyNav)
}

const closeProject = () => {
  selectedProject.value = null
  window.removeEventListener('keydown', onKeyNav)
}

const prevShot = () => {
  if (shots.value.length < 2) return
  screenshotIndex.value = (screenshotIndex.value - 1 + shots.value.length) % shots.value.length
}

const nextShot = () => {
  if (shots.value.length < 2) return
  screenshotIndex.value = (screenshotIndex.value + 1) % shots.value.length
}

const onKeyNav = (e: KeyboardEvent) => {
  if (e.key === 'ArrowLeft') prevShot()
  else if (e.key === 'ArrowRight') nextShot()
  else if (e.key === 'Escape') closeProject()
}

// Touch swipe (mobile)
const touchX = ref<number | null>(null)
const onTouchStart = (e: TouchEvent) => { touchX.value = e.touches[0].clientX }
const onTouchEnd = (e: TouchEvent) => {
  if (touchX.value === null) return
  const dx = e.changedTouches[0].clientX - touchX.value
  if (dx < -40) nextShot()
  else if (dx > 40) prevShot()
  touchX.value = null
}

onUnmounted(() => window.removeEventListener('keydown', onKeyNav))

// 3D tilt effect
const onMouseMove = (e: MouseEvent, cardEl: HTMLElement) => {
  const rect = cardEl.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
  const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20
  cardEl.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) scale(1.02)`
}

const onMouseLeave = (cardEl: HTMLElement) => {
  cardEl.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)'
}

// Categories of a project: array first, legacy single value as fallback
const catsOf = (p: any): string[] =>
  p.categories?.length ? p.categories : (p.category ? [p.category] : [])

const emojiFor = (cat?: string) =>
  cat === 'web' ? '🌐' : cat === 'mobile' ? '📱' : cat === 'design' ? '🎨' : '⚙️'

// Category colors
const categoryColor: Record<string, string> = {
  web: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  mobile: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  design: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  backend: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
}

onMounted(fetchProjects)
</script>

<template>
  <section id="portfolio" class="py-24 bg-gray-50 dark:bg-gray-900/30">
    <div class="container">

      <!-- Header -->
      <div class="text-center mb-12 reveal">
        <div class="section-badge">Portfolio</div>
        <div class="section-separator mx-auto" />
        <h2 class="section-title dark:text-white mb-4">
          Work we're <span class="gradient-text">proud of</span>
        </h2>
        <p class="section-subtitle max-w-lg mx-auto">
          Not just finished — actually used. Here's some of what we've built together.
        </p>
      </div>

      <!-- Filter -->
      <div class="flex flex-wrap justify-center gap-2 mb-10 reveal">
        <button
          v-for="cat in categories"
          :key="cat.value"
          class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
          :class="activeCategory === cat.value
            ? 'bg-primary text-gray-900 shadow-glow'
            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary/10 border border-gray-200 dark:border-gray-700'"
          @click="activeCategory = cat.value"
        >
          {{ cat.label }}
        </button>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-12">
        <div class="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
      </div>

      <!-- Projects Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(project, i) in filteredProjects"
          :key="project.id"
          class="reveal tilt-card group cursor-pointer"
          :data-delay="i * 80"
          @mousemove="onMouseMove($event, $el as HTMLElement)"
          @mouseleave="onMouseLeave($el as HTMLElement)"
          @click="openProject(project)"
        >
          <div class="card overflow-hidden h-full flex flex-col">
            <!-- Cover Image -->
            <div class="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 overflow-hidden">
              <img
                v-if="project.cover_url"
                :src="project.cover_url"
                :alt="project.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-5xl">
                {{ emojiFor(catsOf(project)[0]) }}
              </div>

              <!-- Featured badge -->
              <div v-if="project.is_featured" class="absolute top-3 right-3">
                <span class="px-2 py-1 text-xs font-semibold bg-primary text-gray-900 rounded-full">Featured</span>
              </div>

              <!-- Category badges -->
              <div class="absolute top-3 left-3 flex flex-wrap gap-1.5">
                <span
                  v-for="cat in catsOf(project)"
                  :key="cat"
                  class="px-2 py-1 text-xs font-medium rounded-full capitalize"
                  :class="categoryColor[cat] || ''"
                >
                  {{ cat }}
                </span>
              </div>
            </div>

            <!-- Content -->
            <div class="p-6 flex flex-col flex-1">
              <div class="flex items-start justify-between mb-2">
                <h3 class="font-black text-lg dark:text-white leading-snug">{{ project.title }}</h3>
                <span v-if="project.year" class="text-xs text-gray-400 ml-2 flex-shrink-0">{{ project.year }}</span>
              </div>

              <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                {{ project.description }}
              </p>

              <!-- Tech stack -->
              <div class="flex flex-wrap gap-1.5">
                <span v-for="tech in project.tech_stack?.slice(0, 3)" :key="tech" class="tech-badge text-xs">
                  {{ tech }}
                </span>
                <span v-if="project.tech_stack?.length > 3" class="tech-badge text-xs text-gray-400">
                  +{{ project.tech_stack.length - 3 }}
                </span>
              </div>

              <!-- View button -->
              <div class="mt-4 flex items-center gap-1 text-primary-ink dark:text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>View Details</span>
                <Icon name="carbon:arrow-right" />
                <a
                  v-if="project.project_url"
                  :href="project.project_url"
                  target="_blank"
                  rel="noopener"
                  aria-label="Open live project"
                  class="ml-auto p-1.5 rounded-full hover:bg-primary/10"
                  @click.stop
                >
                  <Icon name="carbon:launch" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="!loading && filteredProjects.length === 0" class="text-center py-16 text-gray-400">
        <div class="text-5xl mb-4">🔍</div>
        <p>No projects in this category yet.</p>
      </div>

    </div>

    <!-- Project Detail Modal -->
    <Transition name="modal">
      <div v-if="selectedProject" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="closeProject">
        <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="closeProject" />

        <div class="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10">
          <!-- Close -->
          <button
            class="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            @click="closeProject"
          >
            <Icon name="carbon:close" class="text-sm" />
          </button>

          <!-- Screenshot carousel -->
          <div
            class="relative h-56 bg-gray-100 dark:bg-gray-800 rounded-t-3xl overflow-hidden select-none"
            @touchstart="onTouchStart"
            @touchend="onTouchEnd"
          >
            <Transition name="shot" mode="out-in">
              <img
                v-if="shots.length"
                :key="screenshotIndex"
                :src="shots[screenshotIndex]"
                :alt="selectedProject.title"
                class="w-full h-full object-cover"
                draggable="false"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-7xl">
                {{ emojiFor(catsOf(selectedProject)[0]) }}
              </div>
            </Transition>

            <!-- Prev / Next -->
            <template v-if="shots.length > 1">
              <button
                aria-label="Screenshot sebelumnya"
                class="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
                @click="prevShot"
              >
                <Icon name="carbon:chevron-left" class="text-lg" />
              </button>
              <button
                aria-label="Screenshot berikutnya"
                class="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
                @click="nextShot"
              >
                <Icon name="carbon:chevron-right" class="text-lg" />
              </button>
            </template>

            <!-- Screenshot nav -->
            <div v-if="shots.length > 1" class="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
              <button
                v-for="(_, idx) in shots"
                :key="idx"
                class="h-2 rounded-full transition-all"
                :class="screenshotIndex === idx ? 'bg-white w-5' : 'bg-white/50 w-2'"
                @click="screenshotIndex = idx"
              />
              <span class="text-white/80 text-xs font-medium ml-1">{{ screenshotIndex + 1 }} / {{ shots.length }}</span>
            </div>
          </div>

          <!-- Content -->
          <div class="p-8">
            <div class="flex items-start justify-between mb-4">
              <div>
                <span
                  v-for="cat in catsOf(selectedProject)"
                  :key="cat"
                  class="px-2 py-1 text-xs font-medium rounded-full capitalize mb-2 inline-block mr-1.5"
                  :class="categoryColor[cat] || ''"
                >
                  {{ cat }}
                </span>
                <h2 class="text-2xl font-black dark:text-white">{{ selectedProject.title }}</h2>
                <p v-if="selectedProject.client_name" class="text-sm text-gray-400 mt-1">
                  Client: {{ selectedProject.client_name }}
                  <span v-if="selectedProject.year">· {{ selectedProject.year }}</span>
                </p>
              </div>
            </div>

            <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              {{ selectedProject.description }}
            </p>

            <!-- Tech Stack -->
            <div class="mb-6">
              <h4 class="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Tech Stack</h4>
              <div class="flex flex-wrap gap-2">
                <span v-for="tech in selectedProject.tech_stack" :key="tech" class="tech-badge">{{ tech }}</span>
              </div>
            </div>

            <!-- CTA -->
            <a
              v-if="selectedProject.project_url"
              :href="selectedProject.project_url"
              target="_blank"
              rel="noopener"
              class="btn-outline w-full justify-center mb-3"
            >
              <Icon name="carbon:launch" />
              Visit Live Project
            </a>
            <a href="#contact" class="btn-primary w-full justify-center" @click="closeProject">
              <Icon name="carbon:chat" />
              Discuss a Similar Project
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
.shot-enter-active, .shot-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.shot-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.shot-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

