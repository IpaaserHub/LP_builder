import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { Project, LPContent } from '@/types'

interface ProjectState {
  // State
  projects: Project[]
  currentProject: Project | null
  isLoading: boolean
  error: string | null

  // Actions
  setProjects: (projects: Project[]) => void
  setCurrentProject: (project: Project | null) => void
  addProject: (project: Project) => void
  updateProject: (id: string, updates: Partial<Project>) => void
  deleteProject: (id: string) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void

  // Content management
  updateProjectContent: (content: LPContent) => void
  publishProject: (id: string) => void
  unpublishProject: (id: string) => void
}

export const useProjectStore = create<ProjectState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        projects: [],
        currentProject: null,
        isLoading: false,
        error: null,

        // Actions
        setProjects: (projects) => set({ projects }),
        
        setCurrentProject: (project) => set({ currentProject: project }),
        
        addProject: (project) => set((state) => ({
          projects: [project, ...state.projects]
        })),
        
        updateProject: (id, updates) => set((state) => ({
          projects: state.projects.map(project =>
            project.id === id ? { ...project, ...updates } : project
          ),
          currentProject: state.currentProject?.id === id
            ? { ...state.currentProject, ...updates }
            : state.currentProject
        })),
        
        deleteProject: (id) => set((state) => ({
          projects: state.projects.filter(project => project.id !== id),
          currentProject: state.currentProject?.id === id ? null : state.currentProject
        })),
        
        setLoading: (loading) => set({ isLoading: loading }),
        
        setError: (error) => set({ error }),
        
        clearError: () => set({ error: null }),

        // Content management
        updateProjectContent: (content) => {
          const { currentProject } = get()
          if (currentProject) {
            const updatedProject = { ...currentProject, content }
            set((state) => ({
              currentProject: updatedProject,
              projects: state.projects.map(project =>
                project.id === currentProject.id ? updatedProject : project
              )
            }))
          }
        },

        publishProject: (id) => {
          get().updateProject(id, { is_published: true })
        },

        unpublishProject: (id) => {
          get().updateProject(id, { is_published: false })
        },
      }),
      {
        name: 'project-store',
        partialize: (state) => ({
          projects: state.projects,
          currentProject: state.currentProject
        })
      }
    ),
    {
      name: 'project-store'
    }
  )
) 