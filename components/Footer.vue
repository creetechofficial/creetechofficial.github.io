<script setup lang="ts">
const date = new Date()
const currentYear = date.getFullYear()

const links = [
  { label: 'Home', path: 'home' },
  { label: 'About', path: 'about-us' },
  { label: 'Services', path: 'services' },
  { label: 'Portfolio', path: 'portfolio' },
  { label: 'Team', path: 'team' },
  { label: 'Contact', path: 'contact' },
]

const socials = [
  { icon: 'carbon:logo-github', href: 'https://github.com/creetechofficial', label: 'GitHub' },
  { icon: 'carbon:logo-linkedin', href: '#', label: 'LinkedIn' },
  { icon: 'mdi:whatsapp', href: 'https://wa.me/6281808311579', label: 'WhatsApp' },
]

const scrollTo = (path: string) => {
  const el = document.getElementById(path)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <footer class="bg-[#0D0D0D] text-white">
    <div class="container py-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">

        <!-- Brand -->
        <div>
          <img src="../assets/image/logo-white.svg" class="h-8 mb-4" alt="Creetech" />
          <p class="text-gray-400 text-sm leading-relaxed max-w-xs">
            A community of developers & designers serious about building software.
            Not a big agency — but we genuinely care about your project.
          </p>
          <!-- Social links -->
          <div class="flex gap-3 mt-6">
            <a
              v-for="social in socials"
              :key="social.label"
              :href="social.href"
              :aria-label="social.label"
              target="_blank"
              class="w-9 h-9 rounded-full bg-white/10 hover:bg-primary hover:text-gray-900 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
            >
              <Icon :name="social.icon" class="text-sm" />
            </a>
          </div>
        </div>

        <!-- Nav links -->
        <div>
          <h4 class="font-semibold text-sm text-gray-300 mb-4 uppercase tracking-wider">Navigation</h4>
          <ul class="space-y-2">
            <li v-for="link in links" :key="link.path">
              <button
                class="text-gray-400 hover:text-primary text-sm transition-colors"
                @click="scrollTo(link.path)"
              >
                {{ link.label }}
              </button>
            </li>
          </ul>
        </div>

        <!-- Contact info -->
        <div>
          <h4 class="font-semibold text-sm text-gray-300 mb-4 uppercase tracking-wider">Contact</h4>
          <div class="space-y-3">
            <a href="mailto:creetech.official@gmail.com" class="flex items-center gap-2 text-gray-400 hover:text-primary text-sm transition-colors">
              <Icon name="carbon:email" />
              creetech.official@gmail.com
            </a>
            <a href="https://wa.me/6281808311579" target="_blank" class="flex items-center gap-2 text-gray-400 hover:text-primary text-sm transition-colors">
              <Icon name="mdi:whatsapp" />
              WhatsApp Us
            </a>
            <a href="https://github.com/creetechofficial" target="_blank" class="flex items-center gap-2 text-gray-400 hover:text-primary text-sm transition-colors">
              <Icon name="carbon:logo-github" />
              github.com/creetechofficial
            </a>
          </div>
        </div>

      </div>

      <!-- Bottom bar -->
      <div class="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
        <span>© {{ currentYear }} Creetech. Made with ❤️ by the community.</span>
        <span class="flex items-center gap-2">
          <span>Built with</span>
          <span class="px-2 py-0.5 bg-white/10 rounded text-gray-400">Nuxt 4</span>
          <span class="px-2 py-0.5 bg-white/10 rounded text-gray-400">Tailwind</span>
          <span class="px-2 py-0.5 bg-white/10 rounded text-gray-400">Supabase</span>
        </span>
      </div>

    </div>
  </footer>
</template>
