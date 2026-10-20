// composables/useSupabase.ts
import { createClient } from '@supabase/supabase-js'

let _client: ReturnType<typeof createClient> | null = null

export function useSupabase() {
  if (!_client) {
    const config = useRuntimeConfig()
    const url = config.public.supabaseUrl
    const key = config.public.supabaseAnonKey

    if (url && key) {
      _client = createClient(url, key)
    }
  }

  return _client
}

