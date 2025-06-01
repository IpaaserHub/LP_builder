import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { EditorState } from '@/types'

interface EditorStore extends EditorState {
  // Actions
  setLoading: (loading: boolean) => void
  setCurrentSection: (section: string | null) => void
  setDragMode: (isDragMode: boolean) => void
  setSelectedComponent: (component: string | null) => void
  resetEditor: () => void

  // Preview state
  previewMode: 'desktop' | 'tablet' | 'mobile'
  setPreviewMode: (mode: 'desktop' | 'tablet' | 'mobile') => void

  // Undo/Redo functionality
  history: any[]
  historyIndex: number
  canUndo: boolean
  canRedo: boolean
  addToHistory: (state: any) => void
  undo: () => void
  redo: () => void
}

export const useEditorStore = create<EditorStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      isLoading: false,
      currentSection: null,
      isDragMode: false,
      selectedComponent: null,
      previewMode: 'desktop',
      history: [],
      historyIndex: -1,
      canUndo: false,
      canRedo: false,

      // Actions
      setLoading: (loading) => set({ isLoading: loading }),
      
      setCurrentSection: (section) => set({ currentSection: section }),
      
      setDragMode: (isDragMode) => set({ isDragMode }),
      
      setSelectedComponent: (component) => set({ selectedComponent: component }),
      
      resetEditor: () => set({
        currentSection: null,
        isDragMode: false,
        selectedComponent: null,
        isLoading: false
      }),

      setPreviewMode: (mode) => set({ previewMode: mode }),

      // History management
      addToHistory: (state) => {
        const { history, historyIndex } = get()
        const newHistory = history.slice(0, historyIndex + 1)
        newHistory.push(state)
        
        set({
          history: newHistory,
          historyIndex: newHistory.length - 1,
          canUndo: true,
          canRedo: false
        })
      },

      undo: () => {
        const { historyIndex, history } = get()
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1
          set({
            historyIndex: newIndex,
            canUndo: newIndex > 0,
            canRedo: true
          })
          return history[newIndex]
        }
        return null
      },

      redo: () => {
        const { historyIndex, history } = get()
        if (historyIndex < history.length - 1) {
          const newIndex = historyIndex + 1
          set({
            historyIndex: newIndex,
            canUndo: true,
            canRedo: newIndex < history.length - 1
          })
          return history[newIndex]
        }
        return null
      },
    }),
    {
      name: 'editor-store'
    }
  )
) 