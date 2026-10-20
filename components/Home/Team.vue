<script setup lang="ts">
import agung from '../../assets/image/OurTeam/agung.svg'
import anung from '../../assets/image/OurTeam/anung.svg'
import farid from '../../assets/image/OurTeam/farid.svg'
import jeffri from '../../assets/image/OurTeam/jeffri.svg'
import yudha from '../../assets/image/OurTeam/yudha.svg'

const team = [
  {
    name: 'Farid',
    role: 'Project Manager',
    avatar: farid,
    skills: ['Agile/Scrum', 'Roadmapping', 'Client Comms'],
    emoji: '🧑‍💼',
  },
  {
    name: 'Agung',
    role: 'Mobile Developer',
    avatar: agung,
    skills: ['Flutter', 'Dart', 'Firebase'],
    emoji: '📱',
  },
  {
    name: 'Anung',
    role: 'Backend Developer',
    avatar: anung,
    skills: ['Python', 'PHP', 'Node.js', 'PostgreSQL'],
    emoji: '⚙️',
  },
  {
    name: 'Jeffri',
    role: 'Frontend Developer',
    avatar: jeffri,
    skills: ['Vue.js', 'React', 'Tailwind'],
    emoji: '🖥️',
  },
  {
    name: 'Yudha',
    role: 'UI/UX Designer',
    avatar: yudha,
    skills: ['Figma', 'Design System', 'Prototyping'],
    emoji: '🎨',
  },
]

const flipped = ref<Record<string, boolean>>({})
const toggleFlip = (name: string) => {
  flipped.value[name] = !flipped.value[name]
}
</script>

<template>
  <section id="team" class="py-24">
    <div class="container">

      <!-- Header -->
      <div class="text-center mb-16 reveal">
        <div class="section-badge">Our Team</div>
        <div class="section-separator mx-auto" />
        <h2 class="section-title dark:text-white mb-4">
          The people behind <span class="gradient-text">Creetech</span>
        </h2>
        <p class="section-subtitle max-w-lg mx-auto">
          We're not employees working for a paycheck — we're a community that genuinely
          loves building great software. (and sometimes pulls all-nighters together till 2 AM 😅)
        </p>
      </div>

      <!-- Team Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div
          v-for="(member, i) in team"
          :key="member.name"
          class="reveal"
          :data-delay="i * 80"
        >
          <!-- Flip Card -->
          <div
            class="relative cursor-pointer group"
            style="perspective: 1000px; height: 280px;"
            @click="toggleFlip(member.name)"
          >
            <!-- Front -->
            <div
              class="absolute inset-0 rounded-2xl overflow-hidden transition-all duration-500 backface-hidden"
              :style="{ transform: flipped[member.name] ? 'rotateY(180deg)' : 'rotateY(0deg)' }"
            >
              <div class="card h-full flex flex-col items-center justify-center p-6 text-center">
                <div class="relative mb-4">
                  <img :src="member.avatar" :alt="member.name" class="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-md" />
                  <div class="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 flex items-center justify-center text-sm">
                    {{ member.emoji }}
                  </div>
                </div>
                <h3 class="font-black text-lg dark:text-white">{{ member.name }}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ member.role }}</p>

                <div class="mt-4 text-xs text-gray-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Icon name="carbon:touch-1" />
                  Tap to see skills
                </div>
              </div>
            </div>

            <!-- Back -->
            <div
              class="absolute inset-0 rounded-2xl overflow-hidden transition-all duration-500 backface-hidden"
              :style="{ transform: flipped[member.name] ? 'rotateY(0deg)' : 'rotateY(-180deg)' }"
            >
              <div class="h-full bg-gradient-to-br from-primary/90 to-orange-500/90 flex flex-col items-center justify-center p-6 text-center rounded-2xl">
                <div class="text-3xl mb-3">{{ member.emoji }}</div>
                <h3 class="font-black text-lg text-white mb-4">{{ member.name }}</h3>
                <div class="flex flex-wrap gap-2 justify-center">
                  <span
                    v-for="skill in member.skills"
                    :key="skill"
                    class="px-3 py-1 bg-white/20 text-white text-xs rounded-full font-medium"
                  >
                    {{ skill }}
                  </span>
                </div>
                <p class="text-white/70 text-xs mt-4">{{ member.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.backface-hidden {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
</style>
