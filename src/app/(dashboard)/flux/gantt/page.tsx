"use client"

import { Gantt, Task, ViewMode } from 'gantt-task-react'
import "gantt-task-react/dist/index.css"
import { useState } from 'react'

const MOCK_TASKS: Task[] = [
    {
        start: new Date(2025, 9, 1),
        end: new Date(2025, 9, 15),
        name: 'Concept Art Phase',
        id: 't1',
        progress: 100,
        type: 'project',
        hideChildren: false,
        isDisabled: true,
        styles: { progressColor: '#6E44FF', progressSelectedColor: '#6E44FF' }
    },
    {
        start: new Date(2025, 9, 2),
        end: new Date(2025, 9, 8),
        name: 'Character Sketches',
        id: 't2',
        progress: 100,
        type: 'task',
        project: 't1',
        isDisabled: false,
        styles: { progressColor: '#D1F366', progressSelectedColor: '#D1F366' }
    },
    {
        start: new Date(2025, 9, 8),
        end: new Date(2025, 9, 15),
        name: 'Environment Blockout',
        id: 't3',
        progress: 45,
        type: 'task',
        project: 't1',
        isDisabled: false,
        styles: { progressColor: '#ffbb54', progressSelectedColor: '#ffbb54' }
    },
    {
        start: new Date(2025, 9, 15),
        end: new Date(2025, 10, 30),
        name: 'Core Mechanics (Unreal)',
        id: 't4',
        progress: 20,
        type: 'project',
        hideChildren: false,
        isDisabled: false,
        styles: { progressColor: '#FF2E63', progressSelectedColor: '#FF2E63' }
    }
]

export default function GanttPage() {
    const [tasks, setTasks] = useState(MOCK_TASKS)
    const [view, setView] = useState<ViewMode>(ViewMode.Day)

    return (
        <div className="h-full flex flex-col space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Timeline</h1>
                <div className="flex space-x-2 bg-card border border-border p-1 rounded-lg text-sm">
                    <button
                        onClick={() => setView(ViewMode.Day)}
                        className={`px-3 py-1 rounded ${view === ViewMode.Day ? 'bg-primary text-black font-medium' : 'text-muted-foreground'}`}
                    >
                        Day
                    </button>
                    <button
                        onClick={() => setView(ViewMode.Week)}
                        className={`px-3 py-1 rounded ${view === ViewMode.Week ? 'bg-primary text-black font-medium' : 'text-muted-foreground'}`}
                    >
                        Week
                    </button>
                </div>
            </div>

            <div className="flex-1 bg-card border border-border rounded-xl overflow-hidden">
                <Gantt
                    tasks={tasks}
                    viewMode={view}
                    listCellWidth="155px"
                    columnWidth={60}
                    barBackgroundColor="#1A1A1A"
                    barBackgroundSelectedColor="#333"
                    rowHeight={40}
                    fontSize="12px"
                // Customizing colors handled in task styles map
                />
            </div>
        </div>
    )
}
