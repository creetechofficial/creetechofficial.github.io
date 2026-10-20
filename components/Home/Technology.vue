<script setup lang="ts">
import adobeIllustrator from '../../assets/image/Technology/adobe-illustrator.svg'
import adobePs from '../../assets/image/Technology/adobe-ps.svg'
import adobeXd from '../../assets/image/Technology/adobe-xd.svg'
import aE from '../../assets/image/Technology/after-effect.svg'
import flutter from '../../assets/image/Technology/flutter.svg'
import typescript from '../../assets/image/Technology/typescript.svg'
import laravel from '../../assets/image/Technology/laravel.svg'
import mongodb from '../../assets/image/Technology/mongodb.svg'
import reactjs from '../../assets/image/Technology/reactjs.svg'
import sql from '../../assets/image/Technology/sql.svg'
import express from '../../assets/image/Technology/express.svg'
import vuejs from '../../assets/image/Technology/vuejs.svg'
import vuetify from '../../assets/image/Technology/vuetify.svg'
import nuxt from '../../assets/image/Technology/nuxt.svg'
import sass from '../../assets/image/Technology/sass.svg'
import python from '../../assets/image/Technology/python.svg'
import tailwind from '../../assets/image/Technology/tailwind.svg'
import golang from '../../assets/image/Technology/golang.svg'
import nextjs from '../../assets/image/Technology/nextjs.svg'
import nodejs from '../../assets/image/Technology/nodejs.svg'
import php from '../../assets/image/Technology/php.svg'
import postgresql from '../../assets/image/Technology/postgresql.svg'
import mysql from '../../assets/image/Technology/mysql.svg'
import redis from '../../assets/image/Technology/redis.svg'
import graphql from '../../assets/image/Technology/graphql.svg'
import dart from '../../assets/image/Technology/dart.svg'
import kotlin from '../../assets/image/Technology/kotlin.svg'
import swift from '../../assets/image/Technology/swift.svg'
import figma from '../../assets/image/Technology/figma.svg'
import docker from '../../assets/image/Technology/docker.svg'
import aws from '../../assets/image/Technology/aws.svg'
import firebase from '../../assets/image/Technology/firebase.svg'
import git from '../../assets/image/Technology/git.svg'
import kubernetes from '../../assets/image/Technology/kubernetes.svg'
import nginx from '../../assets/image/Technology/nginx.svg'
import googlecloud from '../../assets/image/Technology/googlecloud.svg'
import vercel from '../../assets/image/Technology/vercel.svg'
import netlify from '../../assets/image/Technology/netlify.svg'
import postman from '../../assets/image/Technology/postman.svg'
import supabase from '../../assets/image/Technology/supabase.svg'

interface TechItem {
  name: string
  tab: string
  img?: string
  // Black logos need inversion on dark tiles
  invertDark?: boolean
  more?: boolean
}

