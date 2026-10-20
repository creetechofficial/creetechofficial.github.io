// composables/useAdmin.ts
const isAdmin = ref(false)

export function useAdmin() {
  const config = useRuntimeConfig()

  const verifyPin = (pin: string): boolean => {
    const correctPin = config.public.adminPin || '1234'
    if (pin === correctPin) {
      isAdmin.value = true
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('ct-admin', '1')
      }
      return true
    }
    return false
  }

  const logout = () => {
    isAdmin.value = false
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('ct-admin')
    }
  }

  const checkSession = () => {
    if (typeof window !== 'undefined') {
      isAdmin.value = sessionStorage.getItem('ct-admin') === '1'
    }
  }

  return { isAdmin, verifyPin, logout, checkSession }
}

