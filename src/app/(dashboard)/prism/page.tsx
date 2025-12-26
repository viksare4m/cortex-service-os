"use client"

import { useEffect, useState } from "react"
import { AgentCard, AgentCardProps } from "@/components/neural/agent-card"
import { generateInsights } from "@/lib/neural/engine"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts'

const PROFIT_DATA = [
    { name: 'Sprint 1', cost: 4000, billable: 6500 },
    { name: 'Sprint 2', cost: 3000, billable: 5800 },
    { name: 'Sprint 3', cost: 5000, billable: 7200 },
    { name: 'Sprint 4', cost: 2800, billable: 4900 },
]

export default function PrismPage() {
    const [insights, setInsights] = useState<AgentCardProps[]>([])

    useEffect(() => {
        // Simulate async AI fetch
        generateInsights().then(setInsights)
    }, [])

    return (
        <div className="h-full flex flex-col space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">PRISM</h1>
                <p className="text-muted-foreground">Intelligence layer active</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Charts Area */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                        <h3 className="font-medium text-lg mb-4">Profitability (Cost vs. Billable)</h3>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={PROFIT_DATA}>
                                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                                    <XAxis dataKey="name" fontSize={12} />
                                    <YAxis fontSize={12} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }}
                                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                    />
                                    <Bar dataKey="cost" fill="#FF2E63" radius={[4, 4, 0, 0]} name="Dev Cost" />
                                    <Bar dataKey="billable" fill="#D1F366" radius={[4, 4, 0, 0]} name="Client Billable" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                        <h3 className="font-medium text-lg mb-4">Team Burnout Heatmap (Trend)</h3>
                        <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={PROFIT_DATA}>
                                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                                    <XAxis dataKey="name" fontSize={12} />
                                    <YAxis fontSize={12} />
                                    <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }} />
                                    <Line type="monotone" dataKey="cost" stroke="#6E44FF" strokeWidth={3} dot={false} name="Stress Level" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Neural Stream Sidebar */}
                <div className="bg-card border border-border rounded-xl p-6 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-lg tracking-tight">Neural Stream</h3>
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    </div>

                    <div className="space-y-4 overflow-y-auto pr-2">
                        {insights.map((insight, idx) => (
                            <AgentCard key={idx} {...insight} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
