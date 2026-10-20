<template>
  <section id="services" class="py-24">
    <div class="container">
      <!-- Header -->
      <div class="text-center mb-16 reveal">
        <div class="section-badge">What We Do</div>
        <div class="section-separator mx-auto" />
        <h2 class="section-title dark:text-white mb-4">
          From idea to <span class="gradient-text">reality</span>
        </h2>
        <p class="section-subtitle max-w-xl mx-auto">
          Whatever software you need — we handle it end to end.
          Nothing too small, nothing too big.
        </p>
      </div>

      <!-- Service Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(service, i) in services"
          :key="service.title"
          class="reveal card p-8 group cursor-default"
          :data-delay="i * 100"
        >
          <!-- Icon -->
          <div
            class="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 transition-all duration-300 group-hover:scale-110"
            :class="service.iconBg"
          >
            {{ service.emoji }}
          </div>

          <h3 class="text-xl font-black mb-3 dark:text-white">{{ service.title }}</h3>
          <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
            {{ service.desc }}
          </p>

          <!-- Tech tags -->
          <div class="flex flex-wrap gap-2">
            <span v-for="tech in service.techs" :key="tech" class="tech-badge">
              {{ tech }}
            </span>
          </div>

          <!-- Hover line -->
          <div class="mt-6 h-0.5 w-0 bg-gradient-to-r from-primary to-orange-500 rounded-full transition-all duration-500 group-hover:w-full" />
        </div>
      </div>

      <!-- Bottom CTA -->
      <div class="text-center mt-16 reveal">
        <p class="text-gray-500 dark:text-gray-400 mb-4">
          Not sure what you need? Just tell us — we'll help figure it out.
        </p>
        <a href="#estimator" class="btn-primary">
          <Icon name="carbon:calculator" />
          Estimate Your Project
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const services = [
  {
    emoji: '🎨',
    title: 'Design & UI/UX',
    desc: 'No-headache interfaces — intuitive, modern, and easy on the eyes. From wireframes to interactive prototypes.',
    iconBg: 'bg-purple-100 dark:bg-purple-900/30',
    techs: ['Figma', 'Adobe XD', 'Illustrator', 'Photoshop'],
  },
  {
    emoji: '💻',
    title: 'Development',
    desc: 'Web apps, mobile apps, backend APIs — we handle it all. Modern, proven tech that\'s scalable and easy to maintain.',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    techs: ['Vue.js', 'React', 'Flutter', 'Laravel', 'Go', 'Python'],
  },
  {
    emoji: '🚀',
    title: 'Deploy & Maintain',
    desc: 'Done building doesn\'t mean done. We keep your app running smooth, secure, and ready to scale with your business.',
    iconBg: 'bg-green-100 dark:bg-green-900/30',
    techs: ['Docker', 'CI/CD', 'VPS', 'Cloud', 'Monitoring'],
  },
]
</script>
