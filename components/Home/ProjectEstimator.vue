<script setup lang="ts">
type Step = 1 | 2 | 3

const step = ref<Step>(1)
const selectedType = ref<string | null>(null)
const selectedFeatures = ref<string[]>([])

const appTypes = [
  { id: 'web', emoji: '🌐', label: 'Web App', desc: 'Dashboards, portals, or interactive websites' },
  { id: 'mobile', emoji: '📱', label: 'Mobile App', desc: 'iOS & Android with Flutter' },
  { id: 'backend', emoji: '⚙️', label: 'Backend / API', desc: 'REST APIs, microservices, or server-side' },
  { id: 'design', emoji: '🎨', label: 'Design System', desc: 'UI/UX design, branding, or prototyping' },
]

const featuresByType: Record<string, { id: string; label: string; weeks: number; emoji: string }[]> = {
  web: [
    { id: 'auth', label: 'Login & Register', weeks: 1, emoji: '🔐' },
    { id: 'dashboard', label: 'Dashboard & Analytics', weeks: 2, emoji: '📊' },
    { id: 'payment', label: 'Online Payments', weeks: 2, emoji: '💳' },
    { id: 'notif', label: 'Real-time Notifications', weeks: 1, emoji: '🔔' },
    { id: 'maps', label: 'Maps & Location', weeks: 1.5, emoji: '🗺️' },
    { id: 'chat', label: 'Chat / Messaging', weeks: 2, emoji: '💬' },
    { id: 'report', label: 'Reports & Export', weeks: 1, emoji: '📄' },
    { id: 'cms', label: 'CMS / Admin Panel', weeks: 2, emoji: '🛠️' },
  ],
  mobile: [
    { id: 'auth', label: 'Login & Register', weeks: 1, emoji: '🔐' },
    { id: 'push', label: 'Push Notifications', weeks: 1, emoji: '🔔' },
    { id: 'payment', label: 'In-App Purchase', weeks: 2, emoji: '💳' },
    { id: 'maps', label: 'GPS & Maps', weeks: 1.5, emoji: '🗺️' },
    { id: 'camera', label: 'Camera & Photo Upload', weeks: 1, emoji: '📷' },
    { id: 'offline', label: 'Offline Mode', weeks: 2, emoji: '📶' },
    { id: 'chat', label: 'Real-time Chat', weeks: 2, emoji: '💬' },
  ],
  backend: [
    { id: 'auth', label: 'Auth & Authorization', weeks: 1, emoji: '🔐' },
    { id: 'api', label: 'REST API Endpoints', weeks: 1.5, emoji: '🔗' },
    { id: 'db', label: 'Database Design', weeks: 1, emoji: '🗄️' },
    { id: 'cache', label: 'Caching Layer', weeks: 1, emoji: '⚡' },
    { id: 'queue', label: 'Background Jobs', weeks: 1.5, emoji: '⏳' },
    { id: 'webhook', label: 'Webhooks & Integrations', weeks: 1, emoji: '🔗' },
  ],
  design: [
    { id: 'wireframe', label: 'Wireframes', weeks: 1, emoji: '📐' },
    { id: 'prototype', label: 'Interactive Prototype', weeks: 2, emoji: '🖱️' },
    { id: 'branding', label: 'Branding & Logo', weeks: 1.5, emoji: '✨' },
    { id: 'system', label: 'Design System', weeks: 2, emoji: '🎨' },
  ],
}

const currentFeatures = computed(() => selectedType.value ? featuresByType[selectedType.value] || [] : [])

const toggleFeature = (id: string) => {
  const idx = selectedFeatures.value.indexOf(id)
  if (idx >= 0) selectedFeatures.value.splice(idx, 1)
  else selectedFeatures.value.push(id)
}

const baseWeeks: Record<string, number> = { web: 2, mobile: 3, backend: 1.5, design: 1 }

const estimate = computed(() => {
  if (!selectedType.value) return null
  const base = baseWeeks[selectedType.value] || 2
  const featureWeeks = currentFeatures.value
    .filter(f => selectedFeatures.value.includes(f.id))
    .reduce((sum, f) => sum + f.weeks, 0)
  const total = base + featureWeeks
  const complexity = total < 4 ? 'Light' : total < 8 ? 'Moderate' : 'Complex'
  const complexityColor = total < 4 ? 'text-green-500' : total < 8 ? 'text-yellow-500' : 'text-red-500'
  return {
    weeks: Math.ceil(total),
    complexity,
    complexityColor,
  }
})

const selectType = (id: string) => {
  selectedType.value = id
  selectedFeatures.value = []
  step.value = 2
}

const resetAll = () => {
  step.value = 1
  selectedType.value = null
  selectedFeatures.value = []
}

const whatsappMsg = computed(() => {
  if (!estimate.value || !selectedType.value) return ''
  const typeName = appTypes.find(t => t.id === selectedType.value)?.label || ''
  const features = currentFeatures.value
    .filter(f => selectedFeatures.value.includes(f.id))
    .map(f => f.label)
    .join(', ')
  return encodeURIComponent(
    `Hi Creetech! I'd like to consult about a project.\n\nType: ${typeName}\nFeatures: ${features || 'Not selected yet'}\nEstimate: ~${estimate.value.weeks} weeks (${estimate.value.complexity})\n\nCan you help?`
  )
})
</script>

