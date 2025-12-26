"use client"

import { ReactFlow, Controls, Background, useNodesState, useEdgesState, BackgroundVariant } from '@xyflow/react'
import '@xyflow/react/dist/style.css'

const initialNodes = [
    { id: '1', position: { x: 250, y: 0 }, data: { label: 'Game Design Doc' }, style: { border: '1px solid #6E44FF', background: '#0F0F0F', color: '#fff' } },
    { id: '2', position: { x: 100, y: 100 }, data: { label: 'Character Art' }, style: { border: '1px solid #D1F366', background: '#0F0F0F', color: '#fff' } },
    { id: '3', position: { x: 400, y: 100 }, data: { label: 'Level Design' }, style: { border: '1px solid #D1F366', background: '#0F0F0F', color: '#fff' } },
    { id: '4', position: { x: 250, y: 200 }, data: { label: 'Playable Demo' }, style: { border: '1px solid #FF2E63', background: '#0F0F0F', color: '#fff' } },
]

const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#6E44FF' } },
    { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: '#6E44FF' } },
    { id: 'e2-4', source: '2', target: '4', style: { stroke: '#D1F366' } },
    { id: 'e3-4', source: '3', target: '4', style: { stroke: '#D1F366' } },
]

export default function GraphPage() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

    return (
        <div className="h-full flex flex-col space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Dependency Graph</h1>
                <p className="text-muted-foreground">neo4j.visualizer</p>
            </div>

            <div className="flex-1 rounded-xl border border-border overflow-hidden bg-black/50 h-[600px]">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    fitView
                    colorMode="dark"
                >
                    <Background color="#333" variant={BackgroundVariant.Dots} />
                    <Controls />
                </ReactFlow>
            </div>
        </div>
    )
}
