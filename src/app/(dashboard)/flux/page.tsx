"use client"

import { useFluxStore } from "@/stores/flux-store"
import { cn } from "@/lib/utils"
import { Plus, MoreHorizontal } from "lucide-react"
import {
    DndContext,
    DragOverlay,
    useSensor,
    useSensors,
    PointerSensor,
    closestCorners,
    DragStartEvent,
    DragEndEvent,
    DragOverEvent
} from '@dnd-kit/core'
import {
    SortableContext,
    verticalListSortingStrategy,
    useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useState, useEffect } from "react"
import { Database } from "@/types/database"

type Task = Database['public']['Tables']['tasks']['Row']

const COLUMNS = [
    { id: 'todo', label: 'To Do', color: 'bg-zinc-800' },
    { id: 'in-progress', label: 'In Progress', color: 'bg-blue-500/10 border-blue-500/20' },
    { id: 'review', label: 'Review', color: 'bg-purple-500/10 border-purple-500/20' },
    { id: 'done', label: 'Done', color: 'bg-green-500/10 border-green-500/20' },
]

function TaskCard({ task, isDragging }: { task: Task, isDragging?: boolean }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({
        id: task.id,
        data: {
            type: 'Task',
            task
        }
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    // If used in overlay (dragging), don't attach sortable refs
    if (isDragging) {
        return (
            <div className="bg-card border border-border p-4 rounded-lg shadow-xl cursor-grabbing ring-2 ring-primary">
                <h4 className="font-medium text-sm text-foreground mb-1">{task.title}</h4>
                <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-mono text-muted-foreground">{task.points}pts</span>
                </div>
            </div>
        )
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={cn(
                "group bg-card border border-border p-4 rounded-lg shadow-sm hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all cursor-grab active:cursor-grabbing",
                "opacity-100" // Opacity handled by dnd-kit placeholder usually, but we keep it simple
            )}
        >
            <div className="flex justify-between items-start mb-2">
                <span className={cn("text-[10px] font-mono px-1.5 py-0.5 rounded border uppercase",
                    task.priority === 'critical' ? 'border-destructive text-destructive' :
                        task.priority === 'high' ? 'border-orange-500 text-orange-500' : 'border-muted text-muted-foreground'
                )}>
                    {task.priority}
                </span>
                <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="w-4 h-4" />
                </button>
            </div>
            <h4 className="font-medium text-sm text-foreground mb-1">{task.title}</h4>
            <p className="text-xs text-muted-foreground line-clamp-2">{task.description}</p>

            <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-[8px] font-bold text-white">U1</div>
                </div>
                <span className="text-xs font-mono text-muted-foreground">{task.points}pts</span>
            </div>
        </div>
    )
}

function KanbanColumn({ col, tasks }: { col: typeof COLUMNS[0], tasks: Task[] }) {
    const { setNodeRef } = useSortable({
        id: col.id,
        data: {
            type: 'Column',
            col
        }
    })

    return (
        <div ref={setNodeRef} className={cn("flex-1 min-w-[280px] rounded-xl border border-border bg-card/50 flex flex-col", col.color)}>
            <div className="p-4 border-b border-border/50 flex justify-between items-center">
                <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">{col.label}</h3>
                <span className="text-xs font-mono bg-accent px-2 py-0.5 rounded text-foreground">{tasks.length}</span>
            </div>

            <div className="p-3 space-y-3 overflow-y-auto flex-1 min-h-[50px]">
                <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
                    {tasks.map(task => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </SortableContext>
            </div>
        </div>
    )
}

export default function FluxPage() {
    const { tasks, updateTaskStatus, fetchTasks } = useFluxStore()
    const [activeTask, setActiveTask] = useState<Task | null>(null)

    useEffect(() => {
        fetchTasks()
    }, [fetchTasks])

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        })
    )

    function onDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === 'Task') {
            setActiveTask(event.active.data.current.task)
        }
    }

    function onDragOver(event: DragOverEvent) {
        // Optional: handle reordering within column during drag
    }

    function onDragEnd(event: DragEndEvent) {
        const { active, over } = event

        if (!over) return;

        const activeId = active.id as string
        const overId = over.id as string

        const activeTask = tasks.find(t => t.id === activeId)
        // Find column if dropped on column, or task if dropped on task
        let overStatus = COLUMNS.find(c => c.id === overId)?.id

        if (!overStatus) {
            // Maybe dropped on another task?
            const overTask = tasks.find(t => t.id === overId)
            if (overTask) overStatus = overTask.status
        }

        if (activeTask && overStatus && activeTask.status !== overStatus) {
            updateTaskStatus(activeId, overStatus as any)
        }

        setActiveTask(null)
    }

    return (
        <div className="h-full flex flex-col space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Flux</h1>
                    <p className="text-muted-foreground">Sprint Alpha • Oct 24 - Nov 07</p>
                </div>
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
                    <Plus className="mr-2 h-4 w-4" /> New Pulse
                </button>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDragEnd={onDragEnd}
            >
                <div className="flex-1 overflow-x-auto pb-4">
                    <div className="flex h-full space-x-4 min-w-[1000px]">
                        {COLUMNS.map((col) => (
                            <KanbanColumn
                                key={col.id}
                                col={col}
                                tasks={tasks.filter(t => t.status === col.id)}
                            />
                        ))}
                    </div>
                </div>
                <DragOverlay>
                    {activeTask ? <TaskCard task={activeTask} isDragging /> : null}
                </DragOverlay>
            </DndContext>
        </div>
    )
}
