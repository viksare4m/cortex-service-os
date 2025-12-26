import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { Database } from '@/types/database'

// Mock handler for Phase 2 proof-of-concept
// In production, this would verify SHA signatures from GitHub/GitLab

export async function POST(request: Request) {
    const payload = await request.json()
    const supabase = await createClient()

    // Detect Provider
    const isGitHub = request.headers.get('x-github-event')

    if (isGitHub === 'push') {
        const commits = payload.commits
        const branch = payload.ref.replace('refs/heads/', '')

        // 1. Log to Vector DB (The Memory) - Stubbed
        console.log(`[GitBridge] Processing ${commits.length} commits on branch ${branch}`)

        // 2. Link to Tasks (Regex Parser)
        // Link any "Fixes #123" or "CTX-123" to Tasks
        for (const commit of commits) {
            const message = commit.message
            const match = message.match(/#(\d+)/) || message.match(/CTX-(\d+)/)

            if (match) {
                const taskId = match[1] // Assuming ID match
                console.log(`[GitBridge] Linked commit ${commit.id} to Task ${taskId}`)

                // Mock Update Task
                // await supabase.from('tasks').update(...).eq('code', taskId) 
            }
        }

        return NextResponse.json({ success: true, processed: commits.length })
    }

    return NextResponse.json({ message: "Ignored event" }, { status: 200 })
}
