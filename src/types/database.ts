export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            tenants: {
                Row: {
                    id: string
                    name: string
                    slug: string
                    plan: 'indie' | 'studio' | 'agency'
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    slug: string
                    plan?: 'indie' | 'studio' | 'agency'
                    created_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    slug?: string
                    plan?: 'indie' | 'studio' | 'agency'
                    created_at?: string
                }
            }
            profiles: {
                Row: {
                    id: string
                    tenant_id: string | null
                    full_name: string | null
                    role: 'admin' | 'producer' | 'dev' | 'artist' | 'client'
                    skills: string[] | null
                    burnout_score: number
                    hourly_rate: number | null
                    avatar_url: string | null
                    updated_at: string | null
                }
                Insert: {
                    id: string
                    tenant_id?: string | null
                    full_name?: string | null
                    role?: 'admin' | 'producer' | 'dev' | 'artist' | 'client'
                    skills?: string[] | null
                    burnout_score?: number
                    hourly_rate?: number | null
                    avatar_url?: string | null
                    updated_at?: string | null
                }
                Update: {
                    id?: string
                    tenant_id?: string | null
                    full_name?: string | null
                    role?: 'admin' | 'producer' | 'dev' | 'artist' | 'client'
                    skills?: string[] | null
                    burnout_score?: number
                    hourly_rate?: number | null
                    avatar_url?: string | null
                    updated_at?: string | null
                }
            }
            projects: {
                Row: {
                    id: string
                    tenant_id: string
                    name: string
                    code: string | null
                    vertical: 'software' | 'game' | 'creative'
                    status: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    tenant_id: string
                    name: string
                    code?: string | null
                    vertical: 'software' | 'game' | 'creative'
                    status?: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    tenant_id?: string
                    name?: string
                    code?: string | null
                    vertical?: 'software' | 'game' | 'creative'
                    status?: string
                    created_at?: string
                }
            }
            tasks: {
                Row: {
                    id: string
                    project_id: string | null
                    parent_id: string | null
                    title: string
                    description: string | null
                    status: 'todo' | 'in-progress' | 'review' | 'done' | 'blocked'
                    priority: 'low' | 'medium' | 'high' | 'critical'
                    points: number | null
                    assigned_to: string | null
                    meta: Json
                    created_at: string
                }
                Insert: {
                    id?: string
                    project_id?: string | null
                    parent_id?: string | null
                    title: string
                    description?: string | null
                    status?: 'todo' | 'in-progress' | 'review' | 'done' | 'blocked'
                    priority?: 'low' | 'medium' | 'high' | 'critical'
                    points?: number | null
                    assigned_to?: string | null
                    meta?: Json
                    created_at?: string
                }
                Update: {
                    id?: string
                    project_id?: string | null
                    parent_id?: string | null
                    title?: string
                    description?: string | null
                    status?: 'todo' | 'in-progress' | 'review' | 'done' | 'blocked'
                    priority?: 'low' | 'medium' | 'high' | 'critical'
                    points?: number | null
                    assigned_to?: string | null
                    meta?: Json
                    created_at?: string
                }
            }
        }
    }
}
