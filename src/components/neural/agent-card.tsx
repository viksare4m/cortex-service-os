"use client"

import { cn } from "@/lib/utils"
import { Bot, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react"

export type AgentType = 'scrum' | 'producer' | 'account'

export interface AgentCardProps {
    type: AgentType
    title: string
    message: string
    severity: 'info' | 'warning' | 'critical'
    timestamp: string
}

export function AgentCard({ type, title, message, severity, timestamp }: AgentCardProps) {
    const getIcon = () => {
        switch (type) {
            case 'scrum': return <Bot className="w-5 h-5" />
            case 'producer': return <CheckCircle className="w-5 h-5" />
            case 'account': return <TrendingUp className="w-5 h-5" />
        }
    }

    const getColor = () => {
        switch (severity) {
            case 'info': return 'border-blue-500/20 bg-blue-500/5 text-blue-500'
            case 'warning': return 'border-yellow-500/20 bg-yellow-500/5 text-yellow-500'
            case 'critical': return 'border-destructive/20 bg-destructive/5 text-destructive'
        }
    }

    return (
        <div className={cn("p-4 rounded-xl border flex items-start space-x-4 transition-all hover:bg-accent/5", getColor())}>
            <div className={cn("p-2 rounded-lg bg-background border", getColor())}>
                {getIcon()}
            </div>
            <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider opacity-80">{type} Agent</span>
                    <span className="text-[10px] font-mono opacity-60">{timestamp}</span>
                </div>
                <h4 className="font-semibold text-sm mb-1 text-foreground">{title}</h4>
                <p className="text-sm opacity-90">{message}</p>
            </div>
        </div>
    )
}
