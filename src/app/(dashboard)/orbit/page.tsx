"use client"

import { Orbit, Activity, AlertTriangle, TrendingDown } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { cn } from "@/lib/utils"

const CLIENTS = [
    { id: 1, name: "Acme Corp", plan: "Retainer (100h)", limit: 100, used: 65, status: 'active', burnRate: 2.5 }, // 2.5h/day
    { id: 2, name: "Indie Studio X", plan: "Milestone", limit: 0, used: 0, status: 'pending', burnRate: 0 },
]

// Mock data: Last 14 days of hours usage
const USAGE_DATA = [
    { day: '1', hours: 98 },
    { day: '2', hours: 95 },
    { day: '3', hours: 91 },
    { day: '4', hours: 88 },
    { day: '5', hours: 82 },
    { day: '6', hours: 82 }, // Weekend
    { day: '7', hours: 82 }, // Weekend
    { day: '8', hours: 75 },
    { day: '9', hours: 68 },
    { day: '10', hours: 60 },
    { day: '11', hours: 55 },
    { day: '12', hours: 48 },
    { day: '13', hours: 40 },
    { day: '14', hours: 35 }, // Current
]

export default function OrbitPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Orbit</h1>
                <div className="flex space-x-2">
                    <button className="text-sm bg-accent text-accent-foreground px-3 py-1 rounded-md">New Client</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {CLIENTS.map((client) => {
                    const remaining = client.limit - client.used
                    const daysUntilDepletion = client.burnRate > 0 ? Math.floor(remaining / client.burnRate) : '∞'
                    const isLow = remaining < 20

                    return (
                        <div key={client.id} className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 rounded bg-purple-500/10 flex items-center justify-center text-purple-500">
                                        <Orbit className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-foreground text-lg">{client.name}</h3>
                                        <p className="text-sm text-muted-foreground">{client.plan}</p>
                                    </div>
                                </div>
                                <div className={`w-2 h-2 rounded-full ${client.status === 'active' ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-zinc-500'}`} />
                            </div>

                            {client.plan.includes('Retainer') && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="text-center">
                                            <p className="text-xs text-muted-foreground uppercase">Remaining</p>
                                            <span className={cn("text-2xl font-bold", isLow ? "text-destructive" : "text-foreground")}>{remaining}h</span>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xs text-muted-foreground uppercase">Burn Rate</p>
                                            <span className="text-2xl font-bold flex items-center text-foreground">
                                                {client.burnRate} <span className="text-xs font-normal ml-1">h/day</span>
                                            </span>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-xs text-muted-foreground uppercase">Runway</p>
                                            <span className="text-2xl font-bold text-foreground">{daysUntilDepletion} <span className="text-xs font-normal">days</span></span>
                                        </div>
                                    </div>

                                    <div className="h-[150px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={USAGE_DATA}>
                                                <defs>
                                                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <Tooltip
                                                    contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }}
                                                    itemStyle={{ color: '#fff' }}
                                                />
                                                <Area type="monotone" dataKey="hours" stroke="#8884d8" fillOpacity={1} fill="url(#colorHours)" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>

                                    {isLow && (
                                        <div className="flex items-center p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                                            <AlertTriangle className="w-4 h-4 mr-2" />
                                            <span>Warning: Retainer low. Upsell opportunity detected.</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
