<script setup lang="ts">
definePageMeta({ layout: false })
const { isAdmin, verifyPin, logout, checkSession } = useAdmin()
const { projects, fetchProjects, addProject, updateProject, deleteProject, uploadScreenshot, deleteScreenshot, projectCategories } = useProjects()

const pinInput = ref('')
const pinError = ref(false)
const pinLoading = ref(false)

const submitPin = async () => {
  pinLoading.value = true
  pinError.value = false
  await new Promise(r => setTimeout(r, 400)) // brief loading
  const ok = verifyPin(pinInput.value)
  if (!ok) {
    pinError.value = true
    pinInput.value = ''
  } else {
    await fetchProjects()
  }
  pinLoading.value = false
}

// Form for adding / editing project
const formOpen = ref(false)
const editingId = ref<string | null>(null)
const isEditing = computed(() => editingId.value !== null)
const saving = ref(false)
const uploadingFiles = ref(false)
const removedShots = ref<string[]>([])
const categoryOptions = [
  { label: 'Web App', value: 'web' },
  { label: 'Mobile App', value: 'mobile' },
  { label: 'Design', value: 'design' },
  { label: 'Backend', value: 'backend' },
]
const emptyProject = () => ({
  title: '',
  description: '',
  categories: ['web'] as string[],
  project_url: '',
  tech_stack: '',
  client_name: '',
  year: new Date().getFullYear(),
  cover_url: '',
  screenshots: [] as string[],
  is_featured: false,
})
const newProject = reactive(emptyProject())

const openAdd = () => {
  Object.assign(newProject, emptyProject())
  removedShots.value = []
  editingId.value = null
  formOpen.value = true
}

const openEdit = (project: any) => {
  Object.assign(newProject, {
    title: project.title || '',
    description: project.description || '',
    categories: [...projectCategories(project)],
    project_url: project.project_url || '',
    tech_stack: (project.tech_stack || []).join(', '),
    client_name: project.client_name || '',
    year: project.year || new Date().getFullYear(),
    cover_url: project.cover_url || '',
    screenshots: [...(project.screenshots || [])],
    is_featured: !!project.is_featured,
  })
  removedShots.value = []
  editingId.value = project.id
  formOpen.value = true
}

const closeForm = () => {
  formOpen.value = false
  editingId.value = null
  removedShots.value = []
}

const toggleCategory = (value: string) => {
  const idx = newProject.categories.indexOf(value)
  if (idx >= 0) {
    if (newProject.categories.length > 1) newProject.categories.splice(idx, 1)
  } else {
    newProject.categories.push(value)
  }
}

const removeShot = (idx: number) => {
  const [url] = newProject.screenshots.splice(idx, 1)
  if (url) removedShots.value.push(url)
}

const screenshotFiles = ref<FileList | null>(null)

const handleUpload = async () => {
  if (!screenshotFiles.value?.length) return []
  uploadingFiles.value = true
  const urls: string[] = []
  const tempId = `temp-${Date.now()}`
  for (const file of Array.from(screenshotFiles.value)) {
    try {
      const url = await uploadScreenshot(file, tempId)
      urls.push(url)
    } catch (e) {
      console.error('Upload failed', e)
    }
  }
  uploadingFiles.value = false
  return urls
}

const saveProject = async () => {
  if (!newProject.categories.length) {
    alert('Pick at least one category.')
    return
  }
  saving.value = true
  try {
    const uploaded = await handleUpload()
    const payload = {
      ...newProject,
      tech_stack: newProject.tech_stack.split(',').map(t => t.trim()).filter(Boolean),
      screenshots: [...newProject.screenshots, ...uploaded],
    }
    if (isEditing.value && editingId.value) {
      await updateProject(editingId.value, payload)
      // Delete screenshot files the user removed (best effort)
      for (const url of removedShots.value) {
        try { await deleteScreenshot(url) } catch (e) { console.warn('Could not delete screenshot file', url, e) }
      }
    } else {
      await addProject(payload)
    }
    closeForm()
    Object.assign(newProject, emptyProject())
    screenshotFiles.value = null
  } catch (e) {
    console.error(e)
    alert('Failed to save project. Make sure Supabase is configured.')
  }
  saving.value = false
}

