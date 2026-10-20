// composables/useProjects.ts
export interface Project {
  id: string
  title: string
  description: string
  // Legacy single category (kept for backward compat)
  category?: 'web' | 'mobile' | 'design' | 'backend' | 'all'
  // Multi categories (primary source)
  categories: string[]
  project_url?: string
  tech_stack: string[]
  client_name?: string
  year?: number
  cover_url?: string
  screenshots: string[]
  is_featured?: boolean
}

// Fallback data lokal (data/projects.json) — dipakai saat Supabase offline / static build
import fallbackData from '../data/projects.json'

const fallbackProjects: Project[] = fallbackData as Project[]

export function useProjects() {
  const projects = ref<Project[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const activeCategory = ref<string>('all')

  // Categories of a project: array first, legacy single value as fallback
  const projectCategories = (p: Project): string[] =>
    p.categories?.length ? p.categories : (p.category ? [p.category] : [])

  const filteredProjects = computed(() => {
    if (activeCategory.value === 'all') return projects.value
    return projects.value.filter(p => projectCategories(p).includes(activeCategory.value))
  })

  const fetchProjects = async () => {
    loading.value = true
    error.value = null

    try {
      const supabase = useSupabase()
      if (supabase) {
        const { data, error: sbError } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false })

        if (sbError) throw sbError
        projects.value = data || fallbackProjects
      } else {
        // Fallback ke data lokal
        projects.value = fallbackProjects
      }
    } catch (e) {
      console.warn('Supabase unavailable, using fallback data:', e)
      projects.value = fallbackProjects
      error.value = null // Tidak tampilkan error ke user, silently fallback
    } finally {
      loading.value = false
    }
  }

  const addProject = async (project: Omit<Project, 'id'>) => {
    const supabase = useSupabase()
    if (!supabase) throw new Error('Supabase not configured')

    const { data, error: sbError } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single()

    if (sbError) throw sbError

    projects.value.unshift(data)
    return data
  }

  const deleteProject = async (id: string) => {
    const supabase = useSupabase()
    if (!supabase) throw new Error('Supabase not configured')

    const { error: sbError } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)

    if (sbError) throw sbError
    projects.value = projects.value.filter(p => p.id !== id)
  }

  const updateProject = async (id: string, patch: Partial<Project>) => {
    const supabase = useSupabase()
    if (!supabase) throw new Error('Supabase not configured')

    const { data, error: sbError } = await supabase
      .from('projects')
      .update(patch)
      .eq('id', id)
      .select()
      .single()

    if (sbError) throw sbError
    const idx = projects.value.findIndex(p => p.id === id)
    if (idx >= 0) projects.value[idx] = data
    return data
  }

  const deleteScreenshot = async (url: string) => {
    const supabase = useSupabase()
    if (!supabase) throw new Error('Supabase not configured')

    const marker = '/project-screenshots/'
    const idx = url.indexOf(marker)
    if (idx < 0) return // not a storage URL, nothing to delete remotely
    const path = url.slice(idx + marker.length)

    const { error: delErr } = await supabase.storage
      .from('project-screenshots')
      .remove([path])

    if (delErr) throw delErr
  }

  const uploadScreenshot = async (file: File, projectId: string): Promise<string> => {
    const supabase = useSupabase()
    if (!supabase) throw new Error('Supabase not configured')

    const ext = file.name.split('.').pop()
    const path = `${projectId}/${Date.now()}.${ext}`

    const { error: upErr } = await supabase.storage
      .from('project-screenshots')
      .upload(path, file)

    if (upErr) throw upErr

    const { data } = supabase.storage
      .from('project-screenshots')
      .getPublicUrl(path)

    return data.publicUrl
  }

  return {
    projects,
    filteredProjects,
    loading,
    error,
    activeCategory,
    projectCategories,
    fetchProjects,
    addProject,
    updateProject,
    deleteProject,
    uploadScreenshot,
    deleteScreenshot,
  }
}