<template>
  <section id="estimator" class="py-24">
    <div class="container">
      <div class="max-w-3xl mx-auto">

        <!-- Header -->
        <div class="text-center mb-12 reveal">
          <div class="section-badge">Project Estimator</div>
          <div class="section-separator mx-auto" />
          <h2 class="section-title dark:text-white mb-4">
            How long will it <span class="gradient-text">take?</span>
          </h2>
          <p class="section-subtitle">
            Pick your app type and the features you need — get a rough timeline to kick off the conversation.
            Takes ~30 seconds, no commitment.
          </p>
        </div>

        <!-- Step indicators -->
        <div class="flex items-center justify-center gap-4 mb-10">
          <div v-for="s in 3" :key="s" class="flex items-center gap-2">
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black transition-all duration-300"
              :class="step >= s ? 'bg-primary text-gray-900' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'"
            >
              {{ s }}
            </div>
            <span class="text-xs font-medium" :class="step >= s ? 'text-primary-ink dark:text-primary' : 'text-gray-400'">
              {{ ['Type', 'Features', 'Result'][s - 1] }}
            </span>
            <Icon v-if="s < 3" name="carbon:chevron-right" class="text-gray-300 dark:text-gray-600" />
          </div>
        </div>

        <!-- Steps (no .reveal here: content is dynamic, animated by step transition instead) -->
        <Transition name="step" mode="out-in">
          <!-- STEP 1: App Type -->
          <div v-if="step === 1" key="step-1" class="grid grid-cols-2 gap-4">
            <button
              v-for="type in appTypes"
              :key="type.id"
              class="step-option flex flex-col items-center gap-3 p-6"
              :class="{ selected: selectedType === type.id }"
              @click="selectType(type.id)"
            >
              <span class="text-4xl">{{ type.emoji }}</span>
              <span class="font-black text-sm dark:text-white">{{ type.label }}</span>
              <span class="text-xs text-gray-500 dark:text-gray-400 text-center">{{ type.desc }}</span>
            </button>
          </div>

          <!-- STEP 2: Features -->
          <div v-else-if="step === 2" key="step-2">
            <div class="mb-6 flex items-center gap-3">
              <button class="text-sm text-gray-500 hover:text-primary-ink dark:hover:text-primary flex items-center gap-1" @click="step = 1; selectedFeatures = []">
                <Icon name="carbon:arrow-left" />
                Change Type
              </button>
              <span class="text-sm text-gray-400">·</span>
              <span class="text-sm font-medium dark:text-white">{{ appTypes.find(t => t.id === selectedType)?.label }}</span>
            </div>

            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Pick the features you need (more than one is fine):
            </p>

            <div class="grid grid-cols-2 gap-3 mb-8">
              <button
                v-for="feature in currentFeatures"
                :key="feature.id"
                class="step-option flex items-center gap-3 text-left"
                :class="{ selected: selectedFeatures.includes(feature.id) }"
                @click="toggleFeature(feature.id)"
              >
                <span class="text-xl flex-shrink-0">{{ feature.emoji }}</span>
                <div>
                  <div class="text-sm font-semibold dark:text-white">{{ feature.label }}</div>
                  <div class="text-xs text-gray-400">~{{ feature.weeks }} weeks</div>
                </div>
                <Icon
                  v-if="selectedFeatures.includes(feature.id)"
                  name="carbon:checkmark-filled"
                  class="ml-auto text-primary-ink dark:text-primary flex-shrink-0"
                />
              </button>
            </div>

            <button class="btn-primary w-full justify-center" @click="step = 3">
              See Estimate
              <Icon name="carbon:arrow-right" />
            </button>
          </div>

          <!-- STEP 3: Result -->
          <div v-else-if="step === 3 && estimate" key="step-3" class="text-center">
            <div class="card p-10 mb-8">
              <div class="text-6xl mb-4">⏱️</div>
              <div class="text-gray-500 dark:text-gray-400 text-sm mb-2">Estimated build time:</div>
              <div class="text-6xl font-black text-primary-ink dark:text-primary mb-2">~{{ estimate.weeks }}</div>
              <div class="text-2xl font-black dark:text-white mb-4">Weeks</div>

              <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 mb-6">
                <div class="w-2 h-2 rounded-full" :class="estimate.complexityColor.replace('text-', 'bg-')" />
                <span class="text-sm font-medium dark:text-white">Complexity: <span :class="estimate.complexityColor">{{ estimate.complexity }}</span></span>
              </div>

              <p class="text-gray-500 dark:text-gray-400 text-sm max-w-sm mx-auto leading-relaxed">
                This is a rough estimate — it may shift once we talk through the details.
              </p>
            </div>

            <!-- Selected Features Summary -->
            <div v-if="selectedFeatures.length" class="text-left mb-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
              <h4 class="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">Selected features:</h4>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="fId in selectedFeatures"
                  :key="fId"
                  class="px-3 py-1 bg-primary/10 text-primary-ink dark:text-primary text-xs rounded-full font-medium"
                >
                  {{ currentFeatures.find(f => f.id === fId)?.label }}
                </span>
              </div>
            </div>

            <!-- CTAs -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                :href="`https://wa.me/6281808311579?text=${whatsappMsg}`"
                target="_blank"
                class="btn-primary"
              >
                <Icon name="carbon:chat" />
                Discuss on WhatsApp
              </a>
              <a href="#contact" class="btn-outline">
                <Icon name="carbon:email" />
                Or Send Email
              </a>
            </div>

            <button class="btn-ghost mt-4" @click="resetAll">
              <Icon name="carbon:reset" />
              Start Over
            </button>
          </div>
        </Transition>

      </div>
    </div>
  </section>
</template>

<style scoped>
.step-enter-active, .step-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.step-enter-from {
  opacity: 0;
  transform: translateX(24px);
}
.step-leave-to {
  opacity: 0;
  transform: translateX(-24px);
}
</style>
