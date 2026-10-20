<script setup lang="ts">
const form = reactive({ name: '', email: '', message: '' })
const sending = ref(false)
const sent = ref(false)

const openMail = () => {
  if (form.name && form.email && form.message) {
    sending.value = true
    const link = document.createElement('a')
    link.href = `mailto:creetech.official@gmail.com?subject=Project Inquiry from ${form.name}&body=${encodeURIComponent(form.message)}`
    link.click()
    setTimeout(() => {
      sending.value = false
      sent.value = true
      form.name = ''
      form.email = ''
      form.message = ''
    }, 1000)
  }
}

const waMsg = encodeURIComponent('Hi Creetech! I\'d love to discuss a project with you 👋')
const waLink = `https://wa.me/6281808311579?text=${waMsg}`
</script>

<template>
  <section id="contact" class="py-24">
    <div class="container">
      <div class="max-w-2xl mx-auto">

        <!-- Header -->
        <div class="text-center mb-12 reveal">
          <div class="section-badge">Contact</div>
          <div class="section-separator mx-auto" />
          <h2 class="section-title dark:text-white mb-4">
            Got an idea in mind? <br />
            <span class="gradient-text">Tell us about it.</span>
          </h2>
          <p class="section-subtitle">
            No formal proposal needed. A short story about what you want to build — we're all ears.
          </p>
        </div>

        <!-- Card -->
        <div class="card p-8 md:p-10 reveal">

          <!-- Success State -->
          <div v-if="sent" class="text-center py-8">
            <div class="text-6xl mb-4">🎉</div>
            <h3 class="text-xl font-black dark:text-white mb-2">Message Sent!</h3>
            <p class="text-gray-500 dark:text-gray-400 mb-6">
              We usually reply within 24 hours. Or for something faster, just WA us!
            </p>
            <a :href="waLink" target="_blank" class="btn-primary">
              <Icon name="mdi:whatsapp" />
              Chat on WhatsApp
            </a>
            <button class="btn-ghost block mx-auto mt-3" @click="sent = false">Send another message</button>
          </div>

          <!-- Form -->
          <form v-else @submit.prevent="openMail">
            <div class="space-y-4 mb-6">
              <div>
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Name / Company</label>
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="E.g. Budi from Startup ABC"
                  required
                />
              </div>
              <div>
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Email</label>
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="you@email.com"
                  required
                />
              </div>
              <div>
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Briefly, your project</label>
                <textarea
                  v-model="form.message"
                  placeholder="I want to build an app for... that can... because..."
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              class="btn-primary w-full justify-center"
              :disabled="sending"
            >
              <Icon v-if="sending" name="carbon:circle-dash" class="animate-spin" />
              <Icon v-else name="carbon:send-alt" />
              {{ sending ? 'Opening email...' : 'Send Message' }}
            </button>
          </form>

          <!-- Divider -->
          <div class="flex items-center gap-4 my-6">
            <div class="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            <span class="text-xs text-gray-400">or</span>
            <div class="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          </div>

          <!-- WhatsApp -->
          <a
            :href="waLink"
            target="_blank"
            class="flex items-center justify-center gap-3 w-full py-3.5 rounded-xl border-2 border-green-500 text-green-600 dark:text-green-400 font-semibold text-sm hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200"
          >
            <Icon name="mdi:whatsapp" class="text-xl" />
            Chat Directly on WhatsApp
          </a>

          <!-- Info -->
          <div class="flex items-center justify-center gap-6 mt-6 text-xs text-gray-400">
            <span class="flex items-center gap-1">
              <Icon name="carbon:time" />
              Replies &lt; 24h
            </span>
            <span class="flex items-center gap-1">
              <Icon name="carbon:security" />
              Your info is safe with us
            </span>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
