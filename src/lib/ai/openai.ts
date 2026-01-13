import OpenAI from 'openai'

// Initialize OpenAI client
// This will throw an error if OPENAI_API_KEY is not set
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

/**
 * Generate structured insights from project data using OpenAI
 */
export async function generateAIInsights(context: {
    tasks: any[]
    projects: any[]
    clients: any[]
    teamMembers: any[]
    graphContext?: string
}): Promise<any[]> {
    const systemPrompt = `You are an AI agent for Cortex ServiceOS, a management system for creative and tech teams.
Your role is to analyze project data and generate actionable insights for three agent personas:
1. Scrum Master - focuses on velocity, blockers, and sprint health
2. Producer - focuses on dependencies, critical paths, and resource allocation
3. Account Manager - focuses on client relationships, retainer usage, and upsell opportunities

Return insights as a JSON array with this structure:
[
  {
    "type": "scrum" | "producer" | "account",
    "title": "Short title",
    "message": "Detailed insight with specific metrics",
    "severity": "info" | "warning" | "critical",
    "timestamp": "relative time like '10m ago'"
  }
]

Be specific with numbers, names, and actionable recommendations.`

    const userPrompt = `Analyze this workspace data and generate 3-5 insights:

Tasks: ${JSON.stringify(context.tasks.slice(0, 20))}
Projects: ${JSON.stringify(context.projects)}
Clients: ${JSON.stringify(context.clients)}
Team: ${JSON.stringify(context.teamMembers)}
${context.graphContext ? `Graph Context: ${context.graphContext}` : ''}

Focus on:
- Velocity trends and blockers
- Resource bottlenecks
- Client retainer status
- Critical dependencies`

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt },
            ],
            response_format: { type: 'json_object' },
            temperature: 0.7,
        })

        const content = completion.choices[0]?.message?.content
        if (!content) {
            throw new Error('No content returned from OpenAI')
        }

        const parsed = JSON.parse(content)
        return Array.isArray(parsed.insights) ? parsed.insights : parsed
    } catch (error) {
        console.error('OpenAI API Error:', error)
        // Fallback to empty array if API fails
        return []
    }
}

/**
 * Simple chat completion wrapper
 */
export async function chatCompletion(
    messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
    options?: {
        model?: string
        temperature?: number
        maxTokens?: number
    }
): Promise<string> {
    const completion = await openai.chat.completions.create({
        model: options?.model || 'gpt-4',
        messages,
        temperature: options?.temperature ?? 0.7,
        max_tokens: options?.maxTokens,
    })

    return completion.choices[0]?.message?.content || ''
}

export { openai }