// Tabs are capabilities, not a fixed tool list — we adapt to each project.
const allTech: TechItem[] = [
  // Web
  { img: vuejs, name: 'Vue.js', tab: 'W' },
  { img: reactjs, name: 'React', tab: 'W' },
  { img: nuxt, name: 'Nuxt', tab: 'W' },
  { img: nextjs, name: 'Next.js', tab: 'W', invertDark: true },
  { img: typescript, name: 'TypeScript', tab: 'W' },
  { img: tailwind, name: 'Tailwind', tab: 'W' },
  { img: sass, name: 'Sass', tab: 'W' },
  { img: vuetify, name: 'Vuetify', tab: 'W' },
  // Mobile
  { img: flutter, name: 'Flutter', tab: 'M' },
  { img: dart, name: 'Dart', tab: 'M' },
  { img: kotlin, name: 'Kotlin', tab: 'M' },
  { img: swift, name: 'Swift', tab: 'M' },
  // Backend
  { img: laravel, name: 'Laravel', tab: 'B' },
  { img: golang, name: 'Go', tab: 'B' },
  { img: python, name: 'Python', tab: 'B' },
  { img: nodejs, name: 'Node.js', tab: 'B' },
  { img: php, name: 'PHP', tab: 'B' },
  { img: express, name: 'Express', tab: 'B' },
  { img: postgresql, name: 'PostgreSQL', tab: 'B' },
  { img: mysql, name: 'MySQL', tab: 'B' },
  { img: mongodb, name: 'MongoDB', tab: 'B' },
  { img: sql, name: 'SQL', tab: 'B' },
  { img: redis, name: 'Redis', tab: 'B' },
  { img: graphql, name: 'GraphQL', tab: 'B' },
  // Design
  { img: figma, name: 'Figma', tab: 'D' },
  { img: adobeIllustrator, name: 'Illustrator', tab: 'D' },
  { img: adobePs, name: 'Photoshop', tab: 'D' },
  { img: adobeXd, name: 'Adobe XD', tab: 'D' },
  { img: aE, name: 'After Effects', tab: 'D' },
  // Cloud & Tools
  { img: docker, name: 'Docker', tab: 'C' },
  { img: kubernetes, name: 'Kubernetes', tab: 'C' },
  { img: aws, name: 'AWS', tab: 'C' },
  { img: googlecloud, name: 'Google Cloud', tab: 'C' },
  { img: firebase, name: 'Firebase', tab: 'C' },
  { img: supabase, name: 'Supabase', tab: 'C' },
  { img: vercel, name: 'Vercel', tab: 'C', invertDark: true },
  { img: netlify, name: 'Netlify', tab: 'C' },
  { img: nginx, name: 'Nginx', tab: 'C' },
  { img: git, name: 'Git', tab: 'C' },
  { img: postman, name: 'Postman', tab: 'C' },
]

const moreTile: TechItem = { name: '+ many more', tab: '', more: true }

const tabList = [
  { label: 'All', value: '' },
  { label: 'Web', value: 'W' },
  { label: 'Mobile', value: 'M' },
  { label: 'Backend', value: 'B' },
  { label: 'Design', value: 'D' },
  { label: 'Cloud', value: 'C' },
]

const tabActive = ref('')
const filtered = computed(() => {
  const list = tabActive.value === '' ? allTech : allTech.filter(t => t.tab === tabActive.value)
  return [...list, moreTile]
})

// Duplicate for infinite marquee
const marqueeItems = computed(() => [...filtered.value, ...filtered.value])
</script>

<template>
  <section id="technology" class="py-24 bg-gray-50 dark:bg-gray-900/30">
    <div class="container">

      <!-- Header -->
      <div class="text-center mb-12 reveal">
        <div class="section-badge">Tech Stack</div>
        <div class="section-separator mx-auto" />
        <h2 class="section-title dark:text-white mb-4">
          We work with <span class="gradient-text">whatever your project needs</span>
        </h2>
        <p class="section-subtitle max-w-lg mx-auto">
          These are our daily drivers — but we're quick to pick up anything else. Tell us your stack, we'll handle it.
        </p>
      </div>

      <!-- Filter Tabs -->
      <div class="flex flex-wrap justify-center gap-2 mb-10 reveal">
        <button
          v-for="tab in tabList"
          :key="tab.value"
          class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
          :class="tabActive === tab.value
            ? 'bg-primary text-gray-900 shadow-glow'
            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-primary'"
          @click="tabActive = tab.value"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Marquee -->
      <div class="marquee-wrapper reveal">
        <div class="marquee-track" :key="tabActive">
          <div
            v-for="(tech, i) in marqueeItems"
            :key="i"
            class="flex flex-col items-center gap-2 mx-8 group"
          >
            <!-- "+ many more" tile -->
            <template v-if="tech.more">
              <div class="w-16 h-16 flex items-center justify-center rounded-2xl border-2 border-dashed border-primary/50 text-primary-ink dark:text-primary text-lg font-black transition-all duration-300 group-hover:-translate-y-1">
                +
              </div>
              <span class="text-xs text-primary-ink dark:text-primary font-semibold whitespace-nowrap">many more</span>
              <span class="text-[10px] text-gray-400 whitespace-nowrap -mt-1">we adapt to your stack</span>
            </template>
            <!-- Regular tech tile -->
            <template v-else>
              <div class="w-16 h-16 flex items-center justify-center bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1 group-hover:border-primary/30">
                <img :src="tech.img" :alt="tech.name" class="w-10 h-10 object-contain" :class="{ 'dark:invert': tech.invertDark }" />
              </div>
              <span class="text-xs text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">{{ tech.name }}</span>
            </template>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
