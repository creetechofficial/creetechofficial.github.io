<template>
  <section id="how-we-work" class="py-24 bg-gray-50 dark:bg-gray-900/30">
    <div class="container">

      <!-- Header -->
      <div class="text-center mb-16 reveal">
        <div class="section-badge">How We Work</div>
        <div class="section-separator mx-auto" />
        <h2 class="section-title dark:text-white mb-4">
          How do we <span class="gradient-text">work?</span>
        </h2>
        <p class="section-subtitle max-w-lg mx-auto">
          We believe a transparent process means satisfying results. Here are the 5 steps we always follow.
        </p>
      </div>

      <!-- Steps -->
      <div class="relative">

        <!-- Connector line (desktop) -->
        <div class="hidden md:block absolute top-10 left-1/2 -translate-x-1/2 w-[80%] h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <div class="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div
            v-for="(step, i) in steps"
            :key="step.title"
            class="reveal text-center group"
            :data-delay="i * 120"
          >
            <!-- Step number + icon -->
            <div class="relative mx-auto w-20 h-20 mb-4">
              <div
                class="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl shadow-card border-2 border-transparent transition-all duration-300 group-hover:border-primary group-hover:shadow-glow"
                :class="step.bg"
              >
                {{ step.emoji }}
              </div>
              <div class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-gray-900 text-xs font-black flex items-center justify-center">
                {{ i + 1 }}
              </div>
            </div>

            <h3 class="font-black text-base dark:text-white mb-2">{{ step.title }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{{ step.desc }}</p>
          </div>
        </div>
      </div>

      <!-- Bottom CTA -->
      <div class="text-center mt-16 reveal">
        <p class="text-gray-500 dark:text-gray-400 mb-6 text-sm">
          Ready to start? Step one is easy — just talk to us.
        </p>
        <a href="#contact" class="btn-primary">
          <Icon name="carbon:arrow-right" />
          Start Step 1 Now
        </a>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
const steps = [
  {
    emoji: '💬',
    title: 'Let\'s Talk',
    desc: 'Tell us your idea or problem. No formal docs needed — just a casual chat first.',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    emoji: '📋',
    title: 'Make a Plan',
    desc: 'We help define scope, timeline, and the right tech stack for your project.',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
  },
  {
    emoji: '🎨',
    title: 'Design',
    desc: 'Wireframes and prototypes before coding — so you can see and give feedback.',
    bg: 'bg-pink-50 dark:bg-pink-900/20',
  },
  {
    emoji: '👨‍💻',
    title: 'Build',
    desc: 'We code with regular progress updates. You always know where things stand.',
    bg: 'bg-green-50 dark:bg-green-900/20',
  },
  {
    emoji: '🚀',
    title: 'Launch & Care',
    desc: 'Deploy to production, make sure everything runs, and stick around if anything needs fixing.',
    bg: 'bg-orange-50 dark:bg-orange-900/20',
  },
]
</script>
