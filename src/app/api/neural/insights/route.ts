import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateAIInsights } from '@/lib/ai/openai'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * POST /api/neural/insights
 * Generate AI-powered insights for the current tenant
 */
export async function GET(request: NextRequest) {
    try {
        const supabase = await createClient()

        // Get current user
        const {
            data: { user },
            error: authError,
        } = await supabase.auth.getUser()

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Fetch user's profile to get tenant_id
        const { data: profile } = await supabase
            .from('profiles')
            .select('tenant_id')
            .eq('id', user.id)
            .single()

        if (!profile?.tenant_id) {
            return NextResponse.json({ error: 'No tenant found' }, { status: 403 })
        }

        // Fetch recent tasks
        const { data: tasks } = await supabase
            .from('tasks')
            .select('*')
            .eq('tenant_id', profile.tenant_id)
            .order('created_at', { ascending: false })
            .limit(50)

        // Fetch projects
        const { data: projects } = await supabase
            .from('projects')
            .select('*')
            .eq('tenant_id', profile.tenant_id)

        // Fetch clients
        const { data: clients } = await supabase
            .from('clients')
            .select('*')
            .eq('tenant_id', profile.tenant_id)

        // Fetch team members
        const { data: teamMembers } = await supabase
            .from('profiles')
            .select('id, full_name, role, skills')
            .eq('tenant_id', profile.tenant_id)

        // TODO: Add Neo4j graph context query here
        // const graphContext = await queryGraphContext(profile.tenant_id)

        // Generate AI insights
        const insights = await generateAIInsights({
            tasks: tasks || [],
            projects: projects || [],
            clients: clients || [],
            teamMembers: teamMembers || [],
            // graphContext,
        })

        return NextResponse.json({ insights })
    } catch (error: any) {
        console.error('Neural insights error:', error)
        return NextResponse.json(
            { error: 'Failed to generate insights', message: error.message },
            { status: 500 }
        )
    }
}
