import { ref } from 'vue'

const isDark = ref(false)

export function useTheme() {
  const toggleDark = () => {
    if (typeof window === 'undefined') return
    isDark.value = !isDark.value
    if (isDark.value) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const initTheme = () => {
    if (typeof window === 'undefined') return
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (saved === 'dark' || (!saved && prefersDark)) {
      isDark.value = true
      document.documentElement.classList.add('dark')
    }
  }

  return { isDark, toggleDark, initTheme }
}
