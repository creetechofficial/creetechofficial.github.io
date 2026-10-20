<template>
  <section id="about-us" class="py-24 bg-gray-50 dark:bg-gray-900/30">
    <div class="container">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        <!-- Image -->
        <div class="reveal-left flex justify-center">
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-br from-primary/20 to-orange-500/10 rounded-3xl blur-xl transform scale-110" />
            <img src="../../assets/image/about-us.svg" class="relative w-full max-w-md rounded-3xl" alt="About Creetech" />
          </div>
        </div>

        <!-- Text -->
        <div class="reveal-right">
          <div class="section-badge">About Us</div>
          <div class="section-separator" />

          <h2 class="section-title mb-6 dark:text-white">
            Not a big company —<br />
            but <span class="gradient-text">serious about software.</span>
          </h2>

          <div class="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
            <p>
              Creetech started as a bunch of developers and designers tired of sloppy software.
              We began building projects together, learning together, and grew into a
              community that lifts each other up.
            </p>
            <p>
              Our principle is simple: <strong class="text-gray-900 dark:text-white">build what's useful, not just what looks good.</strong>
              Every project gets our full care — from design and development to long after launch.
            </p>
          </div>

          <!-- Values -->
          <div class="grid grid-cols-2 gap-4 mb-8">
            <div v-for="val in values" :key="val.label" class="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50">
              <div class="text-2xl">{{ val.icon }}</div>
              <div>
                <div class="font-semibold text-sm dark:text-white">{{ val.label }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{{ val.desc }}</div>
              </div>
            </div>
          </div>

          <a href="#team" class="btn-outline">
            <Icon name="carbon:user-multiple" />
            Meet the Team
          </a>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const values = [
  { icon: '💡', label: 'Problem First', desc: 'We understand the problem before writing code' },
  { icon: '🤝', label: 'Collaboration', desc: 'Clients aren\'t bosses — they\'re partners' },
  { icon: '⚡', label: 'Fast & Reliable', desc: 'Deadlines aren\'t promises, they\'re commitments' },
  { icon: '🔧', label: 'Maintainable', desc: 'Code that\'s easy to care for long-term' },
]
</script>