const confirmDelete = async (id: string, title: string) => {
  if (confirm(`Delete project "${title}"?`)) {
    await deleteProject(id)
  }
}

onMounted(() => {
  checkSession()
  if (isAdmin.value) fetchProjects()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-[#0D0D0D] font-sans dark:text-white flex items-start justify-center pt-20 pb-10 px-4">

    <!-- PIN Gate -->
    <div v-if="!isAdmin" class="w-full max-w-sm">
      <div class="card p-8 text-center">
        <div class="text-5xl mb-4">🔐</div>
        <h1 class="text-xl font-black dark:text-white mb-2">Admin Creetech</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Enter your admin PIN to continue.
        </p>

        <form @submit.prevent="submitPin">
          <input
            v-model="pinInput"
            type="password"
            placeholder="••••"
            class="text-center text-2xl tracking-widest mb-4"
            :class="{ 'border-red-400 ring-red-200 dark:ring-red-900/30': pinError }"
            maxlength="8"
            required
          />
          <p v-if="pinError" class="text-red-500 text-xs mb-3">Wrong PIN. Try again.</p>
          <button type="submit" class="btn-primary w-full justify-center" :disabled="pinLoading">
            <Icon v-if="pinLoading" name="carbon:circle-dash" class="animate-spin" />
            <span>{{ pinLoading ? 'Verifying...' : 'Sign In' }}</span>
          </button>
        </form>
      </div>
    </div>

    <!-- Admin Panel -->
    <div v-else class="w-full max-w-4xl">

      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-2xl font-black dark:text-white">Admin Panel</h1>
          <p class="text-sm text-gray-500 dark:text-gray-400">Manage Creetech projects</p>
        </div>
        <div class="flex gap-3">
          <button class="btn-primary" @click="openAdd">
            <Icon name="carbon:add" />
            Add Project
          </button>
          <button class="btn-ghost" @click="logout">
            <Icon name="carbon:logout" />
            Log Out
          </button>
        </div>
      </div>

      <!-- Project List -->
      <div class="card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-100 dark:border-gray-800">
                <th class="text-left p-4 font-semibold text-gray-500 dark:text-gray-400">Project</th>
                <th class="text-left p-4 font-semibold text-gray-500 dark:text-gray-400">Category</th>
                <th class="text-left p-4 font-semibold text-gray-500 dark:text-gray-400">Year</th>
                <th class="text-left p-4 font-semibold text-gray-500 dark:text-gray-400">Featured</th>
                <th class="p-4" />
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="project in projects"
                :key="project.id"
                class="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
              >
                <td class="p-4">
                  <div class="font-semibold dark:text-white">{{ project.title }}</div>
                  <div class="text-xs text-gray-400 mt-0.5 line-clamp-1">{{ project.description }}</div>
                </td>
                <td class="p-4">
                  <span
                    v-for="cat in projectCategories(project)"
                    :key="cat"
                    class="tech-badge capitalize mr-1"
                  >{{ cat }}</span>
                </td>
                <td class="p-4 text-gray-500 dark:text-gray-400">{{ project.year }}</td>
                <td class="p-4">
                  <span v-if="project.is_featured" class="text-green-500 text-xs font-medium">✓ Yes</span>
                  <span v-else class="text-gray-400 text-xs">—</span>
                </td>
                <td class="p-4 whitespace-nowrap">
                  <button class="text-gray-400 hover:text-primary-ink dark:hover:text-primary transition-colors mr-3" aria-label="Edit project" @click="openEdit(project)">
                    <Icon name="carbon:edit" />
                  </button>
                  <button class="text-red-400 hover:text-red-600 transition-colors" aria-label="Delete project" @click="confirmDelete(project.id, project.title)">
                    <Icon name="carbon:trash-can" />
                  </button>
                </td>
              </tr>
              <tr v-if="projects.length === 0">
                <td colspan="5" class="p-8 text-center text-gray-400 text-sm">
                   No projects yet. Add your first one!
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>

    <!-- Add Project Modal -->
    <Transition name="modal">
      <div v-if="formOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closeForm" />
        <div class="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto z-10 p-8">

          <h2 class="text-xl font-black dark:text-white mb-6">{{ isEditing ? 'Edit Project' : 'Add New Project' }}</h2>

          <form class="space-y-4" @submit.prevent="saveProject">
            <div>
              <label class="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 block uppercase tracking-wider">Project Title *</label>
              <input v-model="newProject.title" placeholder="E.g. Stock Management App" required />
            </div>
            <div>
              <label class="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 block uppercase tracking-wider">Description</label>
              <textarea v-model="newProject.description" placeholder="Briefly describe this project..." class="min-h-[80px]" />
            </div>
            <div>
              <label class="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 block uppercase tracking-wider">Categories (pick at least one)</label>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="opt in categoryOptions"
                  :key="opt.value"
                  type="button"
                  class="px-3 py-1.5 text-xs rounded-full border transition-all"
                  :class="newProject.categories.includes(opt.value)
                    ? 'bg-primary text-gray-900 border-primary font-semibold'
                    : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-primary'"
                  @click="toggleCategory(opt.value)"
                >
                  {{ opt.label }}
                </button>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 block uppercase tracking-wider">Year</label>
                <input v-model="newProject.year" type="number" min="2020" max="2030" />
              </div>
              <div>
                <label class="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 block uppercase tracking-wider">Project URL</label>
                <input v-model="newProject.project_url" placeholder="https://... (optional)" type="url" />
              </div>
            </div>
            <div>
              <label class="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 block uppercase tracking-wider">Tech Stack (comma separated)</label>
              <input v-model="newProject.tech_stack" placeholder="Vue.js, Laravel, MySQL" />
            </div>
            <div>
              <label class="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 block uppercase tracking-wider">Client Name</label>
              <input v-model="newProject.client_name" placeholder="Optional" />
            </div>
            <div>
              <label class="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 block uppercase tracking-wider">Cover Image URL</label>
              <input v-model="newProject.cover_url" placeholder="https://... (optional)" type="url" />
            </div>
            <div v-if="newProject.screenshots.length">
              <label class="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 block uppercase tracking-wider">Current screenshots (hover to remove)</label>
              <div class="flex flex-wrap gap-2 mb-1">
                <div
                  v-for="(shot, idx) in newProject.screenshots"
                  :key="shot"
                  class="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 group/shot"
                >
                  <img :src="shot" class="w-full h-full object-cover" alt="" />
                  <button
                    type="button"
                    aria-label="Remove screenshot"
                    class="absolute inset-0 bg-black/60 text-white text-sm opacity-0 group-hover/shot:opacity-100 transition-opacity flex items-center justify-center"
                    @click="removeShot(idx)"
                  >
                    <Icon name="carbon:trash-can" />
                  </button>
                </div>
              </div>
            </div>
            <div>
              <label class="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 block uppercase tracking-wider">Screenshots (upload)</label>
              <input
                type="file"
                multiple
                accept="image/*"
                class="input text-xs py-2"
                @change="screenshotFiles = ($event.target as HTMLInputElement).files"
              />
              <p class="text-xs text-gray-400 mt-1">Max 5 files. Requires Supabase Storage.</p>
            </div>
            <div class="flex items-center gap-2">
              <input id="featured" v-model="newProject.is_featured" type="checkbox" class="w-auto" />
              <label for="featured" class="text-sm text-gray-700 dark:text-gray-300">Show as Featured</label>
            </div>

            <div class="flex gap-3 pt-2">
              <button type="submit" class="btn-primary flex-1 justify-center" :disabled="saving || uploadingFiles">
                <Icon v-if="saving || uploadingFiles" name="carbon:circle-dash" class="animate-spin" />
                <span>{{ uploadingFiles ? 'Uploading screenshots...' : saving ? (isEditing ? 'Updating...' : 'Saving...') : (isEditing ? 'Update Project' : 'Save Project') }}</span>
              </button>
              <button type="button" class="btn-ghost" @click="closeForm">Cancel</button>
            </div>
          </form>

        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
select.input {
  @apply w-full rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm 
         text-gray-700 dark:text-gray-200 dark:bg-gray-800/50
         focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none;
}
</style>
