import { create } from 'zustand'
import { Database } from '@/types/database'
import { createClient } from '@/lib/supabase/client'

type Task = Database['public']['Tables']['tasks']['Row']

interface FluxState {
    tasks: Task[]
    filter: string
    isLoading: boolean
    fetchTasks: (projectId?: string) => Promise<void>
    setTasks: (tasks: Task[]) => void
    addTask: (task: Task) => void
    updateTaskStatus: (taskId: string, status: Task['status']) => Promise<void>
}

export const useFluxStore = create<FluxState>((set, get) => ({
    tasks: [],
    filter: 'all',
    isLoading: false,

    fetchTasks: async (projectId) => {
        set({ isLoading: true })
        const supabase = createClient()

        // For now fetch all, later filter by project_id
        const { data } = await supabase
            .from('tasks')
            .select('*')
            .order('created_at', { ascending: false })

        if (data) {
            set({ tasks: data })
        }
        set({ isLoading: false })
    },

    setTasks: (tasks) => set({ tasks }),

    addTask: async (task) => {
        // Optimistic update handled by caller or real-time sub
        set((state) => ({ tasks: [task, ...state.tasks] }))
    },

    updateTaskStatus: async (taskId, status) => {
        const supabase = createClient()

        // Optimistic Update
        const currentTasks = get().tasks
        const updatedTasks = currentTasks.map((t) => (t.id === taskId ? { ...t, status } : t))
        set({ tasks: updatedTasks })

        // DB Update
        const { error } = await supabase
            .from('tasks')
            .update({ status })
            .eq('id', taskId)

        // Revert on error
        if (error) {
            set({ tasks: currentTasks })
            console.error("Failed to update task:", error)
        }
    },
}))
