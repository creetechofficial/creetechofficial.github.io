// composables/useCounter.ts
export function useAnimatedCounter(target: number, duration = 2000) {
  const current = ref(0)
  let startTime: number | null = null
  let rafId: number | null = null

  const start = () => {
    startTime = null
    if (rafId) cancelAnimationFrame(rafId)

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      current.value = Math.round(eased * target)

      if (progress < 1) {
        rafId = requestAnimationFrame(animate)
      }
    }

    rafId = requestAnimationFrame(animate)
  }

  const stop = () => {
    if (rafId) cancelAnimationFrame(rafId)
  }

  return { current, start, stop }
}

