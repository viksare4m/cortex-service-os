import { AgentCardProps } from "@/components/neural/agent-card"

/**
 * Neural Engine - Fetches AI-generated insights from the API
 * This replaces the previous mock implementation with real OpenAI-powered analysis
 */
export async function generateInsights(): Promise<AgentCardProps[]> {
    try {
        const response = await fetch('/api/neural/insights', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        })

        if (!response.ok) {
            console.error('Failed to fetch insights:', response.statusText)
            return getFallbackInsights()
        }

        const data = await response.json()
        return data.insights || getFallbackInsights()
    } catch (error) {
        console.error('Neural engine error:', error)
        return getFallbackInsights()
    }
}

/**
 * Fallback insights in case API fails
 */
function getFallbackInsights(): AgentCardProps[] {
    return [
        {
            type: 'scrum',
            title: 'Neural Engine Offline',
            message: 'AI insights are temporarily unavailable. Check your OPENAI_API_KEY configuration.',
            severity: 'warning',
            timestamp: 'just now'
        }
    ]
}
