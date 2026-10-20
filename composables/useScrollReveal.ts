// composables/useScrollReveal.ts
import { onMounted, onUnmounted } from 'vue'

export function useScrollReveal() {
  let observer: IntersectionObserver | null = null
  let mutation: MutationObserver | null = null

  const observeEls = (root: ParentNode = document) => {
    root
      .querySelectorAll('.reveal:not(.revealed), .reveal-left:not(.revealed), .reveal-right:not(.revealed)')
      .forEach((el) => observer?.observe(el))
  }

  const onIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add staggered delay based on element index
        const el = entry.target as HTMLElement
        const delay = el.dataset.delay || '0'
        setTimeout(() => {
          el.classList.add('revealed')
        }, parseInt(delay))
        observer?.unobserve(entry.target)
      }
    })
  }

  const init = () => {
    if (typeof window === 'undefined') return

    observer = new IntersectionObserver(onIntersect, {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px',
    })

    observeEls()

    // Watch for dynamically added .reveal nodes (async data, filters, etc.)
    // so content rendered after mount is never stuck invisible.
    mutation?.disconnect()
    mutation = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            if (
              node.matches('.reveal, .reveal-left, .reveal-right') &&
              !node.classList.contains('revealed')
            ) {
              observer?.observe(node)
            }
            observeEls(node)
          }
        })
      })
    })
    mutation.observe(document.body, { childList: true, subtree: true })
  }

  const refresh = () => {
    observer?.disconnect()
    mutation?.disconnect()
    init()
  }

  onMounted(() => {
    // Small delay to ensure DOM is ready
    setTimeout(init, 100)
  })

  onUnmounted(() => {
    observer?.disconnect()
    mutation?.disconnect()
  })

  return { init, refresh }
}
