import { AgentCardProps } from "@/components/neural/agent-card"

// Mock logic for the "Neural Mesh"
// In a real implementation, this would run scheduled jobs against the Graph DB

export async function generateInsights(): Promise<AgentCardProps[]> {
    return [
        {
            type: 'scrum',
            title: 'Velocity Drift Detected',
            message: 'Team Alpha is trending 15% slower than estimated. Ticket #104 (Physics Engine) is the primary bottleneck.',
            severity: 'warning',
            timestamp: '10m ago'
        },
        {
            type: 'producer',
            title: 'Dependency Blockage',
            message: 'Critical Path Alert: "Level 3 Environment" is blocked by "Tree Texture Pack" (Art). Expected delay: 2 days.',
            severity: 'critical',
            timestamp: '1h ago'
        },
        {
            type: 'account',
            title: 'Retainer Low',
            message: 'Acme Corp has used 85% of their monthly retainer. Suggest scheduling an upsell meeting.',
            severity: 'info',
            timestamp: '3h ago'
        }
    ]
}
